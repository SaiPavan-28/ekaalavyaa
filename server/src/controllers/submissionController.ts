import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as submissionService from '../services/submissionService';

export const getAssignments = async (req: AuthRequest, res: Response) => {
  try {
    const assignments = await submissionService.getAssignments(req.user!.userId);
    return sendSuccess(res, assignments);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getAssignmentById = async (req: AuthRequest, res: Response) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await submissionService.getAssignmentById(assignmentId);
    if (!assignment) {
      return sendError(res, 'NOT_FOUND', 'Assignment not found', 404);
    }
    return sendSuccess(res, assignment);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const submitAssignment = async (req: AuthRequest, res: Response) => {
  try {
    const { assignmentId } = req.params;
    const { submissionUrl } = req.body;
    
    // Check if assignment exists
    const assignment = await submissionService.getAssignmentById(assignmentId);
    if (!assignment) {
      return sendError(res, 'NOT_FOUND', 'Assignment not found', 404);
    }

    const submission = await submissionService.submitAssignment(req.user!.userId, assignmentId, submissionUrl);
    return sendSuccess(res, submission, 201);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
