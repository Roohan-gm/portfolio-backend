import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const contactSchema = new Schema({
    id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true, minlength: 1, maxlength: 100 },
    email: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    subject: { type: String, required: true, minlength: 1, maxlength: 200 },
    message: { type: String, required: true, minlength: 1, maxlength: 2000 },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {
    timestamps: true
});
contactSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
export default mongoose.model('ContactMessage', contactSchema);
//# sourceMappingURL=ContactMessage.js.map