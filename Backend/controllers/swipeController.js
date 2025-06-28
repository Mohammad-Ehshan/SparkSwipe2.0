import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import { Swipe } from "../models/swipeSchema.js";
import { User } from "../models/userSchema.js";

// Constants for swipe scoring
const SWIPE_SCORE_WEIGHTS = {
  LIKE: 1.5,
  DISLIKE: -1.2,
  SKIP: -0.5
};

export const recordSwipe = catchAsyncErrors(async (req, res, next) => {
  const { projectId, action } = req.body;
  const userId = req.user._id;

  // Validate action type
  if (!['like', 'dislike', 'skip'].includes(action)) {
    return next(new ErrorHandler('Invalid swipe action. Must be like/dislike/skip', 400));
  }

  // Prevent duplicate swipes
  const existingSwipe = await Swipe.findOne({ userId, projectId });
  if (existingSwipe) {
    return next(new ErrorHandler('Project already swiped', 409));
  }

  // Get project with creator populated
  const project = await Project.findById(projectId)
    .populate('postedBy', 'name profilepic');
  
  if (!project) {
    return next(new ErrorHandler('Project not found', 404));
  }

  // Prevent swiping own projects
  if (project.postedBy._id.equals(userId)) {
    return next(new ErrorHandler("Cannot swipe your own project", 403));
  }

  // Create swipe record
  await Swipe.create({
    userId,
    projectId,
    action
  });

  // Prepare update object
  const updateData = {
    $inc: { views: 1 },
    $set: { lastSwipedAt: new Date() }
  };

  if (action === 'like') {
    updateData.$inc.likes = 1;
    updateData.$inc.swipeScore = SWIPE_SCORE_WEIGHTS.LIKE;

    // Add to user's liked projects
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedProjects: projectId }
    });
  } else if (action === 'dislike') {
    updateData.$inc.dislikes = 1;
    updateData.$inc.swipeScore = SWIPE_SCORE_WEIGHTS.DISLIKE;
  } else if (action === 'skip') {
    updateData.$inc.skip = 1;
    updateData.$inc.swipeScore = SWIPE_SCORE_WEIGHTS.SKIP;
  }

  const updatedProject = await Project.findByIdAndUpdate(projectId, updateData, { 
    new: true,
    populate: 'postedBy'
  });

  res.status(201).json({
    success: true,
    message: `Project ${action}d`,
    action,
    project: {
      _id: updatedProject._id,
      title: updatedProject.title,
      likes: updatedProject.likes,
      views: updatedProject.views,
      creator: updatedProject.postedBy
    }
  });
});

export const getNextCard = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const { limit = 5 } = req.query;

  // Get exclusion lists (swiped and own projects)
  const [swipedProjects, ownProjects] = await Promise.all([
    Swipe.find({ userId }).distinct('projectId'),
    Project.find({ postedBy: userId }).distinct('_id')
  ]);

  // Build the base query
  const query = {
    _id: { $nin: [...swipedProjects, ...ownProjects] }
  };

  // Get total available projects count
  const totalAvailable = await Project.countDocuments(query);
  
  if (totalAvailable === 0) {
    return res.status(200).json({
      success: true,
      message: "No more projects to swipe",
      cards: [],
      remaining: 0
    });
  }

  // Determine optimal fetch size
  const sampleSize = Math.min(totalAvailable, 100);

  // Fetch projects with creator populated
  let projectPool = await Project.find(query)
    .populate('postedBy', 'name profilepic')
    .sort({ createdAt: -1 })
    .limit(sampleSize)
    .lean();

  // Score and sort projects
  const scoredProjects = projectPool.map(project => {
    let score = 0;
    
    // Followed users boost (30%)
    if (req.user.followedUsers.some(id => id.equals(project.postedBy._id))) {
      score += 30;
    }
    
    // Engagement metrics (65%)
    score += (project.swipeScore || 0) * 0.4;  // 40%
    score += project.likes * 0.2;              // 20%
    score += project.views * 0.05;             // 5%
    
    // Recency boost (25%)
    const hoursSinceLastSwipe = project.lastSwipedAt
      ? (new Date() - project.lastSwipedAt) / (1000 * 60 * 60)
      : 24;
    score += (24 - Math.min(hoursSinceLastSwipe, 24)) * 0.25;
    
    return { ...project, score };
  }).sort((a, b) => b.score - a.score);

  // Prepare final response
  const resultLimit = Math.min(parseInt(limit) || 5, 10);
  const cards = scoredProjects.slice(0, resultLimit).map(project => ({
    _id: project._id,
    title: project.title,
    description: project.description.substring(0, 120),
    tags: project.tags,
    category: project.category,
    likes: project.likes,
    views: project.views,
    creator: {
      _id: project.postedBy._id,
      name: project.postedBy.name,
      profilepic: project.postedBy.profilepic
    },
    media: project.media?.imageUrls?.[0] || null,
    createdAt: project.createdAt
  }));

  res.status(200).json({
    success: true,
    cards,
    remaining: totalAvailable - resultLimit
  });
});

export const undoSwipe = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  // Get most recent swipe with project populated
  const lastSwipe = await Swipe.findOne({ userId })
    .sort({ createdAt: -1 })
    .populate({
      path: 'projectId',
      select: 'title likes views swipeScore postedBy',
      populate: {
        path: 'postedBy',
        select: 'name'
      }
    });

  if (!lastSwipe) {
    return next(new ErrorHandler("No swipes to undo", 404));
  }

  // Delete the swipe record
  await Swipe.findByIdAndDelete(lastSwipe._id);

  // Prepare project update
  const updateData = {
    $inc: { views: -1 }
  };

  // Action-specific updates
  if (lastSwipe.action === 'like') {
    updateData.$inc.likes = -1;
    updateData.$inc.swipeScore = -SWIPE_SCORE_WEIGHTS.LIKE;

    // Remove from user's liked projects
    await User.findByIdAndUpdate(userId, {
      $pull: { likedProjects: lastSwipe.projectId._id }
    });
  } else if (lastSwipe.action === 'dislike') {
    updateData.$inc.dislikes = -1;
    updateData.$inc.swipeScore = -SWIPE_SCORE_WEIGHTS.DISLIKE;
  } else if (lastSwipe.action === 'skip') {
    updateData.$inc.skip = -1;
    updateData.$inc.swipeScore = -SWIPE_SCORE_WEIGHTS.SKIP;
  }

  // Update project stats
  const updatedProject = await Project.findByIdAndUpdate(
    lastSwipe.projectId._id,
    updateData,
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Swipe undone successfully",
    undoneSwipe: {
      action: lastSwipe.action,
      projectId: lastSwipe.projectId._id,
      projectTitle: lastSwipe.projectId.title,
      timestamp: lastSwipe.createdAt
    },
    project: {
      _id: updatedProject._id,
      likes: updatedProject.likes,
      views: updatedProject.views
    }
  });
});

export const getSwipeHistory = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  const { limit = 20 } = req.query;
  
  // Get swipes with project and media populated
  const swipes = await Swipe.find({ userId })
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .populate({
      path: 'projectId',
      select: 'title media.imageUrls',
    })
    .lean();

  const history = swipes.map(swipe => ({
    _id: swipe._id,
    action: swipe.action,
    timestamp: swipe.createdAt,
    project: {
      _id: swipe.projectId._id,
      title: swipe.projectId.title,
      media: swipe.projectId.media?.imageUrls?.[0] || null
    }
  }));

  res.status(200).json({
    success: true,
    count: history.length,
    history
  });
});