import mongoose, { Schema } from "mongoose";
const urlValidator = {
    validator: (v) => {
        try {
            new URL(v);
            return true;
        }
        catch {
            return false;
        }
    },
    message: (props) => `${props.value} is not a valid URL!`,
};
const RepoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    url: {
        type: String,
        required: true,
        validate: urlValidator,
    },
});
const ProjectSchema = new Schema({
    title: {
        type: String,
        required: [true, "Project title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Short description is required"],
        trim: true,
        maxlength: [200, "Description cannot exceed 200 characters"],
    },
    long_description: {
        type: String,
        required: [true, "Long description is required"],
        trim: true,
    },
    tech_stack: {
        type: [String],
        required: [true, "Tech stack is required"],
        validate: [
            (arr) => arr.length > 0,
            "Tech stack must not be empty",
        ],
    },
    features: {
        type: [String],
        required: [true, "Features list is required"],
        validate: [
            (arr) => arr.length > 0,
            "Features must not be empty",
        ],
    },
    images: {
        type: [String],
        required: [true, "At least one image URL is required"],
        validate: {
            validator: (arr) => arr.every((url) => urlValidator.validator(url)),
            message: "All image URLs must be valid",
        },
    },
    demo_url: {
        type: String,
    },
    github_repos: {
        type: [RepoSchema],
        required: [true, "At least one GitHub repo is required"],
        validate: [
            (arr) => arr.length > 0,
            "GitHub repos cannot be empty",
        ],
    },
    status: {
        type: String,
        enum: {
            values: ["Live", "In Development", "Completed"],
            message: "Status must be one of: Live, In Development, Completed",
        },
        required: [true, "Project status is required"],
        default: "Live",
    },
    category: {
        type: String,
        enum: {
            values: ["Web", "Mobile", "Desktop", "API", "Other"],
            message: "Category must be one of: Web, Mobile, Desktop, API, Other",
        },
        required: [true, "Category is required"],
    },
    downloads: {
        type: Number,
        min: [0, "Downloads must be non-negative"],
    },
    rating: {
        type: Number,
        min: [0, "Rating must be at least 0"],
        max: [5, "Rating cannot exceed 5"],
    },
    order: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Order must be non-negative"],
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ order: 1 });
ProjectSchema.index({ created_at: -1 });
ProjectSchema.pre("save", function (next) {
    this.updated_at = new Date();
    next();
});
ProjectSchema.pre("validate", function (next) {
    if (this.demo_url && typeof this.demo_url === "string")
        this.demo_url = this.demo_url.trim();
    if (this.github_repos && Array.isArray(this.github_repos)) {
        this.github_repos = this.github_repos.map((repo) => {
            if (repo && typeof repo.name === "string")
                repo.name = repo.name.trim();
            if (repo && typeof repo.url === "string")
                repo.url = repo.url.trim();
            return repo;
        });
    }
    if (this.images && Array.isArray(this.images))
        this.images = this.images.map((url) => typeof url === "string" ? url.trim() : url);
    next();
});
export default mongoose.model("Project", ProjectSchema);
//# sourceMappingURL=Project.js.map