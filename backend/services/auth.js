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
