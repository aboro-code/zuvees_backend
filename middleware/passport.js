// middleware/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Assuming you'll create a User model for authentication

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/google/callback', // Adjust this URL as needed
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Handle the Google OAuth logic here, like finding or creating a user in your database
        const user = await User.findOrCreate(profile);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize the user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
