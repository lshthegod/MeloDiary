import express from 'express';
import { load_diaries, load_diary, create_diary, update_diary, delete_diary } from '../controllers/diary.js';
import likeRouter from './like.js';
import commentRouter from './comment.js'

const router = express.Router();
// prefix = '/diary'
router.get('/', load_diaries);
router.post('/', create_diary);
router.get('/:id', load_diary);
router.patch('/:id',update_diary);
router.delete('/:id',delete_diary);

router.use(likeRouter);
router.use(commentRouter);

export default router;