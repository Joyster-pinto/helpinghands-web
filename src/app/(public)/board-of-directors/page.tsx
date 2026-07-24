import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Board of Directors | Helping Hands Team Trust',
  description: 'Meet the Board of Directors and Trustees of Helping Hands Team Trust.',
};

export default function BoardOfDirectorsPage() {
  const officeBearers = [
    {
      name: 'Mr. S. Bharathiraja',
      title: 'FOUNDER AND PRESIDENT',
      image: '/images/bharathiraja.jpeg',
    },
    {
      name: 'Mr. M. BrightSelvin',
      title: 'Secretary',
      image: '/images/bright-selvin.jpg',
    },
    {
      name: 'Mr. V. ChinnaDurai',
      title: 'Joint Secretary',
      image: '/images/chinnadurai-v.jpg',
    },
    {
      name: 'Mr. R. Kumar',
      title: 'Treasurer',
      image: '/images/kumar.jpeg',
    },
    {
      name: 'Mr. P. Kannan',
      title: 'Chief Technology Officer',
      image: '/images/kannan-p.jpg',
    },
    {
      name: 'Mr. S. Sathyamurthy',
      title: 'Chief Educational Officer',
      image: '/images/s-p-sathyamurthy.jpg',
    },
  ];

  const trustees = [
    {
      name: 'Mr. G. Mohanasundaram',
      title: 'Member',
      image: '/images/mohanasundaram.jpg',
    },
    {
      name: 'Mr. S.P. Purushothaman',
      title: 'Member',
      image: '/images/purushothaman.jpg',
    },
    {
      name: 'Mrs. Ameena Sulthana',
      title: 'Member',
      image: '/images/default_female.jpg',
    },
    {
      name: 'Mrs. G. Suganya',
      title: 'Member',
      image: '/images/suganya-g.jpg',
    },
    {
      name: 'Mr. K. Vijayaragavan',
      title: 'Member',
      image: '/images/vijayaragavan.jpg',
    },
    {
      name: 'Mr. K. Balasubramaniam',
      title: 'Member',
      image: '/images/k-balasubramaniam.jpg',
    },
    {
      name: 'Mr. V. Sowthermenthiran',
      title: 'Member',
      image: '/images/sowther-menthiran.jpg',
    },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Board of Directors</h1>
          <p className={styles.breadcrumb}>Home / Who We Are / Board of Directors</p>
        </div>
      </section>

      {/* Main Section */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>LEADERSHIP</span>
            <h2>Office Bearers</h2>
            <div className={styles.underline}></div>
          </div>

          <div className={styles.grid}>
            {officeBearers.map((member, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={member.image} alt={member.name} className={styles.photo} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trustees Section */}
          <div className={`${styles.sectionHeader} ${styles.trusteesHeader}`}>
            <span className={styles.subTitle}>DEDICATED MEMBERS</span>
            <h2>Trustees</h2>
            <div className={styles.underline}></div>
          </div>

          <div className={styles.grid}>
            {trustees.map((member, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={member.image} alt={member.name} className={styles.photo} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
