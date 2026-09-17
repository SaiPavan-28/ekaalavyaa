import { Class, Enrollment } from '../models/SharedStubs';
import { StudentProfile } from '../models/StudentProfile';

export const getTeacherClasses = async (teacherId: string) => {
  return await Class.find({ teacherId });
};

export const getClassById = async (teacherId: string, classId: string) => {
  const classDoc = await Class.findOne({ _id: classId, teacherId });
  if (!classDoc) throw new Error('NOT_FOUND_OR_UNAUTHORIZED');
  return classDoc;
};

export const getClassStudents = async (teacherId: string, classId: string) => {
  const classDoc = await Class.findOne({ _id: classId, teacherId });
  if (!classDoc) throw new Error('NOT_FOUND_OR_UNAUTHORIZED');

  const enrollments = await Enrollment.find({ classId }).populate('studentId', 'name email');
  return enrollments.map(e => e.studentId);
};

export const getStudentDetails = async (teacherId: string, studentId: string) => {
  // Check if student is in ANY of the teacher's classes
  const classes = await Class.find({ teacherId });
  const classIds = classes.map(c => c._id);

  const enrollment = await Enrollment.findOne({ studentId, classId: { $in: classIds } });
  if (!enrollment) throw new Error('NOT_FOUND_OR_UNAUTHORIZED');

  return await StudentProfile.findOne({ userId: studentId }).populate('userId', 'name email');
};
