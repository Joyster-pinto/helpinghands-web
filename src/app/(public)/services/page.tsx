import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, BookOpen, Users, Wrench, HeartHandshake, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Services & Initiatives | Helping Hands Team Trust',
  description: 'Scholarship schemes and educational development initiatives by Helping Hands Team Trust.',
};

export default function ServicesPage() {
  const schemes = [
    {
      icon: BookOpen,
      title: 'Kamarajar Scholarship Scheme (School)',
      tag: '500+ Beneficiaries',
      desc: 'Financial support for underprivileged school students (Classes 9th to 12th) covering school fees, books, notebooks, bags, uniforms, and essential stationery items.',
      details: [
        'School needs kit: ₹4,000 per student (Uniforms, notebooks, bags, stationary)',
        'Full annual school sponsorship: ₹15,000 per year',
        'Special focus on fatherless, single parent, or orphan children',
      ],
    },
    {
      icon: GraduationCap,
      title: 'Dr. Kalam Scholarship Scheme (College & Higher Ed)',
      tag: '400+ Beneficiaries',
      desc: 'Educational assistance for students completing 12th grade to pursue Arts & Science, Engineering, Polytechnic, and Medical degrees in Government or Aided colleges.',
      details: [
        'Polytechnic course sponsorship: ₹30,000 / year',
        'Arts & Science degree sponsorship: ₹40,000 / year',
        'Engineering degree sponsorship: ₹50,000 / year',
        'Medical (MBBS) degree sponsorship: ₹1,00,000 / year',
      ],
    },
    {
      icon: Users,
      title: 'Mentorship Program',
      tag: '50+ Active Mentors',
      desc: 'One-on-one personal guidance mapping each college beneficiary with an experienced working professional/alumni for academic support, moral encouragement, and career pathing.',
      details: [
        'Regular progress tracking and semester check-ins',
        'Personality development and interview preparation',
        'Soft skills and communication enhancement',
      ],
    },
    {
      icon: Wrench,
      title: 'Payirchi Pattarai (Student Workshops)',
      tag: '32+ Workshops Conducted',
      desc: 'Skill development workshops organized exclusively for Government school students in rural areas.',
      details: [
        'Value Education & Leadership Management',
        'Computer literacy and basic software training',
        'Career Guidance and competitive exam orientation',
      ],
    },
    {
      icon: HeartHandshake,
      title: 'Udavum Karangal (School Infrastructure Development)',
      tag: 'Multiple Govt Schools Upgraded',
      desc: 'Hands-on projects to upgrade basic infrastructure, set up libraries, and establish computer labs in rural Government schools.',
      details: [
        'Government school basic infrastructure setup: ₹20,000',
        'Government school Library setup: ₹40,000',
        'Government school Computer Lab setup (Min 3 PCs): ₹1,20,000',
      ],
    },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Services & Educational Initiatives</h1>
          <p className={styles.breadcrumb}>Home / Services</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.introBox}>
            <h2>Empowering Deserving Students Through Structured Initiatives</h2>
            <p>
              Helping Hands Team Trust offers a complete ecosystem of support ranging from school stationery kits and full college fee sponsorships to school infrastructure upgrades and career workshops.
            </p>
          </div>

          <div className={styles.grid}>
            {schemes.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconCircle}>
                      <IconComponent size={28} />
                    </div>
                    <div>
                      <span className={styles.tag}>{item.tag}</span>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                    </div>
                  </div>
                  <p className={styles.desc}>{item.desc}</p>
                  <ul className={styles.detailsList}>
                    {item.details.map((d, dIdx) => (
                      <li key={dIdx}>
                        <CheckCircle size={16} className={styles.check} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cardFooter}>
                    <Link href="/donate" className="btn btn-outline btn-sm">Sponsor This Initiative</Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
