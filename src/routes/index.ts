import express from 'express';
import {
  createContactMessage,
} from '../controllers/contactController.js';
import { getDeveloperInfo } from '../controllers/developerController.js';
import {
  getProjects,
  getProjectById,
} from '../controllers/projectController.js';
import { getSkills } from '../controllers/skillsController.js';
import { getExperience } from '../controllers/experienceController.js';
import { getTestimonials } from '../controllers/testimonialController.js';
import { getContactAnalytics } from '../controllers/analyticsController.js';

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