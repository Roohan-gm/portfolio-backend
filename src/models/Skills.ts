import mongoose, { Document, Schema } from "mongoose";

// Define skill categories as a union type for type safety
export const SKILL_CATEGORIES = [
  "Frameworks/Libraries",
  "Developer Tools",
  "Devops",
  "Database",
  "Languages",
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export interface ISkillGroup {
  category: SkillCategory;
  name: string;
  level?: number; // 1-5 or 1-10 (optional proficiency)
  years?: number; // optional experience duration
}

const skillsSchema = new Schema<ISkillGroup>(
  {
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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Ensure updated_at is always current
skillsSchema.pre("save", function (this: Document, next) {
  // set the timestamp field that matches schema option 'updatedAt' name
  this.set("updated_at", new Date());
  next();
});

// Index for efficient category-based queries
skillsSchema.index({ "skills.category": 1 });

export default mongoose.model("Skills", skillsSchema);
