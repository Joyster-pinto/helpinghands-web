import { Metadata } from 'next';
import Link from 'next/link';
import { Target, Eye, Heart, Shield, Users, Award, Calendar, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Who We Are & About Us | Helping Hands Team Trust',
  description: 'Learn about Helping Hands Team Trust history, founders, vision, and team members.',
};

export default function AboutPage() {
  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Who We Are</h1>
          <p className={styles.breadcrumb}>Home / About Us</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.grid}>
            {/* Story Column */}
            <div className={styles.storyCol}>
              <span className={styles.tag}>OUR JOURNEY & MISSION</span>
              <h2>Changing Lives Through Endless Love & Quality Education</h2>
              <p className={styles.leadPara}>
                We are a team of passionate volunteers dedicated to supporting underprivileged school and college students in their educational needs, thereby uplifting the socio-economic status of their families.
              </p>

              <div className={styles.textBody}>
                <p>
                  We believe that <strong>CHANGE is possible as a team</strong>. We dream of a society where every child gets quality education, and every citizen volunteers at least once a month (12/365) through field work and contributions.
                </p>
                <p>
                  To make our dreams come true, the Helping Hands team started its journey on <strong>June 2016</strong>. We started with 10 members initially and supported 18 school students by paying their school fees and buying books, uniforms, bags, and stationery.
                </p>
                <p>
                  In 2017, our volunteer strength grew to 70, supporting 45 school students and 3 college students (including a medical MBBS student). By 2018, with 180+ volunteers supporting 65+ students, we officially registered as a public charitable trust: <strong>Helping Hands Team Trust (Regd. No. 51/2018)</strong>.
                </p>
              </div>

              <div className={styles.quoteCard}>
                <img src="/images/mother-terasa.jpg" alt="Mother Teresa" className={styles.quoteImg} />
                <div>
                  <p className={styles.quoteText}>
                    "I am not sure exactly what heaven will be like, but I know that when we die and it comes time for God to judge us, he will not ask, ‘How many good things have you done in your life?’ rather he will ask, ‘How much love did you put into what you did?'"
                  </p>
                  <span className={styles.quoteAuthor}>— Mother Teresa</span>
                </div>
              </div>
            </div>

            {/* Stats & Highlights Column */}
            <div className={styles.statsCol}>
              <div className={styles.imageCard}>
                <img src="/images/IMG_20170729_181042.jpg" alt="Helping Hands Team Meeting" className={styles.storyImage} />
                <div className={styles.imageOverlay}>
                  <span>Registered Trust No: 51/2018</span>
                  <h4>Founded June 2016 in Tamil Nadu</h4>
                </div>
              </div>

              <div className={styles.milestonesCard}>
                <h3>Milestone Growth</h3>
                <div className={styles.timelineItem}>
                  <span className={styles.year}>2016</span>
                  <p>Started with 10 members supporting 18 school students.</p>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.year}>2017</span>
                  <p>Grew to 70 volunteers supporting 48 students (including MBBS medical scholarship).</p>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.year}>2018</span>
                  <p>Expanded to 180+ volunteers supporting 65+ students. Registered as Trust Regd. 51/2018.</p>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.year}>Present</span>
                  <p>500+ School Kits distributed, 400+ College scholarships, 32+ workshops, and school computer labs built!</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.navLinksRow}>
            <Link href="/objective-and-vision" className={styles.navBox}>
              <Target size={28} />
              <div>
                <h4>Objective & Vision</h4>
                <p>Read our core tenets and vision statement</p>
              </div>
            </Link>
            <Link href="/board-of-directors" className={styles.navBox}>
              <Users size={28} />
              <div>
                <h4>Board of Directors</h4>
                <p>Meet our trustees and office bearers</p>
              </div>
            </Link>
            <Link href="/core-teams" className={styles.navBox}>
              <Award size={28} />
              <div>
                <h4>Core Teams & Advisory</h4>
                <p>Discover our operational divisions</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
