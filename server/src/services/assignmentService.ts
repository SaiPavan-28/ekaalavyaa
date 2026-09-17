import { Assignment } from '../models/Assignment';
import { AssignmentSubmission } from '../models/AssignmentSubmission';
import { Class } from '../models/SharedStubs';

export const createAssignment = async (teacherId: string, classId: string, data: any) => {
  const classDoc = await Class.findOne({ _id: classId, teacherId });
  if (!classDoc) throw new Error('UNAUTHORIZED_CLASS');

  const assignment = new Assignment({ ...data, classId, createdBy: teacherId });
  return await assignment.save();
};

export const getAssignments = async (teacherId: string, classId: string) => {
  const classDoc = await Class.findOne({ _id: classId, teacherId });
  if (!classDoc) throw new Error('UNAUTHORIZED_CLASS');

  return await Assignment.find({ classId });
};

export const getSubmissions = async (teacherId: string, assignmentId: string) => {
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) throw new Error('NOT_FOUND');

  const classDoc = await Class.findOne({ _id: assignment.classId, teacherId });
  if (!classDoc) throw new Error('UNAUTHORIZED_CLASS');

  return await AssignmentSubmission.find({ assignmentId }).populate('studentId', 'name');
};

export const gradeSubmission = async (teacherId: string, submissionId: string, marks: number, feedback: string) => {
  const submission = await AssignmentSubmission.findById(submissionId);
  if (!submission) throw new Error('NOT_FOUND');

  const assignment = await Assignment.findById(submission.assignmentId);
  if (!assignment) throw new Error('NOT_FOUND');

  const classDoc = await Class.findOne({ _id: assignment.classId, teacherId });
  if (!classDoc) throw new Error('UNAUTHORIZED_CLASS');

  submission.marks = marks;
  submission.feedback = feedback;
  return await submission.save();
};
