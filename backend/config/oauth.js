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

export { naver_id, naver_secret, naver_redirect};