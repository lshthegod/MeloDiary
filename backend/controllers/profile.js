import { profile as serviceProfile } from '../services/profile.js';

export async function profile(req, res) {
    const userId = req.user.id;
    try {
        const profileInformation = await serviceProfile(userId);
        res.status(200).json(profileInformation);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}