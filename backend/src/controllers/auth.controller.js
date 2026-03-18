const userModel = require("../models/user.model.js");
const blacklistTokenModel = require("../models/blacklist.model.js");
const jwt = require("jsonwebtoken");

/**
 * @route POST /api/auth/register
 * @desc Register a new user, expect username, email, password in body
 * @access Public
 */

const registerUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({ error: "Please provide username, email and password" });
        }
        const user = await userModel.create({ username, email, password });

        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "3d"});

        res.cookie("token", token);

        res.status(201).json({ 
            message: "User registered successfully", 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @route POST /api/auth/login
 * @desc Login a user, expect email and password in body
 * @access Public
 */

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if(!user) {
            return res.status(404).json({ error: "Email or Password is incorrect" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid) {
            return res.status(401).json({ error: "Email or Password is incorrect" });
        }

        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "3d"});

        res.cookie("token", token);

        res.status(200).json({ 
            message: "User logged in successfully", 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Public
 */

const logoutUserController = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({ error: "No token found" });
        }
        await blacklistTokenModel.create({ token });
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user details
 * @access Private
 */

const getMeController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ 
            message: "User details fetched successfully", 
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    registerUserController, 
    loginUserController, 
    logoutUserController, 
    getMeController 
};