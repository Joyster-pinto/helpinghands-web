"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle } from 'lucide-react';
import styles from './page.module.css';

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Programs & Eligibility',
      question: 'Who can apply for help in our Trust?',
      answer: 'Deserving school and college students who are reasonably good in their studies and have interest in continuing higher education, specifically under privileged, single-parent, fatherless, or orphan students, or those whose parents are affected by chronic illness (family income < ₹1 Lakh).',
    },
    {
      category: 'Programs & Eligibility',
      question: 'What are the programs we have as of now?',
      answer: '1. Dr. Kalam Scholarship scheme (School Students)\n2. Dr. Kalam Scholarship scheme (Higher Education)\n3. Mentorship Program\n4. Payirchi Pattarai (Training programs for Government school students)\n5. Udavum Karangal (Infrastructure development of Government schools)',
    },
    {
      category: 'Programs & Eligibility',
      question: 'Is financial assistance provided for students only in Tamil Nadu?',
      answer: 'As of now, we focus our activities within the state of Tamil Nadu. With time and encouragement of more volunteers, we aim to take it across India.',
    },
    {
      category: 'Programs & Eligibility',
      question: 'Apart from supporting education, what do we do for students?',
      answer: 'We conduct training programs and workshops on Personality Development, Value Education, Computer Training, Career Guidance, Leadership, Management, and Student Well-being exclusively for Government school students in rural areas.',
    },
    {
      category: 'Application Process',
      question: 'When and how to apply?',
      answer: 'Applications are open from January to April each year. Students can apply directly through our Trust website by filling out the scholarship request form along with necessary marksheets and certificates.',
    },
    {
      category: 'Application Process',
      question: 'How are students selected for Dr. Kalam scholarship scheme?',
      answer: 'Process: 1. Submit filled request form + documents -> 2. Telephonic interview -> 3. Physical house verification by a Trust volunteer -> 4. Personal interview panel selection. This ensures only genuine, deserving candidates receive benefits.',
    },
    {
      category: 'Application Process',
      question: 'Do we get scholarship for subsequent years?',
      answer: 'Renewal depends on maintaining good overall academic performance, attendance, and conduct in school/college.',
    },
    {
      category: 'Donors & Volunteers',
      question: 'Who can sponsor a student & how much can we contribute?',
      answer: 'Anyone interested in funding a student\'s education can sponsor. There are no strict limits (ranging from ₹4,000 for school supplies to ₹15,000-₹50,000/yr for school/college courses).',
    },
    {
      category: 'Donors & Volunteers',
      question: 'Will I be updated about the student(s) I am sponsoring?',
      answer: 'Yes! Sponsors receive regular progress reports, academic marksheets, and direct updates on their sponsored student\'s growth.',
    },
    {
      category: 'Donors & Volunteers',
      question: 'How to be a volunteer & can students volunteer?',
      answer: 'Those interested can register on our website. Students can volunteer for field work/events, but monetary contributions are not accepted from students until they get a job.',
    },
    {
      category: 'Donors & Volunteers',
      question: 'Do you accept foreign funds?',
      answer: 'No, as of now we do not collect any foreign funds.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Frequently Asked Questions (FAQs)</h1>
          <p className={styles.breadcrumb}>Home / Who We Are / FAQs</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.faqList}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={`${styles.faqItem} ${openIndex === idx ? styles.open : ''}`}>
                <button className={styles.questionBtn} onClick={() => toggle(idx)}>
                  <div className={styles.qTextGroup}>
                    <span className={styles.categoryBadge}>{faq.category}</span>
                    <span className={styles.questionText}>{faq.question}</span>
                  </div>
                  <ChevronDown size={20} className={styles.chevron} />
                </button>
                {openIndex === idx && (
                  <div className={styles.answerBox}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.contactCta}>
            <HelpCircle size={32} className={styles.ctaIcon} />
            <h3>Have more questions?</h3>
            <p>Reach out to our team directly via phone or email.</p>
            <Link href="/contact" className="btn btn-primary">Contact Us Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
