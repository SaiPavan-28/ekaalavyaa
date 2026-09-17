import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as sessionService from '../services/sessionService';

export const createSession = async (req: AuthRequest, res: Response) => {
  try {
    const session = await sessionService.createSession(req.user!.userId, req.body);
    return sendSuccess(res, session, 201);
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED_MENTEE') return sendError(res, 'FORBIDDEN', 'Student not assigned to you', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getSessions = async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await sessionService.getSessions(req.user!.userId);
    return sendSuccess(res, sessions);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getSessionById = async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = await sessionService.getSessionById(req.user!.userId, sessionId);
    return sendSuccess(res, session);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND_OR_UNAUTHORIZED') return sendError(res, 'NOT_FOUND', 'Session not found', 404);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const updateSession = async (req: AuthRequest, res: Response) => {
  try {
    const { sessionId } = req.params;
    const session = await sessionService.updateSession(req.user!.userId, sessionId, req.body);
    return sendSuccess(res, session);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND_OR_UNAUTHORIZED') return sendError(res, 'NOT_FOUND', 'Session not found', 404);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
