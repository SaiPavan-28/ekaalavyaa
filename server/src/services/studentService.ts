import { StudentProfile } from '../models/StudentProfile';
import { Course } from '../models/SharedStubs';

export const getStudentProfile = async (userId: string) => {
  return await StudentProfile.findOne({ userId }).populate('userId', 'name email role');
};

export const updateStudentProfile = async (userId: string, updateData: any) => {
  // ensure academicScore is not updated
  delete updateData.academicScore;
  
  return await StudentProfile.findOneAndUpdate(
    { userId },
    { $set: updateData },
    { new: true, upsert: true }
  );
};

export const getStudentCourses = async (userId: string) => {
  // In a real scenario, this would query a StudentCourseEnrollment model
  // For the stub, we just return all courses
  return await Course.find();
};

// Assuming notifications are stored in a User model or Notification model
// We will stub this out for now
export const getStudentNotifications = async (userId: string) => {
  return [];
};
