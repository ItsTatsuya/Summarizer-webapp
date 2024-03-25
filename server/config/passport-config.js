const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Import Google OAuth strategy
require('dotenv').config(); // Load environment variables
const User = require('../models/googleUser'); // Import the User model

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID, // Client ID obtained from Google Developer Console
  clientSecret: process.env.CLIENT_SECRET, // Client Secret obtained from Google Developer Console
  callbackURL: 'http://localhost:3001/auth/google/callback', // Callback URL where Google will redirect after authentication
  scope: ['profile', 'email'] // Scopes for accessing user profile and email
},
function(accessToken, refreshToken, profile, cb) {
  // This function gets called after successful authentication

  // Check if the user's email is already registered in the database
  User.findOne({ email: profile.emails[0].value })
    .then(existingUser => {
      if (existingUser) {
        // If the email is already registered, return the existing user
        return cb(null, false, { message: 'Email is already registered' });
      } else {
        // If the email is not registered, create a new user using Google profile data
        const newUser = new User({
          name: profile.displayName, // Use displayName from Google profile
          email: profile.emails[0].value,
          verified: true, 
          login:true// Assuming the user is verified via Google OAuth
        });
        // Save the new user to the database
        newUser.save()
          .then(savedUser => {
            return cb(null, savedUser); // Return the saved user
          })
          .catch(err => {
            return cb(err); // Pass any error to done
          });
      }
    })
    .catch(err => {
      return cb(err); // Pass any error to done
    });
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user._id); // Serialize the user's unique identifier into the session
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user); // Pass the retrieved user object to done
    })
    .catch(err => {
      done(err); // Pass any error to done
    });
});
