import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as mentorService from '../services/mentorService';
import { StudentProfile } from '../models/StudentProfile';

export const getMentees = async (req: AuthRequest, res: Response) => {
  try {
    const mentees = await mentorService.getMentees(req.user!.userId);
    return sendSuccess(res, mentees);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getMenteeProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    await mentorService.checkMenteeAssigned(req.user!.userId, studentId);
    
    const profile = await StudentProfile.findOne({ userId: studentId }).populate('userId', 'name email');
    return sendSuccess(res, profile);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_MENTEE') return sendError(res, 'FORBIDDEN', 'Student not assigned to you', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
