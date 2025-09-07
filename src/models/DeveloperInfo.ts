import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  portfolio: string;
}

export interface IDeveloperInfo extends Document {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  social: SocialLinks;
  avatar: string;
  updated_at: Date;
}

const socialSchema = new Schema<SocialLinks>({
  github: String,
  linkedin: String,
  twitter: String,
  portfolio: String
}, { _id: false });

const schema = new Schema<IDeveloperInfo>({
  id: { type: String, default: uuidv4, unique: true },
  name: String,
  title: String,
  subtitle: String,
  bio: String,
  location: String,
  email: String,
  phone: String,
  social: socialSchema,
  avatar: String,
  updated_at: { type: Date, default: Date.now }
});

schema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default mongoose.model<IDeveloperInfo>('DeveloperInfo', schema);