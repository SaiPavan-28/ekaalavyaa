import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  enrolledAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  enrolledAt: { type: Date, default: Date.now },
});

enrollmentSchema.index({ studentId: 1, classId: 1 }, { unique: true });

export const Enrollment = mongoose.model<IEnrollment>('Enrollment', enrollmentSchema);
