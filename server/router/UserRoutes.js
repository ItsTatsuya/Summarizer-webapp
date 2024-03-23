const express = require('express');
const cors = require('cors');
const { registerUser } = require('../Controllers/userControllers');
const { activateAccount } = require("../Controllers/AccountActive");
const {getData} = require("../Controllers/getData")

const router = express.Router();

// Middleware
router.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

// Routes
router.post("/register", registerUser); // Register a new user
router.get("/activate-account", activateAccount); // Activate user account
router.get("/register/user/:email",getData);

module.exports = router;
