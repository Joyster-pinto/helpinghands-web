"use client";

import React, { useEffect, useState } from 'react';
import { Clock, UserCheck, CheckCircle, IndianRupee } from 'lucide-react';

export default function AdminOverview() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRequests(data.data);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Overview...</div>;

  const newCount = requests.filter(r => r.status === 'new').length;
  const assignedCount = requests.filter(r => r.status === 'assigned_for_verification').length;
  const approvedCount = requests.filter(r => r.status === 'verified_and_approved').length;
  const fundedCount = requests.filter(r => r.status === 'funded').length;

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Admin Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 30 }}>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid #f36f21' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6c757d', marginBottom: 10 }}>
            <Clock size={20} /> New Queries
          </div>
          <h2 style={{ fontSize: 32, margin: 0 }}>{newCount}</h2>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid #17a2b8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6c757d', marginBottom: 10 }}>
            <UserCheck size={20} /> Under Verification
          </div>
          <h2 style={{ fontSize: 32, margin: 0 }}>{assignedCount}</h2>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid #007bff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6c757d', marginBottom: 10 }}>
            <CheckCircle size={20} /> Active (Raising Funds)
          </div>
          <h2 style={{ fontSize: 32, margin: 0 }}>{approvedCount}</h2>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid #28a745' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6c757d', marginBottom: 10 }}>
            <IndianRupee size={20} /> Fully Funded
          </div>
          <h2 style={{ fontSize: 32, margin: 0 }}>{fundedCount}</h2>
        </div>
      </div>

      <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: 20, borderBottom: '1px solid #eee', paddingBottom: 10 }}>Recent Contact Queries</h3>
        {requests.length === 0 ? <p>No queries found.</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: 12 }}>Date</th>
                <th style={{ padding: 12 }}>Name</th>
                <th style={{ padding: 12 }}>Subject</th>
                <th style={{ padding: 12 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.slice(0, 10).map((req: any) => (
                <tr key={req._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 12 }}>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: 12 }}>{req.name}</td>
                  <td style={{ padding: 12 }}>{req.subject}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                      background: req.status === 'new' ? '#fff3cd' : 
                                 req.status === 'assigned_for_verification' ? '#d1ecf1' :
                                 req.status === 'verified_and_approved' ? '#cce5ff' : '#d4edda',
                      color: req.status === 'new' ? '#856404' : 
                            req.status === 'assigned_for_verification' ? '#0c5460' :
                            req.status === 'verified_and_approved' ? '#004085' : '#155724'
                    }}>
                      {req.status.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
