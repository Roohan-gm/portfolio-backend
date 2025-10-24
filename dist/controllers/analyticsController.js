import ContactMessage from '../models/ContactMessage.js';
export const getContactAnalytics = async (_, res) => {
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
};
//# sourceMappingURL=analyticsController.js.map