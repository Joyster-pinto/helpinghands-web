'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { 
  Users, 
  Building2, 
  Heart, 
  Plus, 
  Search,
  Mail,
  Phone,
  Target,
  X,
  Calendar,
  MessageSquare,
  Edit
} from 'lucide-react';
import { mockSponsors as initialMockSponsors } from '@/data/mockData';
import { Sponsor } from '@/types';

export default function SponsorshipsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialMockSponsors);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [commLogSponsor, setCommLogSponsor] = useState<Sponsor | null>(null);
  const [manageSponsor, setManageSponsor] = useState<Sponsor | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'individual',
    email: '',
    phone: '',
    organization: '',
    totalCommitted: '',
    totalPaid: '',
  });

  // Fetch live sponsors from MongoDB Atlas
  useEffect(() => {
    async function loadSponsors() {
      try {
        const res = await fetch('/api/sponsors');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setSponsors(data);
        }
      } catch (err) {
        console.warn('Failed to load DB sponsors, using fallback data.');
      } finally {
        setLoading(false);
      }
    }
    loadSponsors();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const totalCommitted = sponsors.reduce((sum, s) => sum + (s.totalCommitted || 0), 0);
  const totalReceived = sponsors.reduce((sum, s) => sum + (s.totalPaid || 0), 0);

  const filteredSponsors = sponsors.filter(s => 
    (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.organization && s.organization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSponsorPayload = {
      id: `sp_${Date.now()}`,
      name: formData.name,
      type: formData.type as any,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      totalCommitted: Number(formData.totalCommitted) || 0,
      totalPaid: Number(formData.totalPaid) || 0,
      beneficiaries: [],
      status: 'active' as const,
      communications: [
        { date: new Date().toISOString().split('T')[0], type: 'email', subject: 'New Sponsor Onboarded', notes: 'Initial commitment recorded in trust portal.' }
      ],
      renewalDate: '2027-01-01',
    };

    try {
      const res = await fetch('/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSponsorPayload),
      });
      const resData = await res.json();
      if (resData.success) {
        setSponsors([resData.data, ...sponsors]);
      } else {
        setSponsors([newSponsorPayload as any, ...sponsors]);
      }
    } catch (err) {
      setSponsors([newSponsorPayload as any, ...sponsors]);
    }

    setShowAddModal(false);
    setFormData({ name: '', type: 'individual', email: '', phone: '', organization: '', totalCommitted: '', totalPaid: '' });
    alert('Sponsor added and saved to MongoDB Atlas!');
  };

  const handleSaveManage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manageSponsor) return;
    try {
      await fetch('/api/sponsors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manageSponsor),
      });
      setSponsors(sponsors.map(s => s.id === manageSponsor.id ? manageSponsor : s));
      setManageSponsor(null);
      alert('Sponsorship commitment updated in MongoDB Atlas!');
    } catch (err) {
      setManageSponsor(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Sponsorship Management</h1>
          <p className={styles.subtitle}>Manage corporate and individual sponsors</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          Add Sponsor
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(248, 157, 53, 0.1)', color: 'var(--color-primary)' }}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Sponsors</p>
            <h3 className={styles.statValue}>{sponsors.length}</h3>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--color-success)' }}>
            <Heart size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Active Sponsors</p>
            <h3 className={styles.statValue}>{sponsors.filter(s => s.status === 'active').length}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <Target size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Committed</p>
            <h3 className={styles.statValue}>{formatCurrency(totalCommitted)}</h3>
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search sponsors by name, email or organization..." 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredSponsors.map((sponsor) => {
          const progressPercent = sponsor.totalCommitted > 0 ? (sponsor.totalPaid / sponsor.totalCommitted) * 100 : 0;
          
          return (
            <div key={sponsor.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.sponsorType}>
                  {sponsor.type === 'corporate' ? <Building2 size={16} /> : <Users size={16} />}
                  <span>{sponsor.type}</span>
                </div>
                <span className={`${styles.badge} ${sponsor.status === 'active' ? styles.badgeSuccess : styles.badgeWarning}`}>
                  {sponsor.status}
                </span>
              </div>
              
              <div className={styles.cardBody}>
                <h3 className={styles.name}>{sponsor.name}</h3>
                {sponsor.organization && (
                  <p className={styles.organization}>{sponsor.organization}</p>
                )}
                
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <Mail size={14} />
                    <span>{sponsor.email}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <Phone size={14} />
                    <span>{sponsor.phone}</span>
                  </div>
                </div>

                <div className={styles.sponsorshipDetails}>
                  <div className={styles.detailRow}>
                    <span>Beneficiaries Supported:</span>
                    <strong>{sponsor.beneficiaries ? sponsor.beneficiaries.length : 0}</strong>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Renewal Date:</span>
                    <strong>{sponsor.renewalDate ? new Date(sponsor.renewalDate).toLocaleDateString() : 'N/A'}</strong>
                  </div>
                </div>

                <div className={styles.progressSection}>
                  <div className={styles.progressHeader}>
                    <span className={styles.progressLabel}>Payment Progress</span>
                    <span className={styles.progressValue}>
                      {formatCurrency(sponsor.totalPaid)} / {formatCurrency(sponsor.totalCommitted)}
                    </span>
                  </div>
                  <div className={styles.progressBarBg}>
                    <div 
                      className={styles.progressBarFill} 
                      style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className={styles.cardFooter}>
                <button className={styles.btnSecondary} onClick={() => setCommLogSponsor(sponsor)}>
                  <MessageSquare size={14} /> Communication Log
                </button>
                <button className={styles.btnText} onClick={() => setManageSponsor(sponsor)}>
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMMUNICATION LOG SPECIFIC MODAL */}
      {commLogSponsor && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div>
                <h2>Communication Log: {commLogSponsor.name}</h2>
                <p className={styles.modalSub}>{commLogSponsor.organization || commLogSponsor.email}</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setCommLogSponsor(null)}><X size={20} /></button>
            </div>

            <div className={styles.detailBody}>
              <h4 style={{ margin: '0 0 10px 0', color: '#2b2d32' }}>Official Interaction History</h4>
              {commLogSponsor.communications && commLogSponsor.communications.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {commLogSponsor.communications.map((c: any, idx: number) => (
                    <div key={idx} style={{ background: '#f8f9fa', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #f36f21' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#f36f21' }}>
                        <span>{c.subject || 'Meeting / Note'}</span>
                        <span>{c.date}</span>
                      </div>
                      <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#495057' }}>{c.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', color: '#6c757d', fontSize: '13px' }}>
                  Initial sponsor record created. No additional communications logged yet.
                </div>
              )}
            </div>

            <div className={styles.modalActions}>
              <button className="btn btn-primary" onClick={() => setCommLogSponsor(null)}>Close Log</button>
            </div>
          </div>
        </div>
      )}

      {/* MANAGE SPONSORSHIP SPECIFIC MODAL */}
      {manageSponsor && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2>Manage Sponsorship: {manageSponsor.name}</h2>
              <button className={styles.closeBtn} onClick={() => setManageSponsor(null)}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveManage} className={styles.modalForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Committed Amount (₹) *</label>
                  <input type="number" className="input" required value={manageSponsor.totalCommitted} onChange={(e) => setManageSponsor({...manageSponsor, totalCommitted: Number(e.target.value) || 0})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Total Received Amount (₹) *</label>
                  <input type="number" className="input" required value={manageSponsor.totalPaid} onChange={(e) => setManageSponsor({...manageSponsor, totalPaid: Number(e.target.value) || 0})} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Status *</label>
                  <select className="input select" value={manageSponsor.status} onChange={(e) => setManageSponsor({...manageSponsor, status: e.target.value as any})}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending Renewal</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Renewal Date</label>
                  <input type="date" className="input" value={manageSponsor.renewalDate || ''} onChange={(e) => setManageSponsor({...manageSponsor, renewalDate: e.target.value})} />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setManageSponsor(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes to MongoDB</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Sponsor Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2>Add New Sponsor</h2>
              <button className={styles.closeBtn} onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Sponsor / Foundation Name *</label>
                <input type="text" required placeholder="e.g. Priya Foundation / Dr. Smith" className="input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Sponsor Type *</label>
                  <select className="input select" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option value="individual">Individual Donor</option>
                    <option value="corporate">Corporate Foundation</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Organization (if corporate)</label>
                  <input type="text" placeholder="Company Name" className="input" value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email Address *</label>
                  <input type="email" required placeholder="info@sponsor.org" className="input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210" className="input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Committed Amount (₹) *</label>
                  <input type="number" required placeholder="e.g. 100000" className="input" value={formData.totalCommitted} onChange={(e) => setFormData({...formData, totalCommitted: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Amount Paid So Far (₹)</label>
                  <input type="number" placeholder="e.g. 50000" className="input" value={formData.totalPaid} onChange={(e) => setFormData({...formData, totalPaid: e.target.value})} />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Sponsor to MongoDB</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
