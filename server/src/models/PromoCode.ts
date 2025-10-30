import mongoose, { Document, Schema } from 'mongoose';

export interface IPromoCode extends Document {
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  active: boolean;
  minPurchase?: number;
}

const PromoCodeSchema = new Schema<IPromoCode>({
  code: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, enum: ['percentage', 'flat'], required: true },
  value: { type: Number, required: true },
  active: { type: Boolean, default: true },
  minPurchase: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model<IPromoCode>('PromoCode', PromoCodeSchema);
