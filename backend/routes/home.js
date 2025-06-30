import express from 'express';
import { login, signup } from '../controllers/auth.js';

const router = express.Router();

router.get('/', (req,res) => {
    console.log("home에 방문하였습니다.");
    res.status(200).send("Hello World!");
});

export default router;