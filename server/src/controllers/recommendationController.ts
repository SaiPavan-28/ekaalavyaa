import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as recommendationService from '../services/recommendationService';

export const createRecommendation = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    const recommendation = await recommendationService.createRecommendation(req.user!.userId, studentId, req.body);
    return sendSuccess(res, recommendation, 201);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_MENTEE') return sendError(res, 'FORBIDDEN', 'Student not assigned to you', 403);
    if (error.message === 'NOT_FOUND_OPPORTUNITY') return sendError(res, 'NOT_FOUND', 'Opportunity not found', 404);
    if (error.message === 'DUPLICATE_RECOMMENDATION') return sendError(res, 'CONFLICT', 'Recommendation already exists', 409);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getRecommendations = async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    const recommendations = await recommendationService.getRecommendations(req.user!.userId, studentId);
    return sendSuccess(res, recommendations);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_MENTEE') return sendError(res, 'FORBIDDEN', 'Student not assigned to you', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
