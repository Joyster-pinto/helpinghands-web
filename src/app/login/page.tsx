"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <form onSubmit={handleLogin} style={{ background: '#fff', padding: 40, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <img src="/images/helping-logo.jpg" alt="Logo" style={{ height: 60, marginBottom: 20 }} />
          <h2 style={{ margin: 0 }}>Trust Portal Login</h2>
        </div>
        
        {error && <div style={{ color: '#dc3545', background: '#f8d7da', padding: 10, borderRadius: 4, marginBottom: 20 }}>{error}</div>}
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Email Address</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={{ width: '100%', padding: 10, border: '1px solid #ced4da', borderRadius: 4 }} 
          />
        </div>
        
        <div style={{ marginBottom: 30 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Password</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={{ width: '100%', padding: 10, border: '1px solid #ced4da', borderRadius: 4 }} 
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: 12, background: '#f36f21', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}
