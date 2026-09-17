import mongoose, { Schema, Document } from 'mongoose';

export interface IMentorAssignment extends Document {
  mentorId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  assignedAt: Date;
  status: 'ACTIVE' | 'INACTIVE';
}

const mentorAssignmentSchema = new Schema<IMentorAssignment>({
  mentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
});

mentorAssignmentSchema.index({ mentorId: 1, studentId: 1 }, { unique: true });

export const MentorAssignment = mongoose.model<IMentorAssignment>('MentorAssignment', mentorAssignmentSchema);
