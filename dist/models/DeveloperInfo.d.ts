import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<IDeveloperInfo, {}, {}, {}, mongoose.Document<unknown, {}, IDeveloperInfo, {}, {}> & IDeveloperInfo & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
