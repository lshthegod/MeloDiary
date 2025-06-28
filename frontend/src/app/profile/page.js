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
  }, []);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch('http://localhost:3001/profile', {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        setUserInfo({
          username: data.username,
          email: data.email,
          createdAt: data.createdAt || data.created_at,
        });
        // diary 필드에서 일기 목록 가져오기
        setUserDiaries(data.diary || []);
      }
    } catch (error) {
      console.error('프로필 정보를 불러오는데 실패했습니다:', error);
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
            <p><strong>가입일:</strong> {userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : '정보 없음'}</p>
          </div>
        </section>

        <section className="user-diaries">
          <h2>내가 작성한 일기</h2>
          <div className="diary-list">
            {userDiaries.length > 0 ? (
              userDiaries.map((diary) => (
                <div key={diary.id} className="diary-card">
                  <h3 className="diary-title">{diary.title}</h3>
                  <p className="diary-content">{diary.content}</p>
                  <div className="diary-meta">
                    <span className="diary-date">
                      {new Date(diary.created_at).toLocaleString()}
                    </span>
                    <span className="diary-likes">좋아요 {diary.likes_count || 0}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-diaries">아직 작성한 일기가 없습니다.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
