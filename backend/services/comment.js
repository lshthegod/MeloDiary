import Diary from '../models/diary.js';

export const create_comment = async (userId, diaryId, content) => {
    const updatedDiary = await Diary.createComment(userId, diaryId, content);
    if (!updatedDiary) {
        throw new Error('댓글을 추가하지 못하였습니다');
    }
    return updatedDiary;
}

export const update_comment = async (userId, diaryId, commentId, content) => {
    const updatedDiary = await Diary.updateComment(userId, diaryId, commentId, content);
    if (!updatedDiary) {
        throw new Error('댓글을 수정하지 못하였습니다');
    }
    return updatedDiary;
}

export const delete_comment = async (userId, diaryId, commentId) => {
    const updatedDiary = await Diary.deleteComment(userId, diaryId, commentId);
    if (!updatedDiary) {
        throw new Error('댓글을 삭제하지 못하였습니다');
    }
    return updatedDiary;
}