'use client';

import React, { useState } from 'react';
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
  MessageSquare
} from 'lucide-react';
import { mockSponsors as initialSponsors } from '@/data/mockData';

export default function SponsorshipsPage() {
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSponsor, setSelectedSponsor] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    type: 'individual',
    email: '',
    phone: '',
    organization: '',
    totalCommitted: '',
    totalPaid: '',
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalCommitted = sponsors.reduce((sum, s) => sum + s.totalCommitted, 0);
  const totalReceived = sponsors.reduce((sum, s) => sum + s.totalPaid, 0);

  const filteredSponsors = sponsors.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.organization && s.organization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSponsor = {
      id: `sp${sponsors.length + 1}`,
      name: formData.name,
      type: formData.type as any,
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
      totalCommitted: Number(formData.totalCommitted) || 0,
      totalPaid: Number(formData.totalPaid) || 0,
      beneficiaries: [],
      status: 'active',
      communications: [],
      renewalDate: '2027-01-01',
    };
    setSponsors([newSponsor as any, ...sponsors]);
    setShowAddModal(false);
    setFormData({ name: '', type: 'individual', email: '', phone: '', organization: '', totalCommitted: '', totalPaid: '' });
    alert('Sponsor added successfully!');
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
                <button className={styles.btnSecondary} onClick={() => setSelectedSponsor(sponsor)}>
                  <MessageSquare size={14} /> Communication Log
                </button>
                <button className={styles.btnText} onClick={() => setSelectedSponsor(sponsor)}>
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sponsor Details / Manage Modal */}
      {selectedSponsor && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div>
                <h2>{selectedSponsor.name}</h2>
                <p className={styles.modalSub}>{selectedSponsor.organization || selectedSponsor.type.toUpperCase()}</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedSponsor(null)}><X size={20} /></button>
            </div>

            <div className={styles.detailBody}>
              <div className={styles.infoRow}><Mail size={16} /> <span>{selectedSponsor.email}</span></div>
              <div className={styles.infoRow}><Phone size={16} /> <span>{selectedSponsor.phone}</span></div>
              <div className={styles.infoRow}><Calendar size={16} /> <span>Renewal Date: {selectedSponsor.renewalDate || '1/1/2027'}</span></div>
              
              <div style={{ marginTop: '15px', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                <h4>Sponsorship Progress</h4>
                <p>Committed Amount: <strong>{formatCurrency(selectedSponsor.totalCommitted)}</strong></p>
                <p>Total Received: <strong>{formatCurrency(selectedSponsor.totalPaid)}</strong></p>
                <p>Beneficiaries Supported: <strong>{selectedSponsor.beneficiaries ? selectedSponsor.beneficiaries.length : 0}</strong></p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <h4>Communication Log & Notes</h4>
                {selectedSponsor.communications && selectedSponsor.communications.length > 0 ? (
                  <ul className={styles.detailList}>
                    {selectedSponsor.communications.map((c: any, idx: number) => (
                      <li key={idx}><strong>{c.date}:</strong> {c.subject} - {c.notes}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#6c757d', fontSize: '13px' }}>No formal communication logs recorded yet for this sponsor.</p>
                )}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className="btn btn-primary" onClick={() => setSelectedSponsor(null)}>Close</button>
            </div>
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
                <button type="submit" className="btn btn-primary">Save Sponsor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
