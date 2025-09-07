import 'dotenv/config';
import express from 'express';
import cors from './middleware/cors.js';
import apiRouter from './routes/api.js';
import { connectToMongo, closeMongoConnection } from './database/mongo.js';
const app = express();
const PORT = process.env.PORT || 8001;
app.use(cors);
app.use(express.json());
app.use('/api', apiRouter);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
    console.error("Server error:", err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
const start = async () => {
    await connectToMongo();
    app.listen(PORT, () => {
        console.log(`Portfolio API running on http://localhost:${PORT}`);
    });
    process.on('SIGINT', async () => {
        console.log("Shutting down...");
        await closeMongoConnection();
        process.exit(0);
    });
};
start().catch(err => {
    console.error("Failed to start server:", err.message);
});
//# sourceMappingURL=server.js.map