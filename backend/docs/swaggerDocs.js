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
/**
 * @swagger
 * paths:
 *   /diary:
 *     post:
 *       summary: 새로운 다이어리 생성
 *       description: 사용자 일기를 생성합니다.
 *       tags:
 *         - Diary
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                   example: "87ca1efa-4ac5-4a6a-8982-f2c58e6decd1"
 *                 title:
 *                   type: string
 *                   example: "오늘의 일기"
 *                 content:
 *                   type: string
 *                   example: "오늘은 날씨가 좋았다."
 *                 mood_tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["happy", "excited"]
 *                 spotify_track_id:
 *                   type: string
 *                   example: "3n3Ppam7vgaVa1iaRUc9Lp"
 *       responses:
 *         201:
 *           description: 일기 생성 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "550e8400-e29b-41d4-a716-446655440000"
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   mood_tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   spotify_track_id:
 *                     type: string
 *         500:
 *           description: 서버 에러
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "서버 에러"
 *                   error:
 *                     type: string
 *
 *   /diary/{id}:
 *     get:
 *       summary: 특정 다이어리 조회
 *       description: ID를 사용하여 다이어리 항목을 조회합니다.
 *       tags:
 *         - Diary
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: 조회할 다이어리의 UUID
 *       responses:
 *         200:
 *           description: 다이어리 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   mood_tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   spotify_track_id:
 *                     type: string
 *         404:
 *           description: 다이어리를 찾을 수 없음
 *         500:
 *           description: 서버 에러
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "서버 에러"
 *                   error:
 *                     type: string
 */
/**
 * @swagger
 * /diary/{id}:
 *   patch:
 *     summary: 다이어리 수정
 *     description: ID를 사용하여 해당 다이어리의 정보를 수정합니다. (수정 가능한 필드는 title, content, mood_tags, spotify_track_id입니다.)
 *     tags:
 *       - Diary
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 수정할 다이어리의 UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "오늘의 다이어리를 수정합니다"
 *               content:
 *                 type: string
 *                 example: "수정된 내용"
 *               mood_tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["busy", "tired"]
 *               spotify_track_id:
 *                 type: string
 *                 example: "3n3Ppam7vgaVa1iaRUc9Lp"
 *     responses:
 *       200:
 *         description: 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 mood_tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 spotify_track_id:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: 수정할 다이어리를 찾지 못함
 *       500:
 *         description: 서버 에러
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
 *
 *   delete:
 *     summary: 다이어리 삭제
 *     description: ID를 사용하여 해당 다이어리를 삭제합니다.
 *     tags:
 *       - Diary
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 삭제할 다이어리의 UUID
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "삭제 성공"
 *       404:
 *         description: 삭제할 다이어리를 찾지 못함
 *       500:
 *         description: 서버 에러
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
 */