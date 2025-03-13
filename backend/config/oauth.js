import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// ESM에서 __dirname 구현
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 상위 디렉토리의 .env 파일을 로드
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const naver_id = process.env.NAVER_CLIENT_ID;
const naver_secret = process.env.NAVER_CLIENT_SECRET;
const naver_redirect = process.env.NAVER_REDIRECT_URI;

const google_id = process.env.GOOGLE_CLIENT_ID;
const google_secret = process.env.GOOGLE_CLIENT_SECRET;
const google_redirect = process.env.GOOGLE_REDIRECT_URI;

export { naver_id, naver_secret, naver_redirect, google_id, google_secret, google_redirect };