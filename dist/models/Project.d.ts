import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
