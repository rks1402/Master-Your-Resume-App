const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

router.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */

router.post("/login", authController.loginUserController);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Public
 */

router.post("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user details
 * @access Private
 */

router.get("/get-me", authMiddleware.authUser, authController.getMeController);

module.exports = router;