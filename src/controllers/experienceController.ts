import { Request, Response } from 'express';
import Experience from '../models/Experience.js';

export const getExperience = async (_: Request, res: Response) => {
  try {
    const exp = await Experience.find().sort({ order: 1 });
    res.json(exp);
  } catch (error: any) {
    console.error(`Fetch experience: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch experience' });
  }
};