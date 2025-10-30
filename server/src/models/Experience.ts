import mongoose, { Document, Schema } from 'mongoose';

export interface ISlot {
  time: string;
  available: number;
  soldOut: boolean;
}

export interface IExperience extends Document {
  title: string;
  location: string;
  description: string;
  image: string;
  price: number;
  tags: string[];
  availableDates: Date[];
  slots: ISlot[];
  about: string;
  minAge?: number;
  included: string[];
}

const SlotSchema = new Schema<ISlot>({
  time: { type: String, required: true },
  available: { type: Number, required: true, default: 10 },
  soldOut: { type: Boolean, default: false }
});

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  tags: [{ type: String }],
  availableDates: [{ type: Date }],
  slots: [SlotSchema],
  about: { type: String },
  minAge: { type: Number },
  included: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
