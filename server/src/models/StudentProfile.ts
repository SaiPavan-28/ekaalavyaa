import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProfile extends Document {
  userId: mongoose.Types.ObjectId;
  dateOfBirth: Date;
  school: string;
  grade: string;
  academicScore: number;
  interests: string[];
  careerGoals: string[];
  createdAt: Date;
  updatedAt: Date;
}

const studentProfileSchema = new Schema<IStudentProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfBirth: { type: Date },
    school: { type: String },
    grade: { type: String },
    academicScore: { type: Number },
    interests: [{ type: String }],
    careerGoals: [{ type: String }],
  },
  { timestamps: true }
);

export const StudentProfile = mongoose.model<IStudentProfile>('StudentProfile', studentProfileSchema);
