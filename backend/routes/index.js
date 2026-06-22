import express from 'express';
import authRoutes from './authRoutes.js';
import adminRoutes from './adminRoutes.js';
import publicRoutes from './publicRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/public', publicRoutes);

export default router;
