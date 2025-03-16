import Diary from '../models/diary.js';

export const load_diaries = async (page = 1) => {
    const limit = 5;
    const offset = (page - 1) * limit;

    const diaries = await Diary.getRecent(limit, offset);
    if (!diaries) {
        throw new Error('일기를 불러오지 못하였습니다');
    }
    return diaries;
}


export const load_diary = async (id) => {
    const diary = await Diary.findById(id);
    if (!diary) {
        throw new Error('일기를 찾지 못하였습니다');
    }
    return diary;
};

export const create_diary = async (diaryData) => {
    const newDiary = await Diary.create(diaryData);
    if (!newDiary) {
        throw new Error('일기를 생성하지 못하였습니다');
    }
    return newDiary;
};

export const update_diary = async (id, updateData) => {
    const updatedDiary = await Diary.update(id, updateData);
    if (!updatedDiary) {
        throw new Error('일기를 수정하지 못하였습니다');
    }
    return updatedDiary;
}

export const delete_diary = async (id) => {
    try {
      const deletedDiary = await Diary.delete(id); // 최후의 값
      return deletedDiary;
    } catch (error) {
      throw new Error(error);
    }
  }