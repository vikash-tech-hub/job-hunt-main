import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js';
import jobRoutes from './routes/job.route.js';
import applicationRoutes from './routes/application.route.js';

dotenv.config();

const app = express();

// Ensure DB connection for every serverless invocation
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Flexible CORS for Localhost and Vercel Deployments
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      
      // Allow if origin is explicitly in allowed list or is any *.vercel.app domain
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for production deployment ease
    },
    credentials: true,
  })
);

// Health Check Root
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'JobHunt API Server is running successfully 🚀',
    status: 'healthy',
  });
});

// API Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/application', applicationRoutes);

// Export app for Vercel Serverless Function
export default app;

// Local Development Server Listener
const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  });
}
