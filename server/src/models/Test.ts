import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  duration?: number;
  totalMarks?: number;
  questions: any[];
  createdBy: mongoose.Types.ObjectId;
  startTime?: Date;
  endTime?: Date;
}

const testSchema = new Schema<ITest>({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number },
  totalMarks: { type: Number },
  questions: [{ type: Schema.Types.Mixed }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date },
  endTime: { type: Date }
});

export const Test = mongoose.model<ITest>('TestModel', testSchema, 'tests');
