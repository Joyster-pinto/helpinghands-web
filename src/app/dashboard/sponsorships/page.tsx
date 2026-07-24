import React from 'react';
import styles from './page.module.css';
import { 
  Users, 
  Building2, 
  Heart, 
  Plus, 
  Search,
  Mail,
  Phone,
  Target
} from 'lucide-react';
import { mockSponsors } from '@/data/mockData';

export default function SponsorshipsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalCommitted = mockSponsors.reduce((sum, s) => sum + s.totalCommitted, 0);
  const totalReceived = mockSponsors.reduce((sum, s) => sum + s.totalPaid, 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Sponsorship Management</h1>
          <p className={styles.subtitle}>Manage corporate and individual sponsors</p>
        </div>
        <button className={styles.btnPrimary}>
          <Plus size={18} />
          Add Sponsor
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(248, 157, 53, 0.1)', color: 'var(--color-primary)' }}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Sponsors</p>
            <h3 className={styles.statValue}>{mockSponsors.length}</h3>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--color-success)' }}>
            <Heart size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Active Sponsors</p>
            <h3 className={styles.statValue}>{mockSponsors.filter(s => s.status === 'active').length}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <Target size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Committed</p>
            <h3 className={styles.statValue}>{formatCurrency(totalCommitted)}</h3>
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search sponsors..." className={styles.searchInput} />
        </div>
      </div>

      <div className={styles.grid}>
        {mockSponsors.map((sponsor) => {
          const progressPercent = sponsor.totalCommitted > 0 ? (sponsor.totalPaid / sponsor.totalCommitted) * 100 : 0;
          
          return (
            <div key={sponsor.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.sponsorType}>
                  {sponsor.type === 'corporate' ? <Building2 size={16} /> : <Users size={16} />}
                  <span>{sponsor.type}</span>
                </div>
                <span className={`${styles.badge} ${sponsor.status === 'active' ? styles.badgeSuccess : styles.badgeWarning}`}>
                  {sponsor.status}
                </span>
              </div>
              
              <div className={styles.cardBody}>
                <h3 className={styles.name}>{sponsor.name}</h3>
                {sponsor.organization && (
                  <p className={styles.organization}>{sponsor.organization}</p>
                )}
                
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <Mail size={14} />
                    <span>{sponsor.email}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <Phone size={14} />
                    <span>{sponsor.phone}</span>
                  </div>
                </div>

                <div className={styles.sponsorshipDetails}>
                  <div className={styles.detailRow}>
                    <span>Beneficiaries Supported:</span>
                    <strong>{sponsor.beneficiaries.length}</strong>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Renewal Date:</span>
                    <strong>{sponsor.renewalDate ? new Date(sponsor.renewalDate).toLocaleDateString() : 'N/A'}</strong>
                  </div>
                </div>

                <div className={styles.progressSection}>
                  <div className={styles.progressHeader}>
                    <span className={styles.progressLabel}>Payment Progress</span>
                    <span className={styles.progressValue}>
                      {formatCurrency(sponsor.totalPaid)} / {formatCurrency(sponsor.totalCommitted)}
                    </span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div 
                      className={styles.progressBarFill} 
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className={styles.cardFooter}>
                <button className={styles.btnSecondary}>Communication Log</button>
                <button className={styles.btnText}>Manage</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
