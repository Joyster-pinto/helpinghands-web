"use client";

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, Calendar, LogOut } from 'lucide-react';
import styles from './layout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  const role = (session?.user as any)?.role;

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          Helping Hands
        </div>
        <div className={styles.nav}>
          {role === 'admin' ? (
            <>
              <Link href="/dashboard" className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`}>
                <LayoutDashboard size={20} /> Overview
              </Link>
              <Link href="/dashboard/requests" className={`${styles.navLink} ${pathname.includes('/requests') ? styles.active : ''}`}>
                <Users size={20} /> Needs & Verification
              </Link>
              <Link href="/dashboard/accounts" className={`${styles.navLink} ${pathname.includes('/accounts') ? styles.active : ''}`}>
                <CreditCard size={20} /> Accounts
              </Link>
              <Link href="/dashboard/meetings" className={`${styles.navLink} ${pathname.includes('/meetings') ? styles.active : ''}`}>
                <Calendar size={20} /> Meetings
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard/trust-member" className={`${styles.navLink} ${styles.active}`}>
                <LayoutDashboard size={20} /> Member Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.topbar}>
          <div>Welcome, {session?.user?.name || 'User'}</div>
          <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logoutBtn}>
            <LogOut size={16} /> Logout
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
