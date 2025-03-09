import { login as authServiceLogin } from '../services/auth.js';

// 클라이언트로부터 받은 로그인 요청 처리 함수
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // 서비스 계층에서 로그인 로직 수행
    const token = await authServiceLogin.login(email, password);

    // 로그인 실패 (예: 유효하지 않은 자격증명)
    if (!token) {
      return res.status(401).json({ message: '로그인 실패: 유효하지 않은 자격 증명' });
    }

    // 로그인 성공
    res.status(200).json({ message: '로그인 성공', token });
  } catch (error) {
    // 예외 발생 시 서버 에러 응답
    res.status(500).json({ message: '서버 에러', error: error.message });
  }
}