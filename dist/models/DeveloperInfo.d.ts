import mongoose, { Document } from "mongoose";
export interface ISocialLink {
    name: string;
    url: string;
}
export interface IStats {
    yearsExperience: number;
    productsShipped: number;
    activeUsers: number;
    averageRating: number;
}
export interface IDeveloperInfo extends Document {
    name: string;
    title: string;
    subtitle: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    social: ISocialLink[];
    avatar: string;
    resumeUrl: string;
    stats: IStats;
    availability: boolean;
    created_at: Date;
    updated_at: Date;
}
declare const _default: mongoose.Model<IDeveloperInfo, {}, {}, {}, mongoose.Document<unknown, {}, IDeveloperInfo, {}, {}> & IDeveloperInfo & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
