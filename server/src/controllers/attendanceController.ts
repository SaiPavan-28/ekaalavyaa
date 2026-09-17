import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as attendanceService from '../services/attendanceService';

export const markAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { classId } = req.params;
    const { date, records } = req.body;
    const result = await attendanceService.markAttendance(req.user!.userId, classId, date, records);
    return sendSuccess(res, result, 201);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_CLASS') {
      return sendError(res, 'FORBIDDEN', 'You do not have permission for this class', 403);
    }
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { classId } = req.params;
    const records = await attendanceService.getAttendance(req.user!.userId, classId);
    return sendSuccess(res, records);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_CLASS') {
      return sendError(res, 'FORBIDDEN', 'You do not have permission for this class', 403);
    }
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const updateAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const { attendanceId } = req.params;
    const { status } = req.body;
    const record = await attendanceService.updateAttendanceRecord(req.user!.userId, attendanceId, status);
    return sendSuccess(res, record);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_CLASS') return sendError(res, 'FORBIDDEN', 'Unauthorized', 403);
    if (error.message === 'NOT_FOUND') return sendError(res, 'NOT_FOUND', 'Record not found', 404);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
