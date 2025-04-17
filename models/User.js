const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  email: String,
  profilePic: String, // Store the URL for user Google profile picture
  isRider: {
    type: Boolean,
    default: false, // Default value is false, indicating the user is not a rider by default
  },
});

UserSchema.statics.findOrCreate = async function(profile) {
  // Check if user already exists
  let user = await this.findOne({ googleId: profile.id });

  if (!user) {
    // If user does not exist, create new one
    user = await this.create({
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value, // Get the user email
      profilePic: profile.photos[0].value, // Get profile picture
    });
  }

  return user;
};

module.exports = mongoose.model('User', UserSchema);
