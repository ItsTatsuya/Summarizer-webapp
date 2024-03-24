const express = require('express');
const cors = require('cors');
const passport = require('passport'); // Require Passport
const { registerUser } = require('../Controllers/userControllers');
const { activateAccount } = require("../Controllers/AccountActive");
const { getData } = require("../Controllers/getData");
const { redirect } = require("../Controllers/redirect");

require("dotenv").config()
const router = express.Router();

// Middleware
router.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

// Routes
router.post("/register", registerUser); // Register a new user
router.get("/activate-account", activateAccount); // Activate user account
router.get("/register/user/:email", getData);

// Google OAuth routes

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "successfully loged in",
      user: req.user,
    })
  } else {
    res.status(403).json({ erroe: true, message: "Not Authorized" })
  }
})

router.get("/register/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Existing User",
  })
})


router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: `${process.env.CLIENT_URL}register`,
}))
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
})

// Callback route for handling Google OAuth authentication callback
// router.get('/auth/google/callback', 
// passport.authenticate('google', { failureRedirect: '/login' }), 
// redirect
// );

module.exports = router;
