 import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Comment } from "../models/commentSchema.js";
import { Report } from "../models/reportSchema.js";
import { Project } from "../models/projectSchema.js";
import { User } from "../models/userSchema.js";
import { v4 as uuidv4 } from 'uuid';

// Add comment with thread handling
export const addComment = catchAsyncErrors(async (req, res, next) => {
  const { projectId, text, parentCommentId } = req.body;
  const userId = req.user._id;

  // Validate required fields
  if (!projectId || !text) {
    return next(new ErrorHandler("Project ID and comment text are required", 400));
  }

  // Check if project exists
  const project = await Project.findById(projectId);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  // Create new comment
  const newComment = await Comment.create({
    projectId,
    userId,
    commentText: text,
    parentCommentId: parentCommentId || null
  });

  // Update parent comment if this is a reply
  if (parentCommentId) {
    await Comment.findByIdAndUpdate(parentCommentId, {
      $inc: { repliesCount: 1 }
    });
  }

  // Update project's comment count
  await Project.findByIdAndUpdate(projectId, {
    $inc: { commentsCount: 1 }
  });

  res.status(201).json({
    success: true,
    message: parentCommentId ? "Reply added" : "Comment added",
    comment: newComment
  });
});

// Get all comments and replies for a project
export const getComments = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.params;

  if (!projectId) {
    return next(new ErrorHandler("Project ID is required", 400));
  }

  // Get all top-level comments (no parent)
  const parentComments = await Comment.find({
    projectId,
    parentCommentId: null,
  })
    .populate({
      path: "userId",
      select: "name profilepic",
    })
    .sort({ createdAt: -1 }); // latest comments first

  // For each parent comment, fetch its replies
  const commentsWithReplies = await Promise.all(
    parentComments.map(async (parent) => {
      const replies = await Comment.find({
        parentCommentId: parent._id,
      })
        .populate({
          path: "userId",
          select: "name avatar",
        })
        .sort({ createdAt: 1 }); // oldest reply first

      return {
        ...parent.toObject(),
        replies,
      };
    })
  );

  res.status(200).json({
    success: true,
    comments: commentsWithReplies,
  });
});

//get replies for comment
export const getReplies = catchAsyncErrors(async (req, res, next) => {
  const { commentId } = req.params;

  if (!commentId) {
    return next(new ErrorHandler("Comment ID is required", 400));
  }

  const replies = await Comment.find({ parentCommentId: commentId })
    .populate({
      path: "userId",
      select: "name profilepic", // adjust as per your schema
    })
    .sort({ createdAt: 1 }); // optional: oldest first

  res.status(200).json({
    success: true,
    replies,
  });
});



// Toggle comment like
export const likeComment = catchAsyncErrors(async (req, res, next) => {
  const { commentId } = req.body;
  const userId = req.user._id;

  if (!commentId) {
    return next(new ErrorHandler("Comment ID is required", 400));
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new ErrorHandler("Comment not found", 404));
  }

  // Check if user already liked the comment
  const hasLiked = comment.likedBy.includes(userId);
  let updatedComment;

  if (hasLiked) {
    // Remove like
    updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $pull: { likedBy: userId },
        $inc: { likes: -1 }
      },
      { new: true }
    );
  } else {
    // Add like
    updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: { likedBy: userId },
        $inc: { likes: 1 }
      },
      { new: true }
    );
  }

  res.status(200).json({
    success: true,
    message: hasLiked ? "Comment unliked" : "Comment liked",
    likes: updatedComment.likes,
    hasLiked: !hasLiked
  });
});

// Report a project
export const reportProject = catchAsyncErrors(async (req, res, next) => {
  const { projectId, reason } = req.body;
  const userId = req.user._id;

  if (!projectId || !reason) {
    return next(new ErrorHandler("Project ID and reason are required", 400));
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  // Create report
  await Report.create({
    projectId,
    reportedBy: userId,
    reason
  });

  // Update project's report count
  await Project.findByIdAndUpdate(projectId, {
    $inc: { reports: 1 }
  });

  res.status(201).json({
    success: true,
    message: "Project reported successfully"
  });
});

// Bookmark project (save/unsave)
export const bookmarkProject = catchAsyncErrors(async (req, res, next) => {
  const { projectId } = req.body;
  const userId = req.user._id;

  if (!projectId) {
    return next(new ErrorHandler("Project ID is required", 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }

  // Check if already bookmarked
  const isBookmarked = user.savedProjects.includes(projectId);
  let updatedUser;

  if (isBookmarked) {
    // Remove bookmark
    updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { savedProjects: projectId }
      },
      { new: true }
    );
  } else {
    // Add bookmark
    updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { savedProjects: projectId }
      },
      { new: true }
    );
  }

  res.status(200).json({
    success: true,
    message: isBookmarked ? "Removed from saved projects" : "Added to saved projects",
    isBookmarked: !isBookmarked,
    savedProjects: updatedUser.savedProjects
  });
});
