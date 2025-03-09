import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// ESM에서 __dirname 구현
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 상위 디렉토리의 .env 파일을 로드
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const config = {
    connectionString: process.env.DATABASE_URL,
};

export default config;
