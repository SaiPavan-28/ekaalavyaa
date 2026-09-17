import mongoose, { Schema, Document } from 'mongoose';

export interface IRecommendation extends Document {
  studentId: mongoose.Types.ObjectId;
  opportunityId: mongoose.Types.ObjectId;
  recommendedBy: mongoose.Types.ObjectId;
  reason: string;
  status: 'ACTIVE' | 'DISMISSED';
  createdAt: Date;
}

const recommendationSchema = new Schema<IRecommendation>({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  opportunityId: { type: Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  recommendedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['ACTIVE', 'DISMISSED'], default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now }
});

recommendationSchema.index({ studentId: 1, opportunityId: 1 }, { unique: true });

export const Recommendation = mongoose.model<IRecommendation>('Recommendation', recommendationSchema);
