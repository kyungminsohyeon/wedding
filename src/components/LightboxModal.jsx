import React, { useEffect, useState } from 'react';

export default function LightboxModal({ gallery, currentIdx, isOpen, onClose, onChangeIdx }) {
  if (!isOpen || !gallery[currentIdx]) return null;

  const [touchStart, setTouchStart] = useState(0);

  const prev = () => {
    onChangeIdx((currentIdx - 1 + gallery.length) % gallery.length);
  };

  const next = () => {
    onChangeIdx((currentIdx + 1) % gallery.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIdx]);

  const handleTouchStart = (e) => {
    setTouchStart(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].screenX - touchStart;
    if (Math.abs(diff) > 40) {
      if (diff > 0) prev();
      else next();
    }
  };

  return (
    <div 
      className={`lightbox-modal ${isOpen ? 'active' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="닫기">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <button className="lightbox-prev" onClick={prev} aria-label="이전 사진">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button className="lightbox-next" onClick={next} aria-label="다음 사진">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="lightbox-content">
        <img 
          src={gallery[currentIdx].full || gallery[currentIdx].opt} 
          alt={gallery[currentIdx].alt} 
          className="lightbox-img" 
        />
        <div className="lightbox-counter">
          {currentIdx + 1} / {gallery.length}
        </div>
      </div>
    </div>
  );
}
