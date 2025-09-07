import mongoose from 'mongoose';
export declare const COLLECTIONS: {
    readonly contacts: "contacts";
    readonly projects: "projects";
    readonly developer_info: "developer_info";
    readonly skills: "skills";
    readonly experience: "experience";
    readonly testimonials: "testimonials";
};
export declare const connectToMongo: () => Promise<void>;
export declare const closeMongoConnection: () => Promise<void>;
export declare const getDatabase: () => typeof mongoose.connection.db;
