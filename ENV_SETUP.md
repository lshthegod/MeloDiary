# 환경 변수 설정 가이드

## 개요
MeloDiary 프로젝트는 Docker 환경에서 환경 변수를 통해 설정을 관리합니다.

## 환경 변수 파일 생성

### 1. 백엔드 환경 변수 설정

```bash
# backend/.env 파일 생성
cp backend/env.example backend/.env
```

`backend/.env` 파일 예시:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=melodiary
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 2. 프론트엔드 환경 변수 설정

```bash
# frontend/.env.local 파일 생성
cp frontend/env.example frontend/.env.local
```

`frontend/.env.local` 파일 예시:
```env
# API Configuration
# Development
NEXT_PUBLIC_API_URL=http://localhost:3001

# Production (Vercel 배포 시)
# NEXT_PUBLIC_API_URL=https://your-ec2-domain.com
# 또는
# NEXT_PUBLIC_API_URL=http://your-ec2-ip:3001

# App Configuration
NEXT_PUBLIC_APP_NAME=MeloDiary
```

## 배포 환경별 설정

### 개발 환경 (로컬)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Vercel + EC2 배포 환경
```env
NEXT_PUBLIC_API_URL=https://your-ec2-domain.com
# 또는
NEXT_PUBLIC_API_URL=http://your-ec2-ip:3001
```

### Vercel 환경 변수 설정
1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Environment Variables
3. `NEXT_PUBLIC_API_URL` 추가
4. Value에 EC2 서버 주소 입력

## Docker에서 환경 변수 사용

### 1. Docker Compose 사용 (권장)
```bash
# 환경 변수 파일과 함께 실행
docker-compose up --build
```

### 2. 개별 Docker 실행
```bash
# 백엔드
docker run --env-file ./backend/.env -p 3001:3001 backend

# 프론트엔드
docker run --env-file ./frontend/.env -p 3000:3000 frontend
```

## 환경 변수 우선순위

1. `docker-compose.yml`의 `environment` 섹션
2. `env_file`로 지정된 `.env` 파일
3. Dockerfile의 `ENV` 명령
4. 시스템 환경 변수

## API URL 관리

프로젝트에서는 `frontend/src/utils/api.js` 파일을 통해 API URL을 중앙 관리합니다:

```javascript
// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// API 엔드포인트 생성 함수
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};
```

## 보안 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- 프로덕션 환경에서는 더 강력한 비밀번호와 JWT 시크릿을 사용하세요
- 데이터베이스 비밀번호는 안전하게 관리하세요
- `NEXT_PUBLIC_` 접두사가 붙은 환경 변수는 클라이언트에 노출됩니다

## 환경별 설정

### 개발 환경
- `NODE_ENV=development`
- 로컬 데이터베이스 사용
- 디버깅 로그 활성화

### 프로덕션 환경
- `NODE_ENV=production`
- 프로덕션 데이터베이스 사용
- 로그 레벨 조정
- HTTPS 설정 