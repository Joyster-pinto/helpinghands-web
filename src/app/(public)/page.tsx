import Link from 'next/link';
import { Heart, BookOpen, GraduationCap, Users, Wrench, ArrowRight, Quote, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

export default function HomePage() {
  const stats = [
    { label: 'School Need Kits Distributed', value: '500+' },
    { label: 'College Scholarships Provided', value: '400+' },
    { label: 'Mentorship Program Members', value: '50+' },
    { label: 'Payirchi Pattarai Workshops', value: '32+' },
  ];

  const pillars = [
    {
      icon: Heart,
      title: 'DONATIONS',
      desc: 'Though our donations are made to please ourselves, we insist upon those who receive our alms being pleased with them.',
      link: '/donate',
    },
    {
      icon: BookOpen,
      title: 'FUNDRAISE & SCHOLARSHIPS',
      desc: 'Fundraising is the gentle art of teaching the joy of giving. Donors invest in ideas and deserving children in whom they believe.',
      link: '/services',
    },
    {
      icon: Users,
      title: 'VOLUNTEER COMMUNITY',
      desc: 'Volunteers are the human beings who reflect compassion, unselfish caring, patience, and loving one another.',
      link: '/volunteers',
    },
  ];

  const galleryPreview = [
    { title: 'Government School Notebook & Bag Distribution', img: '/images/IMG-20190628-WA0015.jpg' },
    { title: 'Payirchi Pattarai Workshop (#1) at Vayalur', img: '/images/IMG-20190504-WA0031.jpg' },
    { title: 'Udavum Karangal School Infra Project', img: '/images/IMG-20190327-WA0054.jpg' },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>WELCOME TO HELPING HANDS TEAM TRUST (Regd. 51/2018)</span>
            <h1 className={styles.heroTitle}>Empowering Futures, One Student at a Time</h1>
            <p className={styles.heroSubtitle}>
              Helping Hands is a non-profit initiative providing basic school and higher education to deserving students in Tamil Nadu, improving their family's socio-economic status.
            </p>
            <div className={styles.heroBtnGroup}>
              <Link href="/donate" className="btn btn-primary btn-lg">
                <Heart size={18} fill="white" /> Make A Donation
              </Link>
              <Link href="/volunteers" className="btn btn-secondary btn-lg">
                Become A Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((st, idx) => (
              <div key={idx} className={styles.statBox}>
                <span className={styles.statVal}>{st.value}</span>
                <span className={styles.statLbl}>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>WHAT WE DO</span>
            <h2>Our Core Pillars of Impact</h2>
            <div className={styles.underline}></div>
          </div>

          <div className={styles.pillarsGrid}>
            {pillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div key={idx} className={styles.pillarCard}>
                  <div className={styles.pillarIcon}>
                    <IconComp size={32} />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <Link href={p.link} className={styles.readMore}>
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Banner Quote */}
      <section className={styles.quoteBanner}>
        <div className="container">
          <div className={styles.quoteContent}>
            <Quote size={40} className={styles.qIcon} />
            <h2>"YOU HAVE NOT LIVED TODAY UNTIL YOU HAVE DONE SOMETHING FOR SOMEONE WHO CAN NEVER REPAY YOU."</h2>
            <div className={styles.bannerBtns}>
              <Link href="/donate" className="btn btn-primary btn-lg">DONATE NOW</Link>
              <Link href="/volunteers" className="btn btn-outline btn-lg" style={{ color: '#ffffff', borderColor: '#ffffff' }}>BECOME A MEMBER</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>FIELD WORK</span>
            <h2>Our Work In Action</h2>
            <div className={styles.underline}></div>
          </div>

          <div className={styles.galleryGrid}>
            {galleryPreview.map((item, idx) => (
              <div key={idx} className={styles.gCard}>
                <img src={item.img} alt={item.title} className={styles.gImg} />
                <div className={styles.gOverlay}>
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.centerBtn}>
            <Link href="/gallery" className="btn btn-secondary">See Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${styles.section} ${styles.testimonialSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>BENEFICIARY VOICES</span>
            <h2>Testimonials & Success Stories</h2>
            <div className={styles.underline}></div>
          </div>

          <div className={styles.testiGrid}>
            <div className={styles.testiCard}>
              <p>"I lost my father during high school. Helping Hands Team Trust paid my school fees, bought my notebooks, and guided me. Today I am pursuing MBBS medical degree thanks to Kalam Scholarship!"</p>
              <div className={styles.testiAuthor}>
                <h4>Malarvizhi</h4>
                <span>MBBS - Karpaga Vinayaga Medical College</span>
              </div>
            </div>

            <div className={styles.testiCard}>
              <p>"The mentorship and Payirchi Pattarai workshops helped me build confidence and secure good marks in 10th and 12th board exams."</p>
              <div className={styles.testiAuthor}>
                <h4>Thirumurugan</h4>
                <span>Sethu Baskara Matriculation School</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
