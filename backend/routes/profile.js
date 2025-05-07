import express from 'express';
import { profile } from '../controllers/profile.js';

const router = express.Router();

// get /profile
router.get('/profile', profile);

export default router;