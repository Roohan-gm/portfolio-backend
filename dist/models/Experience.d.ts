import mongoose, { Document } from 'mongoose';
export interface IExperience extends Document {
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
    order: number;
    created_at: Date;
    updated_at: Date;
}
declare const _default: mongoose.Model<IExperience, {}, {}, {}, mongoose.Document<unknown, {}, IExperience, {}, {}> & IExperience & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
