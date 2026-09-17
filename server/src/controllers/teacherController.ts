import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as teacherService from '../services/teacherService';

export const getClasses = async (req: AuthRequest, res: Response) => {
  try {
    const classes = await teacherService.getTeacherClasses(req.user!.userId);
    return sendSuccess(res, classes);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getClassById = async (req: AuthRequest, res: Response) => {
  try {
    const { classId } = req.params;
    const classDoc = await teacherService.getClassById(req.user!.userId, classId);
    return sendSuccess(res, classDoc);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND_OR_UNAUTHORIZED') return sendError(res, 'FORBIDDEN', 'Unauthorized', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getClassStudents = async (req: AuthRequest, res: Response) => {
  try {
    const { classId } = req.params;
    const students = await teacherService.getClassStudents(req.user!.userId, classId);
    return sendSuccess(res, students);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND_OR_UNAUTHORIZED') return sendError(res, 'FORBIDDEN', 'Unauthorized', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getStudent = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    const student = await teacherService.getStudentDetails(req.user!.userId, studentId);
    return sendSuccess(res, student);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND_OR_UNAUTHORIZED') return sendError(res, 'FORBIDDEN', 'Unauthorized', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
