const jwt = require('jsonwebtoken');

const checkRole = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Access denied, token missing' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your actual secret key

      // Check if user has the required role
      if (decoded.role !== role) {
        return res.status(403).json({ error: 'Access denied, insufficient permissions' });
      }

      // Attach decoded user info to request object
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

module.exports = checkRole;
