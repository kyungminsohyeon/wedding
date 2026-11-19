import React, { useState, useEffect } from 'react';

export default function Calendar({ config }) {
  const { weddingDate, groom, bride } = config;

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00',
    isPassed: false,
    diffDays: 0
  });

  useEffect(() => {
    const target = new Date(weddingDate.isoString);

    const updateTimer = () => {
      const now = new Date();
      const diff = target - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          mins: String(m).padStart(2, '0'),
          secs: String(s).padStart(2, '0'),
          isPassed: false,
          diffDays: d
        });
      } else {
        setTimeLeft({
          days: '00',
          hours: '00',
          mins: '00',
          secs: '00',
          isPassed: true,
          diffDays: 0
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingDate.isoString]);

  // 달력 테이블 셀 계산
  const { year, month, day: targetDay } = weddingDate;
  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();

  const weeks = [];
  let currentWeek = [];

  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ empty: true });
  }

  for (let d = 1; d <= lastDate; d++) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    const isSunday = (currentWeek.length === 0);
    const isTarget = (d === targetDay);
    currentWeek.push({ day: d, isSunday, isTarget });
  }

  while (currentWeek.length < 7) {
    currentWeek.push({ empty: true });
  }
  weeks.push(currentWeek);

  return (
    <section className="calendar-section" id="calendar">
      <div className="reveal active">
        <span className="section-tag">CALENDAR</span>
        <h2 className="section-title">소중한 날, 함께해 주세요</h2>
      </div>

      <div className="calendar-card reveal active">
        <header className="cal-header">
          <h3 className="cal-year-month">{year}.{String(month).padStart(2, '0')}</h3>
          <p className="cal-detail">{month}월 {targetDay}일 {weddingDate.dayOfWeek} {weddingDate.time}</p>
        </header>

        <table className="calendar-table" aria-label="결혼식 달력">
          <thead>
            <tr>
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, wIdx) => (
              <tr key={wIdx}>
                {week.map((cell, cIdx) => {
                  if (cell.empty) {
                    return <td key={cIdx} className="empty"></td>;
                  }
                  let classes = [];
                  if (cell.isSunday) classes.push('sunday');
                  if (cell.isTarget) classes.push('d-day-cell');
                  return (
                    <td key={cIdx} className={classes.join(' ')}>
                      <span>{cell.day}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* 실시간 카운트다운 박스 */}
        <div className="countdown-box">
          <p className="countdown-title">D-DAY COUNTDOWN</p>
          <div className="countdown-grid">
            <div className="countdown-item">
              <span className="count-num">{timeLeft.days}</span>
              <span className="count-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="count-num">{timeLeft.hours}</span>
              <span className="count-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="count-num">{timeLeft.mins}</span>
              <span className="count-label">Mins</span>
            </div>
            <div className="countdown-item">
              <span className="count-num">{timeLeft.secs}</span>
              <span className="count-label">Secs</span>
            </div>
          </div>
          <p className="countdown-banner">
            {timeLeft.isPassed ? (
              <>소중한 발걸음으로 축복해 주셔서 <strong>감사합니다.</strong></>
            ) : (
              <>{groom.name} & {bride.name}의 결혼식이 <strong>{timeLeft.diffDays}일</strong> 남았습니다.</>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
