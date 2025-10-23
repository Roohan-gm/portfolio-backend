import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  role: 'admin' | 'user';
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

const User = model<IUser>('User', userSchema);
export default User;