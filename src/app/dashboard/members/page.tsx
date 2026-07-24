import React from 'react';
import styles from './page.module.css';
import { 
  Users, 
  Search, 
  Plus, 
  LayoutGrid, 
  List, 
  Mail, 
  Phone,
  Award
} from 'lucide-react';
import { mockMembers } from '@/data/mockData';

export default function MembersPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Trust Members</h1>
          <p className={styles.subtitle}>Manage trust members, core committee, and active volunteers</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnPrimary}>
            <Plus size={18} />
            Add Member
          </button>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search members by name, email or role..." className={styles.searchInput} />
        </div>
        <div className={styles.viewToggle}>
          <button className={`${styles.toggleBtn} ${styles.active}`}><LayoutGrid size={18} /></button>
          <button className={styles.toggleBtn}><List size={18} /></button>
        </div>
      </div>

      <div className={styles.grid}>
        {mockMembers.map((member) => (
          <div key={member.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                {getInitials(member.name)}
              </div>
              <div className={styles.statusBadgeWrapper}>
                <span className={`${styles.badge} ${member.status === 'active' ? styles.badgeSuccess : styles.badgeWarning}`}>
                  {member.status}
                </span>
              </div>
            </div>
            
            <div className={styles.cardBody}>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{member.designation.replace('_', ' ').toUpperCase()}</p>
              
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <Mail size={14} />
                  <span>{member.email}</span>
                </div>
                <div className={styles.contactItem}>
                  <Phone size={14} />
                  <span>{member.phone}</span>
                </div>
              </div>

              {member.totalContributions && (
                <div className={styles.contributions}>
                  <Award size={16} className={styles.awardIcon} />
                  <span>Total Contributions: <strong>{formatCurrency(member.totalContributions)}</strong></span>
                </div>
              )}

              <p className={styles.bio}>{member.bio}</p>
            </div>
            
            <div className={styles.cardFooter}>
              <span className={styles.joinDate}>Joined: {new Date(member.joinDate).getFullYear()}</span>
              <button className={styles.btnText}>View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
