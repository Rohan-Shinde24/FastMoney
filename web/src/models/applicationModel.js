import mongoose, { Schema } from 'mongoose';

const applicationSchema = new Schema(
  {
    workId: { 
      type: Schema.Types.ObjectId, 
      ref: 'Work', 
      required: true,
      index: true
    },
    applicantId: { 
      type: Schema.Types.ObjectId, 
      ref: 'UserProfile', 
      required: true,
      index: true
    },
    status: { 
      type: String, 
      enum: ['PENDING', 'ACCEPTED', 'REJECTED'], 
      default: 'PENDING' 
    },
    proposal: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { 
    timestamps: true 
  }
);

applicationSchema.index({ workId: 1, applicantId: 1 }, { unique: true });

const applicationModel = mongoose.models.Application || mongoose.model('Application', applicationSchema);
export default applicationModel;
