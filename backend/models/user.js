import pool from '../server.js';

// User 모델 정의 (ORM 스타일)
class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // 유저 저장 (CREATE)
  static async create({ username, email, password }) {
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [username, email, password];
    const result = await pool.query(query, values);
    return new User(result.rows[0].id, result.rows[0].username, result.rows[0].email, result.rows[0].password);
  }

  // ID로 유저 찾기 (READ)
  static async findById(id) {
    const query = "SELECT * FROM users WHERE id = $1;";
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return null;
    return new User(result.rows[0].id, result.rows[0].username, result.rows[0].email, result.rows[0].password);
  }

  // 이메일로 유저 찾기 (READ)
  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1;";
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) return null;
    return new User(result.rows[0].id, result.rows[0].username, result.rows[0].email, result.rows[0].password);
  }

  // 모든 유저 조회 (READ)
  static async findAll() {
    const query = "SELECT * FROM users;";
    const result = await pool.query(query);
    return result.rows.map(row => new User(row.id, row.username, row.email, row.password));
  }

  // 유저 삭제 (DELETE)
  static async delete(id) {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *;";
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return null;
    return new User(result.rows[0].id, result.rows[0].username, result.rows[0].email, result.rows[0].password);
  }
}

export default User;

/*
import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // adjust as needed
});

export async function createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = `
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const { rows } = await pool.query(insertQuery, [email, hashedPassword]);
    return rows[0];
}

export async function findUserByEmail(email) {
    const selectQuery = `
        SELECT * FROM users
        WHERE email = $1;
    `;
    const { rows } = await pool.query(selectQuery, [email]);
    return rows[0];
}
*/