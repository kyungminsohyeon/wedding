import React, { useState, useEffect } from 'react';

export default function Guestbook({ showToast }) {
  const [messages, setMessages] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [guestContent, setGuestContent] = useState('');

  const defaultMessages = [
    { name: "김민재", content: "경민아 수진아 결혼 너무 축하해! 둘이 평생 행복하게 잘 살길 바라!", date: "2026.11.10" },
    { name: "이지원", content: "선남선녀 커플의 새로운 출발을 응원합니다. 식장에서 만나요!", date: "2026.11.12" }
  ];

  useEffect(() => {
    const stored = localStorage.getItem('wedding_guestbook');
    if (!stored) {
      localStorage.setItem('wedding_guestbook', JSON.stringify(defaultMessages));
      setMessages(defaultMessages);
    } else {
      setMessages(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestContent.trim()) {
      showToast('이름과 축하 메시지를 모두 입력해 주세요.');
      return;
    }

    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const newMsg = { name: guestName.trim(), content: guestContent.trim(), date: dateStr };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('wedding_guestbook', JSON.stringify(updated));

    setGuestName('');
    setGuestContent('');
    showToast('소중한 축하 메시지가 등록되었습니다.');
  };

  return (
    <section className="guestbook-section" id="guestbook">
      <div className="reveal active">
        <span className="section-tag">GUESTBOOK</span>
        <h2 className="section-title">축하의 한마디</h2>
      </div>

      <div className="guestbook-form-card reveal active">
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="작성자 성함" 
              value={guestName} 
              onChange={(e) => setGuestName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group" style={{ marginBottom: '14px' }}>
            <textarea 
              className="form-textarea" 
              placeholder="따뜻한 축하의 메시지를 남겨주세요." 
              value={guestContent} 
              onChange={(e) => setGuestContent(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="submit-btn" style={{ padding: '12px' }}>방명록 등록하기</button>
        </form>
      </div>

      <div className="guestbook-list reveal active">
        {messages.map((msg, idx) => (
          <div className="guestbook-item" key={idx}>
            <div className="guestbook-item-header">
              <span className="guestbook-name">{msg.name}</span>
              <span className="guestbook-date">{msg.date}</span>
            </div>
            <div className="guestbook-content">{msg.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
