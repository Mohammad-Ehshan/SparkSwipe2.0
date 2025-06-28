import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Project } from "../models/projectSchema.js";
import { User } from "../models/userSchema.js";
import { View } from '../models/viewSchema.js';
import { Like } from '../models/LikeSchema.js';
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";
import { Trending } from "../models/trendingSchema.js";
import mongoose from "mongoose";

//get all project with category sortby and search
// export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
//   const { category, sortBy, search } = req.query;
  
//   // Build query
//   const query = {};
//   if (category && category !== 'All') {
//     query.category = category;
//   }
//   if (search) {
//     // query.$text = { $search: search };
//      query.title = { $regex: search, $options: 'i' };
//   }

//   // Build sort
//   let sort = {};
//   switch (sortBy) {
//     case 'Recent':
//       sort = { createdAt: -1 };
//       break;
//     case 'Most Liked':
//       sort = { likes: -1 };
//       break;
//     case 'Trending':
//       sort = { likes: -1, views: -1 };
//       break;
//     default:
//       sort = { createdAt: -1 };
//   }

//   const projects = await Project.find(query)
//     .sort(sort)
//     .populate({
//       path: 'postedBy',
//       select: 'name profilepic'
//     });

//   //   const swipeCard = await Project.find(query)
//   // .sort(sort)
//   // .skip(skip)
//   // .limit(limit)
//   // .populate('postedBy', 'name profilepic');

//   res.status(200).json({
//     success: true,
//     projects,
//   });
// });

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const { 
    category, 
    sortBy, 
    search,
    explore,
    limit,
    page,
    excludeSwiped,
    excludeOwn
  } = req.query;

  // Build base query
  const query = {};
  
  // Category filter
  if (category && category !== 'All') {
    query.category = category;
  }
  
  // Search filter
  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  // Explore page specific filters
  if (explore === 'true') {
    if (excludeSwiped === 'true' && req.user?._id) {
      const swipedProjects = await Swipe.find({ userId: req.user._id }).distinct('projectId');
      if (swipedProjects.length > 0) {
        query._id = { $nin: swipedProjects };
      }
    }

    if (excludeOwn === 'true' && req.user?._id) {
      query.postedBy = { $ne: req.user._id };
    }
  }

  // Build sort
  let sort = {};
  switch (sortBy) {
    case 'Recent':
    case 'Most Recent':
      sort = { createdAt: -1 };
      break;
    case 'Most Liked':
      sort = { likes: -1 };
      break;
    case 'Most Viewed':
      sort = { views: -1 };
      break;
    case 'Trending':
      sort = { likes: -1, views: -1 };
      break;
    default:
      sort = { createdAt: -1 };
  }

  // Pagination setup
  const limitNum = explore === 'true' ? parseInt(limit) || 10 : 1000;
  const pageNum = parseInt(page) || 1;
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const projects = await Project.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNum)
    .populate({
      path: 'postedBy',
      select: 'name profilepic'
    });

  // Response format
  if (explore === 'true') {
    res.status(200).json({
      success: true,
      count: projects.length,
      page: pageNum,
      hasMore: projects.length >= limitNum,
      projects: projects.map(proj => ({
        _id: proj._id,
        title: proj.title,
        description: proj.description,
        tags: proj.tags,
        category: proj.category,
        likes: proj.likes,
        views: proj.views,
        commentsCount: proj.commentsCount,
        postedBy: {
          _id: proj.postedBy?._id,
          name: proj.postedBy?.name,
          profilepic: proj.postedBy?.profilepic
        },
        media: proj.media,
        createdAt: proj.createdAt
      }))
    });
  } else {
    res.status(200).json({
      success: true,
      projects
    });
  }
});


//uploading single photo
export const postProject = catchAsyncErrors(async(req,res,next)=> {
  
  if(!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload media files.", 400));
  }

  const {file}=req.files;
  
  const cloudinaryResponse=await cloudinary.uploader.upload(
    file.tempFilePath
  );

  if(!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary upload failed:", cloudinaryResponse.error || "Unknown error" );
    return next(new ErrorHandler("Failed to upload media.", 500));
  }

    const {
    title,
    description,
    category,
    tags,
  } = req.body;

    if (!title || !description || !category || !tags) {
    return next(new ErrorHandler("Please provide full project details.", 400));
  }

    const postedBy = req.user._id;

    const project = await Project.create({
    title,
    description,
    category,
    tags: Array.isArray(tags) ? tags : [tags], // handle both array and string
    media: {
      imageUrls:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      video:{}
    },
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "Project Posted Successfully!",
    project,
  });
})

// export const postProject = catchAsyncErrors(async (req, res, next) => {
//   const { title, description, category, tags } = req.body;

//   if (!title || !description || !category || !tags) {
//     return next(new ErrorHandler("Please provide full project details.", 400));
//   }

//   const tagsArray = Array.isArray(tags) ? tags : [tags];

//   const imageUrls = [];
//   let videoData = { public_id: "", url: "" };

//   // === IMAGE UPLOAD ===
//   if (req.files?.images) {
//     const imageFiles = Array.isArray(req.files.images)
//       ? req.files.images
//       : [req.files.images];

//     for (const file of imageFiles) {
//       const result = await cloudinary.uploader.upload(file.tempFilePath, {
//         folder: "project_images",
//       });

//       if (!result || result.error) {
//         console.error("Image upload failed:", result.error || "Unknown error");
//         return next(new ErrorHandler("Failed to upload image", 500));
//       }

//       imageUrls.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }
//   }

//   // === VIDEO UPLOAD ===
//   if (req.files?.video) {
//     const video = req.files.video;

//     const videoUpload = await cloudinary.uploader.upload(video.tempFilePath, {
//       resource_type: "video",
//       folder: "project_videos",
//     });

//     if (!videoUpload || videoUpload.error) {
//       console.error("Video upload failed:", videoUpload.error || "Unknown error");
//       return next(new ErrorHandler("Failed to upload video", 500));
//     }

//     videoData = {
//       public_id: videoUpload.public_id,
//       url: videoUpload.secure_url,
//     };
//   }

//   const postedBy = req.user._id;

//   const project = await Project.create({
//     title,
//     description,
//     category,
//     tags: tagsArray,
//     media: {
//       imageUrls,
//       video: videoData,
//     },
//     creatorId: postedBy,
//   });

//   res.status(200).json({
//     success: true,
//     message: "Project Posted Successfully!",
//     project,
//   });
// });



// export const postProject = catchAsyncErrors(async (req, res, next) => {
//   const {
//     title,
//     description,
//     category,
//     tags,
//     media,
//   } = req.body;

//   if (!title || !description || !category || !tags) {
//     return next(new ErrorHandler("Please provide full project details.", 400));
//   }

//   const postedBy = req.user._id;
//   const project = await Project.create({
//     title,
//     description,
//     category,
//     tags,
//     media: {
//       imageUrls: media?.imageUrls || [],
//       videoUrl: media?.videoUrl || "",
//     },
//     postedBy,
//   });
//   res.status(200).json({
//     success: true,
//     message: "Project Posted Successfully!",
//     project,
//   });
// });

export const getMyProjects = catchAsyncErrors(async (req, res, next) => {
  const myProjects = await Project.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myProjects,
  });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params;
  let project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("OOPS! Project not found.", 404));
  }
  project = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Project Updated!",
  });
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("OOPS! Project not found.", 404));
  }
  await project.deleteOne();
  res.status(200).json({
    success: true,
    message: "Project Deleted!",
  });
});

// export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const project = await Project.findById(id);
//     if (!project) {
//       return next(new ErrorHandler("Project not found.", 404));
//     }
//     res.status(200).json({
//       success: true,
//       project,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(`Invalid ID / CastError`, 404));
//   }
// });

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate({
      path: "postedBy",
      select: "name email profilepic", // You can add more fields as needed
    });

    if (!project) {
      return next(new ErrorHandler("Project not found.", 404));
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    return next(new ErrorHandler("Invalid ID / CastError", 404));
  }
});


//function for user:
export const getPostedProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find({ postedBy: req.user._id })
    .select('title description category tags likes views commentsCount createdAt')
    .sort({ createdAt: -1 });
    
  res.status(200).json({ success: true, projects });
});

export const getLikedProjects = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('likedProjects');
  res.status(200).json({ success: true, projects: user.likedProjects });
});

export const getSavedProjects = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: 'savedProjects',
    populate: {
      path: 'postedBy',
      select: 'name profilepic'
    }
  });
  
  res.status(200).json({ 
    success: true, 
    projects: user.savedProjects 
  });
});


// Update Trending Data Function
// Optimized Monthly Trending Update
export const updateMonthlyTrending = catchAsyncErrors(async () => {
  const timeWindow = 'monthly';
  const timeThreshold = new Date();
  timeThreshold.setMonth(timeThreshold.getMonth() - 1);
  
  // 1. Get aggregated engagement counts
  const [viewCounts, likeCounts] = await Promise.all([
    View.aggregate([
      { $match: { createdAt: { $gte: timeThreshold } } },
      { $group: { _id: "$projectId", count: { $sum: 1 } } }
    ]),
    Like.aggregate([
      { $match: { createdAt: { $gte: timeThreshold } } },
      { $group: { _id: "$projectId", count: { $sum: 1 } } }
    ])
  ]);

  // 2. Convert to maps for O(1) lookups
  const viewMap = new Map(viewCounts.map(v => [v._id.toString(), v.count]));
  const likeMap = new Map(likeCounts.map(l => [l._id.toString(), l.count]));

  // 3. Get projects with creation time
  const projects = await Project.find(
    { createdAt: { $gte: timeThreshold } },
    { _id: 1, createdAt: 1 }
  );

  // 4. Prepare bulk operations
  const bulkOps = [];
  const now = Date.now();
  
  projects.forEach(project => {
    const projectId = project._id;
    const projIdStr = projectId.toString();
    
    const views = viewMap.get(projIdStr) || 0;
    const likes = likeMap.get(projIdStr) || 0;
    
    // Calculate actual existence hours in window
    const projectStart = Math.max(project.createdAt, timeThreshold);
    const hoursInWindow = (now - projectStart) / (1000 * 3600);
    
    // Guard against division by zero
    const validHours = Math.max(hoursInWindow, 1); 
    const score = (likes * 0.6 + views * 0.4) / validHours;

    bulkOps.push({
      updateOne: {
        filter: { projectId, timeWindow },
        update: {
          $set: {
            viewCount: views,
            swipeLikes: likes,
            calculatedScore: parseFloat(score.toFixed(2))
          }
        },
        upsert: true
      }
    });
  });

  // 5. Execute bulk write
  if (bulkOps.length > 0) {
    await Trending.bulkWrite(bulkOps);
  }
});

// Fixed getTrendingProjects Function
export const getTrendingProjects = catchAsyncErrors(async (req, res, next) => {
  const { limit = 10} = req.query;
    const timeWindow = 'monthly'; 

  const validWindows = ['daily', 'weekly', 'monthly'];
  if (!validWindows.includes(timeWindow)) {
    return next(new ErrorHandler('Invalid time window (daily/weekly/monthly)', 400));
  }

  const limitNum = parseInt(limit);
  if (isNaN(limitNum)) {
    return next(new ErrorHandler('Invalid limit value', 400));
  }


  try {
    const trending = await Trending.aggregate([
      {
        $match: {
          timeWindow,
          projectId: { $exists: true, $ne: null }
        }
      },
      { $sort: { calculatedScore: -1 } },
      { $limit: limitNum },
      {
        $lookup: {
          from: 'projects',
          localField: 'projectId',
          foreignField: '_id',
          as: 'project',
          pipeline: [
            {
              $project: {
                title: 1,
                description: 1,
                category: 1,
                tags: 1,
                likes: 1,
                views: 1,
                media: 1,
                postedBy: 1
              }
            }
          ]
        }
      },
      {
        $unwind: {
          path: '$project',
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $project: {
          _id: '$project._id',
          title: '$project.title',
          description: '$project.description',
          category: '$project.category',
          tags: '$project.tags',
          likes: '$project.likes',
          views: '$project.views',
          media: '$project.media',
          creator: '$project.postedBy',
          trendingScore: '$calculatedScore',
          timeWindow: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: trending.length,
      timeWindow,
      trending,
      message: trending.length > 0 ? undefined : 'No trending projects found'
    });

  } catch (error) {
    console.error('Trending Aggregation Error:', error);
    return next(new ErrorHandler('Failed to fetch trending projects', 500));
  }
});


export const getSearchProjects = catchAsyncErrors(async (req, res, next) => {
  const { q, category, tags, sortBy = 'recent', limit = 10, page = 1 } = req.query;

  // Build search query
  const query = {};
  
  // Text search
  if (q) {
    query.$text = { $search: q };
  }

  // Category filter
  if (category) {
    query.category = category;
  }

  // Tags filter
  if (tags) {
    query.tags = { $in: Array.isArray(tags) ? tags : [tags] };
  }

  // Sort options
  let sort = {};
  switch (sortBy) {
    case 'recent':
      sort = { createdAt: -1 };
      break;
    case 'trending':
      sort = { likes: -1, views: -1 };
      break;
    case 'most-liked':
      sort = { likes: -1 };
      break;
    case 'most-viewed':
      sort = { views: -1 };
      break;
    default:
      sort = { createdAt: -1 };
  }

  // Pagination options
  const options = {
    page: parseInt(page),
    limit: Math.min(parseInt(limit), 50),
    sort,
    populate: {
      path: 'postedBy',
      select: 'username profilePicUrl'
    }
  };

  // Execute search
  const results = await Project.paginate(query, options);

  // Format response
  const formattedResults = {
    success: true,
    count: results.totalDocs,
    page: results.page,
    pages: results.totalPages,
    results: results.docs.map(project => ({
      _id: project._id,
      title: project.title,
      description: project.description.substring(0, 200),
      category: project.category,
      tags: project.tags,
      likes: project.likes,
      views: project.views,
      media: project.media.imageUrls[0]?.url || null,
      creator: {
        _id: project.postedBy._id,
        username: project.postedBy.username,
        avatar: project.postedBy.profilePicUrl
      },
      createdAt: project.createdAt
    })),
    filters: {
      query: q || '',
      category: category || 'all',
      tags: tags || [],
      sortBy
    }
  };

  res.status(200).json(formattedResults);
});