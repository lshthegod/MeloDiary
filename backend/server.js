import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import config from './config/postgresql.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// 환경 변수 로드
dotenv.config();

// 환경 변수 로드 확인 로그
// console.log('환경 변수 로드 상태:');
// console.log('- NODE_ENV:', process.env.NODE_ENV);
// console.log('- PORT:', process.env.PORT);
// console.log('- FRONTEND_URL:', process.env.FRONTEND_URL);

// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swaggerOptions.js';

// PostgreSQL 클라이언트 생성
const { Pool } = pg;

// Express 앱 생성
const app = express();
const port = process.env.PORT || 3001;

// CORS 설정
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL // 환경 변수에서 프론트엔드 URL 가져오기
].filter(Boolean); // undefined 값 제거

app.use(cors({
  origin: function (origin, callback) {
    // 개발 환경에서는 모든 origin 허용
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // 프로덕션에서는 허용된 origin만
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS 정책에 의해 차단됨'));
    }
  },
  credentials: true,
}));

// 미들웨어
app.use(express.json());  // JSON 요청을 파싱하는 미들웨어
app.use(express.urlencoded({ extended: true }));  // form 데이터 파싱 미들웨어
app.use(cookieParser());

// Swagger 문서 생성
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// PostgreSQL 연결 설정
const pool = new Pool(config);
export default pool;

// Swagger UI 경로 설정
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);

pool.connect()
  .then(client => {
    console.log('데이터베이스에 성공적으로 연결되었습니다.');
    client.release(); // 연결 반환
  })
  .catch(err => {
    console.error('데이터베이스 연결에 실패했습니다.', err.stack);
  });

// 서버 시작
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
  console.log(`http://localhost:${port} 에서 접속할 수 있습니다.`);
});

server.on("error", (err) => {
  console.error(`서버 오류 발생: ${err.message}`);
  process.exit(1);
});