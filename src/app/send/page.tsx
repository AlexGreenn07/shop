'use client';

import { useState } from 'react';

export default function SendTab() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const sendEmail = async () => {
    setStatus('loading');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      console.error('Error sending email:', error);
    }
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Вкладка Отправки</h1>
      <p>
        Нажмите кнопку ниже, чтобы отправить тестовое письмо через
        Resend.
      </p>

      <button
        onClick={sendEmail}
        disabled={status === 'loading'}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? 'Отправка...' : 'Отправить Email'}
      </button>

      {status === 'success' && (
        <p style={{ color: 'green', marginTop: '12px' }}>
          Письмо отправлено!
        </p>
      )}
      {status === 'error' && (
        <p style={{ color: 'red', marginTop: '12px' }}>
          Ошибка при отправке.
        </p>
      )}
    </div>
  );
}
