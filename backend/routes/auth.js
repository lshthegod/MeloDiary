import express from 'express';
import request from 'request';
import { login, signup } from '../controllers/auth.js';
import { naver_id, naver_secret, naver_redirect} from '../config/oauth.js';
const router = express.Router();

// get /login
router.post('/login', login);
// get /signup
router.post('/signup/submit', signup);

export default router;

////////////////////////////////////////////////////////

const state = "1015"; // random 문자열
let api_url = "";

// 네이버 로그인 페이지로 리다이렉트
router.get('/login/naver', function (req, res) {
    api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_id}&redirect_uri=${naver_redirect}&state=${state}`;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end(`<a href="${api_url}"><img height="50" src="http://static.nid.naver.com/oauth/small_g_in.PNG"/></a>`);
});

// 네이버 로그인 콜백 처리
router.get('/login/naver/callback', (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    // Access token 요청
    api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naver_id}&client_secret=${naver_secret}&redirect_uri=${naver_redirect}&code=${code}&state=${state}`;
    const options = {
        url: api_url,
        headers: {
            'X-Naver-Client-Id': naver_id,
            'X-Naver-Client-Secret': naver_secret
        }
    };
    // 토큰 요청
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});