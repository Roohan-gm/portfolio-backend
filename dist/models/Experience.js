import mongoose, { Schema } from 'mongoose';
const experienceSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        maxlength: [100, 'Company name too long']
    },
    period: {
        type: String,
        required: [true, 'Employment period is required'],
        trim: true,
        maxlength: [50, 'Period format too long']
    },
    description: {
        type: String,
        required: [true, 'Role description is required'],
        trim: true,
        minlength: [20, 'Description is too short'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    achievements: {
        type: [{
                type: String,
                trim: true,
                maxlength: [200, 'Achievement too long']
            }],
        default: [],
        validate: {
            validator: (arr) => arr.every(str => str.trim().length > 0),
            message: 'Achievements must not contain empty strings'
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
experienceSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
experienceSchema.index({ order: 1 });
export default mongoose.model('Experience', experienceSchema);
//# sourceMappingURL=Experience.js.map