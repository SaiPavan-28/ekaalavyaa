import { TestAttempt } from '../models/TestAttempt';
import { Test } from '../models/SharedStubs';

export const getTests = async (userId: string) => {
  return await Test.find();
};

export const getTestById = async (testId: string) => {
  return await Test.findById(testId);
};

export const submitTest = async (userId: string, testId: string, answers: any[]) => {
  // A real system would calculate the score here.
  const score = answers.length * 10; // dummy score
  
  return await TestAttempt.findOneAndUpdate(
    { studentId: userId, testId },
    { $set: { answers, score, submittedAt: new Date() } },
    { new: true, upsert: true }
  );
};

export const getResults = async (userId: string) => {
  return await TestAttempt.find({ studentId: userId }).populate('testId', 'title');
};

export const createTest = async (teacherId: string, courseId: string, data: any) => {
  const test = new Test({ ...data, courseId, createdBy: teacherId });
  return await test.save();
};

export const getTeacherTests = async (teacherId: string, courseId: string) => {
  return await Test.find({ courseId, createdBy: teacherId });
};

export const getTestSubmissions = async (teacherId: string, testId: string) => {
  const test = await Test.findOne({ _id: testId, createdBy: teacherId });
  if (!test) throw new Error('NOT_FOUND_OR_UNAUTHORIZED');
  return await TestAttempt.find({ testId }).populate('studentId', 'name');
};
