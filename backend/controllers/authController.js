import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { config } from '../config/config.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, name: admin.name, role: admin.role, email: admin.email },
      config.jwtSecret,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const me = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.user.email });
    if (!admin) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const logout = (req, res) => {
  res.json({ msg: 'Logged out successfully' });
};
