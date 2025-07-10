// telemedicine-backend/middleware/auth.js
const jwt = require('jsonwebtoken');

// This middleware function checks for a valid JWT in the 'x-auth-token' header.
// If valid, it decodes the token and attaches the user's ID and role to the request object (req.user).
// This allows subsequent route handlers to know who the authenticated user is.
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token is provided
  if (!token) {
    // If no token, return a 401 Unauthorized response
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    // Verify the token using the JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If verification is successful, the decoded payload (which contains user.id and user.role)
    // is attached to the request object.
    req.user = decoded.user;

    // Call next() to pass control to the next middleware function or route handler
    next();
  } catch (err) {
    // If token verification fails (e.g., token is expired or invalid),
    // return a 401 Unauthorized response
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
