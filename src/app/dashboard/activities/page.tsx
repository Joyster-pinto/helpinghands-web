import React from 'react';
import styles from './page.module.css';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Plus, 
  IndianRupee,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { mockActivities } from '@/data/mockData';

export default function ActivitiesPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'completed': return styles.badgeSuccess;
      case 'ongoing': return styles.badgePrimary;
      case 'planned': return styles.badgeWarning;
      case 'cancelled': return styles.badgeError;
      default: return styles.badgeDefault;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Activity Center</h1>
          <p className={styles.subtitle}>Manage trust activities, campaigns, and events</p>
        </div>
        <button className={styles.btnPrimary}>
          <Plus size={18} />
          Create Activity
        </button>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.activeTab}`}>All</button>
        <button className={styles.tab}>Planned</button>
        <button className={styles.tab}>Ongoing</button>
        <button className={styles.tab}>Completed</button>
        <button className={styles.tab}>Cancelled</button>
      </div>

      <div className={styles.grid}>
        {mockActivities.map((activity) => {
          const budgetPercent = (activity.actualSpent / activity.budget) * 100;
          
          return (
            <div key={activity.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.categoryBadge}>{activity.category.replace('_', ' ')}</div>
                <span className={`${styles.statusBadge} ${getStatusBadgeClass(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
              
              <div className={styles.cardBody}>
                <h3 className={styles.activityTitle}>{activity.title}</h3>
                
                <div className={styles.metaInfo}>
                  <div className={styles.metaItem}>
                    <Calendar size={14} />
                    <span>{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <MapPin size={14} />
                    <span>{activity.location}</span>
                  </div>
                  {activity.beneficiariesCovered && (
                    <div className={styles.metaItem}>
                      <Users size={14} />
                      <span>{activity.beneficiariesCovered} beneficiaries</span>
                    </div>
                  )}
                </div>

                <p className={styles.description}>{activity.description}</p>
                
                {activity.outcome && (
                  <div className={styles.outcome}>
                    <CheckCircle2 size={14} className={styles.outcomeIcon} />
                    <p>{activity.outcome}</p>
                  </div>
                )}

                <div className={styles.budgetSection}>
                  <div className={styles.budgetHeader}>
                    <span className={styles.budgetLabel}>Budget Utilization</span>
                    <span className={styles.budgetAmount}>
                      {formatCurrency(activity.actualSpent)} / {formatCurrency(activity.budget)}
                    </span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div 
                      className={styles.progressBarFill} 
                      style={{ 
                        width: `${Math.min(budgetPercent, 100)}%`,
                        backgroundColor: budgetPercent > 100 ? 'var(--color-error)' : 'var(--color-primary)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className={styles.cardFooter}>
                <div className={styles.organizer}>
                  <div className={styles.organizerAvatar}>
                    {activity.organizer.substring(0, 2).toUpperCase()}
                  </div>
                  <span className={styles.organizerName}>Organizer</span>
                </div>
                <button className={styles.btnText}>View Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
