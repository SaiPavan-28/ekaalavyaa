import mongoose, { Schema, Document } from 'mongoose';

export interface IOpportunity extends Document {
  type: 'UNIVERSITY_PROGRAM' | 'COURSE' | 'FELLOWSHIP';
  universityId?: mongoose.Types.ObjectId;
  courseName?: string;
  title: string;
  description?: string;
  eligibility?: string;
  deadline?: Date;
  applicationUrl?: string;
  status: 'ACTIVE' | 'CLOSED';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const opportunitySchema = new Schema<IOpportunity>({
  type: { type: String, enum: ['UNIVERSITY_PROGRAM', 'COURSE', 'FELLOWSHIP'], required: true },
  universityId: { type: Schema.Types.ObjectId, ref: 'University' },
  courseName: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  eligibility: { type: String },
  deadline: { type: Date },
  applicationUrl: { type: String },
  status: { type: String, enum: ['ACTIVE', 'CLOSED'], default: 'ACTIVE' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Opportunity = mongoose.model<IOpportunity>('Opportunity', opportunitySchema);
