import { Metadata } from 'next';
import Link from 'next/link';
import { Quote, Heart, BookOpen, Sun } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Message From The Board | Helping Hands Team Trust',
  description: 'A message from the board of directors of Helping Hands Team Trust.',
};

export default function MessageFromBoardPage() {
  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Message From The Board</h1>
          <p className={styles.breadcrumb}>Home / Who We Are / Message From The Board</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.card}>
            <div className={styles.iconHeader}>
              <Quote size={48} className={styles.quoteIcon} />
            </div>
            
            <div className={styles.messageBody}>
              <p className={styles.leadText}>
                "Education promotes equality and lifts people out of poverty. It teaches children how to become good citizens. Education is not just for a privileged few, it is for everyone. It is a fundamental human right."
              </p>

              <div className={styles.highlightBox}>
                <p>
                  "Let us remember: <strong>One book, one pen, one child, and one teacher can change the world.</strong> Education is our passport to the future, for tomorrow belongs to the people who prepare for it today."
                </p>
              </div>

              <p>
                We began our journey with a simple yet strong belief that education is the means as well as the end to a better life: the means because it empowers an individual to earn his/her livelihood, and the end because it increases one’s awareness on a range of issues – from healthcare to appropriate social behavior to understanding one’s rights – and in the process, helps him/her evolve as a better citizen.
              </p>

              <p>
                If we wish to build a strong foundation for the society in the years to come, it is important that we nurture our children with love, care, education, and right values.
              </p>
            </div>

            <div className={styles.signatureBox}>
              <div className={styles.signatureInfo}>
                <h4>The Board of Directors</h4>
                <p>Helping Hands Team Trust (Regd. 51/2018)</p>
              </div>
              <Link href="/board-of-directors" className="btn btn-outline">Meet The Directors</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
