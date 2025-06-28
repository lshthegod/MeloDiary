import { like as diaryServiceLike, deleteLike as diaryServiceDeleteLike } from '../services/like.js';

export async function like(req, res) {
    // user_id가 없으면 에러 반환
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    
    const userId = req.user.id;
    const diaryId = req.params.id;
    try {
        const updatedDiary = await diaryServiceLike(userId, diaryId);
        res.status(201).json(updatedDiary);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}

export async function delete_like(req, res) {
    // user_id가 없으면 에러 반환
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    
    const userId = req.user.id;
    const diaryId = req.params.id;
    try {
        const updatedDiary = await diaryServiceDeleteLike(userId, diaryId);
        res.status(201).json(updatedDiary);
    } catch (error) {
        res.status(500).json({message: '서버 에러', error: error.message});
    }
}