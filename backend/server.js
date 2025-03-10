import express from 'express';
import pg from 'pg';
import config from './config/postgresql.js';
import routes from './routes/index.js';

// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swaggerOptions.js';

// PostgreSQL 클라이언트 생성
const { Pool } = pg;

// Express 앱 생성
const app = express();
const port = 3000;

// 미들웨어
app.use(express.json());  // JSON 요청을 파싱하는 미들웨어
app.use(express.urlencoded({ extended: true }));  // form 데이터 파싱 미들웨어


// Swagger 문서 생성
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// PostgreSQL 연결 설정
const pool = new Pool(config);
export default pool;

// Swagger UI 경로 설정
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 기본 라우트
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

app.use("/api", routes);

// 서버 시작
app.listen(port, () => {
  console.log(`테스트, Server is running on http://localhost:${port}`);
});
