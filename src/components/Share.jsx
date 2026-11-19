import React from 'react';

export default function Share({ config, showToast }) {
  const { groom, bride } = config;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${groom.name} & ${bride.name}의 모바일 청첩장`,
        text: '저희 두 사람의 새로운 시작을 함께 축복해 주세요.',
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('청첩장 링크가 복사되었습니다. 카카오톡이나 메시지로 공유해 보세요!');
    }).catch(() => {
      showToast('링크 복사에 실패했습니다.');
    });
  };

  return (
    <>
      <section className="share-section" id="share">
        <div className="reveal active">
          <span className="section-tag">SHARE</span>
          <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-main)' }}>모바일 청첩장 공유하기</h3>
        </div>

        <div className="share-buttons reveal active">
          <button className="share-btn" onClick={handleShare}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.87 1.86 5.39 4.67 6.72l-.96 3.56a.5.5 0 0 0 .73.54l4.24-2.82c.43.04.87.06 1.32.06 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
            </svg>
            공유하기
          </button>
          <button className="share-btn" onClick={handleCopyLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            링크 복사
          </button>
        </div>
      </section>

      <footer className="footer">
        <p className="footer-quote">Thank you</p>
        <p className="footer-copy">© 2027 {groom.englishName.toUpperCase()} & {bride.englishName.toUpperCase()}. ALL RIGHTS RESERVED.</p>
      </footer>
    </>
  );
}
