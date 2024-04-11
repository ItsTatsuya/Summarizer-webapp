const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('../models/googleUser');

// Configure Passport to use Google OAuth 2.0 strategy for login
passport.use('google-login', new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/login/auth/google/callback',
  scope: ['profile', 'email']
},
function(accessToken, refreshToken, profile, cb) {
  // This function gets called after successful authentication

  // Find the user in the database based on their email
  User.findOne({ email: profile.emails[0].value })
    .then(user => {
      if (!user) {
        // If the user is not found, return an error message
        return cb(null, false, { message: 'No user found with this email' });
      }

      // If the user is found, return the user object
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
}));

module.exports = passport;