const { GoogleGenAI } = require("@google/genai");
const z = require("zod/v4");

// Recursively strip properties that Gemini API doesn't support
function cleanSchemaForGemini(schema) {
    if (typeof schema !== "object" || schema === null) return schema;

    const cleaned = {};
    const unsupportedKeys = ["$schema", "additionalProperties"];

    for (const [key, value] of Object.entries(schema)) {
        if (unsupportedKeys.includes(key)) continue;

        if (Array.isArray(value)) {
            cleaned[key] = value.map((item) => cleanSchemaForGemini(item));
        } else if (typeof value === "object" && value !== null) {
            cleaned[key] = cleanSchemaForGemini(value);
        } else {
            cleaned[key] = value;
        }
    }

    return cleaned;
}

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 representing the match between the job description and the resume"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("Technical question asked in interview"),
        intention: z.string().describe("Intention of interviewer behind the technical question"),
        answer: z.string().describe("How to answer the technical question, what points to cover, what to avoid, what to highlight")
    })).describe("Technical questions asked in interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("Behavioral question asked in interview"),
        intention: z.string().describe("Intention of interviewer behind the behavioral question"),
        answer: z.string().describe("How to answer the behavioral question, what points to cover, what to avoid, what to highlight")
    })).describe("Behavioral questions asked in interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("Skill gap"),
        severity: z.enum(["high", "medium", "low"]).describe("Severity of the skill gap")
    })).describe("List of skill gaps identified in the candidate's resume along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("Day of the preparation plan"),
        focusArea: z.string().describe("Focus area of the preparation plan"),
        tasks: z.array(z.string().describe("Tasks for the preparation plan"))
    })).describe("A day wise preparation plan for the candidate to prepare for the interview")
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateInterviewReport = async (jobDescription, resume, selfDescription) => {

    const prompt = `
    Generate an interview report for a candidate based on the following information:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: cleanSchemaForGemini(z.toJSONSchema(interviewReportSchema)),
        },
    });

    return JSON.parse(response.text);
}

module.exports = {
    generateInterviewReport
};
