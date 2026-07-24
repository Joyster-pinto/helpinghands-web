import { Metadata } from 'next';
import Link from 'next/link';
import { Target, Eye, Quote, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Objective & Vision | Helping Hands Team Trust',
  description: 'Our objective and vision for empowering underprivileged students through education.',
};

export default function ObjectiveVisionPage() {
  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Objective & Vision</h1>
          <p className={styles.breadcrumb}>Home / Who We Are / Objective & Vision</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.grid}>
            {/* Objective Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Target size={32} className={styles.icon} />
                <h2>Our Objective</h2>
              </div>
              <ul className={styles.list}>
                <li>
                  <CheckCircle size={18} className={styles.checkIcon} />
                  <span>Helping Hands is an initiative to provide basic school education to underprivileged, fatherless, single-parent, or orphan school students, and those whose parents are affected by chronic illness, who are reasonably good in studies and interested in continuing their education.</span>
                </li>
                <li>
                  <CheckCircle size={18} className={styles.checkIcon} />
                  <span>To provide higher education (Arts & Science, Polytechnic, or Professional degrees in Government/aided colleges) to deserving students to uplift their family's socio-economic status.</span>
                </li>
                <li>
                  <CheckCircle size={18} className={styles.checkIcon} />
                  <span>To conduct periodic awareness programs, skill development workshops (Payirchi Pattarai), and career guidance sessions for Government school students.</span>
                </li>
                <li>
                  <CheckCircle size={18} className={styles.checkIcon} />
                  <span>To provide a medium for the exchange of information regarding activities, objectives, and experiences with similar social organizations.</span>
                </li>
                <li>
                  <CheckCircle size={18} className={styles.checkIcon} />
                  <span>The benefit of the services rendered by the Trust is open to ALL irrespective of caste, creed, religion, or sex.</span>
                </li>
                <li>
                  <CheckCircle size={18} className={styles.checkIcon} />
                  <span>To raise funds and receive transparent donations, contributions, and subscriptions for carrying out the objects of the Trust.</span>
                </li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Eye size={32} className={styles.icon} />
                <h2>Our Vision</h2>
              </div>
              <blockquote className={styles.visionBox}>
                "To provide basic school and higher education to deserving students and in turn bring about a significant change in the socio-economic status of those students' families."
              </blockquote>

              <div className={styles.quoteCard}>
                <img src="/images/aristotle.jpg" alt="Aristotle Quote" className={styles.quoteImg} />
                <div>
                  <p className={styles.quoteText}>
                    "To give away money is an easy matter and in any man's power. But to decide to whom to give it, and how large and when, and for what purpose and how, is neither in every man's power nor an easy matter."
                  </p>
                  <span className={styles.quoteAuthor}>— Aristotle</span>
                </div>
              </div>

              <div className={styles.ctaBox}>
                <h3>Want to support a student's vision?</h3>
                <p>Join us in bringing qualitative changes to deserving kids.</p>
                <Link href="/donate" className="btn btn-primary">Sponsor A Child Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
