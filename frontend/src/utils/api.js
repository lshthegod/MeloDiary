// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// API 엔드포인트 생성 함수
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// 자주 사용하는 API 엔드포인트들
export const API_ENDPOINTS = {
  LOGIN: '/login',
  SIGNUP: '/signup/submit',
  LOGOUT: '/logout',
  PROFILE: '/profile',
  DIARY: '/diary',
  DIARY_WITH_PAGE: (page) => `/diary?page=${page}`,
};

// fetch 래퍼 함수
export const apiFetch = async (endpoint, options = {}) => {
  const url = createApiUrl(endpoint);
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, finalOptions);
  // 401/403 응답 처리 - 자동으로 로그인 페이지로 리다이렉트
  if (response.status === 401 || response.status === 403) {
    console.log('인증 실패 - 로그인 페이지로 리다이렉트');
    window.location.href = '/login';
    return response; // 리다이렉트 후에도 response 반환 (컴포넌트에서 추가 처리 방지)
  }
  
  return response;
}; 