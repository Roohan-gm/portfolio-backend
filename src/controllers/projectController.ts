import { Request, Response } from 'express';
import Project from '../models/Project.ts';

export const getProjects = async (req: Request, res: Response) => {
  const { category, status, limit } = req.query;

  const filter: { category?: string; status?: string } = {};
  if (typeof category === 'string' && category !== 'All') {
    filter.category = category;
  }
  if (typeof status === 'string') {
    filter.status = status;
  }

  const limitNum = typeof limit === 'string' ? parseInt(limit, 10) : 20;

  try {
    const projects = await Project.find(filter).sort({ order: 1 }).limit(limitNum);
    res.json(projects);
  } catch (error: any) {
    console.error(`Fetch projects: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    // ⚠️ FIX: Use _id instead of id (MongoDB uses _id)
    const project = await Project.findById(req.params.project_id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error: any) {
    console.error(`Fetch project: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};