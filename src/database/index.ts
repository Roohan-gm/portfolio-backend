import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DATABASE_URL!, {
      dbName: DB_NAME, // <-- use this instead of appending to URL
    });
    console.log(
      `\n Connected to MongoDB. DB Host: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    console.error(" Error connecting to database:", (error as Error).message);
    process.exit(1);
  }
};

export default connectToDatabase;