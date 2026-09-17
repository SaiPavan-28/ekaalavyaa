import { z } from 'zod';
import mongoose from 'mongoose';

// Custom validator for MongoDB ObjectId
const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const updateProfileSchema = z.object({
  body: z.object({
    dateOfBirth: z.string().datetime().optional(),
    school: z.string().optional(),
    grade: z.string().optional(),
    interests: z.array(z.string()).optional(),
    careerGoals: z.array(z.string()).optional(),
    // Note: academicScore is not allowed to be modified directly by the student
  }),
});

export const submitAssignmentSchema = z.object({
  params: z.object({
    assignmentId: objectIdSchema,
  }),
  body: z.object({
    submissionUrl: z.string().url('Must be a valid URL'),
  }),
});

export const submitTestSchema = z.object({
  params: z.object({
    testId: objectIdSchema,
  }),
  body: z.object({
    answers: z.array(z.any()),
  }),
});

export const readNotificationSchema = z.object({
  params: z.object({
    notificationId: objectIdSchema,
  }),
});
