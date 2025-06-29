'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './HomePage.css';
import { apiFetch, API_ENDPOINTS } from '../utils/api.js';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const res = await apiFetch(API_ENDPOINTS.CHECK_AUTH);
      const data = await res.json();
      setIsLoggedIn(data.isLoggedIn);
    } catch (error) {
      console.error('로그인 상태 확인 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-logo">MeloDiary</h1>
        <nav className="home-nav">
          {isLoggedIn ? (
            <button 
              className="nav-button"
              onClick={() => window.location.href = '/diary'}
            >
              일기장으로 이동
            </button>
          ) : (
            <>
              <Link href="/login" className="nav-button">로그인</Link>
              <Link href="/signup" className="nav-button">회원가입</Link>
            </>
          )}
        </nav>
      </header>

      <main className="home-content">
        <section className="hero-section">
          <h2>당신의 하루를 기록하세요</h2>
          <p className="hero-description">
            MeloDiary는 당신의 일상을 특별하게 기록할 수 있는 공간입니다.<br />
            감정과 생각을 자유롭게 표현하고, 소중한 순간들을 보관하세요.
          </p>
          {!isLoggedIn && (
            <div className="cta-buttons">
              <Link href="/signup" className="cta-button primary">시작하기</Link>
              <Link href="/login" className="cta-button secondary">로그인</Link>
            </div>
          )}
        </section>

        <section className="features-section">
          <h3>MeloDiary의 특징</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>자유로운 기록</h4>
              <p>텍스트, 이미지 등 다양한 형식으로 일상을 기록하세요.</p>
            </div>
            <div className="feature-card">
              <h4>감정 표현</h4>
              <p>오늘의 감정을 이모지로 표현하고 기록하세요.</p>
            </div>
            <div className="feature-card">
              <h4>안전한 보관</h4>
              <p>당신의 소중한 기록을 안전하게 보관합니다.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2024 MeloDiary. All rights reserved.</p>
      </footer>
    </div>
  );
}