const User = require('../models/User');

const validateSession = async (req, res, next) => {
  try {
    if (!req.user || !req.user.session_id) {
      return next(); // Skip if not authenticated or no session ID in token
    }

    const user = await User.findByPk(req.user.id);
    if (!user || user.session_id !== req.user.session_id) {
      return res.status(401).json({ error: 'Session expired or logged in from another device.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error during session validation' });
  }
};

module.exports = validateSession;
