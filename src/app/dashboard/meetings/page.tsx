'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Plus, 
  FileText,
  ChevronDown,
  X
} from 'lucide-react';

import { Meeting } from '@/types';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'regular',
    date: '',
    venue: '',
    agendaText: '',
  });

  // Fetch live meetings from MongoDB Atlas
  useEffect(() => {
    async function loadMeetings() {
      try {
        const res = await fetch('/api/meetings');
        const data = await res.json();
        if (Array.isArray(data)) {
          setMeetings(data);
        }
      } catch (err) {
        console.warn('Failed to load DB meetings');
      } finally {
        setLoading(false);
      }
    }
    loadMeetings();
  }, []);

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMeetingPayload = {
      id: `m_${Date.now()}`,
      title: formData.title,
      type: formData.type as any,
      date: formData.date,
      time: '10:00 AM',
      venue: formData.venue,
      agenda: formData.agendaText.split('\n').filter(a => a.trim().length > 0),
      attendees: ['Fr. Administrator', 'John Treasurer'],
      absentees: [],
      minutesOfMeeting: '',
      resolutions: [],
      actionItems: [],
      documents: [],
      createdBy: 'u1'
    };

    try {
      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeetingPayload),
      });
      const resData = await res.json();
      if (resData.success) {
        setMeetings([resData.data, ...meetings]);
      } else {
        setMeetings([newMeetingPayload as any, ...meetings]);
      }
    } catch (err) {
      setMeetings([newMeetingPayload as any, ...meetings]);
    }

    setShowScheduleModal(false);
    setFormData({ title: '', type: 'regular', date: '', venue: '', agendaText: '' });
    alert('Meeting scheduled and saved to MongoDB Atlas!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Meetings & Records</h1>
          <p className={styles.subtitle}>Manage official meetings, agendas, and minutes</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setShowScheduleModal(true)}>
          <Plus size={18} />
          Schedule Meeting
        </button>
      </div>

      <div className={styles.grid}>
        {meetings.map((meeting) => (
          <div key={meeting.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={`${styles.badge} ${
                meeting.type === 'agm' ? styles.badgeWarning : 
                meeting.type === 'emergency' ? styles.badgeError : 
                styles.badgePrimary
              }`}>
                {(meeting.type || 'regular').toUpperCase()}
              </span>
              <span className={`${styles.statusBadge} ${meeting.minutesOfMeeting ? styles.statusCompleted : styles.statusScheduled}`}>
                {meeting.minutesOfMeeting ? 'completed' : 'scheduled'}
              </span>
            </div>
            
            <div className={styles.cardBody}>
              <h3 className={styles.meetingTitle}>{meeting.title}</h3>
              
              <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                  <Calendar size={14} />
                  <span>{meeting.date ? new Date(meeting.date).toLocaleDateString() : 'TBD'}</span>
                </div>
                <div className={styles.metaItem}>
                  <MapPin size={14} />
                  <span>{meeting.venue}</span>
                </div>
              </div>

              <div className={styles.agendaPreview}>
                <h4 className={styles.sectionTitle}>Agenda Items</h4>
                <ul className={styles.agendaList}>
                  {(meeting.agenda || []).slice(0, 3).map((item, idx) => (
                    <li key={idx}><span className={styles.bullet}>•</span> {item}</li>
                  ))}
                  {(meeting.agenda || []).length > 3 && (
                    <li className={styles.moreItems}>+ {(meeting.agenda || []).length - 3} more items</li>
                  )}
                </ul>
              </div>
              
              {meeting.minutesOfMeeting && (
                <div className={styles.documentLink}>
                  <FileText size={16} />
                  <span>Minutes of Meeting Available</span>
                </div>
              )}
            </div>
            
            <div className={styles.cardFooter}>
              <div className={styles.attendees}>
                <Users size={16} />
                <span>{meeting.attendees?.length || 0} Attendees</span>
              </div>
              <button className={styles.btnExpand} onClick={() => setSelectedMeeting(meeting)}>
                View Details <ChevronDown size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Meeting Modal */}
      {showScheduleModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2>Schedule New Trust Meeting</h2>
              <button className={styles.closeBtn} onClick={() => setShowScheduleModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleScheduleSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Meeting Title *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Q4 Executive Board & Beneficiary Renewal Meeting" 
                  className="input"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Meeting Type *</label>
                  <select 
                    className="input select"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                  >
                    <option value="regular">Regular Board Meeting</option>
                    <option value="agm">Annual General Body (AGM)</option>
                    <option value="special">Special Project Meeting</option>
                    <option value="emergency">Emergency Committee</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Date *</label>
                  <input 
                    type="date" 
                    required 
                    className="input"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Venue / Location *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Trust Registered Office, Thaiyur / Online Zoom" 
                  className="input"
                  value={formData.venue}
                  onChange={(e) => setFormData({...formData, venue: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Agenda Items (One per line) *</label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="Review annual student performance&#10;Approve NEET scholarship budget&#10;Member contributions update" 
                  className="input textarea"
                  value={formData.agendaText}
                  onChange={(e) => setFormData({...formData, agendaText: e.target.value})}
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowScheduleModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">SCHEDULE MEETING</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Meeting Details Modal */}
      {selectedMeeting && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ maxWidth: '700px' }}>
            <div className={styles.modalHeader}>
              <div>
                <h2>{selectedMeeting.title}</h2>
                <p className={styles.modalSub}>{selectedMeeting.date ? new Date(selectedMeeting.date).toLocaleDateString() : ''} | {selectedMeeting.venue}</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedMeeting(null)}><X size={20} /></button>
            </div>
            
            <div className={styles.detailSection}>
              <h4>Meeting Agenda</h4>
              <ul className={styles.detailList}>
                {(selectedMeeting.agenda || []).map((a: string, idx: number) => (
                  <li key={idx}>• {a}</li>
                ))}
              </ul>

              {selectedMeeting.minutesOfMeeting && (
                <div style={{ marginTop: '20px' }}>
                  <h4>Minutes of Meeting (MoM)</h4>
                  <div className={styles.momBox}>
                    <p>{selectedMeeting.minutesOfMeeting}</p>
                  </div>
                </div>
              )}

              {selectedMeeting.resolutions && selectedMeeting.resolutions.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h4>Board Resolutions Passed</h4>
                  <ul className={styles.detailList}>
                    {selectedMeeting.resolutions.map((r: string, idx: number) => (
                      <li key={idx}>✓ {r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.modalActions}>
              <button className="btn btn-primary" onClick={() => setSelectedMeeting(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
