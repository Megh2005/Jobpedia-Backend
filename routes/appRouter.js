import express from 'express';
import { isAuthorised } from '../middlewares/authMiddleware.js';
import {
    employeeJobDelete,
    employeeGetAllApplications,
    employerGetAllApplications
} from '../controllers/applicationController.js';

const appRouter = express.Router();
appRouter.delete("/deleteapplication/:id", isAuthorised, employeeJobDelete);
appRouter.get("/getapplications", isAuthorised, employerGetAllApplications);
appRouter.get("/myapplications", isAuthorised, employeeGetAllApplications)

export default appRouter;