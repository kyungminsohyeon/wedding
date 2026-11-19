import React from 'react';

export default function Location({ config, showToast }) {
  const { venue } = config;

  const copyAddress = () => {
    navigator.clipboard.writeText(venue.address).then(() => {
      showToast('웨딩홀 주소가 복사되었습니다.');
    }).catch(() => {
      showToast('주소 복사에 실패했습니다.');
    });
  };

  return (
    <section className="location-section" id="location">
      <div className="reveal active">
        <span className="section-tag">LOCATION</span>
        <h2 className="section-title">오시는 길</h2>
      </div>

      <div className="venue-card reveal active">
        <h3 className="venue-name">{venue.name}</h3>
        <p className="venue-hall">{venue.hall}</p>

        <div className="venue-address-wrapper">
          <p className="venue-address">{venue.address}</p>
          <p className="venue-address-detail">{venue.addressDetail}</p>
          <button className="copy-address-btn" onClick={copyAddress}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            주소 복사
          </button>
        </div>

        {/* 지도 비주얼 핀 */}
        <div className="map-embed-container">
          <div className="map-embed-overlay">
            <div className="map-pin">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>{venue.name}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              아래 버튼을 눌러 원하시는 지도로 바로 길안내를 받으세요.
            </p>
          </div>
        </div>

        {/* 3대 네비게이션 앱 원클릭 연동 */}
        <div className="navi-buttons">
          <a href={venue.naviLinks.kakaoMap} target="_blank" rel="noopener noreferrer" className="navi-btn navi-btn-kakao">
            <span>🟡 카카오맵</span>
          </a>
          <a href={venue.naviLinks.naverMap} target="_blank" rel="noopener noreferrer" className="navi-btn navi-btn-naver">
            <span>🟢 네이버 지도</span>
          </a>
          <a href={venue.naviLinks.tmap} className="navi-btn navi-btn-tmap">
            <span>🔵 티맵 (T map)</span>
          </a>
        </div>
      </div>

      {/* 대중교통 및 주차 안내 */}
      <div className="transport-guide reveal active">
        <div className="transport-item">
          <div className="transport-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <div className="transport-info">
            <h4>지하철 이용 시</h4>
            <p>
              {venue.transport.subway.map((s, idx) => (
                <span key={idx}>
                  <strong>{s.line}</strong> {s.desc}<br/>
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="transport-item">
          <div className="transport-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 17h2l.64-2.54a6 6 0 0 0-.29-4.32L19.5 5.5A2 2 0 0 0 17.65 4H6.35a2 2 0 0 0-1.85 1.5L2.65 10.14a6 6 0 0 0-.29 4.32L3 17h2"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
          </div>
          <div className="transport-info">
            <h4>버스 이용 시</h4>
            <p>
              {venue.transport.bus.map((b, idx) => (
                <span key={idx}>
                  <strong>{b.type}:</strong> {b.desc}<br/>
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="transport-item">
          <div className="transport-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9 17V7h4a3 3 0 0 1 0 6H9"></path>
            </svg>
          </div>
          <div className="transport-info">
            <h4>자가용 / 주차 안내</h4>
            <p>{venue.transport.parking}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
