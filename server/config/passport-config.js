const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('../models/User'); // Import your User model

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/google/callback',
  scope: ['profile', 'email']
},
function(accessToken, refreshToken, profile, cb) {
  // Check if the user's email is already registered
  User.findOne({ email: profile.emails[0].value })
    .then(existingUser => {
      if (existingUser) {
        // If the email is already registered, return the existing user
        return cb(null, false, { message: 'Email is already registered' });
      } else {
        // If the email is not registered, create a new user
        const newUser = new User({
          name: profile.displayName, // Use displayName from Google profile
          email: profile.emails[0].value,
          verified: true
        });
        newUser.save()
          .then(savedUser => {
            return cb(null, savedUser);
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

passport.serializeUser((user, done) => {
  done(null, user._id); // Serialize the user's unique identifier into the session
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user); // Pass the retrieved user object to done
    })
    .catch(err => {
      done(err); // Pass any error to done
    });
});


passport.serializeUser((user, done) => {
  done(null, user._id); // Serialize the user's unique identifier into the session
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user); // Pass the retrieved user object to done
    })
    .catch(err => {
      done(err); // Pass any error to done
    });
});
