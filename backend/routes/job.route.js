import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, postJob, deleteJob } from '../controllers/job.controller.js';

const router = express.Router();

router.post('/post', isAuthenticated, postJob);
router.get('/get', getAllJobs);
router.get('/getadminjob', isAuthenticated, getAdminJobs);
router.get('/get/:id', getJobById);
router.delete('/delete/:id', isAuthenticated, deleteJob);

export default router;
