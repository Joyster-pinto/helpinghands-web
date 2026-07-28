"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function TrustMemberDashboard() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [assignedActivities, setAssignedActivities] = useState<any[]>([]);
  const [activeDonations, setActiveDonations] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [reportModal, setReportModal] = useState<any>(null);
  const [reportText, setReportText] = useState('');
  
  const [donateModal, setDonateModal] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [txnRef, setTxnRef] = useState('');

  useEffect(() => {
    if (email) fetchData();
  }, [email]);

  const fetchData = async () => {
    const [reqRes, meetRes] = await Promise.all([
      fetch('/api/contact'),
      fetch('/api/meetings')
    ]);
    const reqData = await reqRes.json();
    const meetData = await meetRes.json();

    if (reqData.success) {
      const allReqs = reqData.data;
      setAssignedActivities(allReqs.filter((r: any) => r.status === 'assigned_for_verification' && r.assignedMemberEmail === email));
      setActiveDonations(allReqs.filter((r: any) => r.status === 'verified_and_approved' || r.status === 'funded'));
    }
    if (meetData.success) {
      setMeetings(meetData.data);
    }
    setLoading(false);
  };

  const submitReport = async () => {
    if (!reportText) return alert('Enter report text');
    await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: reportModal._id, verificationReport: reportText })
    });
    alert('Verification Report submitted to Admin!');
    setReportModal(null);
    setReportText('');
    fetchData();
  };

  const processDonation = async () => {
    if (!amount || !txnRef) return alert('Enter amount and Transaction Reference ID');
    
    await fetch('/api/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contactRequestId: donateModal._id,
        trustMemberEmail: email,
        amount: Number(amount),
        paymentProofReference: txnRef
      })
    });
    alert('Donation processed! Admin has been notified and Accounts updated.');
    setDonateModal(null);
    setAmount('');
    setTxnRef('');
    fetchData();
  };

  if (loading) return <div>Loading Member Dashboard...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: 10 }}>Trust Member Dashboard</h1>
      <p style={{ color: '#6c757d', marginBottom: 30 }}>Manage your verification activities, donations, and meetings.</p>

      {/* 1. Assigned Activities Section */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ borderBottom: '2px solid #f36f21', paddingBottom: 10, marginBottom: 20 }}>1. My Assigned Verification Activities</h2>
        {assignedActivities.length === 0 ? <p style={{ color: '#6c757d' }}>No pending verifications assigned to you.</p> : (
          <div style={{ display: 'grid', gap: 20 }}>
            {assignedActivities.map(act => (
              <div key={act._id} style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid #dc3545' }}>
                <h3>{act.name} (Need: {act.subject})</h3>
                <p><strong>Contact:</strong> {act.phone} | {act.email}</p>
                <p style={{ background: '#f8f9fa', padding: 10, borderRadius: 4 }}>"{act.message}"</p>
                
                {act.verificationReport ? (
                  <div style={{ marginTop: 15, color: '#28a745', fontWeight: 'bold' }}>✓ Report Submitted. Awaiting Admin Approval.</div>
                ) : (
                  <button onClick={() => setReportModal(act)} style={{ marginTop: 15, padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                    Fill Verification Report
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Active Donations Section */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ borderBottom: '2px solid #28a745', paddingBottom: 10, marginBottom: 20 }}>2. Active Needs (Verified & Ready for Donation)</h2>
        {activeDonations.length === 0 ? <p style={{ color: '#6c757d' }}>No active needs requiring funding right now.</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {activeDonations.map(don => {
              const progress = Math.min(((don.raisedAmount || 0) / don.targetAmount) * 100, 100);
              const fullyFunded = progress >= 100;
              return (
                <div key={don._id} style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: fullyFunded ? '1px solid #28a745' : '1px solid #eee' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 }}>
                    <h3 style={{ margin: 0 }}>{don.name}</h3>
                    {fullyFunded && <span style={{ background: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: 12, fontSize: 12, fontWeight: 'bold' }}>Fully Funded</span>}
                  </div>
                  
                  <div style={{ fontSize: 14, color: '#495057', marginBottom: 15 }}>
                    <strong>Admin Verification Note:</strong> <br/>
                    {don.verificationReport}
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                      <strong>₹{don.raisedAmount || 0} raised</strong>
                      <span>Target: ₹{don.targetAmount}</span>
                    </div>
                    <div style={{ height: 8, background: '#e9ecef', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: fullyFunded ? '#28a745' : '#f36f21', width: `${progress}%` }} />
                    </div>
                  </div>

                  {!fullyFunded && (
                    <button onClick={() => setDonateModal(don)} style={{ width: '100%', padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}>
                      Donate Now
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Meetings Section */}
      <div>
        <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: 10, marginBottom: 20 }}>3. Upcoming Meetings</h2>
        {meetings.length === 0 ? <p style={{ color: '#6c757d' }}>No upcoming meetings.</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {meetings.map(m => (
              <div key={m._id} style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid #007bff' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>{m.title}</h4>
                <div style={{ color: '#6c757d', marginBottom: 10 }}>{new Date(m.date).toLocaleString()}</div>
                <p style={{ margin: '0 0 15px 0', fontSize: 14 }}>{m.description}</p>
                {m.link && (
                  <a href={m.link} target="_blank" rel="noreferrer" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 500 }}>Join Meeting &rarr;</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>


      {/* Report Modal */}
      {reportModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: 30, borderRadius: 8, width: 400 }}>
            <h3 style={{ marginTop: 0 }}>Verification Report for {reportModal.name}</h3>
            <textarea 
              rows={5} 
              style={{ width: '100%', padding: 10, marginTop: 10, marginBottom: 20, border: '1px solid #ccc', borderRadius: 4 }}
              placeholder="Enter your verification findings here..."
              value={reportText}
              onChange={e => setReportText(e.target.value)}
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setReportModal(null)} style={{ padding: '8px 16px', border: '1px solid #ccc', background: '#fff', borderRadius: 4, cursor: 'pointer' }}>Cancel</button>
              <button onClick={submitReport} style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Submit to Admin</button>
            </div>
          </div>
        </div>
      )}

      {/* Donate Modal */}
      {donateModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: 30, borderRadius: 8, width: 500 }}>
            <h3 style={{ marginTop: 0 }}>Donate to {donateModal.name}</h3>
            
            <div style={{ background: '#e8f0fe', padding: 15, borderRadius: 6, marginBottom: 20 }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#1a73e8' }}>Trust Payment Details</h4>
              <p style={{ margin: 0, fontSize: 14 }}><strong>Bank:</strong> State Bank of India<br/>
              <strong>A/C No:</strong> 1234567890<br/>
              <strong>IFSC:</strong> SBIN0001234<br/>
              <strong>UPI ID:</strong> helpinghands@sbi</p>
            </div>

            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Donation Amount (₹)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 4 }} placeholder="Enter amount..." />
            </div>

            <div style={{ marginBottom: 25 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 500 }}>Transaction Reference ID / UTR Number *</label>
              <input type="text" value={txnRef} onChange={e => setTxnRef(e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 4 }} placeholder="e.g., UTR123456789" />
              <div style={{ fontSize: 12, color: '#6c757d', marginTop: 5 }}>(As an alternative to uploading a PDF, please provide the Txn ID here as proof)</div>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setDonateModal(null)} style={{ padding: '8px 16px', border: '1px solid #ccc', background: '#fff', borderRadius: 4, cursor: 'pointer' }}>Cancel</button>
              <button onClick={processDonation} style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Confirm Donation</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
