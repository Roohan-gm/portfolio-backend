import mongoose, { Schema } from "mongoose";
export const SKILL_CATEGORIES = [
    "Frameworks/Libraries",
    "Developer Tools",
    "Devops",
    "Database",
    "Languages",
];
const skillsSchema = new Schema({
    category: {
        type: String,
        enum: SKILL_CATEGORIES,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    level: {
        type: Number,
        min: 1,
        max: 10,
        validate: {
            validator: Number.isInteger,
            message: "Level must be an integer between 1 and 10",
        },
    },
    years: {
        type: Number,
        min: 0,
        max: 50,
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
skillsSchema.pre("save", function (next) {
    this.set("updated_at", new Date());
    next();
});
skillsSchema.index({ "skills.category": 1 });
export default mongoose.model("Skills", skillsSchema);
//# sourceMappingURL=Skills.js.map