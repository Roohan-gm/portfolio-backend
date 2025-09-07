import mongoose from 'mongoose';

let client: mongoose.Connection | null = null;

export const COLLECTIONS = {
  contacts: 'contacts',
  projects: 'projects',
  developer_info: 'developer_info',
  skills: 'skills',
  experience: 'experience',
  testimonials: 'testimonials'
} as const;

export const connectToMongo = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }

    await mongoose.connect(process.env.MONGO_URL!, {
      dbName: process.env.DB_NAME!,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000
    });

    client = mongoose.connection;
    console.log(`Connected to MongoDB: ${process.env.DB_NAME}`);
  } catch (error: any) {
    console.error(`Could not connect to MongoDB: ${error.message}`);
    throw error;
  }
};

export const closeMongoConnection = async (): Promise<void> => {
  if (!client || mongoose.connection.readyState === 0) {
    console.log('MongoDB already disconnected');
    return;
  }
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
};

export const getDatabase = (): typeof mongoose.connection.db => {
  if (!client) throw new Error('DB not connected');
  return client.db;
};