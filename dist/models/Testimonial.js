import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const testimonialSchema = new Schema({
    id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    content: { type: String, required: true },
    avatar: { type: String, required: true },
    order: { type: Number, default: 0 }
});
export default mongoose.model('Testimonial', testimonialSchema);
//# sourceMappingURL=Testimonial.js.map