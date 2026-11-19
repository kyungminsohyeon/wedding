import React from 'react';

export default function Toast({ message, isVisible }) {
  return (
    <div className={`toast-msg ${isVisible ? 'show' : ''}`}>
      {message}
    </div>
  );
}
