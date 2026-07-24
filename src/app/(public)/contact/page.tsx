"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Facebook, Twitter, Linkedin } from '@/components/icons/SocialIcons';
import styles from './page.module.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.breadcrumb}>Home / Contact Us</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.grid}>
            {/* Left Info Column */}
            <div className={styles.infoCol}>
              <span className={styles.tag}>GET IN TOUCH</span>
              <h2>We'd Love To Hear From You</h2>
              <p className={styles.leadPara}>
                Have a question regarding scholarships, donations, or volunteering? Send us a message or reach us directly using the contact details below.
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.contactCard}>
                  <Phone size={24} className={styles.icon} />
                  <div>
                    <h4>Phone & WhatsApp</h4>
                    <p>+91 98419 29299</p>
                  </div>
                </div>

                <div className={styles.contactCard}>
                  <Mail size={24} className={styles.icon} />
                  <div>
                    <h4>Email Address</h4>
                    <p>helpinghandsteam2018@gmail.com</p>
                  </div>
                </div>

                <div className={styles.contactCard}>
                  <MapPin size={24} className={styles.icon} />
                  <div>
                    <h4>Registered Office Address</h4>
                    <p>No: 1/112A, Elavanthangal, Thaiyur Village, Near Kelambakkam, Kancheepuram District, Tamil Nadu – 603103.</p>
                  </div>
                </div>
              </div>

              <div className={styles.socialBox}>
                <h4>Connect With Us</h4>
                <div className={styles.socialIcons}>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socIcon}><Facebook size={18} /></a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socIcon}><Twitter size={18} /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socIcon}><Linkedin size={18} /></a>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                <h3>Send Us A Message</h3>
                <p className={styles.formSub}>We respond within 24 hours on working days.</p>

                {submitted ? (
                  <div className={styles.successMessage}>
                    <CheckCircle2 size={48} className={styles.successIcon} />
                    <h4>Message Sent Successfully!</h4>
                    <p>Thank you for reaching out to Helping Hands Team Trust. We will get back to you shortly.</p>
                    <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label>Your Name *</label>
                      <input type="text" required placeholder="Enter your full name" className="input" />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Email Address *</label>
                        <input type="email" required placeholder="your.email@example.com" className="input" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Phone Number *</label>
                        <input type="tel" required placeholder="+91 98765 43210" className="input" />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Subject *</label>
                      <select className="input select">
                        <option value="general">General Inquiry</option>
                        <option value="scholarship">Scholarship & Student Query</option>
                        <option value="sponsorship">Sponsorship & Donations</option>
                        <option value="volunteer">Volunteering Opportunity</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Message *</label>
                      <textarea rows={4} required placeholder="Write your message here..." className="input textarea" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
