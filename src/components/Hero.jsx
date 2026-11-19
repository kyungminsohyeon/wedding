import React from 'react';

export default function Hero({ config }) {
  const { groom, bride, weddingDate, venue, coverImage } = config;

  return (
    <section className="hero-section" id="hero">
      <header className="hero-header reveal active">
        <span className="hero-subtitle">Wedding Invitation</span>
        <h1 className="hero-title">SAVE THE DATE</h1>
      </header>

      <div className="hero-photo-wrapper reveal active">
        <img 
          src={coverImage} 
          alt={`${groom.name} & ${bride.name} 웨딩 사진`} 
          className="hero-photo"
        />
        <div className="hero-photo-overlay"></div>
        <div className="hero-badge">
          <p className="badge-label">Forever & Always</p>
          <p className="badge-names">{groom.englishName} & {bride.englishName}</p>
        </div>
      </div>

      <footer className="hero-footer reveal active">
        <h2 className="hero-couple-names">
          {groom.name} <span>&</span> {bride.name}
        </h2>
        <p className="hero-date-venue">
          {weddingDate.year}.{String(weddingDate.month).padStart(2, '0')}.{String(weddingDate.day).padStart(2, '0')} {weddingDate.dayOfWeek} {weddingDate.time} | {venue.name}
        </p>

        <div className="scroll-indicator" aria-hidden="true">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </footer>
    </section>
  );
}
