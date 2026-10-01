import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    username: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    location: {
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "India" },
    },

    totalScore: {
      type: Number,
      default: 0,
      min: 0,
    },

    completedWorks: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);


const userProfileModel =mongoose.models.UserProfile ||mongoose.model("UserProfile", userProfileSchema);

export default userProfileModel;