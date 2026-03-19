const express = require("express");
const interviewRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const interviewController = require("../controllers/interview.controller.js");
const upload = require("../middlewares/file.middleware.js");

/**
 * @route: POST /api/interview
 * @description: Generate interview report on the basis of resume pdf, job description and self description
 * @access: Private
 */

interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController);


module.exports = interviewRouter;