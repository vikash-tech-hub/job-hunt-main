import mongoose from "mongoose";
import dns from "node:dns";

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if restricted in some cloud environments
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connections[0]?.readyState) {
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

export default connectDB;