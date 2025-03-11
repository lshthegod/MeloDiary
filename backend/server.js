import express from 'express';
import pg from 'pg';
import config from './config/postgresql.js';
import routes from './routes/index.js';
import cookieParser from 'cookie-parser';

// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swaggerOptions.js';

// 미들웨어
import authenticateJWT from './middlewares/auth.js';

// PostgreSQL 클라이언트 생성
const { Pool } = pg;

// Express 앱 생성
const app = express();
const port = 3000;

// 미들웨어
app.use(express.json());  // JSON 요청을 파싱하는 미들웨어
app.use(express.urlencoded({ extended: true }));  // form 데이터 파싱 미들웨어
app.use(cookieParser());
// app.use(authenticateJWT); 모든 라우터에 대한 로그인 인증 보안

// Swagger 문서 생성
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// PostgreSQL 연결 설정
const pool = new Pool(config);
export default pool;

// Swagger UI 경로 설정
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* 기본 라우터
app.get('/', async (req, res) => {
  try {
    // 풀에서 클라이언트를 가져옵니다.
    const client = await pool.connect();
    
    // 간단한 쿼리 실행 (현재 시간 조회)
    const result = await client.query('SELECT NOW()');
    
    // 사용 후 클라이언트 반환
    client.release();
    
    // 쿼리 결과를 클라이언트에 응답합니다.
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('데이터베이스 연결 오류');
  }
});
*/
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
app.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
  console.log(`http://localhost:${port} 에서 접속할 수 있습니다.`);
});
