import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as studentService from '../services/studentService';
import { User } from '../models/SharedStubs';

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId).select('-passwordHash');
    if (!user) {
      return sendError(res, 'NOT_FOUND', 'User not found', 404);
    }
    return sendSuccess(res, user);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await studentService.getStudentProfile(req.user!.userId);
    if (!profile) {
      return sendError(res, 'NOT_FOUND', 'Profile not found', 404);
    }
    return sendSuccess(res, profile);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await studentService.updateStudentProfile(req.user!.userId, req.body);
    return sendSuccess(res, profile);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getCourses = async (req: AuthRequest, res: Response) => {
  try {
    const courses = await studentService.getStudentCourses(req.user!.userId);
    return sendSuccess(res, courses);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getProgress = async (req: AuthRequest, res: Response) => {
  try {
    // Stub implementation for progress
    return sendSuccess(res, { progress: 50 });
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await studentService.getStudentNotifications(req.user!.userId);
    return sendSuccess(res, notifications);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
