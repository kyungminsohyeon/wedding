import React, { useState } from 'react';

export default function Rsvp({ showToast }) {
  const [side, setSide] = useState('신랑측');
  const [attendance, setAttendance] = useState('참석');
  const [name, setName] = useState('');
  const [count, setCount] = useState('1명 (본인)');
  const [meal, setMeal] = useState('식사 예정');
  const [memo, setMemo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('성함을 입력해 주세요.');
      return;
    }

    const rsvpItem = { side, attendance, name: name.trim(), count, meal, memo: memo.trim(), date: new Date().toISOString() };
    const list = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
    list.push(rsvpItem);
    localStorage.setItem('wedding_rsvp_list', JSON.stringify(list));

    showToast('참석 정보가 성공적으로 전달되었습니다. 감사합니다!');
    setName('');
    setMemo('');
  };

  return (
    <section className="rsvp-section" id="rsvp">
      <div className="reveal active">
        <span className="section-tag">RSVP</span>
        <h2 className="section-title">참석 여부 전달하기</h2>
      </div>

      <div className="rsvp-card reveal active">
        <p className="rsvp-desc">
          원활한 연회 및 예식 준비를 위해<br />
          참석 여부를 미리 알려주시면 감사하겠습니다.
        </p>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          {/* 구분 */}
          <div className="form-group">
            <label className="form-label">구분</label>
            <div className="radio-group">
              <label className="radio-btn-label">
                <input type="radio" name="rsvpSide" value="신랑측" checked={side === '신랑측'} onChange={() => setSide('신랑측')} />
                신랑측
              </label>
              <label className="radio-btn-label">
                <input type="radio" name="rsvpSide" value="신부측" checked={side === '신부측'} onChange={() => setSide('신부측')} />
                신부측
              </label>
            </div>
          </div>

          {/* 참석 여부 */}
          <div className="form-group">
            <label className="form-label">참석 여부</label>
            <div className="radio-group">
              <label className="radio-btn-label">
                <input type="radio" name="rsvpAttendance" value="참석" checked={attendance === '참석'} onChange={() => setAttendance('참석')} />
                참석 가능
              </label>
              <label className="radio-btn-label">
                <input type="radio" name="rsvpAttendance" value="불참" checked={attendance === '불참'} onChange={() => setAttendance('불참')} />
                마음으로 축하 (불참)
              </label>
            </div>
          </div>

          {/* 성함 */}
          <div className="form-group">
            <label className="form-label">성함</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="참석자 성함을 입력해 주세요" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          {/* 동행 인원 */}
          <div className="form-group">
            <label className="form-label">동행 인원 (본인 포함)</label>
            <select className="form-select" value={count} onChange={(e) => setCount(e.target.value)}>
              <option value="1명 (본인)">1명 (본인)</option>
              <option value="2명">2명</option>
              <option value="3명">3명</option>
              <option value="4명 이상">4명 이상</option>
            </select>
          </div>

          {/* 식사 여부 */}
          <div className="form-group">
            <label className="form-label">식사 여부</label>
            <select className="form-select" value={meal} onChange={(e) => setMeal(e.target.value)}>
              <option value="식사 예정">식사 예정</option>
              <option value="식사 안 함">식사 안 함</option>
              <option value="미정">미정</option>
            </select>
          </div>

          {/* 전달 사항 */}
          <div className="form-group">
            <label className="form-label">전달 사항 (선택)</label>
            <textarea 
              className="form-textarea" 
              placeholder="신랑 신부에게 전하고 싶은 한마디나 기타 사항을 적어주세요." 
              value={memo} 
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">참석 정보 전달하기</button>
        </form>
      </div>
    </section>
  );
}
