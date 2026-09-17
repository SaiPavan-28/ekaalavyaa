import mongoose, { Schema, Document } from 'mongoose';

export interface IMentoringSession extends Document {
  mentorId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  scheduledAt: Date;
  agenda: string;
  notes?: string;
  nextAction?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

const mentoringSessionSchema = new Schema<IMentoringSession>({
  mentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledAt: { type: Date, required: true },
  agenda: { type: String, required: true },
  notes: { type: String },
  nextAction: { type: String },
  status: { type: String, enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'], default: 'SCHEDULED' },
}, { timestamps: true });

export const MentoringSession = mongoose.model<IMentoringSession>('MentoringSession', mentoringSessionSchema);
