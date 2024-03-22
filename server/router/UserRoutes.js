const express = require('express');
const cors = require('cors');
const { registerUser } = require('../Controllers/userControllers');
const { activateAccount } = require("../Controllers/AccountActive");

const router = express.Router();

// Middleware
router.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

// Routes
router.post("/register", registerUser); // Register a new user
router.get("/activate-account", activateAccount); // Activate user account

module.exports = router;
