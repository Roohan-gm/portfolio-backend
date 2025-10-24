import mongoose, { Document } from "mongoose";
import type { ProjectStatus } from "../types/index.js";
export interface IRepo {
    name: string;
    url: string;
}
export interface IProject extends Document {
    title: string;
    description: string;
    long_description: string;
    tech_stack: string[];
    features: string[];
    images: string[];
    demo_url: string;
    github_repos: IRepo[];
    status: ProjectStatus;
    downloads: number;
    rating: number;
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
