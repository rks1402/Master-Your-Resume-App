const { PDFParse } = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service.js");
const interviewReportModel = require("../models/interviewReport.model.js");

const generateInterviewReportController = async (req, res) => {
    try {
        const { jobDescription, selfDescription } = req.body;
        const resumeFile = req.file;

        if(!resumeFile || !jobDescription || !selfDescription) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const pdfBuffer = resumeFile.buffer;
        const pdfParser = new PDFParse({ verbosity: 0, data: pdfBuffer });
        await pdfParser.load();
        const pdfData = await pdfParser.getText();
        const resumeText = pdfData.text;

        const interviewReport = await generateInterviewReport(resumeText, selfDescription, jobDescription);

        const interviewReportData = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            matchScore: interviewReport.matchScore,
            technicalQuestions: interviewReport.technicalQuestions,
            behavioralQuestions: interviewReport.behavioralQuestions,
            skillGaps: interviewReport.skillGaps,
            preparationPlan: interviewReport.preparationPlan,
        });

        return res.status(200).json({ 
            success: true, 
            message: "Interview report generated successfully",
            interviewReportData 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to generate interview report",
            error: error.message 
        });
    }
};

module.exports = { generateInterviewReportController };