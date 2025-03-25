import express from 'express';
const router = express.Router();
import { like, delete_like } from '../controllers/like.js'

// prefix : /diary
router.post('/:id/like', like);
router.delete('/:id/like', delete_like);

export default router;