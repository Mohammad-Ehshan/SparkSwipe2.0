import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
import { Project } from "../models/projectSchema.js";

// export const register = catchAsyncErrors(async (req, res, next) => {
//   const { name, email, phone, password,bio } = req.body;

//   const {profilepic} = req.files;
//   if (!profilepic) {
//     return next(new ErrorHandler("Please upload your profile picture!"));
//   }

//   const cloudinaryResponse = await cloudinary.uploader.upload(
//     profilepic.tempFilePath
//   );

//   if (!cloudinaryResponse || cloudinaryResponse.error) {
//     console.error(
//       "Cloudinary upload failed:",
//       cloudinaryResponse.error || "Unknown error"
//     );
//     return next(new ErrorHandler("Failed to upload media.", 500));
//   }

//   if (!name || !email || !phone || !password || !bio) {
//     return next(new ErrorHandler("Please fill full form!"));
//   }
//   const isEmail = await User.findOne({ email });
//   if (isEmail) {
//     return next(new ErrorHandler("Email already registered!"));
//   }
//   const user = await User.create({
//     name,
//     email,
//     phone,
//     password,
//     bio,
//     profilepic: {
//       public_id: cloudinaryResponse.public_id,
//       url: cloudinaryResponse.secure_url,
//     },
//   });
//   sendToken(user, 200, res, "User Registered!");
// });

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, bio } = req.body;

  const { profilepic } = req.files;
  if (!profilepic) {
    return next(new ErrorHandler("Please upload your profile picture!"));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    profilepic.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary upload failed:",
      cloudinaryResponse.error || "Unknown error"
    );
    return next(new ErrorHandler("Failed to upload media.", 500));
  }

  if (!name || !email || !password || !bio) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  
  const user = await User.create({
    name,
    email,
    password,
    bio,
    profilepic: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  
  sendToken(user, 200, res, "User Registered!");
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, bio } = req.body;
  const userId = req.user._id;

  // Find the user by ID
  const user = await User.findById(userId);
  
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Update the fields if they are provided in the request
  if (name) user.name = name;
  if (bio) user.bio = bio;

  // Handle profile picture update if provided
  if (req.files && req.files.profilepic) {
    const profilepic = req.files.profilepic;
    
    // First delete the old image from Cloudinary if it exists
    if (user.profilepic && user.profilepic.public_id) {
      await cloudinary.uploader.destroy(user.profilepic.public_id);
    }

    // Upload new image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      profilepic.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary upload failed:",
        cloudinaryResponse.error || "Unknown error"
      );
      return next(new ErrorHandler("Failed to upload media.", 500));
    }

    user.profilepic = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  // Save the updated user
  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate("followers savedProjects likedProjects"); // optional if needed

  if (!user) return next(new ErrorHandler("User not found", 404));

  const postedCount = await Project.countDocuments({ postedBy: user._id });

  res.status(200).json({
    success: true,
    user: {
      ...user._doc,
      followersCount: user.followers?.length || 0,
      likedCount: user.likedProjects?.length || 0,
      savedCount: user.savedProjects?.length || 0,
      postedCount
    }
  });
});

