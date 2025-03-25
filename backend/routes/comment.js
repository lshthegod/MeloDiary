import express from 'express';
const router = express.Router();
import { create_comment, update_comment, delete_comment } from '../controllers/comment.js'

// prefix : /diary
router.post('/:id/comment', create_comment);
router.patch('/:id/comment/:commentId', update_comment);
router.delete('/:id/comment/:commentId', delete_comment);

export default router;