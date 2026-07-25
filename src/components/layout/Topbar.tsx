'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '@/app/dashboard/layout.module.css';
import { Bell, UserCircle, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Topbar({ user }: { user: any }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: 'New Student Application', desc: 'Rahul S. applied for Kalam Scholarship', time: '10m ago' },
    { id: 2, title: 'Donation Received', desc: '₹15,000 received from Dr. Smith', time: '1h ago' },
    { id: 3, title: 'Board Meeting Tomorrow', desc: 'Quarterly review meeting scheduled at 10 AM', time: '3h ago' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.topbar}>
      <div className={styles.greeting}>
        <h2>Dashboard Overview</h2>
      </div>
      <div className={styles.actions} style={{ position: 'relative' }} ref={dropdownRef}>
        <button className={styles.iconButton} onClick={() => setShowNotifications(!showNotifications)} title="Notifications">
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', borderRadius: '50%', background: '#f36f21' }}></span>
        </button>

        {showNotifications && (
          <div style={{ position: 'absolute', top: '45px', right: '140px', width: '320px', background: '#ffffff', border: '1px solid #e9ecef', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', zIndex: 100, padding: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #e9ecef', paddingBottom: '8px' }}>
              <strong style={{ fontSize: '14px', color: '#2b2d32' }}>Notifications</strong>
              <span style={{ fontSize: '11px', color: '#f36f21', fontWeight: 600 }}>3 New</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {notifications.map(n => (
                <div key={n.id} style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px', fontSize: '12px' }}>
                  <div style={{ fontWeight: 700, color: '#2b2d32' }}>{n.title}</div>
                  <div style={{ color: '#6c757d', margin: '2px 0' }}>{n.desc}</div>
                  <div style={{ color: '#adb5bd', fontSize: '10px' }}>{n.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.userInfo}>
          <UserCircle size={32} />
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user?.name || "User"}</span>
            <span className={styles.userRole}>{(user?.role || "Admin").replace('_', ' ').toUpperCase()}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
