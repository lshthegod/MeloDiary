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
 *     tags:
 *       - "Auth"
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
/**
 * @swagger
 * /diary:
 *   get:
 *     summary: 모든 다이어리 목록을 불러옵니다.
 *     description: 데이터베이스에서 모든 다이어리를 가져옵니다.
 *     tags:
 *       - Diary
 *     responses:
 *       200:
 *         description: 성공적으로 다이어리 목록을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: 다이어리의 고유 ID
 *                   title:
 *                     type: string
 *                     description: 다이어리 제목
 *                   content:
 *                     type: string
 *                     description: 다이어리 내용
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: 작성된 날짜 및 시간
 *       500:
 *         description: 서버 오류 발생
 */
/**
 * @swagger
 * /diary/{id}/like:
 *   post:
 *     summary: 다이어리 좋아요 추가
 *     description: 특정 다이어리에 좋아요를 추가합니다. 이미 좋아요를 누른 경우 중복 처리가 방지됩니다.
 *     tags:
 *       - Diary
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 좋아요를 추가할 다이어리의 ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: 좋아요 추가 성공. 업데이트된 다이어리 정보를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: 다이어리 ID
 *                 liked_users:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: 좋아요를 누른 사용자 ID 리스트
 *                 likes_count:
 *                   type: integer
 *                   description: 좋아요 총 갯수
 *       400:
 *         description: 잘못된 요청 - 다이어리 ID가 유효하지 않음.
 *       401:
 *         description: 인증 실패 - 유효한 JWT 토큰 필요.
 *       500:
 *         description: 서버 에러 발생.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 서버 에러
 *                 error:
 *                   type: string
 *                   description: 에러 상세 메시지
 * 
 */
/**
 * @swagger
 * /diary/{id}/like:
 *   delete:
 *     summary: 좋아요 취소
 *     description: 특정 일기에 대해 사용자의 좋아요를 취소합니다.
 *     tags:
 *       - Diary
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 좋아요를 취소할 일기의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: 좋아요를 취소할 사용자 ID
 *     responses:
 *       200:
 *         description: 좋아요가 성공적으로 취소됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Like removed
 *                 post:
 *                   type: object
 *                   description: 업데이트된 게시글 정보
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 해당 게시글 또는 사용자 없음
 *       500:
 *         description: 서버 오류
 */
/**
 * @swagger
 * /diary/{id}/comment:
 *   post:
 *     summary: 댓글 작성
 *     description: 특정 게시글에 댓글을 추가합니다.  
 *                  `userId`는 인증 토큰에서 자동으로 처리되므로 전송하지 않아도 됩니다.
 *     tags:
 *       - Diary
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 댓글을 추가할 게시글의 ID (diaryId)
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: 이 글 너무 좋아요!
 *     responses:
 *       200:
 *         description: 댓글이 성공적으로 추가됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment added
 *                 post:
 *                   type: object
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
/**
 * @swagger
 * /diary/{id}/comment/{commentId}:
 *   patch:
 *     summary: 댓글 수정
 *     description: 해당 댓글의 내용을 수정합니다.  
 *                  `userId`는 인증 토큰에서 자동으로 처리됩니다.
 *     tags:
 *       - Diary
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 게시글 ID (diaryId)
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: 수정할 댓글의 ID
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: 수정된 댓글 내용입니다.
 *     responses:
 *       200:
 *         description: 댓글이 성공적으로 수정됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment updated
 *                 post:
 *                   type: object
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 댓글 또는 게시글을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
/**
 * @swagger
 * /diary/{id}/comment/{commentId}:
 *   delete:
 *     summary: 댓글 삭제
 *     description: 특정 게시글의 특정 댓글을 삭제합니다.  
 *                  `userId`는 인증 토큰에서 자동으로 처리되므로 전송하지 않아도 됩니다.
 *     tags:
 *       - Diary
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 게시글 ID (diaryId)
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: 삭제할 댓글의 ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: 댓글이 성공적으로 삭제됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment deleted
 *                 post:
 *                   type: object
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 댓글 또는 게시글을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: 로그아웃
 *     tags:
 *       - Auth
 *     responses:
 *       '200':
 *         description: 로그아웃 성공 (쿠키 삭제)
 */
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: 사용자 프로필 조회
 *     description: JWT 토큰을 기반으로 로그인된 사용자의 프로필 정보를 반환합니다.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: 프로필 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "a2c8e7fa-9e8c-4a7d-a2ec-df3a17386b2f"
 *                 username:
 *                   type: string
 *                   example: "alice"
 *                 email:
 *                   type: string
 *                   example: "alice@example.com"
 *                 diary:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "d87d6fd1-2ac4-4db2-bce1-58c3b6811a59"
 *                       title:
 *                         type: string
 *                         example: "오늘 하루 요약"
 *       '401':
 *         description: 인증 실패 (JWT 누락 또는 만료됨)
 *       '500':
 *         description: 서버 에러
 */
