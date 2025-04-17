const isRider = (req, res, next) => {
    if (req.isAuthenticated() && req.user && req.user.isRider) {
      return next();
    }
    return res.status(403).json({ message: 'Permission denied: Rider access required' });
  };
  
  module.exports = isRider;
  