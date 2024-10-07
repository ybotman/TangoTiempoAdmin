const adminRoles = ['systemAdmin'];

module.exports.verifyToken = (req, res, next) => {
  // Verify Firebase token here
  // Attach user info to req.user
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user && adminRoles.includes(req.user.role)) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};