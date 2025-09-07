import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const skillsSchema = new Schema({
    id: { type: String, default: uuidv4, unique: true },
    primary: [{ type: String }],
    mobile: [{ type: String }],
    backend: [{ type: String }],
    tools: [{ type: String }],
    updated_at: { type: Date, default: Date.now }
}, {
    timestamps: false
});
skillsSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
export default mongoose.model('Skills', skillsSchema);
//# sourceMappingURL=Skills.js.map