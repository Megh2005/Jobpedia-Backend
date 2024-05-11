import express from 'express';
import { deleteJob, getAllJobs, getMyJobs, postJob, updateJob } from '../controllers/jobController.js';
import { isAuthorised } from '../middlewares/authMiddleware.js';

const jobRouter = express.Router();
jobRouter.get("/alljobs", getAllJobs);
jobRouter.post("/postjob", isAuthorised, postJob);
jobRouter.post("/myjobs", isAuthorised, getMyJobs);
jobRouter.put("/updatejob/:id", isAuthorised, updateJob);
jobRouter.delete("/deletejob/:id", isAuthorised, deleteJob);

export default jobRouter;