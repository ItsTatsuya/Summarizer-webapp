const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("../config/login-passport-config"); // Import passport module
const login = require("../Controllers/LoginController");
require("dotenv").config();

const router = express.Router();

router.use(cors({
    credentials: true,
    origin: "http://localhost:3000" // Allow requests from this origin
}));

router.get("/login/auth/google/callback", passport.authenticate("google-login", {
  successRedirect: process.env.CLIENT_URL, // Redirect to client URL on successful authentication
  failureRedirect: `${process.env.CLIENT_URL}login`, // Redirect to registration page on failure
}));

router.post("/login", login);

module.exports = router;
