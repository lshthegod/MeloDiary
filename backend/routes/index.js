import express from 'express';
import authRoutes from './auth.js';
import homeRoutes from './home.js';

const router = express.Router();

router.use(homeRoutes);
router.use(authRoutes);

export default router;
