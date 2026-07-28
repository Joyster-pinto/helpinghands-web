"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (res?.error) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex',
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Left side - Image/Branding */}
      <div style={{ 
        flex: 1, 
        background: 'linear-gradient(135deg, #f36f21 0%, #d65a11 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background circles */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Link href="/">
            <div style={{ background: '#fff', padding: '15px 25px', borderRadius: 12, display: 'inline-block', marginBottom: 40, cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
              <img src="/images/helping-logo.jpg" alt="Logo" style={{ height: 50 }} />
            </div>
          </Link>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 20, lineHeight: 1.2 }}>Empowering <br/>Communities.</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: 450, lineHeight: 1.6 }}>
            Access the Trust Portal to manage your verification tasks, view active needs, and process your generous donations securely.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 40
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: 420,
          background: '#fff',
          padding: 50,
          borderRadius: 24,
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: '#fff3ec', color: '#f36f21', marginBottom: 20 }}>
              <ShieldCheck size={32} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', margin: '0 0 10px 0' }}>Welcome Back</h2>
            <p style={{ color: '#666', margin: 0 }}>Please sign in to your Trust account.</p>
          </div>
          
          <form onSubmit={handleLogin}>
            {error && (
              <div style={{ 
                color: '#dc3545', 
                background: '#fff5f5', 
                padding: '12px 16px', 
                borderRadius: 8, 
                marginBottom: 24,
                fontSize: '0.9rem',
                borderLeft: '4px solid #dc3545',
                animation: 'shake 0.5s ease-in-out'
              }}>
                {error}
              </div>
            )}
            
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600, color: '#4a4a4a' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 12, left: 14, color: '#adb5bd' }}>
                  <User size={18} />
                </div>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="admin@helpinghands.com"
                  style={{ 
                    width: '100%', 
                    padding: '12px 12px 12px 42px', 
                    border: '2px solid #e9ecef', 
                    borderRadius: 12,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }} 
                  onFocus={e => e.target.style.borderColor = '#f36f21'}
                  onBlur={e => e.target.style.borderColor = '#e9ecef'}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600, color: '#4a4a4a' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: 12, left: 14, color: '#adb5bd' }}>
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  style={{ 
                    width: '100%', 
                    padding: '12px 12px 12px 42px', 
                    border: '2px solid #e9ecef', 
                    borderRadius: 12,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }} 
                  onFocus={e => e.target.style.borderColor = '#f36f21'}
                  onBlur={e => e.target.style.borderColor = '#e9ecef'}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              style={{ 
                width: '100%', 
                padding: '14px', 
                background: isLoading ? '#ffb38a' : '#f36f21', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 12, 
                cursor: isLoading ? 'not-allowed' : 'pointer', 
                fontWeight: 600,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'background-color 0.2s, transform 0.1s',
                boxShadow: '0 4px 12px rgba(243, 111, 33, 0.2)'
              }}
              onMouseOver={e => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={e => !isLoading && (e.currentTarget.style.transform = 'translateY(0)')}
              onMouseDown={e => !isLoading && (e.currentTarget.style.transform = 'translateY(0)')}
              onMouseUp={e => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
            >
              {isLoading ? 'Signing In...' : (
                <>Sign In Securely <ArrowRight size={18} /></>
              )}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: 30, fontSize: '0.85rem', color: '#999' }}>
            Protected by enterprise-grade security. <br/>
            &copy; {new Date().getFullYear()} Helping Hands Team.
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        @media (max-width: 900px) {
          div[style*="minHeight: '100vh'"] {
            flex-direction: column !important;
          }
          div[style*="flex: 1"] {
            width: 100% !important;
            padding: 40px 20px !important;
          }
          h1 { font-size: 2.2rem !important; }
        }
      `}} />
    </div>
  );
}
