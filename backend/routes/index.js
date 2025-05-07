import express from 'express';
import authRoutes from './auth.js';
import homeRoutes from './home.js';
import diaryRoutes from './diary.js';
import profileRoutes from './profile.js';
 
const router = express.Router();

router.use(profileRoutes);
router.use(homeRoutes);
router.use(authRoutes);
router.use('/diary',diaryRoutes);

export default router;
