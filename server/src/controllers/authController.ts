import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    return sendSuccess(res, user, 201);
  } catch (error: any) {
    if (error.message === 'EMAIL_EXISTS') return sendError(res, 'CONFLICT', 'Email already in use', 409);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return sendSuccess(res, result);
  } catch (error: any) {
    if (error.message === 'INVALID_CREDENTIALS') return sendError(res, 'UNAUTHORIZED', 'Invalid credentials', 401);
    if (error.message === 'USER_INACTIVE') return sendError(res, 'FORBIDDEN', 'User is inactive', 403);
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await authService.getMe(req.user!.userId);
    return sendSuccess(res, user);
  } catch (error: any) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const logout = async (req: Request, res: Response) => {
  // Stateless JWT logic implies client discards the token.
  return sendSuccess(res, { message: 'Logged out successfully' });
};
