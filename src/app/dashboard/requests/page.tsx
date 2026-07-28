'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { User, Mail, Phone, ArrowRight, CheckCircle, X } from 'lucide-react';

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignModal, setAssignModal] = useState<any>(null);
  const [publishModal, setPublishModal] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [reqRes, memRes] = await Promise.all([
          fetch('/api/contact'),
          fetch('/api/members')
        ]);
        const reqData = await reqRes.json();
        const memData = await memRes.json();
        
        if (Array.isArray(reqData)) setRequests(reqData);
        if (Array.isArray(memData)) setMembers(memData);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAssign = async () => {
    if (!selectedMember || !assignModal) return;
    
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: assignModal._id,
          assignedTo: selectedMember,
          verificationStatus: 'assigned'
        })
      });
      const resData = await res.json();
      
      if (resData.success) {
        setRequests(requests.map(r => r._id === assignModal._id ? resData.data : r));
        setAssignModal(null);
        setSelectedMember('');
        alert('Verification task assigned successfully!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to assign task.');
    }
  };

  const handlePublish = async () => {
    if (!publishModal || !targetAmount) return;
    
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: publishModal._id,
          targetAmount: Number(targetAmount),
          publishedForDonation: true
        })
      });
      const resData = await res.json();
      
      if (resData.success) {
        setRequests(requests.map(r => r._id === publishModal._id ? resData.data : r));
        setPublishModal(null);
        setTargetAmount('');
        alert('Request verified and published for donations!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to publish request.');
    }
  };

  if (loading) return <div style={{ padding: 30 }}>Loading requests...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Help Requests (Contact Us)</h1>
          <p className={styles.subtitle}>Review incoming requests, assign for verification, and publish for donations.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {requests.map(req => (
          <div key={req._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.name}>{req.name}</h3>
                <div className={styles.subject}>{req.subject}</div>
              </div>
              <span className={`${styles.badge} ${
                req.publishedForDonation ? styles.badgePublished :
                req.verificationStatus === 'verified' ? styles.badgeVerified :
                req.verificationStatus === 'assigned' ? styles.badgeAssigned :
                styles.badgePending
              }`}>
                {req.publishedForDonation ? 'PUBLISHED' : req.verificationStatus.replace('_', ' ')}
              </span>
            </div>

            <div className={styles.cardBody}>
              <p>"{req.message}"</p>
              <div className={styles.contactInfo}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={12} /> {req.email}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={12} /> {req.phone}</span>
              </div>
              
              {req.verificationReport && (
                <div style={{ marginTop: 15, padding: 10, background: '#f8f9fa', borderRadius: 8, fontSize: 13 }}>
                  <strong>Trust Member Report:</strong> {req.verificationReport}
                </div>
              )}
            </div>

            <div className={styles.actions}>
              {req.verificationStatus === 'pending_assignment' && (
                <button className={styles.btnPrimary} onClick={() => setAssignModal(req)}>
                  Assign to Member <ArrowRight size={16} style={{ marginLeft: 5, verticalAlign: 'middle' }} />
                </button>
              )}
              
              {req.verificationStatus === 'assigned' && (
                <button className={styles.btnSecondary} disabled>
                  Waiting for Report
                </button>
              )}

              {req.verificationStatus === 'verified' && !req.publishedForDonation && (
                <button className={styles.btnPrimary} style={{ background: '#22c55e' }} onClick={() => setPublishModal(req)}>
                  <CheckCircle size={16} style={{ marginRight: 5, verticalAlign: 'middle' }} />
                  Verify & Publish
                </button>
              )}

              {req.publishedForDonation && (
                <div style={{ width: '100%' }}>
                  <div style={{ fontSize: 12, color: '#6c757d', marginBottom: 5 }}>Funds Raised</div>
                  <div style={{ width: '100%', height: 6, background: '#e9ecef', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: '#f36f21', width: `${Math.min(((req.raisedAmount || 0) / (req.targetAmount || 1)) * 100, 100)}%` }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <span>₹{req.raisedAmount || 0} raised</span>
                    <span>Target: ₹{req.targetAmount}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {requests.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: 40, textAlign: 'center', color: '#6c757d', background: '#fff', borderRadius: 12, border: '1px solid #e9ecef' }}>
            No incoming requests found.
          </div>
        )}
      </div>

      {assignModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>Assign for Verification</h2>
              <button className={styles.closeBtn} onClick={() => setAssignModal(null)}><X size={20} /></button>
            </div>
            <div className={styles.formGroup}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Select Trust Member</label>
              <select className={styles.select} value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)}>
                <option value="">-- Choose Member --</option>
                {members.map(m => (
                  <option key={m.id || m._id} value={m.id || m._id}>{m.name} ({m.designation})</option>
                ))}
              </select>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={() => setAssignModal(null)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleAssign}>Assign Task</button>
            </div>
          </div>
        </div>
      )}

      {publishModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>Publish Request</h2>
              <button className={styles.closeBtn} onClick={() => setPublishModal(null)}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: 15, fontSize: 14, color: '#495057' }}>
              <strong>Trust Member Report:</strong><br/>
              {publishModal.verificationReport}
            </div>
            <div className={styles.formGroup}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Set Target Amount to Raise (₹) *</label>
              <input 
                type="number" 
                className={styles.input} 
                placeholder="e.g. 50000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={() => setPublishModal(null)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handlePublish}>Publish to Members</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
