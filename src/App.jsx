import React, { useState, useEffect } from 'react';
import WEDDING_CONFIG from './config.js';
import TopNav from './components/TopNav.jsx';
import Hero from './components/Hero.jsx';
import Greeting from './components/Greeting.jsx';
import Calendar from './components/Calendar.jsx';
import Gallery from './components/Gallery.jsx';
import Location from './components/Location.jsx';
import Account from './components/Account.jsx';
import Rsvp from './components/Rsvp.jsx';
import Guestbook from './components/Guestbook.jsx';
import Share from './components/Share.jsx';
import ContactModal from './components/ContactModal.jsx';
import LightboxModal from './components/LightboxModal.jsx';
import Toast from './components/Toast.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('wedding_theme') || 'editorial');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState({ isOpen: false, idx: 0 });
  const [toast, setToast] = useState({ message: '', isVisible: false });

  // 테마 적용
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('wedding_theme', theme);
  }, [theme]);

  // 브라우저 탭 타이틀
  useEffect(() => {
    document.title = `${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}의 모바일 청첩장`;
  }, []);

  const showToast = (message) => {
    setToast({ message, isVisible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 2400);
  };

  const openLightbox = (idx) => {
    setLightboxState({ isOpen: true, idx });
  };

  const closeLightbox = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  const changeLightboxIdx = (idx) => {
    setLightboxState(prev => ({ ...prev, idx }));
  };

  return (
    <main className="app-container">
      {/* 상단 테마 & BGM 바 */}
      <TopNav theme={theme} setTheme={setTheme} />

      {/* 1. 히어로 커버 */}
      <Hero config={WEDDING_CONFIG} />

      {/* 2. 모시는 글 & 인사말 */}
      <Greeting config={WEDDING_CONFIG} onOpenContact={() => setIsContactOpen(true)} />

      {/* 3. 캘린더 & D-Day 카운트다운 */}
      <Calendar config={WEDDING_CONFIG} />

      {/* 4. 갤러리 */}
      <Gallery config={WEDDING_CONFIG} onOpenLightbox={openLightbox} />

      {/* 5. 오시는 길 & 지도 */}
      <Location config={WEDDING_CONFIG} showToast={showToast} />

      {/* 6. 마음 전하실 곳 (계좌) */}
      <Account config={WEDDING_CONFIG} showToast={showToast} />

      {/* 7. 참석 여부 전달 (RSVP) */}
      <Rsvp showToast={showToast} />

      {/* 8. 축하 방명록 */}
      <Guestbook showToast={showToast} />

      {/* 9. 공유하기 & 푸터 */}
      <Share config={WEDDING_CONFIG} showToast={showToast} />

      {/* 연락처 바텀 시트 모달 */}
      <ContactModal 
        config={WEDDING_CONFIG} 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      {/* 사진 전체화면 라이트박스 */}
      <LightboxModal 
        gallery={WEDDING_CONFIG.gallery} 
        currentIdx={lightboxState.idx} 
        isOpen={lightboxState.isOpen} 
        onClose={closeLightbox} 
        onChangeIdx={changeLightboxIdx} 
      />

      {/* 토스트 메시지 */}
      <Toast message={toast.message} isVisible={toast.isVisible} />
    </main>
  );
}
