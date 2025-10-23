import mongoose, { Document, Schema } from "mongoose";

// Define a reusable social link interface
export interface ISocialLink {
  name: string; // e.g., "GitHub", "LinkedIn", "Portfolio"
  url: string; // e.g., "https://github.com/..."
}

export interface IStats {
  yearsExperience: number;
  productsShipped: number;
  activeUsers: number; // e.g., "100"
  averageRating: number; // e.g., "4.8"
}

export interface IDeveloperInfo extends Document {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  social: ISocialLink[];
  avatar: string;
  resumeUrl: string;
  stats: IStats;
  availability: boolean;
  created_at: Date;
  updated_at: Date;
}

// URL validator (allows empty strings to be optional)
const urlValidator = {
  validator: (v: string) => {
    if (!v) return true;
    try {
      new URL(v);
      return true;
    } catch {
      return false;
    }
  },
  message: (props: { value: string }) => `${props.value} is not a valid URL!`,
};

const statsSchema = new Schema<IStats>(
  {
    yearsExperience: {
      type: Number,
      required: true,
    },
    productsShipped: {
      type: Number,
      required: true,
    },
    activeUsers: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

// Subdocument schema for social links
const socialLinkSchema = new Schema<ISocialLink>(
  {
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
      trim: true,
    },
  },
  { _id: false }
);

const developerInfoSchema = new Schema<IDeveloperInfo>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name too long"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title too long"],
    },
    subtitle: {
      type: String,
      required: [true, "Subtitle is required"],
      trim: true,
      maxlength: [150, "Subtitle too long"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      trim: true,
      minlength: [50, "Bio too short"],
      maxlength: [1000, "Bio too long"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100, "Location too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      match: [/^(\+92\d{10,12}|03\d{9})$/, "Invalid Pakistani phone"],
    },
    social: {
      type: [socialLinkSchema],
      validate: {
        validator: (arr: ISocialLink[]) => arr.length <= 10, // optional limit
        message: "Too many social links (max 10)",
      },
    },
    resumeUrl: {
      type: String,
      required: [true, "Resume URL is required"],
      validate: urlValidator,
    },
    stats: {
      type: statsSchema,
    },
    avatar: {
      type: String,
      required: [true, "Avatar URL is required"],
      validate: urlValidator,
    },
    availability: {
      type: Boolean,
      required: [true, "Availability is required"],
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Index email for fast lookups
developerInfoSchema.index({ email: 1 });

export default mongoose.model<IDeveloperInfo>(
  "DeveloperInfo",
  developerInfoSchema
);
