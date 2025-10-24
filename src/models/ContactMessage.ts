import mongoose, { Document, Schema } from "mongoose";
import { ContactStatus } from "../types/index.js";
import nodemailer from "nodemailer";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  created_at: Date;
  updated_at: Date;
}

const contactSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [1, "Name cannot be empty"],
      maxlength: [100, "Name is too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      minlength: [1, "Subject cannot be empty"],
      maxlength: [200, "Subject is too long"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message is too short"],
      maxlength: [2000, "Message exceeds 2000 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["new", "read", "replied"],
        message: "Status must be one of: new, read, replied",
      },
      default: "new",
      index: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Auto-update updated_at (redundant with timestamps but safe)
contactSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

contactSchema.post("save", async function (doc) {
  // Only notify on NEW messages
  if (doc.status !== "new") return;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn("Email credentials missing — contact notifications disabled");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Admin" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // e.g., your personal email
      replyTo: doc.email,
      subject: `New Contact Message from ${doc.name}`,
      headers: {
        "X-Mailer": "Portfolio Contact Form",
        Precedence: "bulk",
      },
      html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${doc.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${doc.email}">${
        doc.email
      }</a></p>
          <p><strong>Subject:</strong> ${doc.subject}</p>
          <blockquote>${doc.message}</blockquote>
          <p>Received on: ${doc.created_at.toLocaleString()}</p>
        `,
    });
  } catch (error) {
    console.error("Error sending contact message notification email:", error);
  }
});

// Index for common queries
contactSchema.index({ email: 1, created_at: -1 });
contactSchema.index({ status: 1, created_at: -1 });

export default mongoose.model<IContactMessage>("ContactMessage", contactSchema);
