import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const socialSchema = new Schema({
    github: String,
    linkedin: String,
    twitter: String,
    portfolio: String
}, { _id: false });
const schema = new Schema({
    id: { type: String, default: uuidv4, unique: true },
    name: String,
    title: String,
    subtitle: String,
    bio: String,
    location: String,
    email: String,
    phone: String,
    social: socialSchema,
    avatar: String,
    updated_at: { type: Date, default: Date.now }
});
schema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
export default mongoose.model('DeveloperInfo', schema);
//# sourceMappingURL=DeveloperInfo.js.map