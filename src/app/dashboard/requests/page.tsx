"use client";

import React, { useEffect, useState } from 'react';

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedMember, setSelectedMember] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [reqRes, memRes] = await Promise.all([
      fetch('/api/contact'),
      fetch('/api/members')
    ]);
    const reqData = await reqRes.json();
    const memData = await memRes.json();
    
    if (reqData.success) setRequests(reqData.data);
    if (memData.success) setMembers(memData.data);
    
    setLoading(false);
  };

  const assignMember = async (id: string, email: string) => {
    if (!email) return alert("Select a member");
    
    await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, assignedMemberEmail: email, status: 'assigned_for_verification' })
    });
    alert('Assigned for verification!');
    fetchData();
  };

  const approveRequest = async (id: string, amount: string) => {
    if (!amount) return alert("Enter target amount");
    
    await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, targetAmount: Number(amount), status: 'verified_and_approved' })
    });
    alert('Approved and published for donations!');
    fetchData();
  };

  const markFunded = async (id: string) => {
    await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'funded' })
    });
    alert('Marked as Funded!');
    fetchData();
  };

  if (loading) return <div>Loading Requests...</div>;

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Needs & Verification Management</h1>
      <p style={{ color: '#6c757d', marginBottom: 30 }}>Manage incoming requests, assign verifications, and approve funding goals.</p>

      {requests.map((req) => (
        <div key={req._id} style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: 20, borderLeft: `4px solid ${req.status === 'new' ? '#f36f21' : '#007bff'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
            <div>
              <h3 style={{ margin: 0 }}>{req.name}</h3>
              <div style={{ fontSize: 13, color: '#6c757d' }}>{req.email} | {req.phone}</div>
            </div>
            <div style={{ fontWeight: 'bold', color: '#495057' }}>{req.status.replace(/_/g, ' ').toUpperCase()}</div>
          </div>
          
          <div style={{ background: '#f8f9fa', padding: 15, borderRadius: 6, marginBottom: 15 }}>
            <strong>Message:</strong> {req.message}
          </div>

          {req.status === 'new' && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <select style={{ padding: '8px 12px', border: '1px solid #ced4da', borderRadius: 4 }} value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)}>
                <option value="">-- Assign to Trust Member --</option>
                {members.map(m => (
                  <option key={m._id} value={m.email}>{m.name} ({m.email})</option>
                ))}
              </select>
              <button 
                onClick={() => assignMember(req._id, selectedMember)}
                style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                Assign Task
              </button>
            </div>
          )}

          {(req.status === 'assigned_for_verification' || req.status === 'verified_and_approved' || req.status === 'funded') && (
            <div style={{ background: '#e9ecef', padding: 15, borderRadius: 6, marginBottom: 15 }}>
              <strong>Assigned To:</strong> {req.assignedMemberEmail} <br/>
              <strong style={{ display: 'block', marginTop: 10, marginBottom: 10 }}>Verification Report:</strong>
              {!req.verificationReport ? (
                <span style={{ color: '#6c757d' }}>Pending submission from member...</span>
              ) : (
                <div style={{ background: '#fff', padding: 15, borderRadius: 6, border: '1px solid #ced4da', maxHeight: 300, overflowY: 'auto' }}>
                  {(() => {
                    try {
                      const parsed = JSON.parse(req.verificationReport);
                      return Object.entries(parsed).map(([q, a], idx) => (
                        <div key={idx} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px dashed #eee' }}>
                          <div style={{ fontWeight: 600, fontSize: 13, color: '#495057' }}>{q}</div>
                          <div style={{ fontSize: 14, color: '#212529', marginTop: 4 }}>{a as string || '-'}</div>
                        </div>
                      ));
                    } catch (e) {
                      return <div>{req.verificationReport}</div>;
                    }
                  })()}
                </div>
              )}
            </div>
          )}

          {req.status === 'assigned_for_verification' && req.verificationReport && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input 
                type="number" 
                placeholder="Target Amount (₹)" 
                style={{ padding: '8px 12px', border: '1px solid #ced4da', borderRadius: 4 }}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
              <button 
                onClick={() => approveRequest(req._id, targetAmount)}
                style={{ padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                Approve & Publish to Members
              </button>
            </div>
          )}

          {(req.status === 'verified_and_approved' || req.status === 'funded') && (
            <div style={{ marginTop: 10 }}>
              <strong>Funds Progress:</strong> ₹{req.raisedAmount || 0} raised of ₹{req.targetAmount} target.
              {req.status === 'verified_and_approved' && (req.raisedAmount || 0) >= req.targetAmount && (
                <button 
                  onClick={() => markFunded(req._id)}
                  style={{ marginLeft: 15, padding: '4px 10px', background: '#17a2b8', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                  Mark as Fully Funded
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
