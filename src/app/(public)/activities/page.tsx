'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, IndianRupee } from 'lucide-react';
import styles from './page.module.css';
import { Activity } from '@/types';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const res = await fetch('/api/activities');
        const data = await res.json();
        if (Array.isArray(data)) {
          setActivities(data);
        }
      } catch (err) {
        console.warn('Failed to load DB activities');
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, []);

  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Education', 'Health', 'Outreach', 'Career Development'];

  // Filter activities based on the active tab
  const filteredActivities = filter === 'All' ? activities : activities.filter((a: Activity) => a.title.includes(filter) || (filter==='Education' && a.title.includes('Scholarship')));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Our Activities</h1>
          <p className={styles.subtitle}>Discover the impact we're making through our various programs and initiatives.</p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.filters}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredActivities.map((activity: Activity) => (
            <div key={activity.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={`${styles.status} ${styles[activity.status.toLowerCase()]}`}>
                  {activity.status}
                </span>
                <span className={styles.date}>
                  <Calendar size={14} />
                  {activity.date}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{activity.title}</h3>
              <p className={styles.cardDesc}>{activity.description}</p>
              
              <div className={styles.cardMeta}>
                {activity.location && (
                  <div className={styles.metaItem}>
                    <MapPin size={16} />
                    <span>{activity.location}</span>
                  </div>
                )}
                {activity.beneficiariesCovered && (
                  <div className={styles.metaItem}>
                    <Users size={16} />
                    <span>{activity.beneficiariesCovered} Beneficiaries</span>
                  </div>
                )}
                {activity.budget && (
                  <div className={styles.metaItem}>
                    <IndianRupee size={16} />
                    <span>{activity.budget.toLocaleString('en-IN')} Budget</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
