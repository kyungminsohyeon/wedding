import React from 'react';

export default function Rsvp({ showToast }) {
  return (
    <section className="rsvp-section" id="rsvp">
      <div className="reveal active">
        <span className="section-tag">RSVP</span>
        <h2 className="section-title">참석 여부 전달하기</h2>
      </div>

      <div className="rsvp-card reveal active" style={{ padding: '24px 16px 20px' }}>
        <p className="rsvp-desc" style={{ marginBottom: '20px' }}>
          원활한 연회 및 예식 준비를 위해<br />
          참석 여부를 미리 알려주시면 감사하겠습니다.
        </p>

        {/* 구글 폼 웹뷰 임베드 */}
        <div style={{ width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#ffffff', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <iframe 
            src="https://docs.google.com/forms/d/1gkoix-sYNahkL5h-VgjDD9INf8h60voor0fOLe7PQXU/viewform?embedded=true" 
            width="100%" 
            height="620" 
            style={{ display: 'block', border: 'none', width: '100%' }}
            title="참석 여부 전달 구글 폼"
          >
            설문지 로드 중…
          </iframe>
        </div>

        <div style={{ textAlign: 'center', marginTop: '14px' }}>
          <a 
            href="https://docs.google.com/forms/d/1gkoix-sYNahkL5h-VgjDD9INf8h60voor0fOLe7PQXU/viewform" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ fontSize: '12px', color: 'var(--accent)', textDecoration: 'underline', letterSpacing: '0.5px' }}
          >
            화면이 잘 보이지 않으시면 새 창으로 열기 ↗
          </a>
        </div>
      </div>
    </section>
  );
}
