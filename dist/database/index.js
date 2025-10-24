import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectToDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URL, {
            dbName: DB_NAME,
        });
        console.log(`\n Connected to MongoDB. DB Host: ${connectionInstance.connection.host}\n`);
    }
    catch (error) {
        console.error(" Error connecting to database:", error.message);
        process.exit(1);
    }
};
export default connectToDatabase;
//# sourceMappingURL=index.js.map