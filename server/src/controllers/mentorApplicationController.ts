import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import { Application } from '../models/Application';
import { checkMenteeAssigned } from '../services/mentorService';

export const getStudentApplications = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    await checkMenteeAssigned(req.user!.userId, studentId);

    const applications = await Application.find({ studentId }).populate('opportunityId');
    return sendSuccess(res, applications);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_MENTEE') return sendError(res, 'FORBIDDEN', 'Student not assigned', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const updateApplicationStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) return sendError(res, 'NOT_FOUND', 'Not found', 404);

    await checkMenteeAssigned(req.user!.userId, application.studentId.toString());

    application.status = status;
    await application.save();

    return sendSuccess(res, application);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_MENTEE') return sendError(res, 'FORBIDDEN', 'Student not assigned', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
