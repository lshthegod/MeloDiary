import pool from '../server.js';
import { v4 as uuidv4 } from 'uuid';

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

    static async getRecent(limit, offset) {
        const query = `
            SELECT id, title, created_at, content, likes_count, mood_tags
            FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2;`;
        const { rows } = await pool.query(query, [limit, offset]);
        return rows;
        
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

    static async addLike(userId, diaryId) {
        const updateQuery = `
            UPDATE posts 
            SET liked_users = liked_users || to_jsonb($1::text),
                likes_count = likes_count + 1 
            WHERE id = $2
            AND NOT (
                liked_users @> to_jsonb(ARRAY[$1::text])
            )
            RETURNING *;
        `;
        const values = [userId, diaryId];
        
        const { rows } = await pool.query(updateQuery, values);
        return rows[0];
    }
    
    static async DeleteLike(userId, diaryId) {
        const query = `
            UPDATE posts
            SET 
            liked_users = COALESCE(
                (
                SELECT jsonb_agg(elem)
                FROM jsonb_array_elements(liked_users) AS elem
                WHERE elem <> to_jsonb($1::text)
                ), '[]'::jsonb
            ),
            likes_count = likes_count - 1
            WHERE id = $2
            AND liked_users @> to_jsonb(ARRAY[$1::text])
            RETURNING *;
        `;
        const values = [userId, diaryId];
      
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    static async createComment(userId, diaryId, content) {
        const comment = {
            id: uuidv4(),
            user_id: userId,
            content: content,
            created_at: new Date().toISOString()
        };
    
        const query = `
            UPDATE posts
            SET comments = COALESCE(comments, '[]'::jsonb) || to_jsonb($1::json)
            WHERE id = $2
            RETURNING *;
        `;
    
        const values = [comment, diaryId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    static async updateComment(userId, diaryId, commentId, content) {
        const query = `
            UPDATE posts
            SET comments = (
                SELECT jsonb_agg(
                    CASE
                        WHEN elem->>'id' = $3 AND elem->>'user_id' = $1 THEN
                            jsonb_set(elem, '{content}', to_jsonb($4::text))
                        ELSE
                            elem
                    END
                )
                FROM jsonb_array_elements(comments) AS elem
            )
            WHERE id = $2
            AND comments @> to_jsonb(ARRAY[
                jsonb_build_object('id', $3::text, 'user_id', $1::text)
            ])
            RETURNING *;
        `;

        const values = [userId, diaryId, commentId, content];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    static async deleteComment(userId, diaryId, commentId) {
        const query = `
            UPDATE posts
            SET 
            comments = COALESCE(
                (
                SELECT jsonb_agg(elem)
                FROM jsonb_array_elements(comments) AS elem
                WHERE NOT (
                    elem->>'id' = $3 AND elem->>'user_id' = $1
                )
            ), '[]'::jsonb
            )
            WHERE id = $2
            AND comments @> to_jsonb(ARRAY[
                jsonb_build_object('id', $3::text, 'user_id', $1::text)
            ])
            RETURNING *;
        `;
        const values = [userId, diaryId, commentId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}

export default Diary;