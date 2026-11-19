import React from 'react';

export default function Gallery({ config, onOpenLightbox }) {
  const { gallery } = config;

  return (
    <section className="gallery-section" id="gallery">
      <div className="reveal active">
        <span className="section-tag">GALLERY</span>
        <h2 className="section-title">우리의 가장 빛나는 순간</h2>
      </div>

      <div className="gallery-grid">
        {gallery.map((item, index) => (
          <div 
            key={index} 
            className={`gallery-item reveal active ${item.aspect === 'landscape' ? 'span-2' : ''}`}
            onClick={() => onOpenLightbox(index)}
          >
            <img src={item.opt} alt={item.alt} loading="lazy" />
            <div className="gallery-item-overlay">
              <div className="gallery-zoom-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
