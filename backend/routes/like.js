import express from 'express';
const router = express.Router();
import { like } from '../controllers/like.js'

// prefix : /diary/:id
router.post('/like', like);
// router.delete('/like', delete_like);

export default router;