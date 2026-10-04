import mongoose from "mongoose";
import dns from "node:dns";

if (!process.env.VERCEL) {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {
    // Ignore if restricted in some cloud environments
  }
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connections[0]?.readyState === 1) {
    return;
  }
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error("MongoDB Connection Error: MONGO_URI is missing from environment variables!");
    return;
  }
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

export default connectDB;