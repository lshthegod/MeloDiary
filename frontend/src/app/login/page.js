// src/app/login/page.js
import React from 'react';
import './LoginPage.css';

export default function LoginPage() {
  return (
    <div className="login-container">
      <h1 className="login-logo">MeloDiary</h1>

      <div className="login-card">
        <input
          type="email"
          placeholder="이메일 주소를 입력하세요"
          className="login-input"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="login-input"
        />
        <button className="login-button">로그인</button>
        <p className="signup-text">
          아직 계정이 없으신가요? <a href="#">회원가입</a>
        </p>
      </div>
    </div>
  );
}
