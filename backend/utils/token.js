import jwt from "jsonwebtoken";
import { secret, expiresIn } from "../config/jwt.js";

export const generateToken = (payload) => jwt.sign(payload, secret, { expiresIn });
export const verifyToken = (token) => jwt.verify(token, secret);