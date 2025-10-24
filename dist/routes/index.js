import express from 'express';
import { createContactMessage, } from '../controllers/contactController.js';
import { getDeveloperInfo } from '../controllers/developerController.js';
import { getProjects, getProjectById, } from '../controllers/projectController.js';
import { getSkills } from '../controllers/skillsController.js';
import { getExperience } from '../controllers/experienceController.js';
import { getTestimonials } from '../controllers/testimonialController.js';
import { getContactAnalytics } from '../controllers/analyticsController.js';
const router = express.Router();
router.get('/', (_req, res) => {
    res.json({ message: 'Portfolio API is running', version: '1.0.0' });
});
router.post('/contact', createContactMessage);
router.get('/developer', getDeveloperInfo);
router.get('/projects', getProjects);
router.get('/projects/:project_id', getProjectById);
router.get('/skills', getSkills);
router.get('/experiences', getExperience);
router.get('/testimonials', getTestimonials);
router.get('/analytics/contacts', getContactAnalytics);
export default router;
//# sourceMappingURL=index.js.map