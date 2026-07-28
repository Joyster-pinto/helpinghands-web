"use client";

import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon, Video } from 'lucide-react';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/meetings');
    const data = await res.json();
    if (data.success) {
      setMeetings(data.data);
    }
    setLoading(false);
  };

  const scheduleMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    
    await fetch('/api/meetings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, date, link })
    });
    setTitle('');
    setDescription('');
    setDate('');
    setLink('');
    fetchData();
    alert("Meeting scheduled! All members have been notified in their dashboard.");
  };

  if (loading) return <div>Loading Meetings...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Schedule Meetings</h1>
      
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1, background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', alignSelf: 'flex-start' }}>
          <h3 style={{ marginBottom: 20, borderBottom: '1px solid #eee', paddingBottom: 10 }}>Schedule New Meeting</h3>
          <form onSubmit={scheduleMeeting}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5 }}>Title *</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: 8, border: '1px solid #ced4da', borderRadius: 4 }} />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5 }}>Date & Time *</label>
              <input type="datetime-local" required value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: 8, border: '1px solid #ced4da', borderRadius: 4 }} />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5 }}>Meeting Link (Google Meet/Zoom)</label>
              <input type="url" value={link} onChange={e => setLink(e.target.value)} style={{ width: '100%', padding: 8, border: '1px solid #ced4da', borderRadius: 4 }} />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5 }}>Agenda/Description</label>
              <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: 8, border: '1px solid #ced4da', borderRadius: 4 }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: 10, background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
              Schedule Meeting
            </button>
          </form>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: 20 }}>Upcoming Meetings</h3>
          {meetings.length === 0 ? <p>No meetings scheduled.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {meetings.map(m => (
                <div key={m._id} style={{ background: '#fff', padding: 20, borderRadius: 8, borderLeft: '4px solid #f36f21', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: 18 }}>{m.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6c757d', marginBottom: 10 }}>
                    <CalendarIcon size={16} /> {new Date(m.date).toLocaleString()}
                  </div>
                  {m.description && <p style={{ margin: '0 0 15px 0', fontSize: 14 }}>{m.description}</p>}
                  {m.link && (
                    <a href={m.link} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: '#e8f0fe', color: '#1a73e8', textDecoration: 'none', borderRadius: 4, fontSize: 14, fontWeight: 500 }}>
                      <Video size={16} /> Join Meeting
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
