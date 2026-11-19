import React, { useState, useEffect } from 'react';

export default function TopNav({ theme, setTheme }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleBgm = () => {
    if (window.weddingAudio) {
      const playing = window.weddingAudio.toggle();
      setIsPlaying(playing);
    }
  };

  return (
    <header className="top-nav">
      {/* 3가지 페이지시스터즈 감성 테마 스위처 */}
      <nav className="theme-switcher" aria-label="테마 변경">
        <button 
          className={`theme-btn ${theme === 'editorial' ? 'active' : ''}`}
          onClick={() => setTheme('editorial')}
          title="에디토리얼 크림 테마"
          aria-label="크림 테마"
        >
          🌸
        </button>
        <button 
          className={`theme-btn ${theme === 'olive' ? 'active' : ''}`}
          onClick={() => setTheme('olive')}
          title="모던 세이지 올리브 테마"
          aria-label="올리브 테마"
        >
          🌿
        </button>
        <button 
          className={`theme-btn ${theme === 'navy' ? 'active' : ''}`}
          onClick={() => setTheme('navy')}
          title="클래식 딥 네이비 테마"
          aria-label="네이비 테마"
        >
          🕊️
        </button>
      </nav>

      {/* 웨딩 BGM 플레이어 토글 */}
      <button 
        className={`bgm-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleBgm}
        aria-label="배경음악 재생/정지"
      >
        <div className="bgm-disc">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        <span className="bgm-label">{isPlaying ? 'BGM ON' : 'BGM'}</span>
      </button>
    </header>
  );
}
