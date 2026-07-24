"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUp, Heart } from 'lucide-react';
import { Facebook, Twitter, Linkedin } from '@/components/icons/SocialIcons';
import styles from './Footer.module.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topFooter}>
        <div className="container">
          <div className={styles.grid}>
            {/* Column 1: About */}
            <div className={styles.col}>
              <div className={styles.brandGroup}>
                <img src="/images/helping-logo.jpg" alt="Helping Hands Logo" className={styles.footerLogo} />
                <div>
                  <h3 className={styles.brandTitle}>Helping Hands</h3>
                  <span className={styles.brandSub}>TEAM TRUST (Regd. 51/2018)</span>
                </div>
              </div>
              <p className={styles.aboutText}>
                We are a passionate team of volunteers providing basic school and higher education to underprivileged, single-parent, fatherless, and orphan children in Tamil Nadu.
              </p>
              <div className={styles.socialIcons}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook"><Facebook size={16} /></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter"><Twitter size={16} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn"><Linkedin size={16} /></a>
              </div>
            </div>

            {/* Column 2: Who We Are */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Who We Are</h4>
              <ul className={styles.linkList}>
                <li><Link href="/objective-and-vision">Objective & Vision</Link></li>
                <li><Link href="/board-of-directors">Board of Directors</Link></li>
                <li><Link href="/core-teams">Core Teams & Advisory</Link></li>
                <li><Link href="/message-from-the-board">Message From The Board</Link></li>
                <li><Link href="/faqs">FAQs</Link></li>
              </ul>
            </div>

            {/* Column 3: Ways To Give & Services */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Ways To Give</h4>
              <ul className={styles.linkList}>
                <li><Link href="/donate">Giving to Helping Hands</Link></li>
                <li><Link href="/corporate-partners">Corporate Partners & CSR</Link></li>
                <li><Link href="/volunteers">Volunteer Program</Link></li>
                <li><Link href="/services">Scholarship Schemes</Link></li>
                <li><Link href="/newsletters">Newsletters & Audit Reports</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Contact Office</h4>
              <ul className={styles.contactList}>
                <li>
                  <MapPin size={16} className={styles.cIcon} />
                  <span>No: 1/112A, Elavanthangal, Thaiyur Village, Near Kelambakkam, Kancheepuram Dt, TN - 603103.</span>
                </li>
                <li>
                  <Phone size={16} className={styles.cIcon} />
                  <span>+91 98419 29299</span>
                </li>
                <li>
                  <Mail size={16} className={styles.cIcon} />
                  <span>helpinghandsteam2018@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomContent}>
            <p>© {new Date().getFullYear()} Helping Hands Team Trust (Regd. 51/2018). All Rights Reserved.</p>
            <button className={styles.scrollTopBtn} onClick={scrollToTop} aria-label="Scroll to top">
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
