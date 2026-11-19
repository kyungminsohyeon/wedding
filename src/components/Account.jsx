import React, { useState } from 'react';

export default function Account({ config, showToast }) {
  const { groom, bride } = config;
  const [openGroom, setOpenGroom] = useState(false);
  const [openBride, setOpenBride] = useState(false);

  const copyNumber = (text, name) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${name} 계좌번호가 복사되었습니다.`);
    }).catch(() => {
      showToast('복사에 실패했습니다.');
    });
  };

  return (
    <section className="account-section" id="account">
      <div className="reveal active">
        <span className="section-tag">ACCOUNT</span>
        <h2 className="section-title">마음 전하실 곳</h2>
      </div>

      <p className="account-desc reveal active">
        참석이 어려우신 분들을 위해<br />
        축하의 마음을 전할 수 있는 계좌번호를 안내해 드립니다.
      </p>

      <div className="accordion-group reveal active">
        {/* 신랑측 계좌 */}
        <div className={`accordion-item ${openGroom ? 'open' : ''}`}>
          <div className="accordion-header" onClick={() => setOpenGroom(!openGroom)}>
            <span className="accordion-title">신랑측 계좌번호 확인하기</span>
            <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="accordion-body" style={{ maxHeight: openGroom ? '500px' : '0' }}>
            <div className="account-card-list">
              <div className="account-card">
                <div className="account-info">
                  <span className="account-owner">신랑 {groom.name}</span>
                  <span className="account-details">{groom.account.bank} {groom.account.number}</span>
                </div>
                <button className="copy-btn" onClick={() => copyNumber(`${groom.account.bank} ${groom.account.number}`, `신랑 ${groom.name}`)}>
                  복사
                </button>
              </div>

              {groom.parentAccounts.map((acc, idx) => (
                <div className="account-card" key={idx}>
                  <div className="account-info">
                    <span className="account-owner">신랑측 {acc.relation} {acc.name}</span>
                    <span className="account-details">{acc.bank} {acc.number}</span>
                  </div>
                  <button className="copy-btn" onClick={() => copyNumber(`${acc.bank} ${acc.number}`, `${acc.relation} ${acc.name}`)}>
                    복사
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 신부측 계좌 */}
        <div className={`accordion-item ${openBride ? 'open' : ''}`}>
          <div className="accordion-header" onClick={() => setOpenBride(!openBride)}>
            <span className="accordion-title">신부측 계좌번호 확인하기</span>
            <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="accordion-body" style={{ maxHeight: openBride ? '500px' : '0' }}>
            <div className="account-card-list">
              <div className="account-card">
                <div className="account-info">
                  <span className="account-owner">신부 {bride.name}</span>
                  <span className="account-details">{bride.account.bank} {bride.account.number}</span>
                </div>
                <button className="copy-btn" onClick={() => copyNumber(`${bride.account.bank} ${bride.account.number}`, `신부 ${bride.name}`)}>
                  복사
                </button>
              </div>

              {bride.parentAccounts.map((acc, idx) => (
                <div className="account-card" key={idx}>
                  <div className="account-info">
                    <span className="account-owner">신부측 {acc.relation} {acc.name}</span>
                    <span className="account-details">{acc.bank} {acc.number}</span>
                  </div>
                  <button className="copy-btn" onClick={() => copyNumber(`${acc.bank} ${acc.number}`, `${acc.relation} ${acc.name}`)}>
                    복사
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
