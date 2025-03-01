import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'Express API with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: [
        path.join(__dirname, '../routes/*.js'),
        path.join(__dirname, '../docs/swaggerDocs.js'),
    ],
};

export default options;
