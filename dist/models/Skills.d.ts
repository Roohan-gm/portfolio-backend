import mongoose from "mongoose";
export declare const SKILL_CATEGORIES: readonly ["Frameworks/Libraries", "Developer Tools", "Devops", "Database", "Languages"];
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];
export interface ISkillGroup {
    category: SkillCategory;
    name: string;
    level?: number;
    years?: number;
}
declare const _default: mongoose.Model<ISkillGroup, {}, {}, {}, mongoose.Document<unknown, {}, ISkillGroup, {}, mongoose.DefaultSchemaOptions> & ISkillGroup & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<ISkillGroup, mongoose.Model<ISkillGroup, any, any, any, mongoose.Document<unknown, any, ISkillGroup, any, {}> & ISkillGroup & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ISkillGroup, mongoose.Document<unknown, {}, mongoose.FlatRecord<ISkillGroup>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<ISkillGroup> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
