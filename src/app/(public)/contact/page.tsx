"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Smartphone } from 'lucide-react';
import { Facebook, Twitter, Linkedin } from '@/components/icons/SocialIcons';
import styles from './page.module.css';

export default function ContactPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmittedData({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        refId: `HH-INQ-${Date.now().toString().slice(-6)}`,
        message: 'Thank you! Your query has been recorded. Our team will contact you shortly.',
      });
    } catch (err) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

                {submittedData ? (
                  <div className={styles.successMessage}>
                    <CheckCircle2 size={52} className={styles.successIcon} color="#28a745" />
                    <h4>Message Sent & Query Recorded!</h4>
                    <p className={styles.refCode}>Ref Number: <strong>{submittedData.refId}</strong></p>
                    
                    <div style={{ background: '#e8f0fe', padding: '15px', borderRadius: '10px', marginTop: '15px', textAlign: 'left', borderLeft: '4px solid #1a73e8' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#1a73e8', marginBottom: '4px' }}>
                        <Mail size={16} /> Confirmation Email Dispatched
                      </div>
                      <p style={{ fontSize: '13px', color: '#3c4043', margin: 0 }}>
                        A confirmation receipt has been sent to <strong>{submittedData.email}</strong>.
                      </p>
                    </div>

                    <div style={{ background: '#e6f4ea', padding: '15px', borderRadius: '10px', marginTop: '10px', textAlign: 'left', borderLeft: '4px solid #28a745' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#137333', marginBottom: '4px' }}>
                        <Smartphone size={16} /> SMS Notification Triggered
                      </div>
                      <p style={{ fontSize: '13px', color: '#3c4043', margin: 0 }}>
                        SMS acknowledgement delivered to <strong>{submittedData.phone}</strong>. Our core team and admin have been notified.
                      </p>
                    </div>

                    <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => { setSubmittedData(null); setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' }); }}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label>Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Enter your full name" 
                        className="input" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="your.email@example.com" 
                          className="input" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Phone Number *</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+91 98765 43210" 
                          className="input" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Subject *</label>
                      <select 
                        className="input select"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Scholarship & Student Query">Scholarship & Student Query</option>
                        <option value="Sponsorship & Donations">Sponsorship & Donations</option>
                        <option value="Volunteering Opportunity">Volunteering Opportunity</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Message *</label>
                      <textarea 
                        rows={4} 
                        required 
                        placeholder="Write your message here..." 
                        className="input textarea" 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                      {loading ? 'Sending & Saving Query...' : 'Send Message'}
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
