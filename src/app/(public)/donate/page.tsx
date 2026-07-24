"use client";

import React, { useState } from 'react';
import { Heart, CheckCircle2, Building, BookOpen, ShieldCheck } from 'lucide-react';
import styles from './page.module.css';

export default function DonatePage() {
  const [amount, setAmount] = useState('15000');
  const [customAmount, setCustomAmount] = useState('');

  const tiers = [
    { label: 'School Kit', value: '4000', desc: 'Books, notebooks, uniforms & bags for 1 school child' },
    { label: 'School Student (Full Yr)', value: '15000', desc: 'Complete annual school fees & educational needs' },
    { label: 'Polytechnic Student', value: '30000', desc: 'Full annual tuition for polytechnic diploma' },
    { label: 'Arts & Science College', value: '40000', desc: 'Full annual tuition for UG college degree' },
    { label: 'Engineering Degree', value: '50000', desc: 'Full annual engineering college fees' },
    { label: 'Medical (MBBS) Degree', value: '100000', desc: 'Full annual medical college tuition' },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Giving To Helping Hands</h1>
          <p className={styles.breadcrumb}>Home / Ways To Give / Giving To Helping Hands</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.introQuoteCard}>
            <img src="/images/kathy-calvin.jpg" alt="Kathy Calvin Quote" className={styles.quoteImg} />
            <div>
              <p className={styles.quoteText}>
                "Give cheerfully and freely. It is the energy behind the giving that matters. We assure you that 100% of your money brings happiness and good quality education to deserving kids..."
              </p>
              <span className={styles.quoteAuthor}>— Kathy Calvin</span>
            </div>
          </div>

          <div className={styles.grid}>
            {/* Left Column - Donation Form */}
            <div className={styles.donateCard}>
              <h2>Choose Your Contribution</h2>
              <p className={styles.subText}>Select a scholarship tier or enter a custom amount.</p>

              <div className={styles.tierGrid}>
                {tiers.map((t, idx) => (
                  <button 
                    key={idx}
                    className={`${styles.tierBtn} ${amount === t.value && !customAmount ? styles.activeTier : ''}`}
                    onClick={() => { setAmount(t.value); setCustomAmount(''); }}
                  >
                    <span className={styles.tierLabel}>{t.label}</span>
                    <span className={styles.tierAmount}>₹{parseInt(t.value).toLocaleString()}</span>
                  </button>
                ))}
              </div>

              <div className={styles.customAmountGroup}>
                <label>Or Enter Custom Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 25000" 
                  className="input"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>

              <div className={styles.paymentMethods}>
                <h3>Bank Transfer / UPI Details</h3>
                <div className={styles.bankBox}>
                  <p><strong>Account Name:</strong> Helping Hands Team Trust</p>
                  <p><strong>Trust Reg No:</strong> 51/2018</p>
                  <p><strong>Bank:</strong> Canara Bank / State Bank of India</p>
                  <p><strong>Contact for Receipt:</strong> +91 98419 29299</p>
                  <p><strong>Email:</strong> helpinghandsteam2018@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Right Column - Fee Breakdown & Infra Options */}
            <div className={styles.infoCol}>
              <div className={styles.breakdownCard}>
                <h3>Official Sponsorship Breakdown</h3>
                <ul className={styles.breakdownList}>
                  <li>
                    <CheckCircle2 size={18} className={styles.check} />
                    <span><strong>School Needs Kit:</strong> ₹4,000 / student</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className={styles.check} />
                    <span><strong>Full School Student (1 Yr):</strong> ₹15,000 / year</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className={styles.check} />
                    <span><strong>Polytechnic Diploma Student:</strong> ₹30,000 / year</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className={styles.check} />
                    <span><strong>College (Arts & Science):</strong> ₹40,000 / year</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className={styles.check} />
                    <span><strong>College (Engineering):</strong> ₹50,000 / year</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} className={styles.check} />
                    <span><strong>College (Medicine / MBBS):</strong> ₹1,00,000 / year</span>
                  </li>
                </ul>
              </div>

              <div className={styles.infraCard}>
                <Building size={28} className={styles.infraIcon} />
                <h3>Government School Infrastructure Support</h3>
                <ul className={styles.infraList}>
                  <li><strong>Basic Infra Development:</strong> ₹20,000</li>
                  <li><strong>School Library Setup:</strong> ₹40,000</li>
                  <li><strong>Computer Lab Setup (3+ PCs):</strong> ₹1,20,000</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
