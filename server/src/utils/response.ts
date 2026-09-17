import { Response } from 'express';

interface SuccessResponse {
  success: true;
  data: any;
}

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export const sendSuccess = (res: Response, data: any, statusCode = 200) => {
  const response: SuccessResponse = {
    success: true,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (res: Response, code: string, message: string, statusCode = 500) => {
  const response: ErrorResponse = {
    success: false,
    error: {
      code,
      message,
    },
  };
  return res.status(statusCode).json(response);
};
