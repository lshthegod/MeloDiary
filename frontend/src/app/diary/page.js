'use client';

import React, { useEffect, useState } from 'react';
import './DiaryPage.css';
import { apiFetch, API_ENDPOINTS } from '../../utils/api.js';

export default function DiaryPage() {
  const [diaries, setDiaries] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showNewDiaryForm, setShowNewDiaryForm] = useState(false);
  const [newDiaryTitle, setNewDiaryTitle] = useState('');
  const [newDiaryContent, setNewDiaryContent] = useState('');

  const fetchDiaries = async () => {
    const res = await apiFetch(API_ENDPOINTS.DIARY_WITH_PAGE(page));
    const data = await res.json();

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setDiaries((prev) => [...prev, ...data]);
    }
  };

  useEffect(() => {
    fetchDiaries();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewDiary = async () => {
    if (!newDiaryTitle.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!newDiaryContent.trim()) {
      alert('일기 내용을 입력해주세요.');
      return;
    }

    try {
      const res = await apiFetch(API_ENDPOINTS.DIARY, {
        method: 'POST',
        body: JSON.stringify({ title: newDiaryTitle, content: newDiaryContent }),
      });

      if (res.ok) {
        setNewDiaryTitle('');
        setNewDiaryContent('');
        setShowNewDiaryForm(false);
        setDiaries([]);
        setPage(1);
        setHasMore(true);
        fetchDiaries();
        alert('일기가 성공적으로 작성되었습니다.');
      } else {
        const data = await res.json();
        alert(data.message || '일기 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('일기 작성 중 오류가 발생했습니다:', error);
      alert('일기 작성에 실패했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await apiFetch(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
      });
      if (res.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="diary-wrapper">
      <header className="diary-header">
        <h1 className="logo">MeloDiary</h1>
        <nav className="diary-nav">
          <button className="nav-button" onClick={() => setShowNewDiaryForm(true)}>새 일기</button>
          <button className="nav-button" onClick={() => window.location.href = '/profile'}>내 프로필</button>
          <button className="nav-button" onClick={handleLogout}>로그아웃</button>
        </nav>
      </header>

      <main className="diary-container">
        {showNewDiaryForm && (
          <div className="new-diary-form">
            <input
              type="text"
              className="diary-title-input"
              placeholder="제목을 입력하세요"
              value={newDiaryTitle}
              onChange={e => setNewDiaryTitle(e.target.value)}
            />
            <textarea
              value={newDiaryContent}
              onChange={(e) => setNewDiaryContent(e.target.value)}
              placeholder="오늘의 일기를 작성해보세요...."
              className="diary-textarea"
            />
            <div className="diary-form-buttons">
              <button onClick={handleNewDiary} className="submit-button">작성하기</button>
              <button onClick={() => setShowNewDiaryForm(false)} className="cancel-button">취소</button>
            </div>
          </div>
        )}

        <ul className="diary-list">
          {diaries.map((entry) => (
            <li className="diary-entry" key={entry.id}>
              <p className="diary-content">{entry.content}</p>
              <div className="diary-interactions">
                <button className="like-button">좋아요<br />{entry.likes_count}</button>
                <button className="comment-button">댓글</button>
              </div>
              <div className="diary-footer">
                작성일: {new Date(entry.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
        <div className="diary-footer-buttons">
          {hasMore && (
            <button className="footer-button" onClick={handleLoadMore}>
              더 보기
            </button>
          )}
          <button className="footer-button" onClick={scrollToTop}>
            맨 위로
          </button>
        </div>
      </main>
    </div>
  );
}
