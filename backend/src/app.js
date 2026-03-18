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


/* using all the routes here */
app.use("/api/auth", authRoutes);

module.exports = app;