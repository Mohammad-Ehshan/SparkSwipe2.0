import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,
  },
  profilepic: {
        public_id: {
          type: String,
          required: [true, "Please upload your profile picture!"],
        },
        url: {
          type: String,
          required: [true, "Please upload your profile picture!"],
        },
      },
   bio: {
    type: String,
    required: [true, "Please enter your Bio!"],
  },
  savedProjects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },
  ],
    likedProjects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
    },
  ],
  followedUsers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  followers: {
  type: [mongoose.Schema.ObjectId],
  ref: "User",
  default: [],
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH.
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);
