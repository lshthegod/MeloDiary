import express from 'express';
import { login, signup, logout } from '../controllers/auth.js';

const router = express.Router();

// post /login
router.post('/login', login);
// post /signup
router.post('/signup/submit', signup);
// post /logout
router.post('/logout', logout);
export default router;