import mongoose, { Schema, Document } from 'mongoose';

export interface IUniversity extends Document {
  name: string;
  description?: string;
  location?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

const universitySchema = new Schema<IUniversity>({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  website: { type: String },
}, { timestamps: true });

export const University = mongoose.model<IUniversity>('University', universitySchema);
