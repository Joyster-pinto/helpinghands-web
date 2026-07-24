import React from 'react';
import styles from './page.module.css';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  FileText,
  CheckCircle,
  ChevronDown
} from 'lucide-react';
import { mockMeetings } from '@/data/mockData';

export default function MeetingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Meetings & Records</h1>
          <p className={styles.subtitle}>Manage official meetings, agendas, and minutes</p>
        </div>
        <button className={styles.btnPrimary}>
          <Plus size={18} />
          Schedule Meeting
        </button>
      </div>

      <div className={styles.grid}>
        {mockMeetings.map((meeting) => (
          <div key={meeting.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={`${styles.badge} ${
                meeting.type === 'agm' ? styles.badgeWarning : 
                meeting.type === 'emergency' ? styles.badgeError : 
                styles.badgePrimary
              }`}>
                {meeting.type.toUpperCase()}
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
                  <span>{new Date(meeting.date).toLocaleDateString()}</span>
                </div>
                <div className={styles.metaItem}>
                  <MapPin size={14} />
                  <span>{meeting.venue}</span>
                </div>
              </div>

              <div className={styles.agendaPreview}>
                <h4 className={styles.sectionTitle}>Agenda Items</h4>
                <ul className={styles.agendaList}>
                  {meeting.agenda.slice(0, 3).map((item, idx) => (
                    <li key={idx}><span className={styles.bullet}>•</span> {item}</li>
                  ))}
                  {meeting.agenda.length > 3 && (
                    <li className={styles.moreItems}>+ {meeting.agenda.length - 3} more items</li>
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
              <button className={styles.btnExpand}>
                View Details <ChevronDown size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
