import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import DeveloperInfo from '../models/DeveloperInfo.js';
import Project from '../models/Project.js';
import Skills from '../models/Skills.js';
import Experience from '../models/Experience.js';
import Testimonial from '../models/Testimonial.js';
import { contactSchema } from '../validators/contact.js';
const router = express.Router();
router.get('/', (req, res) => {
    res.json({ message: 'Portfolio API is running', version: '1.0.0' });
});
router.post('/contact', async (req, res) => {
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
        console.log(`New contact message from ${contact.email}`);
        return res.status(201).json({
            success: true,
            message: "Message sent successfully! I'll get back to you soon.",
            id: saved.id,
        });
    }
    catch (error) {
        console.error(`Error saving contact: ${error.message}`);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});
router.get('/contact', async (req, res) => {
    const { status, limit } = req.query;
    const filter = {};
    if (typeof status === 'string') {
        filter.status = status;
    }
    const limitNum = typeof limit === 'string' ? parseInt(limit, 10) : 50;
    try {
        const contacts = await ContactMessage.find(filter)
            .sort({ created_at: -1 })
            .limit(limitNum);
        res.json(contacts);
    }
    catch (error) {
        console.error(`Fetch contacts: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
});
router.get('/developer', async (req, res) => {
    try {
        const data = await DeveloperInfo.findOne();
        if (!data)
            return res.status(404).json({ message: 'Not found' });
        res.json(data);
    }
    catch (error) {
        console.error(`Fetch developer: ${error.message}`);
        res.status(500).json({ message: 'Failed' });
    }
});
router.get('/projects', async (req, res) => {
    const { category, status, limit } = req.query;
    const filter = {};
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
    }
    catch (error) {
        console.error(`Fetch projects: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch projects' });
    }
});
router.get('/projects/:project_id', async (req, res) => {
    try {
        const project = await Project.findOne({ id: req.params.project_id });
        if (!project)
            return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    }
    catch (error) {
        console.error(`Fetch project: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch project' });
    }
});
router.get('/skills', async (req, res) => {
    try {
        const data = await Skills.findOne();
        if (!data)
            return res.status(404).json({ message: 'Not found' });
        res.json(data);
    }
    catch (error) {
        console.error(`Fetch skills: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch skills' });
    }
});
router.get('/experience', async (req, res) => {
    try {
        const exp = await Experience.find().sort({ order: 1 });
        res.json(exp);
    }
    catch (error) {
        console.error(`Fetch experience: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch experience' });
    }
});
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ order: 1 });
        res.json(testimonials);
    }
    catch (error) {
        console.error(`Fetch testimonials: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch testimonials' });
    }
});
router.get('/analytics/contacts', async (req, res) => {
    try {
        const total = await ContactMessage.countDocuments();
        const newCount = await ContactMessage.countDocuments({ status: 'new' });
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const recent = await ContactMessage.countDocuments({
            created_at: { $gte: weekAgo },
        });
        const responseRate = total > 0 ? (((total - newCount) / total) * 100).toFixed(1) : '0.0';
        res.json({
            total_messages: total,
            new_messages: newCount,
            recent_messages: recent,
            response_rate: `${responseRate}%`,
        });
    }
    catch (error) {
        console.error(`Analytics error: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch analytics' });
    }
});
export default router;
//# sourceMappingURL=api.js.map