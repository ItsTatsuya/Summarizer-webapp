const express = require('express');
const cors = require('cors');
const passport = require('passport'); // Require Passport for authentication
const { registerUser } = require('../Controllers/userControllers'); // Import user registration controller
const { activateAccount } = require("../Controllers/AccountActive"); // Import account activation controller
const { getData } = require("../Controllers/getData"); // Import controller for fetching user data
const { redirect } = require("../Controllers/redirect"); // Import redirection controller

require("dotenv").config() // Load environment variables
const router = express.Router(); // Create an Express router

// Middleware for CORS configuration
router.use(cors({
  credentials: true,
  origin: "http://localhost:3000" // Allow requests from this origin
}));

// Routes definition

// Route for registering a new user
router.post("/register", registerUser);

// Route for activating user account
router.get("/activate-account", activateAccount);

// Route for fetching user data
router.get("/register/user/:email", getData);

// Google OAuth routes

// Route for successful login
router.get("/login/success", (req, res) => {
  if (req.user) {
    // If user is logged in successfully, send user data
    res.status(200).json({
      error: false,
      message: "Successfully logged in",
      user: req.user,
    })
  } else {
    // If login failed, send error message
    res.status(403).json({ error: true, message: "Not Authorized" })
  }
});

// Route for failed registration (existing user)
router.get("/register/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Existing User",
  })
});

// Route for Google OAuth callback
router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL, // Redirect to client URL on successful authentication
  failureRedirect: `${process.env.CLIENT_URL}register`, // Redirect to registration page on failure
}));

// Route for initiating Google OAuth authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for logging out user
router.get("/logout", (req, res) => {
  req.logout(); // Logout the user
  res.redirect(process.env.CLIENT_URL); // Redirect to client URL after logout
});

module.exports = router; // Export the router for use in the application
