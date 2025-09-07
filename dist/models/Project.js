import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const schema = new Schema({
    id: { type: String, default: uuidv4, unique: true },
    title: String,
    description: String,
    long_description: String,
    tech_stack: [String],
    features: [String],
    images: [String],
    demo_url: String,
    github_url: String,
    status: { type: String, enum: ['Live', 'In Development', 'Completed'] },
    category: String,
    order: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {
    timestamps: true
});
schema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
export default mongoose.model('Project', schema);
//# sourceMappingURL=Project.js.map