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
  CHECK_AUTH: '/check-auth',
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

  return fetch(url, finalOptions);
}; 