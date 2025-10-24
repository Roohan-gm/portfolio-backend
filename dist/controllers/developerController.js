import DeveloperInfo from '../models/DeveloperInfo.js';
export const getDeveloperInfo = async (_, res) => {
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
};
//# sourceMappingURL=developerController.js.map