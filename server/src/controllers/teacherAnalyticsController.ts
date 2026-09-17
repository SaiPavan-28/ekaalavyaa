import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as analyticsService from '../services/analyticsService';
import * as teacherService from '../services/teacherService';

export const getClassAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const { classId } = req.params;
    const analytics = await analyticsService.getClassAnalytics(req.user!.userId, classId);
    return sendSuccess(res, analytics);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_CLASS') return sendError(res, 'FORBIDDEN', 'Unauthorized', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getStudentPerformance = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    // Verify access first
    await teacherService.getStudentDetails(req.user!.userId, studentId);
    
    const performance = await analyticsService.getStudentPerformance(req.user!.userId, studentId);
    return sendSuccess(res, performance);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND_OR_UNAUTHORIZED') return sendError(res, 'FORBIDDEN', 'Unauthorized', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
