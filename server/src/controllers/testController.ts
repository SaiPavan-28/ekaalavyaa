import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { sendSuccess, sendError } from '../utils/response';
import * as testService from '../services/testService';

export const getTests = async (req: AuthRequest, res: Response) => {
  try {
    const tests = await testService.getTests(req.user!.userId);
    return sendSuccess(res, tests);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getTestById = async (req: AuthRequest, res: Response) => {
  try {
    const { testId } = req.params;
    const test = await testService.getTestById(testId);
    if (!test) {
      return sendError(res, 'NOT_FOUND', 'Test not found', 404);
    }
    return sendSuccess(res, test);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const submitTest = async (req: AuthRequest, res: Response) => {
  try {
    const { testId } = req.params;
    const { answers } = req.body;
    
    const test = await testService.getTestById(testId);
    if (!test) {
      return sendError(res, 'NOT_FOUND', 'Test not found', 404);
    }

    const attempt = await testService.submitTest(req.user!.userId, testId, answers);
    return sendSuccess(res, attempt, 201);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getResults = async (req: AuthRequest, res: Response) => {
  try {
    const results = await testService.getResults(req.user!.userId);
    return sendSuccess(res, results);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const createTeacherTest = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const test = await testService.createTest(req.user!.userId, courseId, req.body);
    return sendSuccess(res, test, 201);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getTeacherTests = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.params;
    const tests = await testService.getTeacherTests(req.user!.userId, courseId);
    return sendSuccess(res, tests);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getTeacherTestSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const { testId } = req.params;
    const submissions = await testService.getTestSubmissions(req.user!.userId, testId);
    return sendSuccess(res, submissions);
  } catch (error: any) {
    if (error.message === 'NOT_FOUND_OR_UNAUTHORIZED') {
      return sendError(res, 'FORBIDDEN', 'Unauthorized or not found', 403);
    }
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};
