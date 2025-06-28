import { profile as serviceProfile } from '../services/profile.js';

export async function profile(req, res) {
    // user_id가 없으면 에러 반환
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    
    const userId = req.user.id;
    try {
        const profileInformation = await serviceProfile(userId);
        res.status(200).json(profileInformation);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}