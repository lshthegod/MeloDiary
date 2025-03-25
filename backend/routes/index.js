import express from 'express';
import authRoutes from './auth.js';
import homeRoutes from './home.js';
import diaryRoutes from './diary.js';

const router = express.Router();

router.use(homeRoutes);
router.use(authRoutes);
router.use('/diary',diaryRoutes);

export default router;
