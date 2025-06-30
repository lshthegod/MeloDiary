import jwt from "jsonwebtoken";
import { secret } from "../config/jwt.js";

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log("Unauthorized");
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log("Forbidden");
            return res.status(403).json({ message: "Forbidden" });
        }

        req.user = user;
        next();
    });
};

export default authenticateJWT;
