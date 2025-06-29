'use client';

import React, { useState } from 'react';
import Link from "next/link";
import './SignupPage.css';
import { apiFetch, API_ENDPOINTS } from '../../utils/api.js';

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
  return passwordRegex.test(password);
}

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (!isValidPassword(password)) {
      alert('비밀번호는 8자 이상이며, 영문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await apiFetch(API_ENDPOINTS.SIGNUP, {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(data.message || '회원가입 성공!');
        window.location.href = data.redirectUrl;
      } else {
        alert(data.message || '회원가입 실패');
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-logo">MeloDiary</h1>

      <div className="signup-card">
        <input
          type="text"
          placeholder="사용자 이름을 입력하세요"
          className="signup-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="이메일 주소를 입력하세요"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="signup-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="signup-button" onClick={handleSignup}>회원가입</button>
        <p className="login-text">
          이미 계정이 있으신가요? <Link href="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
}
