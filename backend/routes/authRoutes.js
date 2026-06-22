import express from 'express';
import { login, me, logout } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', auth, me);
router.post('/logout', logout);

export default router;
