import mongoose, { Document } from 'mongoose';
import { ContactStatus } from '../types';
export interface IContactMessage extends Document {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: ContactStatus;
    created_at: Date;
    updated_at: Date;
}
declare const _default: mongoose.Model<IContactMessage, {}, {}, {}, mongoose.Document<unknown, {}, IContactMessage, {}, {}> & IContactMessage & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
