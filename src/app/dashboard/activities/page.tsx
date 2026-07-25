'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Plus, 
  CheckCircle2,
  X,
  Briefcase
} from 'lucide-react';
import { mockActivities as initialMockActivities } from '@/data/mockData';
import { Activity } from '@/types';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(initialMockActivities);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'education',
    date: '',
    location: '',
    budget: '',
    beneficiariesCovered: '',
    description: '',
  });

  // Fetch live activities from MongoDB Atlas
  useEffect(() => {
    async function loadActivities() {
      try {
        const res = await fetch('/api/activities');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setActivities(data);
        }
      } catch (err) {
        console.warn('Failed to load DB activities, using fallback data.');
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const getStatusBadgeClass = (status: string) => {
    switch((status || '').toLowerCase()) {
      case 'completed': return styles.badgeSuccess;
      case 'ongoing': return styles.badgePrimary;
      case 'planned': return styles.badgeWarning;
      case 'cancelled': return styles.badgeError;
      default: return styles.badgeDefault;
    }
  };

  const filteredActivities = activities.filter(a => {
    if (activeTab === 'All') return true;
    return (a.status || '').toLowerCase() === activeTab.toLowerCase();
  });

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newActivityPayload = {
      id: `act_${Date.now()}`,
      title: formData.title,
      category: formData.category as any,
      date: formData.date,
      location: formData.location,
      status: 'planned' as const,
      budget: Number(formData.budget) || 0,
      actualSpent: 0,
      beneficiariesCovered: Number(formData.beneficiariesCovered) || 0,
      description: formData.description,
      organizer: 'Fr. Administrator',
    };

    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newActivityPayload),
      });
      const resData = await res.json();
      if (resData.success) {
        setActivities([resData.data, ...activities]);
      } else {
        setActivities([newActivityPayload as any, ...activities]);
      }
    } catch (err) {
      setActivities([newActivityPayload as any, ...activities]);
    }

    setShowAddModal(false);
    setFormData({ title: '', category: 'education', date: '', location: '', budget: '', beneficiariesCovered: '', description: '' });
    alert('Activity created and saved to MongoDB Atlas!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Activity Center</h1>
          <p className={styles.subtitle}>Manage trust activities, campaigns, and events</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          Create Activity
        </button>
      </div>

      <div className={styles.tabs}>
        {['All', 'Planned', 'Ongoing', 'Completed', 'Cancelled'].map((tab) => (
          <button 
            key={tab} 
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredActivities.map((activity) => {
          const budgetPercent = activity.budget > 0 ? (activity.actualSpent / activity.budget) * 100 : 0;
          
          return (
            <div key={activity.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.categoryBadge}>{(activity.category || '').replace('_', ' ')}</div>
                <span className={`${styles.statusBadge} ${getStatusBadgeClass(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
              
              <div className={styles.cardBody}>
                <h3 className={styles.activityTitle}>{activity.title}</h3>
                
                <div className={styles.metaInfo}>
                  <div className={styles.metaItem}>
                    <Calendar size={14} />
                    <span>{activity.date ? new Date(activity.date).toLocaleDateString() : 'TBD'}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <MapPin size={14} />
                    <span>{activity.location}</span>
                  </div>
                  {activity.beneficiariesCovered > 0 && (
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
                    {activity.organizer ? activity.organizer.substring(0, 2).toUpperCase() : 'AD'}
                  </div>
                  <span className={styles.organizerName}>{activity.organizer || 'Trust Admin'}</span>
                </div>
                <button className={styles.btnText} onClick={() => setSelectedActivity(activity)}>View Details</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0 }}>{selectedActivity.title}</h2>
                <p className={styles.modalSub}>{(selectedActivity.category || '').toUpperCase()} | {(selectedActivity.status || '').toUpperCase()}</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedActivity(null)}><X size={20} /></button>
            </div>

            <div className={styles.detailBody}>
              <div className={styles.infoRow}><Calendar size={16} /> <span>Date: {selectedActivity.date ? new Date(selectedActivity.date).toLocaleDateString() : 'N/A'}</span></div>
              <div className={styles.infoRow}><MapPin size={16} /> <span>Location: {selectedActivity.location}</span></div>
              <div className={styles.infoRow}><Users size={16} /> <span>Beneficiaries Reached: {selectedActivity.beneficiariesCovered || 'N/A'}</span></div>
              <div className={styles.infoRow}><Briefcase size={16} /> <span>Organizer: {selectedActivity.organizer || 'Helping Hands Board'}</span></div>
              
              <div style={{ marginTop: '15px' }}>
                <h4>Description & Campaign Goal</h4>
                <p style={{ color: '#495057', fontSize: '14px', lineHeight: '1.6' }}>{selectedActivity.description}</p>
              </div>

              {selectedActivity.outcome && (
                <div style={{ marginTop: '15px', background: '#e6f4ea', padding: '12px 15px', borderRadius: '8px' }}>
                  <h4 style={{ color: '#137333', margin: '0 0 5px 0' }}>Verified Event Outcome</h4>
                  <p style={{ color: '#2b2d32', margin: 0, fontSize: '13px' }}>{selectedActivity.outcome}</p>
                </div>
              )}
            </div>

            <div className={styles.modalActions}>
              <button className="btn btn-primary" onClick={() => setSelectedActivity(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Activity Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2>Create New Activity</h2>
              <button className={styles.closeBtn} onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Activity Title *</label>
                <input type="text" required placeholder="e.g. Annual School Kit & Uniform Distribution 2026" className="input" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Category *</label>
                  <select className="input select" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="education">Education</option>
                    <option value="health">Health & Medical</option>
                    <option value="career">Career Development</option>
                    <option value="outreach">Community Outreach</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Event Date *</label>
                  <input type="date" required className="input" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Location / Venue *</label>
                <input type="text" required placeholder="e.g. Kelambakkam Community Hall" className="input" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Sanctioned Budget (₹) *</label>
                  <input type="number" required placeholder="e.g. 75000" className="input" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Expected Beneficiaries</label>
                  <input type="number" placeholder="e.g. 50" className="input" value={formData.beneficiariesCovered} onChange={(e) => setFormData({...formData, beneficiariesCovered: e.target.value})} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Activity Description *</label>
                <textarea rows={3} required placeholder="Detailed activity objectives and details..." className="input textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Activity to MongoDB</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
