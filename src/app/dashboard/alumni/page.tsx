import React from 'react';
import styles from './page.module.css';
import { 
  GraduationCap,
  MapPin, 
  Briefcase,
  Award,
  Search,
  Plus,
  HeartHandshake,
  BookOpen
} from 'lucide-react';
import { Linkedin } from '@/components/icons/SocialIcons';
import { mockAlumni } from '@/data/mockData';

export default function AlumniPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Alumni Directory</h1>
          <p className={styles.subtitle}>Track and engage with past beneficiaries</p>
        </div>
        <button className={styles.btnPrimary}>
          <Plus size={18} />
          Add Alumni
        </button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search alumni by name, field or location..." className={styles.searchInput} />
        </div>
        <div className={styles.filters}>
          <select className={styles.select}>
            <option value="">All Schemes</option>
            <option value="vidya_vikas">Vidya Vikas</option>
            <option value="higher_edu">Higher Education</option>
          </select>
          <select className={styles.select}>
            <option value="">All Statuses</option>
            <option value="employed">Employed</option>
            <option value="studying">Studying</option>
            <option value="self_employed">Self Employed</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {mockAlumni.map((alumnus) => (
          <div key={alumnus.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.headerTop}>
                <h3 className={styles.name}>{alumnus.name}</h3>
                <span className={`${styles.badge} ${
                  alumnus.currentStatus === 'employed' ? styles.badgeSuccess : 
                  alumnus.currentStatus === 'studying' ? styles.badgePrimary : 
                  styles.badgeWarning
                }`}>
                  {alumnus.currentStatus.replace('_', ' ')}
                </span>
              </div>
              <div className={styles.educationInfo}>
                <GraduationCap size={16} />
                <span>{alumnus.degree} • {alumnus.graduationYear}</span>
              </div>
              <div className={styles.institution}>{alumnus.institution}</div>
            </div>
            
            <div className={styles.cardBody}>
              <div className={styles.infoGrid}>
                {alumnus.currentOrganization && (
                  <div className={styles.infoRow}>
                    <Briefcase size={16} className={styles.icon} />
                    <div className={styles.infoText}>
                      <strong>{alumnus.currentRole}</strong>
                      <span>at {alumnus.currentOrganization}</span>
                    </div>
                  </div>
                )}
                <div className={styles.infoRow}>
                  <MapPin size={16} className={styles.icon} />
                  <span className={styles.infoText}>{alumnus.location}</span>
                </div>
              </div>

              {alumnus.achievements.length > 0 && (
                <div className={styles.achievements}>
                  <h4 className={styles.sectionTitle}>Achievements</h4>
                  <ul className={styles.list}>
                    {alumnus.achievements.map((ach, idx) => (
                      <li key={idx}>
                        <Award size={14} className={styles.listIcon} />
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.engagement}>
                {alumnus.isMentor && (
                  <div className={styles.engagementBadge}>
                    <BookOpen size={14} /> Mentor
                  </div>
                )}
                {alumnus.isVolunteer && (
                  <div className={styles.engagementBadge}>
                    <HeartHandshake size={14} /> Volunteer
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.cardFooter}>
              <div className={styles.contributions}>
                {alumnus.totalContributions && alumnus.totalContributions > 0 ? (
                  <span>Contributed: <strong>{formatCurrency(alumnus.totalContributions)}</strong></span>
                ) : (
                  <span className={styles.textMuted}>No contributions yet</span>
                )}
              </div>
              
              <div className={styles.actions}>
                {alumnus.linkedIn && (
                  <a href={alumnus.linkedIn} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <Linkedin size={18} />
                  </a>
                )}
                <button className={styles.btnText}>View Full Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
