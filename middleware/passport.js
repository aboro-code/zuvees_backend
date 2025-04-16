const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // create User model for authentication

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Handle the Google OAuth logic
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
