import express from 'express';
import {
  createContactMessage,
} from '../controllers/contactController.ts';
import { getDeveloperInfo } from '../controllers/developerController.ts';
import {
  getProjects,
  getProjectById,
} from '../controllers/projectController.ts';
import { getSkills } from '../controllers/skillsController.ts';
import { getExperience } from '../controllers/experienceController.ts';
import { getTestimonials } from '../controllers/testimonialController.ts';
import { getContactAnalytics } from '../controllers/analyticsController.ts';

const router = express.Router();

// Health check
router.get('/', (_req, res) => {
  res.json({ message: 'Portfolio API is running', version: '1.0.0' });
});

// Contact
router.post('/contact', createContactMessage);

// Developer
router.get('/developer', getDeveloperInfo);

// Projects
router.get('/projects', getProjects);
router.get('/projects/:project_id', getProjectById);

// Skills
router.get('/skills', getSkills);

// Experience
router.get('/experiences', getExperience);

// Testimonials
router.get('/testimonials', getTestimonials);

// Analytics
router.get('/analytics/contacts', getContactAnalytics);

export default router;