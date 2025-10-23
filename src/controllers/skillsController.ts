import { Request, Response } from 'express';
import Skills from '../models/Skills.ts';

export const getSkills = async (_: Request, res: Response) => {
  try {
    const data = await Skills.find();
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (error: any) {
    console.error(`Fetch skills: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
};