import { create_comment as diaryServiceComment, delete_comment as diaryServiceDeleteComment, update_comment as diaryServiceUpdateComment } from '../services/Comment.js'

export async function create_comment(req, res) {
    const userId = req.user.id;
    const diaryId = req.params.id;
    const content = req.body.content;
    try {
        const updatedDiary = await diaryServiceComment(userId, diaryId, content);
        res.status(201).json(updatedDiary);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}

export async function update_comment(req, res) {
    const userId = req.user.id;
    const diaryId = req.params.id;
    const commentId = req.params.commentId;
    const content = req.body.content;
    try {
        const updatedDiary = await diaryServiceUpdateComment(userId, diaryId, commentId, content);
        res.status(201).json(updatedDiary);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}

export async function delete_comment(req, res) {
    const userId = req.user.id;
    const diaryId = req.params.id;
    const commentId = req.params.commentId;
    try {
        const updatedDiary = await diaryServiceDeleteComment(userId, diaryId, commentId);
        res.status(201).json(updatedDiary);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}