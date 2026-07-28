"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Mail, User, Heart } from 'lucide-react';
import { Facebook, Twitter, Linkedin } from '@/components/icons/SocialIcons';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whoWeAreOpen, setWhoWeAreOpen] = useState(false);
  const [waysToGiveOpen, setWaysToGiveOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setWhoWeAreOpen(false);
    setWaysToGiveOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      {/* Top Utility Bar */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarLeft}>
            <span className={styles.topItem}>
              <Phone size={14} /> +91 98419 29299
            </span>
            <span className={styles.topItem}>
              <Mail size={14} /> helpinghandsteam2018@gmail.com
            </span>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook"><Facebook size={14} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter"><Twitter size={14} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn"><Linkedin size={14} /></a>
            </div>

          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={styles.mainNav}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <img src="/images/helping-logo.jpg" alt="Helping Hands Team Trust Logo" className={styles.logoImg} />
            <div className={styles.logoTextGroup}>
              <span className={styles.logoTitle}>Helping Hands</span>
              <span className={styles.logoSub}>TEAM TRUST (Regd. 51/2018)</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
                Home
              </Link>
            </li>

            {/* Who We Are Dropdown */}
            <li 
              className={`${styles.navItem} ${styles.hasDropdown}`}
              onMouseEnter={() => setWhoWeAreOpen(true)}
              onMouseLeave={() => setWhoWeAreOpen(false)}
            >
              <button className={`${styles.navLink} ${styles.dropdownToggle}`}>
                Who We Are <ChevronDown size={14} />
              </button>
              {whoWeAreOpen && (
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link href="/objective-and-vision" className={styles.dropdownLink}>OBJECTIVE & VISION</Link>
                  </li>
                  <li>
                    <Link href="/board-of-directors" className={styles.dropdownLink}>BOARD OF DIRECTORS</Link>
                  </li>
                  <li>
                    <Link href="/core-teams" className={styles.dropdownLink}>CORE TEAMS</Link>
                  </li>
                  <li>
                    <Link href="/message-from-the-board" className={styles.dropdownLink}>MESSAGE FROM THE BOARD</Link>
                  </li>
                  <li>
                    <Link href="/faqs" className={styles.dropdownLink}>FAQS</Link>
                  </li>
                </ul>
              )}
            </li>

            <li className={styles.navItem}>
              <Link href="/services" className={`${styles.navLink} ${pathname === '/services' ? styles.active : ''}`}>
                Services
              </Link>
            </li>

            {/* Ways To Give Dropdown */}
            <li 
              className={`${styles.navItem} ${styles.hasDropdown}`}
              onMouseEnter={() => setWaysToGiveOpen(true)}
              onMouseLeave={() => setWaysToGiveOpen(false)}
            >
              <button className={`${styles.navLink} ${styles.dropdownToggle}`}>
                Ways To Give <ChevronDown size={14} />
              </button>
              {waysToGiveOpen && (
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link href="/donate" className={styles.dropdownLink}>GIVING TO HELPING HANDS</Link>
                  </li>
                  <li>
                    <Link href="/corporate-partners" className={styles.dropdownLink}>CORPORATE PARTNERS</Link>
                  </li>
                  <li>
                    <Link href="/volunteers" className={styles.dropdownLink}>VOLUNTEERS</Link>
                  </li>
                </ul>
              )}
            </li>

            <li className={styles.navItem}>
              <Link href="/gallery" className={`${styles.navLink} ${pathname === '/gallery' ? styles.active : ''}`}>
                Gallery
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link href="/newsletters" className={`${styles.navLink} ${pathname === '/newsletters' ? styles.active : ''}`}>
                Newsletters
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link href="/contact" className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}>
                Contact Us
              </Link>
            </li>
          </ul>

          <Link href="/donate" className={styles.donateHeaderBtn}>
            <Heart size={16} fill="white" /> DONATE
          </Link>

          <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className={styles.mobileDrawer}>
          <ul className={styles.mobileMenu}>
            <li><Link href="/" className={styles.mobileLink}>Home</Link></li>
            <li className={styles.mobileGroupTitle}>Who We Are</li>
            <li><Link href="/objective-and-vision" className={styles.mobileSubLink}>OBJECTIVE & VISION</Link></li>
            <li><Link href="/board-of-directors" className={styles.mobileSubLink}>BOARD OF DIRECTORS</Link></li>
            <li><Link href="/core-teams" className={styles.mobileSubLink}>CORE TEAMS</Link></li>
            <li><Link href="/message-from-the-board" className={styles.mobileSubLink}>MESSAGE FROM THE BOARD</Link></li>
            <li><Link href="/faqs" className={styles.mobileSubLink}>FAQS</Link></li>
            <li><Link href="/services" className={styles.mobileLink}>Services</Link></li>
            <li className={styles.mobileGroupTitle}>Ways To Give</li>
            <li><Link href="/donate" className={styles.mobileSubLink}>GIVING TO HELPING HANDS</Link></li>
            <li><Link href="/corporate-partners" className={styles.mobileSubLink}>CORPORATE PARTNERS</Link></li>
            <li><Link href="/volunteers" className={styles.mobileSubLink}>VOLUNTEERS</Link></li>
            <li><Link href="/gallery" className={styles.mobileLink}>Gallery</Link></li>
            <li><Link href="/newsletters" className={styles.mobileLink}>Newsletters</Link></li>
            <li><Link href="/contact" className={styles.mobileLink}>Contact Us</Link></li>

          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
