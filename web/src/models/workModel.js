import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
      index: true,
    },

    skillsRequired: {
      type: [String],
      default: [],
    },
    
      payment: {
      amount: {
        type: Number,
          required: function () {
            return this.payment?.type === "fixed" || this.payment?.type === "hourly";
          },
        min: 0,
      },

      currency: {
        type: String,
        default: "INR",
      },

      type: {
        type: String,
        enum: ["fixed", "hourly", "negotiable", "unpaid"],
        default: "fixed",
      },
    },

    scoreReward: {
      type: Number,
      required: true,
      min: 1,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    workType: {
      type: String,
      enum: ["remote", "onsite", "hybrid"],
      default: "remote",
    },

    location: {
      city: { type: String, default: "" },
      state: { type: String, default: "" },
    },

    deadline: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "open",
        "assigned",
        "in_progress",
        "submitted",
        "completed",
        "cancelled",
      ],
      default: "open",
      index: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

workSchema.index({ status: 1, category: 1, createdAt: -1 });
workSchema.index({ postedBy: 1, createdAt: -1 });

const workModel =mongoose.models.Work ||mongoose.model("Work", workSchema);

export default workModel;