const jwt = require('jsonwebtoken');

const checkRole = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Access denied, token missing' });
    }

    try {
      const decoded = jwt.verify(token, 'your_secret_key'); 

      if (decoded.role !== role) {
        return res.status(403).json({ error: 'Access denied, insufficient permissions' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

module.exports = checkRole;
