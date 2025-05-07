import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expiresIn } from '../config/jwt.js';

export const login = async (email, password) => {
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn });
};

export const signup = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해시화
    const user = await User.create({ username, email, password: hashedPassword }); // 해시된 비밀번호 저장
    if (!user) {
        throw new Error('회원가입 : DB 연결 실패');
    }
    return { id: user.id, username: user.username, email: user.email };
}

export const logout = async (res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });
}