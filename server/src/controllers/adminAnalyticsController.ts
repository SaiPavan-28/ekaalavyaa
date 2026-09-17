import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Application } from '../models/Application';
import { Attendance } from '../models/Attendance';
import { University } from '../models/University';

export const getOverview = async (req: Request, res: Response) => {
  try {
    const [totalUsers, totalCourses, totalApplications] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Application.countDocuments()
    ]);
    return sendSuccess(res, { totalUsers, totalCourses, totalApplications });
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'Analytics error', 500);
  }
};

export const getStudentsAnalytics = async (req: Request, res: Response) => {
  try {
    const studentsByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    return sendSuccess(res, studentsByRole);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'Analytics error', 500);
  }
};

export const getAttendanceAnalytics = async (req: Request, res: Response) => {
  try {
    const attendanceStats = await Attendance.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    return sendSuccess(res, attendanceStats);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'Analytics error', 500);
  }
};

export const getApplicationsAnalytics = async (req: Request, res: Response) => {
  try {
    const apps = await Application.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    return sendSuccess(res, apps);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'Analytics error', 500);
  }
};

export const getUniversitiesAnalytics = async (req: Request, res: Response) => {
  try {
    const stats = await University.countDocuments();
    return sendSuccess(res, { totalUniversities: stats });
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'Analytics error', 500);
  }
};
