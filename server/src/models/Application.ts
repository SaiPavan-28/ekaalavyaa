import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  studentId: mongoose.Types.ObjectId;
  opportunityId: mongoose.Types.ObjectId;
  status: 'INTERESTED' | 'PREPARING' | 'APPLIED' | 'OFFER_RECEIVED' | 'NOT_SELECTED';
  appliedAt?: Date;
  offerDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    opportunityId: { type: Schema.Types.ObjectId, ref: 'Opportunity', required: true },
    status: {
      type: String,
      enum: ['INTERESTED', 'PREPARING', 'APPLIED', 'OFFER_RECEIVED', 'NOT_SELECTED'],
      default: 'INTERESTED',
    },
    appliedAt: { type: Date },
    offerDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

// Prevent duplicate applications for the same opportunity by the same student
applicationSchema.index({ studentId: 1, opportunityId: 1 }, { unique: true });

export const Application = mongoose.model<IApplication>('Application', applicationSchema);
