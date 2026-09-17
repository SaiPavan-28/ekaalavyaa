import mongoose, { Schema, Document } from 'mongoose';

// User Stub
export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  passwordHash: string;
}
const userSchema = new Schema({
  name: String,
  email: String,
  role: String,
  passwordHash: String,
});
export const User = mongoose.model<IUser>('User', userSchema);

// Course Stub
export interface ICourse extends Document {
  title: string;
}
export const Course = mongoose.model<ICourse>('Course', new Schema({ title: String }));

// Assignment Stub
export interface IAssignment extends Document {
  title: string;
  courseId: mongoose.Types.ObjectId;
}
export const Assignment = mongoose.model<IAssignment>('Assignment', new Schema({ title: String, courseId: Schema.Types.ObjectId }));

// Test Stub
export interface ITest extends Document {
  title: string;
}
export const Test = mongoose.model<ITest>('Test', new Schema({ title: String }));

// Opportunity Stub
export interface IOpportunity extends Document {
  title: string;
}
export const Opportunity = mongoose.model<IOpportunity>('Opportunity', new Schema({ title: String }));

// Class Stub
export interface IClass extends Document {
  name: string;
  teacherId: mongoose.Types.ObjectId;
}
export const Class = mongoose.model<IClass>('Class', new Schema({ name: String, teacherId: Schema.Types.ObjectId }));

// Enrollment Stub
export interface IEnrollment extends Document {
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
}
export const Enrollment = mongoose.model<IEnrollment>('Enrollment', new Schema({ studentId: Schema.Types.ObjectId, classId: Schema.Types.ObjectId }));
