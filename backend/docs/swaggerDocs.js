/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Auth & Time API
 *   version: 1.0.0
 */

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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 로그인
 *     description: 사용자의 이메일과 비밀번호를 이용해 로그인을 수행하고 JWT 토큰을 반환합니다.
 *     requestBody:
 *       description: 로그인에 필요한 사용자 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자의 이메일 주소
 *                 example: "testuser@example.com"
 *               password:
 *                 type: string
 *                 description: 사용자의 비밀번호
 *                 example: "securePassword123!"
 *     responses:
 *       '200':
 *         description: 로그인 성공, JWT 토큰 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 성공"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       '401':
 *         description: 로그인 실패, 잘못된 자격 증명
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 실패: 유효하지 않은 자격 증명"
 *       '500':
 *         description: 서버 내부 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 에러"
 *                 error:
 *                   type: string
 *                   example: "에러 메시지"
 */

/**
 * @swagger
 * /signup/submit:
 *   post:
 *     summary: "사용자 회원가입"
 *     description: "새로운 사용자를 회원가입합니다."
 *     tags:
 *       - "Auth"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "testuser"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "testuser@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123!"
 *     responses:
 *       201:
 *         description: "회원가입 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입 성공"
 *       401:
 *         description: "회원가입 실패"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입 실패"
 *       500:
 *         description: "서버 에러 발생"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 에러"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */