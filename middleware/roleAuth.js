const jwt = require('jsonwebtoken');

// A function that takes an array of acceptable roles and returns a middleware
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Standard setup: We assume a JWT verification middleware ran before this
    // and populated req.user with decoded token data.
    
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Access Denied. Required role: ${allowedRoles.join(' or ')}. Your role: ${req.user.role}` 
      });
    }

    next();
  };
};

// Global JWT Verification middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains id, role, tenantId
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = { verifyToken, authorizeRoles };
