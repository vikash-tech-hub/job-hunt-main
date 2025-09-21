import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
    applyJob,
    getApplicants,
    getAppliedJobs,
    updateStatus
} from "../controllers/application.controller.js";

const router = express.Router();

// Apply for a job
router.route("/apply/:id").get(isAuthenticated, applyJob);

// Get all jobs applied by the logged-in user
router.route("/get").get(isAuthenticated, getAppliedJobs);

// Get all applicants for a job (only recruiter should access)
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// Update status of application
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;

