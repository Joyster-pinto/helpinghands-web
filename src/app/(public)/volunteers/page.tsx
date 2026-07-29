"use client";

import React, { useState } from 'react';
import { Heart, UserCheck, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function VolunteersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Male',
    occupation: 'Employed',
    hasExperience: 'No',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }
      
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Become A Volunteer</h1>
          <p className={styles.breadcrumb}>Home / Ways To Give / Volunteers</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.grid}>
            {/* Left Info Column */}
            <div className={styles.infoCol}>
              <div className={styles.badgeText}>JOIN OUR MISSION</div>
              <h2>Make a Lasting Impact in Children's Lives</h2>
              <p className={styles.leadPara}>
                Volunteering with the Helping Hands Team gives you a chance to be a part of strengthening our public schools, mentoring young minds, and making a difference in the lives of thousands of children.
              </p>

              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <CheckCircle size={20} className={styles.checkIcon} />
                  <div>
                    <h4>Field Verification & House Visits</h4>
                    <p>Help us visit candidate homes to verify genuine financial needs and academic records.</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle size={20} className={styles.checkIcon} />
                  <div>
                    <h4>Mentorship & Tutoring</h4>
                    <p>Guide high school and college students in academic subjects, career orientation, and soft skills.</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <CheckCircle size={20} className={styles.checkIcon} />
                  <div>
                    <h4>Event & Workshop Coordination</h4>
                    <p>Organize Payirchi Pattarai workshops, kit distribution drives, and school infrastructure setups.</p>
                  </div>
                </div>
              </div>

              <div className={styles.quoteCard}>
                <img src="/images/erma-bombeck.jpg" alt="Erma Bombeck Quote" className={styles.quoteImg} />
                <div>
                  <p className={styles.quoteText}>
                    "Volunteers are the only human beings on the face of the earth who reflect this nation’s compassion, unselfish caring, patience, and just plain loving one another."
                  </p>
                  <span className={styles.quoteAuthor}>— Erma Bombeck</span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                <h3>Volunteer Registration Form</h3>
                <p className={styles.formSub}>Fill in your details below and our team will get in touch with you.</p>

                {submitted ? (
                  <div className={styles.successMessage}>
                    <UserCheck size={48} className={styles.successIcon} />
                    <h4>Thank You for Registering!</h4>
                    <p>Your volunteer application has been submitted successfully. Our team coordinator will reach out to you shortly.</p>
                    <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Register Another Volunteer</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label>Full Name *</label>
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
                        <label>Contact Number *</label>
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

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Date of Birth *</label>
                        <input 
                          type="date" 
                          required 
                          className="input"
                          value={formData.dob}
                          onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Gender *</label>
                        <select 
                          className="input select"
                          value={formData.gender}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Occupation *</label>
                        <select 
                          className="input select"
                          value={formData.occupation}
                          onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                        >
                          <option value="Employed">Employed</option>
                          <option value="Self-Employed">Self-Employed</option>
                          <option value="Retired">Retired</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label>Prior Volunteering Experience? *</label>
                        <select 
                          className="input select"
                          value={formData.hasExperience}
                          onChange={(e) => setFormData({...formData, hasExperience: e.target.value})}
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Message / How would you like to contribute?</label>
                      <textarea 
                        rows={3} 
                        placeholder="Tell us briefly about your background and interests..." 
                        className="input textarea"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    {error && (
                      <div className={styles.errorMessage} style={{ color: 'red', marginBottom: '1rem', padding: '10px', backgroundColor: '#fee' }}>
                        {error}
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={isLoading}>
                      {isLoading ? 'Submitting...' : 'Submit Volunteer Registration'}
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
