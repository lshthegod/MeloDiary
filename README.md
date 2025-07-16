# MeloDiary

사용자가 감정 태그와 함께 일기를 작성하고 사람들과 공유하는 감성 일기장 서비스

## **기술 스택**

### **프론트엔드**

- **Next.js**
- **React**

### **백엔드**

- **Node.js + Express**
- **PostgreSQL**
- **Docker** / **Docker Compose**

## **주요 기능**

- **회원가입 / 로그인 / 로그아웃**
    
    이메일 기반 회원가입 및 JWT 인증
    
- **일기 작성 / 수정 / 삭제**
    
    감정 태그와 함께 텍스트로 일상 기록
    
- **댓글**
    
    일기에 댓글 작성 및 삭제
    
- **좋아요**
    
    일기에 좋아요 추가 및 취소
    
- **프로필**
    
    내 정보(이메일, 닉네임, 가입일) 및 내가 작성한 일기 목록 확인
    
- **보안**
    
    JWT 기반 인증, 비밀번호 해시화, CORS 설정
    
- **Docker 지원**
    
    개발 및 운영 환경 모두 Docker로 손쉽게 실행 가능
    

## **설치 및 실행 방법**

### **1. 환경 변수 설정**

- `backend/.env`
- `frontend/.env`

### **2-1. Docker로 전체 실행 (권장)**

루트 디렉토리에서 아래 명령어 실행:

```docker
docker-compose up --build
```

- 프론트엔드: http://localhost:3000
- 백엔드: http://localhost:3001

### **2-2. 로컬 개발 환경 (직접 실행)**

- 백엔드 실행

```bash
cd backend
npm install
npm start
```

- 프론트 실행

```bash
cd frontend
npm install
npm run dev
```

- 프론트엔드: http://localhost:3000
- 백엔드: http://localhost:3001

## **기타**

- API 문서는 Swagger를 통해 확인 가능: `/docs`