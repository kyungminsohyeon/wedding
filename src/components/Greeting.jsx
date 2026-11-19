import React from 'react';

export default function Greeting({ config, onOpenContact }) {
  const { greeting, groom, bride } = config;

  return (
    <section className="greeting-section" id="greeting">
      <div className="reveal active">
        <span className="section-tag">INVITATION</span>
        <h2 className="section-title">소중한 분들을 초대합니다</h2>
      </div>

      <blockquote className="greeting-quote reveal active">
        {greeting.subtitle}
      </blockquote>

      <p className="greeting-text reveal active">
        {greeting.message}
      </p>

      {/* 양가 혼주 & 신랑 신부 서명 */}
      <div className="family-tree reveal active">
        <div className="family-row">
          <span className="family-parents">
            <strong>{groom.father.name}</strong> · <strong>{groom.mother.name}</strong>
          </span>
          <span className="family-relation">의 {groom.relation}</span>
          <span className="family-child">{groom.name}</span>
        </div>
        <div className="family-row">
          <span className="family-parents">
            <strong>{bride.father.name}</strong> · <strong>{bride.mother.name}</strong>
          </span>
          <span className="family-relation">의 {bride.relation}</span>
          <span className="family-child">{bride.name}</span>
        </div>
      </div>

      {/* 연락하기 모달 트리거 버튼 */}
      <button className="contact-trigger-btn reveal active" onClick={onOpenContact}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        신랑 & 신부에게 연락하기
      </button>
    </section>
  );
}
