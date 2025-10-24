import { Request, Response } from "express";
import ContactMessage from "../models/ContactMessage.js";
import { contactSchema } from "../validators/contact.js";

export const createContactMessage = async (req: Request, res: Response) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      issues: result.error.issues,
    });
  }

  try {
    const contact = new ContactMessage(result.data);
    const saved = await contact.save();
    return res.status(201).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      id: saved.id,
    });
  } catch (error: any) {
    console.error(`Error saving contact: ${error.message}`);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};
