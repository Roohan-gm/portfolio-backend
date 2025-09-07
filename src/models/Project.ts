import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ProjectStatus } from '../types';

export interface IProject extends Document {
  id: string;
  title: string;
  description: string;
  long_description: string;
  tech_stack: string[];
  features: string[];
  images: string[];
  demo_url: string;
  github_url: string;
  status: ProjectStatus;
  category: string;
  order: number;
  created_at: Date;
  updated_at: Date;
}

const schema = new Schema<IProject>({
  id: { type: String, default: uuidv4, unique: true },
  title: String,
  description: String,
  long_description: String,
  tech_stack: [String],
  features: [String],
  images: [String],
  demo_url: String,
  github_url: String,
  status: { type: String, enum: ['Live', 'In Development', 'Completed'] },
  category: String,
  order: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, {
  timestamps: true
});

schema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model<IProject>('Project', schema);