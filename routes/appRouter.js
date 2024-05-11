import express from 'express';
import { isAuthorised } from '../middlewares/authMiddleware.js';
import {
    employeeJobDelete,
    employeeGetAllApplications,
    employerGetAllApplications,
    applicationPost
} from '../controllers/applicationController.js';

const appRouter = express.Router();
appRouter.delete("/deleteapplication/:id", isAuthorised, employeeJobDelete);
appRouter.get("/getapplications/getall", isAuthorised, employerGetAllApplications);
appRouter.get("/myapplications", isAuthorised, employeeGetAllApplications);
appRouter.post("/apply",isAuthorised,applicationPost)

export default appRouter;