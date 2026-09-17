import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as assignmentService from '../services/assignmentService';

export const createAssignment = async (req: AuthRequest, res: Response) => {
  try {
    const { classId } = req.params;
    const assignment = await assignmentService.createAssignment(req.user!.userId, classId, req.body);
    return sendSuccess(res, assignment, 201);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_CLASS') return sendError(res, 'FORBIDDEN', 'Unauthorized', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getAssignments = async (req: AuthRequest, res: Response) => {
  try {
    const { classId } = req.params;
    const assignments = await assignmentService.getAssignments(req.user!.userId, classId);
    return sendSuccess(res, assignments);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_CLASS') return sendError(res, 'FORBIDDEN', 'Unauthorized', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const { assignmentId } = req.params;
    const submissions = await assignmentService.getSubmissions(req.user!.userId, assignmentId);
    return sendSuccess(res, submissions);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND') return sendError(res, 'NOT_FOUND', 'Not found', 404);
    if (error.message === 'UNAUTHORIZED_CLASS') return sendError(res, 'FORBIDDEN', 'Unauthorized', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const gradeSubmission = async (req: AuthRequest, res: Response) => {
  try {
    const { submissionId } = req.params;
    const { marks, feedback } = req.body;
    const graded = await assignmentService.gradeSubmission(req.user!.userId, submissionId, marks, feedback);
    return sendSuccess(res, graded);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND') return sendError(res, 'NOT_FOUND', 'Not found', 404);
    if (error.message === 'UNAUTHORIZED_CLASS') return sendError(res, 'FORBIDDEN', 'Unauthorized', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
