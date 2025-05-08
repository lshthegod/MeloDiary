'use client';

import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    createdAt: '',
  });
  const [userDiaries, setUserDiaries] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchUserDiaries();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch('http://localhost:3001/profile', {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setUserInfo(data);
      }
    } catch (error) {
      console.error('프로필 정보를 불러오는데 실패했습니다:', error);
    }
  };

  const fetchUserDiaries = async () => {
    try {
      const res = await fetch('http://localhost:3001/profile/diaries', {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setUserDiaries(data);
      }
    } catch (error) {
      console.error('일기 목록을 불러오는데 실패했습니다:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:3001/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="profile-wrapper">
      <header className="profile-header">
        <h1 className="logo">MeloDiary</h1>
        <nav className="profile-nav">
          <button className="nav-button" onClick={() => window.location.href = '/diary'}>일기장</button>
          <button className="nav-button" onClick={handleLogout}>로그아웃</button>
        </nav>
      </header>

      <main className="profile-container">
        <section className="profile-info">
          <h2>내 프로필</h2>
          <div className="user-info">
            <p><strong>사용자 이름:</strong> {userInfo.username}</p>
            <p><strong>이메일:</strong> {userInfo.email}</p>
            <p><strong>가입일:</strong> {new Date(userInfo.createdAt).toLocaleDateString()}</p>
          </div>
        </section>

        <section className="user-diaries">
          <h2>내가 작성한 일기</h2>
          <div className="diary-list">
            {userDiaries.map((diary) => (
              <div key={diary.id} className="diary-card">
                <p className="diary-content">{diary.content}</p>
                <div className="diary-meta">
                  <span className="diary-date">
                    {new Date(diary.created_at).toLocaleString()}
                  </span>
                  <span className="diary-likes">좋아요 {diary.likes_count}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
