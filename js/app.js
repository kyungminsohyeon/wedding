/**
 * PageSisters Inspired Mobile Wedding Invitation Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function getConfig() {
  return window.WEDDING_CONFIG || (typeof WEDDING_CONFIG !== 'undefined' ? WEDDING_CONFIG : null);
}

function initApp() {
  renderContentFromConfig();
  initTheme();
  initBgm();
  initCountdownAndCalendar();
  initGallery();
  initAccordions();
  initContactModal();
  initRsvp();
  initGuestbook();
  initShare();
  initScrollReveal();
}

/**
 * 1. 테마 고정 (사용자 요청: 올리브 테마 고정)
 */
function initTheme() {
  document.documentElement.setAttribute('data-theme', 'olive');
}

/**
 * 2. CONFIG 데이터를 페이지 요소에 반영
 */
function renderContentFromConfig() {
  const cfg = getConfig();
  if (!cfg) {
    console.error('WEDDING_CONFIG not loaded');
    return;
  }

  // 브라우저 탭 타이틀
  document.title = `${cfg.groom.name} & ${cfg.bride.name}의 모바일 청첩장`;

  // Hero 커플 이름
  const heroNames = document.getElementById('heroCoupleNames');
  if (heroNames) {
    heroNames.innerHTML = `${cfg.groom.name} <span>&</span> ${cfg.bride.name}`;
  }

  // Hero 일시 & 장소 (요청: 시간까지 한 줄, 아랫줄에 장소)
  const heroDateVenue = document.getElementById('heroDateVenue');
  if (heroDateVenue) {
    heroDateVenue.innerHTML = `
      <span style="font-size: 14px; letter-spacing: 1px;">${cfg.weddingDate.year}.${String(cfg.weddingDate.month).padStart(2, '0')}.${String(cfg.weddingDate.day).padStart(2, '0')} ${cfg.weddingDate.dayOfWeek} ${cfg.weddingDate.time}</span>
      <span style="font-size: 15px; font-weight: 500; color: var(--accent); letter-spacing: 2px;">${cfg.venue.name}</span>
    `;
  }

  // Cover Image
  const heroImg = document.getElementById('heroCoverImg');
  if (heroImg && cfg.coverImage) {
    heroImg.src = cfg.coverImage;
    heroImg.alt = `${cfg.groom.name} & ${cfg.bride.name}`;
  }

  // Greeting Message
  const greetingMsg = document.getElementById('greetingMessage');
  if (greetingMsg && cfg.greeting.message) {
    greetingMsg.textContent = cfg.greeting.message;
  }

  // Family Relations
  const groomFamily = document.getElementById('groomFamily');
  if (groomFamily) {
    groomFamily.innerHTML = `
      <span class="family-parents"><strong>${cfg.groom.father.name}</strong> · <strong>${cfg.groom.mother.name}</strong></span>
      <span class="family-relation">의 ${cfg.groom.relation}</span>
      <span class="family-child">${cfg.groom.name}</span>
    `;
  }

  const brideFamily = document.getElementById('brideFamily');
  if (brideFamily) {
    brideFamily.innerHTML = `
      <span class="family-parents"><strong>${cfg.bride.father.name}</strong> · <strong>${cfg.bride.mother.name}</strong></span>
      <span class="family-relation">의 ${cfg.bride.relation}</span>
      <span class="family-child">${cfg.bride.name}</span>
    `;
  }

  // Venue Info (요청: 더화이트베일 엔터 영어 & 4층 W홀 반영)
  const venueName = document.getElementById('venueName');
  if (venueName) {
    venueName.innerHTML = `
      ${cfg.venue.name}<br>
      <span style="font-size: 15px; font-weight: 400; letter-spacing: 2.5px; color: var(--text-muted); display: block; margin-top: 4px;">${cfg.venue.englishName}</span>
    `;
  }

  const venueHall = document.getElementById('venueHall');
  if (venueHall) {
    venueHall.textContent = cfg.venue.hall;
  }

  const venueAddress = document.getElementById('venueAddress');
  if (venueAddress) venueAddress.textContent = cfg.venue.address;

  const venueAddressDetail = document.getElementById('venueAddressDetail');
  if (venueAddressDetail) venueAddressDetail.textContent = cfg.venue.addressDetail;

  // Navi Links
  const linkKakao = document.getElementById('linkKakao');
  if (linkKakao) linkKakao.href = cfg.venue.naviLinks.kakaoMap;

  const linkNaver = document.getElementById('linkNaver');
  if (linkNaver) linkNaver.href = cfg.venue.naviLinks.naverMap;

  const linkTmap = document.getElementById('linkTmap');
  if (linkTmap) linkTmap.href = cfg.venue.naviLinks.tmap;

  // Render Accounts
  renderAccounts(cfg);
}

/**
 * 계좌 목록 렌더링
 */
function renderAccounts(cfg) {
  const groomAccountList = document.getElementById('groomAccountList');
  if (groomAccountList) {
    let html = `
      <div class="account-card">
        <div class="account-info">
          <span class="account-owner">신랑 ${cfg.groom.name}</span>
          <span class="account-details">${cfg.groom.account.bank} ${cfg.groom.account.number}</span>
        </div>
        <button class="copy-btn" onclick="copyToClipboard('${cfg.groom.account.bank} ${cfg.groom.account.number}', '신랑 ${cfg.groom.name} 계좌번호가 복사되었습니다.')">
          복사
        </button>
      </div>
    `;

    cfg.groom.parentAccounts.forEach(acc => {
      html += `
        <div class="account-card">
          <div class="account-info">
            <span class="account-owner">신랑측 ${acc.relation} ${acc.name}</span>
            <span class="account-details">${acc.bank} ${acc.number}</span>
          </div>
          <button class="copy-btn" onclick="copyToClipboard('${acc.bank} ${acc.number}', '${acc.relation} ${acc.name} 계좌번호가 복사되었습니다.')">
            복사
          </button>
        </div>
      `;
    });
    groomAccountList.innerHTML = html;
  }

  const brideAccountList = document.getElementById('brideAccountList');
  if (brideAccountList) {
    let html = `
      <div class="account-card">
        <div class="account-info">
          <span class="account-owner">신부 ${cfg.bride.name}</span>
          <span class="account-details">${cfg.bride.account.bank} ${cfg.bride.account.number}</span>
        </div>
        <button class="copy-btn" onclick="copyToClipboard('${cfg.bride.account.bank} ${cfg.bride.account.number}', '신부 ${cfg.bride.name} 계좌번호가 복사되었습니다.')">
          복사
        </button>
      </div>
    `;

    cfg.bride.parentAccounts.forEach(acc => {
      html += `
        <div class="account-card">
          <div class="account-info">
            <span class="account-owner">신부측 ${acc.relation} ${acc.name}</span>
            <span class="account-details">${acc.bank} ${acc.number}</span>
          </div>
          <button class="copy-btn" onclick="copyToClipboard('${acc.bank} ${acc.number}', '${acc.relation} ${acc.name} 계좌번호가 복사되었습니다.')">
            복사
          </button>
        </div>
      `;
    });
    brideAccountList.innerHTML = html;
  }
}

/**
 * 3. BGM 토글
 */
function initBgm() {
  const bgmBtn = document.getElementById('bgmBtn');
  if (!bgmBtn) return;

  bgmBtn.addEventListener('click', () => {
    if (window.weddingAudio) {
      const playing = window.weddingAudio.toggle();
      if (playing) {
        bgmBtn.classList.add('playing');
        bgmBtn.querySelector('.bgm-label').textContent = 'BGM ON';
      } else {
        bgmBtn.classList.remove('playing');
        bgmBtn.querySelector('.bgm-label').textContent = 'BGM';
      }
    }
  });
}

/**
 * 4. D-Day 카운트다운 & 캘린더 생성
 */
function initCountdownAndCalendar() {
  const cfg = getConfig();
  if (!cfg) return;

  const targetDate = new Date(cfg.weddingDate.isoString);

  // 캘린더 헤더 렌더링 (요청: 2027.02 -> 2027.02.28 변경, 밑에 문구 삭제)
  const calHeaderMonth = document.getElementById('calYearMonth');
  if (calHeaderMonth) {
    calHeaderMonth.textContent = `${cfg.weddingDate.year}.${String(cfg.weddingDate.month).padStart(2, '0')}.${String(cfg.weddingDate.day).padStart(2, '0')}`;
  }

  // 달력 테이블 렌더링
  renderCalendarTable(cfg.weddingDate.year, cfg.weddingDate.month, cfg.weddingDate.day);

  // 실시간 카운트다운 업데이트
  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMins');
    const secsEl = document.getElementById('countSecs');
    const bannerEl = document.getElementById('countdownBanner');

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');

      if (bannerEl) {
        bannerEl.innerHTML = `${cfg.groom.name} & ${cfg.bride.name}의 결혼식이 <strong>${days}일</strong> 남았습니다.`;
      }
    } else {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      if (bannerEl) {
        bannerEl.innerHTML = `소중한 발걸음으로 축복해 주셔서 <strong>감사합니다.</strong>`;
      }
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function renderCalendarTable(year, month, targetDay) {
  const calBody = document.getElementById('calendarBody');
  if (!calBody) return;

  const firstDay = new Date(year, month - 1, 1).getDay(); // 0: 일요일
  const lastDate = new Date(year, month, 0).getDate();

  let html = '<tr>';
  let dayCount = 0;

  // 첫째 주 빈칸
  for (let i = 0; i < firstDay; i++) {
    html += '<td class="empty"></td>';
    dayCount++;
  }

  // 날짜 채우기
  for (let d = 1; d <= lastDate; d++) {
    if (dayCount % 7 === 0 && dayCount !== 0) {
      html += '</tr><tr>';
    }

    const isSunday = (dayCount % 7 === 0);
    const isTarget = (d === targetDay);

    let classes = [];
    if (isSunday) classes.push('sunday');
    if (isTarget) classes.push('d-day-cell');

    const classStr = classes.length ? ` class="${classes.join(' ')}"` : '';
    html += `<td${classStr}><span>${d}</span></td>`;

    dayCount++;
  }

  // 마지막 주 빈칸
  while (dayCount % 7 !== 0) {
    html += '<td class="empty"></td>';
    dayCount++;
  }

  html += '</tr>';
  calBody.innerHTML = html;
}

/**
 * 5. 갤러리 (터치 슬라이더 & 모자이크 그리드 듀얼 뷰)
 */
let currentLightboxIdx = 0;
let currentSliderIdx = 0;

function initGallery() {
  const cfg = getConfig();
  if (!cfg || !cfg.gallery) return;

  const sliderContainer = document.getElementById('gallerySlides');
  const gridContainer = document.getElementById('galleryGrid');
  const counterEl = document.getElementById('gallerySliderCounter');
  const btnSlider = document.getElementById('btnGallerySlider');
  const btnGrid = document.getElementById('btnGalleryGrid');
  const sliderWrapper = document.getElementById('gallerySliderContainer');

  // 1. 슬라이더 렌더링
  if (sliderContainer) {
    sliderContainer.innerHTML = '';
    cfg.gallery.forEach((item, index) => {
      const slide = document.createElement('div');
      slide.className = 'gallery-slide';
      slide.innerHTML = `<img src="${item.opt}" alt="${item.alt}" loading="lazy" />`;
      slide.addEventListener('click', () => openLightbox(index));
      sliderContainer.appendChild(slide);
    });
  }

  // 2. 그리드 렌더링
  if (gridContainer) {
    gridContainer.innerHTML = '';
    cfg.gallery.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = `gallery-item ${item.aspect === 'landscape' ? 'span-2' : ''}`;
      itemEl.innerHTML = `
        <img src="${item.opt}" alt="${item.alt}" loading="lazy" />
        <div class="gallery-item-overlay">
          <div class="gallery-zoom-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        </div>
      `;
      itemEl.addEventListener('click', () => openLightbox(index));
      gridContainer.appendChild(itemEl);
    });
  }

  // 3. 슬라이더 이동 함수
  function goToSlide(idx) {
    currentSliderIdx = (idx + cfg.gallery.length) % cfg.gallery.length;
    if (sliderContainer) {
      sliderContainer.style.transform = `translateX(-${currentSliderIdx * 100}%)`;
    }
    if (counterEl) {
      counterEl.textContent = `${currentSliderIdx + 1} / ${cfg.gallery.length}`;
    }
  }

  // 슬라이더 좌우 버튼
  const prevBtn = document.getElementById('gallerySliderPrev');
  const nextBtn = document.getElementById('gallerySliderNext');
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSliderIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSliderIdx + 1));

  // 슬라이더 터치 스와이프 제스처
  if (sliderWrapper) {
    let sStartX = 0;
    let sEndX = 0;

    sliderWrapper.addEventListener('touchstart', (e) => {
      sStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
      sEndX = e.changedTouches[0].screenX;
      const diff = sEndX - sStartX;
      if (Math.abs(diff) > 35) {
        if (diff > 0) goToSlide(currentSliderIdx - 1);
        else goToSlide(currentSliderIdx + 1);
      }
    }, { passive: true });
  }

  // 4. 모드 전환 버튼 (슬라이드 ↔ 그리드)
  if (btnSlider && btnGrid) {
    btnSlider.addEventListener('click', () => {
      btnSlider.classList.add('active');
      btnGrid.classList.remove('active');
      if (sliderWrapper) sliderWrapper.style.display = 'block';
      if (gridContainer) gridContainer.style.display = 'none';
    });

    btnGrid.addEventListener('click', () => {
      btnGrid.classList.add('active');
      btnSlider.classList.remove('active');
      if (sliderWrapper) sliderWrapper.style.display = 'none';
      if (gridContainer) gridContainer.style.display = 'grid';
    });
  }

  initLightboxControls();
}

/**
 * 풀스크린 라이트박스
 */
function openLightbox(index) {
  const cfg = getConfig();
  if (!cfg || !cfg.gallery[index]) return;

  currentLightboxIdx = index;
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');

  img.src = cfg.gallery[index].full || cfg.gallery[index].opt;
  counter.textContent = `${index + 1} / ${cfg.gallery.length}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function prevLightbox() {
  const cfg = getConfig();
  currentLightboxIdx = (currentLightboxIdx - 1 + cfg.gallery.length) % cfg.gallery.length;
  openLightbox(currentLightboxIdx);
}

function nextLightbox() {
  const cfg = getConfig();
  currentLightboxIdx = (currentLightboxIdx + 1) % cfg.gallery.length;
  openLightbox(currentLightboxIdx);
}

function initLightboxControls() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevLightbox);
  if (nextBtn) nextBtn.addEventListener('click', nextLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // 키보드 화살표
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  });

  // 터치 스와이프
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) prevLightbox();
      else nextLightbox();
    }
  }, { passive: true });
}

/**
 * 6. 계좌 아코디언 토글
 */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');

      if (isOpen) {
        body.style.maxHeight = '0';
        item.classList.remove('open');
      } else {
        body.style.maxHeight = body.scrollHeight + 'px';
        item.classList.add('open');
      }
    });
  });
}

/**
 * 7. 연락처 모달 (요청: 부모님 제외, 신랑 진경민 & 신부 박소현 연락처만 표시)
 */
function initContactModal() {
  const modal = document.getElementById('contactModal');
  const triggerBtn = document.getElementById('contactTriggerBtn');
  const closeBtn = document.getElementById('contactCloseBtn');
  const listContainer = document.getElementById('contactCardList');

  if (!modal || !triggerBtn || !listContainer) return;

  const cfg = getConfig();

  // 신랑 & 신부 두 사람만 렌더링
  let html = `
    <!-- 신랑 진경민 -->
    <div class="contact-card-row">
      <div class="contact-person-info">
        <span class="contact-role">신랑</span>
        <span class="contact-name">${cfg.groom.name}</span>
      </div>
      <div class="contact-actions">
        <a href="tel:${cfg.groom.phone}" class="contact-action-btn" title="전화걸기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </a>
        <a href="sms:${cfg.groom.phone}" class="contact-action-btn" title="문자보내기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </a>
      </div>
    </div>

    <!-- 신부 박소현 -->
    <div class="contact-card-row">
      <div class="contact-person-info">
        <span class="contact-role">신부</span>
        <span class="contact-name">${cfg.bride.name}</span>
      </div>
      <div class="contact-actions">
        <a href="tel:${cfg.bride.phone}" class="contact-action-btn" title="전화걸기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </a>
        <a href="sms:${cfg.bride.phone}" class="contact-action-btn" title="문자보내기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </a>
      </div>
    </div>
  `;

  listContainer.innerHTML = html;

  triggerBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/**
 * 8. RSVP (참석 의사 전달)
 */
function initRsvp() {
  const form = document.getElementById('rsvpForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const side = form.querySelector('input[name="rsvpSide"]:checked')?.value || '신랑측';
    const attendance = form.querySelector('input[name="rsvpAttendance"]:checked')?.value || '참석';
    const name = document.getElementById('rsvpName').value.trim();
    const count = document.getElementById('rsvpCount').value;
    const meal = document.getElementById('rsvpMeal').value;
    const memo = document.getElementById('rsvpMemo').value.trim();

    if (!name) {
      showToast('성함을 입력해 주세요.');
      return;
    }

    const rsvpData = {
      side,
      attendance,
      name,
      count,
      meal,
      memo,
      date: new Date().toISOString()
    };

    // 로컬 스토리지에 저장
    const rsvpList = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
    rsvpList.push(rsvpData);
    localStorage.setItem('wedding_rsvp_list', JSON.stringify(rsvpList));

    showToast('참석 정보가 성공적으로 전달되었습니다. 감사합니다!');
    form.reset();
  });
}

/**
 * 9. 방명록 (요청: 경민아 수진아 -> 경민아 소현아 수정)
 */
function initGuestbook() {
  const form = document.getElementById('guestbookForm');
  const listEl = document.getElementById('guestbookList');
  if (!form || !listEl) return;

  const defaultMessages = [
    {
      name: "김민재",
      content: "경민아 소현아 결혼 너무 축하해! 둘이 평생 행복하게 잘 살길 바라!",
      date: "2026.11.10"
    },
    {
      name: "이지원",
      content: "선남선녀 커플의 새로운 출발을 응원합니다. 식장에서 만나요!",
      date: "2026.11.12"
    }
  ];

  function getStoredMessages() {
    const stored = localStorage.getItem('wedding_guestbook');
    if (!stored) {
      localStorage.setItem('wedding_guestbook', JSON.stringify(defaultMessages));
      return defaultMessages;
    }
    return JSON.parse(stored);
  }

  function renderGuestbook() {
    const messages = getStoredMessages();
    listEl.innerHTML = '';

    messages.forEach(msg => {
      const item = document.createElement('div');
      item.className = 'guestbook-item';
      item.innerHTML = `
        <div class="guestbook-item-header">
          <span class="guestbook-name">${escapeHtml(msg.name)}</span>
          <span class="guestbook-date">${msg.date}</span>
        </div>
        <div class="guestbook-content">${escapeHtml(msg.content)}</div>
      `;
      listEl.appendChild(item);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('guestName');
    const contentInput = document.getElementById('guestContent');

    const name = nameInput.value.trim();
    const content = contentInput.value.trim();

    if (!name || !content) {
      showToast('이름과 축하 메시지를 모두 입력해 주세요.');
      return;
    }

    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const newMsg = { name, content, date: dateStr };
    const messages = getStoredMessages();
    messages.unshift(newMsg);
    localStorage.setItem('wedding_guestbook', JSON.stringify(messages));

    renderGuestbook();
    nameInput.value = '';
    contentInput.value = '';
    showToast('소중한 축하 메시지가 등록되었습니다.');
  });

  renderGuestbook();
}

/**
 * 10. 공유하기 & 주소/계좌 복사
 */
function initShare() {
  const shareBtn = document.getElementById('shareKakaoBtn');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const copyAddressBtn = document.getElementById('copyAddressBtn');

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      copyToClipboard(window.location.href, '청첩장 링크가 복사되었습니다.');
    });
  }

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const cfg = getConfig();
      const addr = cfg ? cfg.venue.address : '';
      copyToClipboard(addr, '웨딩홀 주소가 복사되었습니다.');
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const cfg = getConfig();
      if (!cfg) return;
      if (navigator.share) {
        navigator.share({
          title: `${cfg.groom.name} & ${cfg.bride.name}의 모바일 청첩장`,
          text: `저희 두 사람의 새로운 시작을 함께 축복해 주세요.`,
          url: window.location.href
        }).catch(() => {});
      } else {
        copyToClipboard(window.location.href, '청첩장 링크가 복사되었습니다. 카카오톡이나 메시지로 공유해 보세요!');
      }
    });
  }
}

/**
 * 클립보드 복사 헬퍼 함수
 */
window.copyToClipboard = function(text, successMsg = '복사되었습니다.') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
};

function fallbackCopy(text, successMsg) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    showToast('복사에 실패했습니다.');
  }
  document.body.removeChild(textarea);
}

/**
 * 토스트 메시지
 */
function showToast(message) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  if (window.toastTimer) clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

/**
 * 11. 스크롤 Reveal 인터랙션
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  // 첫 화면 뷰포트에 이미 들어와 있는 요소들은 즉시 활성화
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('active');
    }
  });

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px 50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

function escapeHtml(string) {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };
  return String(string).replace(/[&<>"'\/]/g, s => entityMap[s]);
}
