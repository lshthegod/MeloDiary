import Diary from '../models/diary.js';

export const like = async (userId, diaryId) => {
    const updatedDiary = await Diary.addLike(userId, diaryId);
    if (!updatedDiary) {
        throw new Error('좋아요를 추가하지 못하였습니다');
    }
    return updatedDiary;
}