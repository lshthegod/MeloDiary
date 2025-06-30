'use client';

import React, { useState } from 'react';
import Link from "next/link";
import './LoginPage.css';
import { apiFetch, API_ENDPOINTS } from '../../utils/api.js';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await apiFetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = data.redirectUrl;
      } else {
        const data = await res.json();
        alert(data.message || '로그인 실패');
      }
    } catch (error) {
      console.error(error);
      alert('서버 오류');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-logo">MeloDiary</h1>

      <div className="login-card">
        <input
          type="email"
          placeholder="이메일 주소를 입력하세요"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>
        <p className="signup-text">
          아직 계정이 없으신가요? <Link href="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
}