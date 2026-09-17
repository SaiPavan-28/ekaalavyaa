import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

export const createRecommendationSchema = z.object({
  params: z.object({
    studentId: objectIdSchema,
  }),
  body: z.object({
    opportunityId: objectIdSchema,
    reason: z.string().min(1),
  }),
});
