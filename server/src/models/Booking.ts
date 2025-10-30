import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  experienceName: string;
  date: Date;
  time: string;
  quantity: number;
  fullName: string;
  email: string;
  promoCode?: string;
  subtotal: number;
  taxes: number;
  discount: number;
  total: number;
  bookingRef: string;
  status: 'confirmed' | 'cancelled' | 'pending';
}

const BookingSchema = new Schema<IBooking>({
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  experienceName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  promoCode: { type: String },
  subtotal: { type: Number, required: true },
  taxes: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  bookingRef: { type: String, required: true, unique: true },
  status: { type: String, enum: ['confirmed', 'cancelled', 'pending'], default: 'confirmed' }
}, {
  timestamps: true
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
