import express from 'express';
import { login, signup, naver, naver_callback/*, google, google_callback*/ } from '../controllers/auth.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup/submit', signup);

router.get('/login/naver', naver);
router.get('/login/naver/callback', naver_callback);
/*
router.get('/login/google', google);
router.get('/login/google/callback', google_callback);
*/
export default router;