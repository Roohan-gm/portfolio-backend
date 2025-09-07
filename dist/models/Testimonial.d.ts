import mongoose, { Document } from 'mongoose';
export interface ITestimonial extends Document {
    id: string;
    name: string;
    title: string;
    company: string;
    content: string;
    avatar: string;
    order: number;
}
declare const _default: mongoose.Model<ITestimonial, {}, {}, {}, mongoose.Document<unknown, {}, ITestimonial, {}, {}> & ITestimonial & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
