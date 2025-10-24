import mongoose, { Schema } from 'mongoose';
const testimonialSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    title: {
        type: String,
        required: [true, 'Title/Role is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    company: {
        type: String,
        required: [true, 'Company is required'],
        trim: true,
        maxlength: [100, 'Company name too long']
    },
    content: {
        type: String,
        required: [true, 'Testimonial content is required'],
        trim: true,
        minlength: [20, 'Content is too short'],
        maxlength: [500, 'Content cannot exceed 500 characters']
    },
    avatar: {
        type: String,
        required: [true, 'Avatar URL is required'],
        validate: {
            validator: (v) => {
                try {
                    new URL(v);
                    return true;
                }
                catch {
                    return false;
                }
            },
            message: 'Avatar must be a valid URL'
        }
    },
    order: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Order must be non-negative']
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
testimonialSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
testimonialSchema.index({ order: 1 });
export default mongoose.model('Testimonial', testimonialSchema);
//# sourceMappingURL=Testimonial.js.map