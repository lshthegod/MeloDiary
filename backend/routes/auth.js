import express from 'express';
import { login, signup} from '../controllers/auth.js';

const router = express.Router();

// get /login
router.post('/login', login);
// get /signup/submit
router.post('/signup/submit', signup);

export default router;