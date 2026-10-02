import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username:{
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String, required: true
    },
    email: {
      type: String,
      required: true, unique: true
    },
    password: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      default: 0
    },
    isDeleted: {
      type: Boolean,
       default: false 
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
  },
  {
    timestamps: true
  }
);

const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel;
