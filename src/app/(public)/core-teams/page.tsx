import { Metadata } from 'next';
import { Shield, Users, Award, FileCheck, DollarSign, Building, Search, GraduationCap } from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Core Teams & Advisory | Helping Hands Team Trust',
  description: 'Advisory members and functional core teams driving Helping Hands Team Trust operations.',
};

export default function CoreTeamsPage() {
  const advisoryMembers = [
    {
      name: 'Dr. L. Mahesh Kumar',
      role: 'M.E, Ph.D, Director Academic, St. Peter\'s Institute of Higher Education and Research',
    },
    {
      name: 'Mr. P. B. Ravikumar',
      role: 'Managing Director & CEO, GMV Engineering Pvt. Ltd.',
    },
    {
      name: 'Mr. B. Nishudhassan',
      role: 'Legal Advisor, Advocate (Dr. Ambedkar Advocate Association, State Vice Secretary)',
    },
    {
      name: 'Mrs. E. S. Kayalvizhi',
      role: 'Senior Accountant, ADF DATA SCIENCE PVT LTD.',
    },
  ];

  const functionalTeams = [
    {
      name: 'Accounts Team',
      icon: DollarSign,
      coordinator: 'Mr. S. Bharathiraja',
      members: ['Mrs. E.S. Kayalvizhi', 'Mr. R. Kumar'],
    },
    {
      name: 'Performance Analysis Team',
      icon: Award,
      coordinator: 'Mr. L. Thirunavukkarasu',
      members: ['Mr. R. Gokul'],
    },
    {
      name: 'Document Verification Team',
      icon: FileCheck,
      coordinator: 'Mrs. Ameena Sulthana',
      members: ['Mrs. S. Anandha Jothi', 'Ms. K. Preetha'],
    },
    {
      name: 'Fund Raising Team',
      icon: Users,
      coordinator: 'Mr. K. Vijayaragavan & Mr. M. Bright Selvin',
      members: ['Mr. G. Mohanasundaram', 'Mr. R. Jagadish', 'Mr. A. Ahamed Arafath', 'Mr. Thameem Ansari'],
    },
    {
      name: 'Infrastructure Development Team',
      icon: Building,
      coordinator: 'Mr. S. P. Sathyamurthy',
      members: ['Mr. V. Chinnadurai', 'Mr. S. Bharathiraja', 'Mr. V. Sowthermenthiran'],
    },
    {
      name: 'Internal Auditing Team',
      icon: Search,
      coordinator: 'Mr. Nachiyappan',
      members: ['Mrs. G. Anusooya'],
    },
    {
      name: 'Students Training Team',
      icon: GraduationCap,
      coordinator: 'Ms. V. Mohanapriya',
      members: ['Dr. D. Yokesh', 'Dr. G. Suganya', 'Dr. Asnath Victy Pamila', 'Ms. N. Meenakshi', 'Ms. G. Saranya'],
    },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.headerBanner}>
        <div className="container">
          <h1 className={styles.title}>Core Teams & Advisory</h1>
          <p className={styles.breadcrumb}>Home / Who We Are / Core Teams</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          {/* Advisory Members */}
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>EXPERT GUIDANCE</span>
            <h2>Advisory Board</h2>
            <div className={styles.underline}></div>
          </div>

          <div className={styles.advisoryGrid}>
            {advisoryMembers.map((adv, idx) => (
              <div key={idx} className={styles.advisoryCard}>
                <Shield size={32} className={styles.shieldIcon} />
                <h3>{adv.name}</h3>
                <p>{adv.role}</p>
              </div>
            ))}
          </div>

          {/* Functional Teams */}
          <div className={`${styles.sectionHeader} ${styles.teamsHeader}`}>
            <span className={styles.subTitle}>OPERATIONAL DIVISIONS</span>
            <h2>Functional Core Teams</h2>
            <div className={styles.underline}></div>
          </div>

          <div className={styles.teamsGrid}>
            {functionalTeams.map((team, idx) => {
              const IconComponent = team.icon;
              return (
                <div key={idx} className={styles.teamCard}>
                  <div className={styles.teamHeader}>
                    <IconComponent size={24} className={styles.teamIcon} />
                    <h3>{team.name}</h3>
                  </div>
                  <div className={styles.teamBody}>
                    <p className={styles.coordinator}>
                      <strong>Coordinator:</strong> {team.coordinator}
                    </p>
                    <div className={styles.membersList}>
                      <strong>Members:</strong>
                      <ul>
                        {team.members.map((m, mIdx) => (
                          <li key={mIdx}>{m}</li>
                        ))}
                      </ul>
                    </div>
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
