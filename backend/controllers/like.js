import { like as diaryServiceLike } from '../services/like.js';

export async function like(req, res) {
    const userId = req.user.id;
    const diaryId = req.params.id;
    try {
        const updatedDiary = await diaryServiceLike(userId, diaryId);
        res.status(201).json(updatedDiary);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}