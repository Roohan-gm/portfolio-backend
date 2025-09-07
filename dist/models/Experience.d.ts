import mongoose, { Document } from 'mongoose';
export interface IExperience extends Document {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
    order: number;
}
declare const _default: mongoose.Model<IExperience, {}, {}, {}, mongoose.Document<unknown, {}, IExperience, {}, {}> & IExperience & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
