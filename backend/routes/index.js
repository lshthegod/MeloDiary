import express from 'express';
import authRoutes from './auth.js';
import homeRoutes from './home.js';
import diaryRoutes from './diary.js';
import profileRoutes from './profile.js';
import authenticateJWT from '../middlewares/auth.js';
 
const router = express.Router();

router.use(authRoutes);
router.use(homeRoutes);

router.use(authenticateJWT, profileRoutes);

router.use('/diary', authenticateJWT, diaryRoutes);

export default router;
