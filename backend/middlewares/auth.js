import jwt from "jsonwebtoken";
import { secret } from "../config/jwt.js";

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    // 토큰이 없으면 기본값 설정
    if (!token) {
        req.user = null;
        return next();
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            // 토큰이 유효하지 않으면 기본값 설정
            req.user = null;
            return next();
        }
        
        // 토큰이 유효하면 user 정보 설정
        req.user = user;
        next();
    });
};

export default authenticateJWT;
