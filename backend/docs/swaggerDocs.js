/**
 * @swagger
 * /:
 *   get:
 *     summary: 현재 시간 조회
 *     description: PostgreSQL 데이터베이스에 연결하여 현재 시간을 조회한 후, 결과를 반환합니다.
 *     responses:
 *       200:
 *         description: 성공 - 현재 시간이 포함된 결과 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   now:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-01T12:34:56.789Z"
 *       500:
 *         description: 데이터베이스 연결 오류 또는 기타 서버 에러 발생
 */