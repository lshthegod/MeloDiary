import express from 'express';
import { load_diaries, load_diary, create_diary, update_diary, delete_diary } from '../controllers/diary.js';

const router = express.Router();
// prefix = '/diaries'
router.get('/', load_diaries);
router.post('/', create_diary);
router.get('/:id', load_diary);
router.patch('/:id',update_diary);
router.delete('/:id',delete_diary);

/*
router.post('/:id/comments', create_comment);
router.delete('/:id/comments/:commentId',delete_comment);

router.post('/:id/like', like);
router.delete('/:id/like', delete_like);
*/

export default router;