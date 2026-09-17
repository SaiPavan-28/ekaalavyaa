import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as student360Service from '../services/student360Service';

export const getOverview = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    const overview = await student360Service.getStudent360Overview(req.user!.userId, studentId);
    return sendSuccess(res, overview);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_MENTEE') return sendError(res, 'FORBIDDEN', 'Student not assigned to you', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
