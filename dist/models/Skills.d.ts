import mongoose, { Document } from 'mongoose';
export interface ISkills extends Document {
    id: string;
    primary: string[];
    mobile: string[];
    backend: string[];
    tools: string[];
    updated_at: Date;
}
declare const _default: mongoose.Model<ISkills, {}, {}, {}, mongoose.Document<unknown, {}, ISkills, {}, {}> & ISkills & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
