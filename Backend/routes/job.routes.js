import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAlljobs, getJobById, getJobsByCompanyById, postJob } from "../controllers/job.controller.js";
const router = express.Router();


router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAlljobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/getJobByCompany/:id").get( getJobsByCompanyById);

export default router;