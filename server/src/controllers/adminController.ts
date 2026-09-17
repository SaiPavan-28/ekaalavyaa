import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import * as adminService from '../services/adminService';

// Generic handler wrapper to reduce boilerplate
const handleReq = (fn: Function) => async (req: Request, res: Response) => {
  try {
    const result = await fn(req);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, 'INTERNAL_ERROR', 'An error occurred', 500);
  }
};

export const getUsers = handleReq(() => adminService.getUsers());
export const getUserById = handleReq((req: Request) => adminService.getUserById(req.params.userId));
export const updateUserStatus = handleReq((req: Request) => adminService.updateUserStatus(req.params.userId, req.body.isActive));

export const createCourse = handleReq((req: Request) => adminService.createCourse({ ...req.body, createdBy: (req as any).user.userId }));
export const getCourses = handleReq(() => adminService.getCourses());
export const getCourseById = handleReq((req: Request) => adminService.getCourseById(req.params.courseId));
export const updateCourse = handleReq((req: Request) => adminService.updateCourse(req.params.courseId, req.body));
export const deleteCourse = handleReq((req: Request) => adminService.deleteCourse(req.params.courseId));

export const createClass = handleReq((req: Request) => adminService.createClass(req.body));
export const getClasses = handleReq(() => adminService.getClasses());
export const getClassById = handleReq((req: Request) => adminService.getClassById(req.params.classId));
export const updateClass = handleReq((req: Request) => adminService.updateClass(req.params.classId, req.body));
export const assignTeacher = handleReq((req: Request) => adminService.assignTeacher(req.params.classId, req.body.teacherId));
export const enrollStudents = handleReq((req: Request) => adminService.enrollStudents(req.params.classId, req.body.studentIds));

export const createUniversity = handleReq((req: Request) => adminService.createUniversity(req.body));
export const getUniversities = handleReq(() => adminService.getUniversities());
export const updateUniversity = handleReq((req: Request) => adminService.updateUniversity(req.params.universityId, req.body));
export const deleteUniversity = handleReq((req: Request) => adminService.deleteUniversity(req.params.universityId));

export const createOpportunity = handleReq((req: Request) => adminService.createOpportunity({ ...req.body, createdBy: (req as any).user.userId }));
export const getOpportunities = handleReq(() => adminService.getOpportunities());
export const updateOpportunity = handleReq((req: Request) => adminService.updateOpportunity(req.params.opportunityId, req.body));
export const deleteOpportunity = handleReq((req: Request) => adminService.deleteOpportunity(req.params.opportunityId));

export const assignMentor = handleReq((req: Request) => adminService.assignMentor(req.params.studentId, req.body.mentorId));
