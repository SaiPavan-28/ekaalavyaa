import { User } from '../models/User';
import { Course } from '../models/Course';
import { Class } from '../models/Class';
import { Enrollment } from '../models/Enrollment';
import { University } from '../models/University';
import { Opportunity } from '../models/Opportunity';
import { MentorAssignment } from '../models/MentorAssignment';

// User Management
export const getUsers = async () => User.find().select('-passwordHash');
export const getUserById = async (id: string) => User.findById(id).select('-passwordHash');
export const updateUserStatus = async (id: string, isActive: boolean) => 
  User.findByIdAndUpdate(id, { isActive }, { new: true }).select('-passwordHash');

// Course Management
export const createCourse = async (data: any) => new Course(data).save();
export const getCourses = async () => Course.find();
export const getCourseById = async (id: string) => Course.findById(id);
export const updateCourse = async (id: string, data: any) => Course.findByIdAndUpdate(id, data, { new: true });
export const deleteCourse = async (id: string) => Course.findByIdAndDelete(id);

// Class Management
export const createClass = async (data: any) => new Class(data).save();
export const getClasses = async () => Class.find().populate('courseId').populate('teacherId');
export const getClassById = async (id: string) => Class.findById(id).populate('courseId').populate('teacherId');
export const updateClass = async (id: string, data: any) => Class.findByIdAndUpdate(id, data, { new: true });
export const assignTeacher = async (classId: string, teacherId: string) => 
  Class.findByIdAndUpdate(classId, { teacherId }, { new: true });
export const enrollStudents = async (classId: string, studentIds: string[]) => {
  const ops = studentIds.map(studentId => ({
    updateOne: {
      filter: { classId, studentId },
      update: { $set: { classId, studentId } },
      upsert: true
    }
  }));
  return await Enrollment.bulkWrite(ops);
};

// Universities
export const createUniversity = async (data: any) => new University(data).save();
export const getUniversities = async () => University.find();
export const updateUniversity = async (id: string, data: any) => University.findByIdAndUpdate(id, data, { new: true });
export const deleteUniversity = async (id: string) => University.findByIdAndDelete(id);

// Opportunities
export const createOpportunity = async (data: any) => new Opportunity(data).save();
export const getOpportunities = async () => Opportunity.find().populate('universityId');
export const updateOpportunity = async (id: string, data: any) => Opportunity.findByIdAndUpdate(id, data, { new: true });
export const deleteOpportunity = async (id: string) => Opportunity.findByIdAndDelete(id);

// Mentor Assignment
export const assignMentor = async (studentId: string, mentorId: string) => {
  return await MentorAssignment.findOneAndUpdate(
    { studentId, mentorId },
    { $set: { studentId, mentorId, status: 'ACTIVE' } },
    { upsert: true, new: true }
  );
};
