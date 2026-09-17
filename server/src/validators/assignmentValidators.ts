import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const createAssignmentSchema = z.object({
  params: z.object({
    classId: objectIdSchema,
  }),
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    deadline: z.string().datetime().optional(),
  }),
});

export const gradeSubmissionSchema = z.object({
  params: z.object({
    submissionId: objectIdSchema,
  }),
  body: z.object({
    marks: z.number().min(0),
    feedback: z.string().optional(),
  }),
});
