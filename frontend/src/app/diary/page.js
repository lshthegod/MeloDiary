'use client';

import React, { useEffect, useState } from 'react';
import './DiaryPage.css';

export default function DiaryPage() {
  const [diaries, setDiaries] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchDiaries = async () => {
    const res = await fetch(`http://localhost:3001/diary?page=${page}`, {
      credentials: 'include',
    });
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

  return (
    <div className="diary-wrapper">
      <header className="diary-header">
        <h1 className="logo">MeloDiary</h1>
        <nav className="diary-nav">
          <button className="nav-button">새 일기</button>
          <button className="nav-button">내 프로필</button>
          <button className="nav-button">로그아웃</button>
        </nav>
      </header>

      <main className="diary-container">
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
