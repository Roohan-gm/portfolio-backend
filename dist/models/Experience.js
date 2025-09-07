import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const experienceSchema = new Schema({
    id: { type: String, default: uuidv4, unique: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    achievements: [{ type: String }],
    order: { type: Number, default: 0 }
});
export default mongoose.model('Experience', experienceSchema);
//# sourceMappingURL=Experience.js.map