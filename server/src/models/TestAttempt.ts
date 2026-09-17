import mongoose, { Schema, Document } from 'mongoose';

export interface ITestAttempt extends Document {
  testId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  answers: any[];
  score?: number;
  startedAt: Date;
  submittedAt?: Date;
}

const testAttemptSchema = new Schema<ITestAttempt>({
  testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{ type: Schema.Types.Mixed }],
  score: { type: Number },
  startedAt: { type: Date, default: Date.now },
  submittedAt: { type: Date },
});

export const TestAttempt = mongoose.model<ITestAttempt>('TestAttempt', testAttemptSchema);
