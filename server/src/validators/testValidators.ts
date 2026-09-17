import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const createTestSchema = z.object({
  params: z.object({
    courseId: objectIdSchema,
  }),
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    duration: z.number().min(1).optional(),
    totalMarks: z.number().min(0).optional(),
    questions: z.array(z.any()).optional(),
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
  }),
});
