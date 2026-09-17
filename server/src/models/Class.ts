import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  courseId: mongoose.Types.ObjectId;
  teacherId?: mongoose.Types.ObjectId;
  name: string;
  batch: string;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const classSchema = new Schema<IClass>({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User' }, // Can be assigned later
  name: { type: String, required: true },
  batch: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
}, { timestamps: true });

export const Class = mongoose.model<IClass>('Class', classSchema);
