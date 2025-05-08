import Diary from '../models/diary.js';
import User from '../models/user.js';

export const profile = async (userId) => {
    const user = await User.findById(userId);
    const diaries = await Diary.findByUserId(userId);
    if (!user) {
        throw new Error('사용자를 찾을 수 없습니다');
    }
    const profileInfo = { id: user.id, username: user.username, email: user.email, diary: diaries };
    return profileInfo;
}