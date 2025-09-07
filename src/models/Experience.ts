import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IExperience extends Document {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  order: number;
}

const experienceSchema = new Schema<IExperience>({
  id: { type: String, default: uuidv4, unique: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, required: true },
  achievements: [{ type: String }],
  order: { type: Number, default: 0 }
});

export default mongoose.model<IExperience>('Experience', experienceSchema);