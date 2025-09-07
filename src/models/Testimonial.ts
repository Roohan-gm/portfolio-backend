import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ITestimonial extends Document {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  avatar: string;
  order: number;
}

const testimonialSchema = new Schema<ITestimonial>({
  id: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  avatar: { type: String, required: true },
  order: { type: Number, default: 0 }
});

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);