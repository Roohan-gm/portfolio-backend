import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial.js';

export const getTestimonials = async (_: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json(testimonials);
  } catch (error: any) {
    console.error(`Fetch testimonials: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch testimonials' });
  }
};