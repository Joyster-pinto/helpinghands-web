"use client";

import React, { useState } from 'react';
import { Building2, Heart, Award, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

export default function CorporatePartnersPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Corporate Partners & CSR</h1>
          <p className={styles.breadcrumb}>Home / Ways To Give / Corporate Partners</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.grid}>
            {/* Info Column */}
            <div className={styles.infoCol}>
              <span className={styles.tag}>CSR & CORPORATE GIVING</span>
              <h2>Partner With Us For Educational Transformation</h2>
              <p className={styles.leadPara}>
                We partner with corporate organizations and business foundations under Corporate Social Responsibility (CSR) initiatives to fund government school infrastructure, computer labs, and full higher-education scholarships.
              </p>

              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <Building2 size={24} className={styles.icon} />
                  <div>
                    <h4>Computer Lab Setups (CSR)</h4>
                    <p>Sponsor 3+ computers for rural government schools at ₹1.2 Lakhs per lab.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <Award size={24} className={styles.icon} />
                  <div>
                    <h4>Full Batch Educational Scholarships</h4>
                    <p>Sponsor entire cohorts of Polytechnic, Arts, Engineering, or Medical students with 100% transparent audit reporting.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <CheckCircle2 size={24} className={styles.icon} />
                  <div>
                    <h4>Tax Exemption & Audit Transparency</h4>
                    <p>Helping Hands Team Trust provides official receipts and 80G tax exemption documentation for all corporate donations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                <h3>Corporate Partnership Inquiry</h3>
                <p className={styles.formSub}>Submit your organization's details to explore CSR partnership opportunities.</p>

                {submitted ? (
                  <div className={styles.successMessage}>
                    <CheckCircle2 size={48} className={styles.successIcon} />
                    <h4>Partnership Inquiry Received!</h4>
                    <p>Thank you. Our corporate relations lead will reach out to you within 24 hours.</p>
                    <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label>Company / Organization Name *</label>
                      <input type="text" required placeholder="e.g. Infosys Foundation / GMV Engineering" className="input" />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Contact Person Name *</label>
                      <input type="text" required placeholder="Enter contact person name" className="input" />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Work Email *</label>
                        <input type="email" required placeholder="corporate@company.com" className="input" />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Phone Number *</label>
                        <input type="tel" required placeholder="+91 98765 43210" className="input" />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Area of CSR Interest *</label>
                      <select className="input select">
                        <option value="school_sponsorship">School / College Fee Sponsorships</option>
                        <option value="computer_lab">Government School Computer Labs</option>
                        <option value="library_infra">School Library & Infrastructure</option>
                        <option value="general_csr">General CSR Contribution</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Message / Details</label>
                      <textarea rows={3} placeholder="Tell us about your CSR budget or specific initiative goals..." className="input textarea" />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      Submit CSR Partnership Inquiry
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
