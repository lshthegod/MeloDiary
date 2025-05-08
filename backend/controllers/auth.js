import { login as authServiceLogin, signup as authServiceSignUp, logout as authServiceLogout } from '../services/auth.js';

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
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return res.status(200).json({ success: true, redirectUrl: '/diary' });
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
    return res.status(201).json({ message: '회원가입 성공', success: true, redirectUrl: '/login' });
  } catch (error) {
    res.status(500).json({ message: '서버 에러', error: error.message });
  }
}

export async function logout(req, res) {
  authServiceLogout(res);
  res.status(200).json({ message: '로그아웃 성공' });
}