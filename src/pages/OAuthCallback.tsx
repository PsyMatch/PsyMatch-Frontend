'use client';
import { useEffect } from 'react';

export default function OAuthCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      fetch('http://localhost:3000/auth/google/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(() => {
          window.location.href = '/';
        })
        .catch(err => {
          console.error('OAuth error:', err);
          window.location.href = '/error';
        });
    }
  }, []);

  return <p>Logging you in...</p>;
}