import express from 'express';
const router = express.Router();

// prefix : /diary/:id
router.post('/comments', create_comment);
router.delete('/comments/:commentId', delete_comment);

export default router;