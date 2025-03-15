import pool from '../server.js';

class Diary {
    constructor({ id, user_id, title, content, created_at, updated_at, mood_tags, spotify_track_id, comments, liked_users, likes_count }) {
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.mood_tags = mood_tags;
        this.spotify_track_id = spotify_track_id;
        this.comments = comments;
        this.liked_users = liked_users;
        this.likes_count = likes_count;
    }
    
    static async create(diaryData) {
        const { user_id, title, content, mood_tags = [], spotify_track_id = null } = diaryData;
        const query = `
          INSERT INTO posts (user_id, title, content, mood_tags, spotify_track_id)
          VALUES ($1, $2, $3, $4::VARCHAR[], $5)
          RETURNING *;
        `;
        const values = [
          user_id, title, content, mood_tags, spotify_track_id
        ];
        const { rows } = await pool.query(query, values);
        return new Diary(rows[0]);
    }

    static async findById(id) {
        const query = `SELECT * FROM posts WHERE id = $1;`;
        const { rows } = await pool.query(query, [id]);
        return rows.length ? new Diary(rows[0]) : null;
    }
    
    static async update(id, updateData) {
        const existingDiary = await Diary.findById(id);
        if (!existingDiary) return null;
        
        const updatedDiary = { ...existingDiary, ...updateData, updated_at: new Date() };
        const query = `
            UPDATE posts SET title = $1, content = $2, updated_at = $3, mood_tags = $4::VARCHAR[], spotify_track_id = $5
            WHERE id = $6 RETURNING *;
        `;
        const values = [
            updatedDiary.title, 
            updatedDiary.content, 
            updatedDiary.updated_at,
            updatedDiary.mood_tags,
            updatedDiary.spotify_track_id,
            id
        ];
        const { rows } = await pool.query(query, values);
        return new Diary(rows[0]);
    }

    static async delete(id) {
        const query = `DELETE FROM posts WHERE id = $1 RETURNING *;`;
        const { rows } = await pool.query(query, [id]);
        return rows.length ? new Diary(rows[0]) : null;
    }
}

export default Diary;