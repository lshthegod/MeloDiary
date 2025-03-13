import { login as authServiceLogin, signup as authServiceSignUp} from '../services/auth.js';
import { nodeEnv, state } from '../config/env.js';
import { naver_id, naver_secret, naver_redirect/*, google_id, google_secret, google_redirect*/ } from '../config/oauth.js';
import request from 'request';


// 클라이언트로부터 받은 로그인 요청 처리 함수
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // 서비스 계층에서 로그인 로직 수행
    const token = await authServiceLogin(email, password);
    // 로그인 실패 (예: 유효하지 않은 자격증명)
    if (!token) {
      return res.status(401).json({ message: '로그인 실패: 유효하지 않은 자격 증명' });
    }
    // 로그인 성공
    res.cookie('token', token, { httpOnly: true, secure: nodeEnv === 'production' });
    return res.redirect('/');
  } catch (error) {
    // 예외 발생 시 서버 에러 응답
    res.status(500).json({ message: '서버 에러', error: error.message });
  }
}

export async function signup(req, res) {
  const { username, email, password } = req.body;
  try  {
    const user = await authServiceSignUp(username, email, password);
    if (!user) {
      return res.status(401).json({ message: '회원가입 실패' });
    }
    return res.status(201).json({
      message: '회원가입 성공',
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: '서버 에러', error: error.message });
  }
}

export async function naver(req, res) {
  let api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_id}&redirect_uri=${naver_redirect}&state=${state}`;
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.end(`<a href="${api_url}"><img height="50" src="http://static.nid.naver.com/oauth/small_g_in.PNG"/></a>`);
}

export async function naver_callback(req,res) {
  let accessToken;
  const code = req.query.code;
  const state = req.query.state;
  // Access token 요청
  let api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naver_id}&client_secret=${naver_secret}&redirect_uri=${naver_redirect}&code=${code}&state=${state}`;
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
        let parsedData = JSON.parse(body);
        accessToken = parsedData.access_token;
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        res.end(body);

      } else {
          res.status(response.statusCode).end();
          console.log('error = ' + response.statusCode);
      }
  });
  var header = "Bearer " + accessToken;
  api_url = 'https://openapi.naver.com/v1/nid/me';
  options = {
    url: api_url,
    headers: {'Authorization': header}
  };
  console.log("Success!")
  // 정보 보내기
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      responseBody = body;
      res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
      res.end(body);
    } else {
      console.log('error');
      if(response != null) {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    }
  });
  parsedData = JSON.parse(responseBody);
  

  /*
  const { id, email, name } = parsedData.response;
  let token = await authServiceLogin(email, password);
  let user;
  if (!token) {
    user = await authServiceSignUp(name, email, id);
    token = await authServiceLogin(email, password);
    res.cookie('token', token, { httpOnly: true, secure: nodeEnv === 'production' });
  }
  */
}
/*
export async function google(req,res) {
  let url = 'https://accounts.google.com/o/oauth2/v2/auth';
  url += `?client_id=${google_id}`
  url += `&redirect_uri=${google_redirect}`
  url += '&response_type=code'
  url += '&scope=email profile'
	res.redirect(url);
}

export async function google_callback(req,res) {
  const code = req.query.code;  // state 포함 해 말아;
  let api_url = `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${google_id}&client_secret=${google_secret}&redirect_uri=${google_redirect}&code=${code}`
  
}
*/