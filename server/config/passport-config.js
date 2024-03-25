const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Import Google OAuth strategy
require('dotenv').config(); // Load environment variables
const User = require('../models/googleUser'); // Import the User model

// Configure Passport to use Google OAuth 2.0 strategy
passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.CLIENT_ID, 
  clientSecret: process.env.CLIENT_SECRET, 
  callbackURL: 'http://localhost:3001/auth/google/callback', 
  scope: ['profile', 'email']
},
function(accessToken, refreshToken, profile, cb) {
  // This function gets called after successful authentication

  // Check if the user's email is already registered in the database
  User.findOne({ email: profile.emails[0].value })
    .then(existingUser => {
      if (existingUser) {
        // If the email is already registered, return the existing user
        return cb(null,false, existingUser);
      } else {
        // If the email is not registered, create a new user using Google profile data
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          verified: true,
          login: true
        });
        // Save the new user to the database
        newUser.save()
          .then(savedUser => {
            return cb(null, savedUser);
          })
          .catch(err => {
            return cb(err);
          });
      }
    })
    .catch(err => {
      return cb(err);
    });
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});
module.exports = passport;
