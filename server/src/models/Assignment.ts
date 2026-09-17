import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignment extends Document {
  classId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  deadline?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const assignmentSchema = new Schema<IAssignment>({
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Since the student module created an Assignment stub in SharedStubs.ts,
// we create the actual model here. Make sure we don't accidentally overwrite the stub
// if it's already compiled, but we can just use this as the single source of truth for assignments.

export const Assignment = mongoose.model<IAssignment>('AssignmentModel', assignmentSchema, 'assignments');
