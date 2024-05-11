import express from 'express';
import { getAllJobs, getMyJobs, postJob } from '../controllers/jobController.js';
import { isAuthorised } from '../middlewares/authMiddleware.js';

const jobRouter = express.Router();
jobRouter.get("/alljobs", getAllJobs);
jobRouter.post("/postjob", isAuthorised, postJob);
jobRouter.post("/myjobs",isAuthorised,getMyJobs)

export default jobRouter;