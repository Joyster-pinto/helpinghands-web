'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import styles from './page.module.css';
import { FileText, Heart, IndianRupee, MapPin, Phone, User, CheckCircle, X } from 'lucide-react';

export default function TrustMemberDashboard() {
  const { data: session } = useSession();
  const trustMemberId = (session?.user as any)?.id || 'tm_test_123';
  const trustMemberEmail = session?.user?.email || 'test@email.com';
  
  const [assignedRequests, setAssignedRequests] = useState<any[]>([]);
  const [activeDonations, setActiveDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [reportModal, setReportModal] = useState<any>(null);
  const [reportText, setReportText] = useState('');
  
  const [donateModal, setDonateModal] = useState<any>(null);
  const [donateAmount, setDonateAmount] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const [assignedRes, publicRes] = await Promise.all([
          fetch(`/api/contact?assignedTo=${encodeURIComponent(trustMemberEmail)}`),
          fetch(`/api/contact`) // We will filter published on client for simplicity, or we should add a query param
        ]);
        
        const assigned = await assignedRes.json();
        const allRequests = await publicRes.json();
        
        if (Array.isArray(assigned)) {
          setAssignedRequests(assigned.filter(r => r.verificationStatus === 'assigned'));
        }
        
        if (Array.isArray(allRequests)) {
          setActiveDonations(allRequests.filter(r => r.publishedForDonation));
        }
      } catch (err) {
        console.error('Failed to load trust member data', err);
      } finally {
        setLoading(false);
      }
    }
    if (trustMemberEmail) {
      loadData();
    }
  }, [trustMemberEmail]);

  const handleSubmitReport = async () => {
    if (!reportModal || !reportText) return;
    
    try {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: reportModal._id,
          verificationStatus: 'verified',
          verificationReport: reportText
        })
      });
      const resData = await res.json();
      
      if (resData.success) {
        setAssignedRequests(assignedRequests.filter(r => r._id !== reportModal._id));
        setReportModal(null);
        setReportText('');
        alert('Verification report submitted successfully to the Admin!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to submit report.');
    }
  };

  const handleDonate = async () => {
    if (!donateModal || !donateAmount) return;
    
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactRequestId: donateModal._id,
          trustMemberId,
          amount: Number(donateAmount)
        })
      });
      const resData = await res.json();
      
      if (resData.success) {
        // Update local state to reflect the new raised amount
        setActiveDonations(activeDonations.map(d => {
          if (d._id === donateModal._id) {
            return { ...d, raisedAmount: (d.raisedAmount || 0) + Number(donateAmount) };
          }
          return d;
        }));
        
        setDonateModal(null);
        setDonateAmount('');
        alert(`Donation of ₹${donateAmount} pledged! Admin has been notified.`);
        
        // Simulating the intimation to the admin
        console.log(`[ADMIN NOTIFICATION] Trust Member ${trustMemberId} has pledged ₹${donateAmount} for request ${donateModal.name}`);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to process donation.');
    }
  };

  if (loading) return <div style={{ padding: 30 }}>Loading Dashboard...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Trust Member Dashboard</h1>
        <p className={styles.subtitle}>Welcome back! Manage your verification tasks and active donations.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FileText size={24} color="#f36f21" /> 
          Assigned Verification Tasks
        </h2>
        
        {assignedRequests.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#6c757d', background: '#fff', borderRadius: 12, border: '1px solid #e9ecef' }}>
            You have no pending verification tasks.
          </div>
        ) : (
          <div className={styles.grid}>
            {assignedRequests.map(req => (
              <div key={req._id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.name}>{req.name}</h3>
                    <div className={styles.subject}>{req.subject}</div>
                  </div>
                  <span className={`${styles.badge} ${styles.badgeAssigned}`}>Needs Verification</span>
                </div>
                
                <div className={styles.cardBody}>
                  <p><strong>Message:</strong> "{req.message}"</p>
                  <div className={styles.contactInfo}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={14} /> {req.phone}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> Contact location details to be verified.</span>
                  </div>
                </div>
                
                <div className={styles.actions}>
                  <button className={styles.btnPrimary} onClick={() => setReportModal(req)}>
                    <CheckCircle size={16} style={{ marginRight: 5, verticalAlign: 'middle' }} />
                    Submit Verification Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Heart size={24} color="#dc3545" /> 
          Active Needs (Verified & Published)
        </h2>
        
        {activeDonations.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#6c757d', background: '#fff', borderRadius: 12, border: '1px solid #e9ecef' }}>
            There are no active donation requests right now.
          </div>
        ) : (
          <div className={styles.grid}>
            {activeDonations.map(req => {
              const progress = Math.min(((req.raisedAmount || 0) / (req.targetAmount || 1)) * 100, 100);
              const isFullyFunded = progress >= 100;
              
              return (
                <div key={req._id} className={styles.card} style={{ border: isFullyFunded ? '1px solid #28a745' : '1px solid #e9ecef' }}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.name}>{req.name}</h3>
                      <div className={styles.subject}>{req.subject}</div>
                    </div>
                    {isFullyFunded ? (
                       <span className={`${styles.badge}`} style={{ background: '#d4edda', color: '#155724' }}>Fully Funded</span>
                    ) : (
                       <span className={`${styles.badge} ${styles.badgePublished}`}>Raising Funds</span>
                    )}
                  </div>
                  
                  <div className={styles.cardBody}>
                    <p style={{ margin: '10px 0', fontSize: 13, color: '#495057' }}>{req.verificationReport}</p>
                    
                    <div style={{ marginTop: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                        <strong>₹{req.raisedAmount || 0} raised</strong>
                        <span color="#6c757d">Target: ₹{req.targetAmount}</span>
                      </div>
                      <div style={{ width: '100%', height: 8, background: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: isFullyFunded ? '#28a745' : '#f36f21', width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.actions}>
                    <button 
                      className={styles.btnPrimary} 
                      style={{ background: isFullyFunded ? '#6c757d' : 'var(--color-primary)' }}
                      onClick={() => !isFullyFunded && setDonateModal(req)}
                      disabled={isFullyFunded}
                    >
                      <IndianRupee size={16} style={{ marginRight: 5, verticalAlign: 'middle' }} />
                      {isFullyFunded ? 'Goal Reached' : 'Donate Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Verification Report Modal */}
      {reportModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>Verification Report</h2>
              <button className={styles.closeBtn} onClick={() => setReportModal(null)}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: 15, fontSize: 13, color: '#495057' }}>
              Submit your verification findings for <strong>{reportModal.name}</strong>.
            </div>
            <div className={styles.formGroup}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Findings & Recommended Amount *</label>
              <textarea 
                rows={5}
                className={styles.textarea} 
                placeholder="e.g. Visited the student. Needs are genuine. Recommended to raise ₹25,000 for tuition."
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
              />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={() => setReportModal(null)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleSubmitReport}>Submit to Admin</button>
            </div>
          </div>
        </div>
      )}

      {/* Donate Modal */}
      {donateModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>Pledge Donation</h2>
              <button className={styles.closeBtn} onClick={() => setDonateModal(null)}><X size={20} /></button>
            </div>
            <div style={{ marginBottom: 15, fontSize: 13, color: '#495057' }}>
              You are pledging a donation for <strong>{donateModal.name}</strong>. Target remaining: ₹{(donateModal.targetAmount || 0) - (donateModal.raisedAmount || 0)}
            </div>
            <div className={styles.formGroup}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Amount (₹) *</label>
              <input 
                type="number"
                className={styles.input} 
                placeholder="e.g. 5000"
                value={donateAmount}
                onChange={(e) => setDonateAmount(e.target.value)}
              />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.btnSecondary} onClick={() => setDonateModal(null)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={handleDonate}>Confirm Pledge</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
