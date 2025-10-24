import { Request, Response } from 'express';
import DeveloperInfo from '../models/DeveloperInfo.js';

export const getDeveloperInfo = async (_: Request, res: Response) => {
  try {
    const data = await DeveloperInfo.findOne();
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (error: any) {
    console.error(`Fetch developer: ${error.message}`);
    res.status(500).json({ message: 'Failed' });
  }
};