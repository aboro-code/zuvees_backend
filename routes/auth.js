const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), // If login fail, redirect to /login
  (req, res) => {
    // After successful login, redirect to the frontend dashboard or profile
    res.redirect(process.env.FRONTEND_URL || '/dashboard');
  }
);

module.exports = router;
