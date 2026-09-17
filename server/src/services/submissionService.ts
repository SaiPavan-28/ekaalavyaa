import { AssignmentSubmission } from '../models/AssignmentSubmission';
import { Assignment } from '../models/SharedStubs';
import mongoose from 'mongoose';

export const getAssignments = async (userId: string) => {
  // Return all assignments. In reality, filter by enrolled class.
  return await Assignment.find();
};

export const getAssignmentById = async (assignmentId: string) => {
  return await Assignment.findById(assignmentId);
};

export const submitAssignment = async (userId: string, assignmentId: string, submissionUrl: string) => {
  return await AssignmentSubmission.findOneAndUpdate(
    { studentId: userId, assignmentId },
    { $set: { submissionUrl, submittedAt: new Date() } },
    { new: true, upsert: true }
  );
};
