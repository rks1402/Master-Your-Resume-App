const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

/* require all the routes here */
const authRoutes = require("./routes/auth.routes.js");
const interviewRouter = require("./routes/interview.routes.js");

/* using all the routes here */
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRouter);

module.exports = app;