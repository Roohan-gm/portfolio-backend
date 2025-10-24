import Skills from '../models/Skills.js';
export const getSkills = async (_, res) => {
    try {
        const data = await Skills.find();
        if (!data)
            return res.status(404).json({ message: 'Not found' });
        res.json(data);
    }
    catch (error) {
        console.error(`Fetch skills: ${error.message}`);
        res.status(500).json({ message: 'Failed to fetch skills' });
    }
};
//# sourceMappingURL=skillsController.js.map