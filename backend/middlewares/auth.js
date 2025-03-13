import jwt from "jsonwebtoken";
import { secret } from "../config/jwt.js";
/*
const authenticateJWT = (req, res, next) => {
    // 먼저 쿠키에서 토큰을 가져옵니다.
    let token = req.cookies && req.cookies.token;

    // 쿠키에 토큰이 없으면, Authorization 헤더를 확인합니다.
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" }); // redirect to home 으로 변경 필요
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" }); // redirect to home 으로 변경 필요?
        }
        req.user = user;
        next();
    });
};

export default authenticateJWT;
*/

/* only JWT

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = user;
        next();
    });
};

export default authenticateJWT;
*/