const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  email: String,
  profilePic: String, // Store the URL for the user's Google profile picture
});

UserSchema.statics.findOrCreate = async function(profile) {
  // Check if the user already exists
  let user = await this.findOne({ googleId: profile.id });

  if (!user) {
    // If the user does not exist, create a new one
    user = await this.create({
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value, // Get the user's email
      profilePic: profile.photos[0].value, // Get the profile picture
    });
  }

  return user;
};

module.exports = mongoose.model('User', UserSchema);
