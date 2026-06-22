import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const auth = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  let token = req.header('x-auth-token') || '';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
