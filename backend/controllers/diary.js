import { load_diaries as diariesServiceLoad, load_diary as diaryServiceLoad, create_diary as diaryServiceCreate, delete_diary as diaryServiceDelete, update_diary as diaryServiceUpdate } from '../services/diary.js';

export async function load_diaries(req, res) {
    const page = req.query.page || 1;
    if (page < 1) page = 1;
    try {
        const diaries = await diariesServiceLoad(page);
        res.json(diaries);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }

}

export async function load_diary(req, res) {
    const { id } = req.params;
    try {
        const diary = await diaryServiceLoad(id);
        res.json(diary);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}

export async function create_diary(req, res) {
    const diaryData = req.body;
    
    // user_id가 없으면 에러 반환
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    
    diaryData.user_id = req.user.id;
    try {
        const newDiary = await diaryServiceCreate(diaryData);
        res.status(201).json(newDiary);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}

export async function update_diary(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    
    // user_id가 없으면 에러 반환
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    
    try {
        const updatedDiary = await diaryServiceUpdate(id, updateData);
        if (!updatedDiary) {
            return res.status(404).json({ message: '업데이트할 다이어리를 찾지 못했습니다.' });
        }
        res.json(updatedDiary);
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}

export async function delete_diary(req, res) {
    const { id } = req.params; 
    
    // user_id가 없으면 에러 반환
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    
    try {
        const deletedDiary = await diaryServiceDelete(id);
        if (!deletedDiary) {
            return res.status(404).json({ message: '삭제할 다이어리를 찾지 못했습니다.' });
        }
        res.json({ message: '일기가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 에러', error: error.message });
    }
}