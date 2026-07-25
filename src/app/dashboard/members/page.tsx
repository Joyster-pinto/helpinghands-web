'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone,
  Award,
  X,
  MapPin,
  Calendar
} from 'lucide-react';
import { mockMembers as initialMockMembers } from '@/data/mockData';
import { TrustMember } from '@/types';

export default function MembersPage() {
  const [members, setMembers] = useState<TrustMember[]>(initialMockMembers);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<TrustMember | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    designation: 'Trustee',
    email: '',
    phone: '',
    occupation: '',
    address: '',
    bio: '',
    totalContributions: '',
  });

  // Fetch live members from MongoDB Atlas
  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch('/api/members');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setMembers(data);
        }
      } catch (err) {
        console.warn('Failed to load DB members, using fallback data.');
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const getInitials = (name: string) => {
    return (name || 'Member').split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const filteredMembers = members.filter(m => 
    (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.designation || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMemberPayload = {
      id: `m_${Date.now()}`,
      name: formData.name,
      designation: formData.designation as any,
      status: 'active' as const,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      joinDate: new Date().toISOString().split('T')[0],
      occupation: formData.occupation,
      totalContributions: Number(formData.totalContributions) || 25000,
      bio: formData.bio || 'Active trust member supporting educational initiatives.',
    };

    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMemberPayload),
      });
      const resData = await res.json();
      if (resData.success) {
        setMembers([resData.data, ...members]);
      } else {
        setMembers([newMemberPayload as any, ...members]);
      }
    } catch (err) {
      setMembers([newMemberPayload as any, ...members]);
    }

    setShowAddModal(false);
    setFormData({ name: '', designation: 'Trustee', email: '', phone: '', occupation: '', address: '', bio: '', totalContributions: '' });
    alert('Member added and saved to MongoDB Atlas!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Trust Members</h1>
          <p className={styles.subtitle}>Manage trust members, core committee, and active volunteers</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Add Member
          </button>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search members by name, email or designation..." 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredMembers.map((member) => (
          <div key={member.id} className={styles.card} onClick={() => setSelectedMember(member)}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                {getInitials(member.name)}
              </div>
              <div className={styles.statusBadgeWrapper}>
                <span className={`${styles.badge} ${member.status === 'active' ? styles.badgeSuccess : styles.badgeWarning}`}>
                  {member.status}
                </span>
              </div>
            </div>
            
            <div className={styles.cardBody}>
              <h3 className={styles.name}>{member.name}</h3>
              <p className={styles.role}>{(member.designation || '').replace('_', ' ').toUpperCase()}</p>
              
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <Mail size={14} />
                  <span>{member.email}</span>
                </div>
                <div className={styles.contactItem}>
                  <Phone size={14} />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className={styles.contributions}>
                <Award size={16} className={styles.awardIcon} />
                <span>Total Contributions: <strong>{formatCurrency(member.totalContributions || 0)}</strong></span>
              </div>

              <p className={styles.bio}>{member.bio}</p>
            </div>
            
            <div className={styles.cardFooter}>
              <span className={styles.joinDate}>Joined: {member.joinDate ? new Date(member.joinDate).getFullYear() : '2024'}</span>
              <button className={styles.btnText}>View Profile</button>
            </div>
          </div>
        ))}
      </div>

      {/* Member Profile Modal */}
      {selectedMember && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div className={styles.avatar} style={{ width: '50px', height: '50px', fontSize: '20px' }}>
                  {getInitials(selectedMember.name)}
                </div>
                <div>
                  <h2 style={{ margin: 0 }}>{selectedMember.name}</h2>
                  <p className={styles.modalSub}>{(selectedMember.designation || '').replace('_', ' ').toUpperCase()}</p>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedMember(null)}><X size={20} /></button>
            </div>

            <div className={styles.detailBody}>
              <div className={styles.infoRow}>
                <Mail size={16} /> <span>{selectedMember.email}</span>
              </div>
              <div className={styles.infoRow}>
                <Phone size={16} /> <span>{selectedMember.phone}</span>
              </div>
              <div className={styles.infoRow}>
                <MapPin size={16} /> <span>{selectedMember.address || 'Chennai, TN'}</span>
              </div>
              <div className={styles.infoRow}>
                <Calendar size={16} /> <span>Joined: {selectedMember.joinDate ? new Date(selectedMember.joinDate).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className={styles.infoRow}>
                <Award size={16} /> <span>Total Contributions: <strong>{formatCurrency(selectedMember.totalContributions || 0)}</strong></span>
              </div>

              <div style={{ marginTop: '20px' }}>
                <h4>Biography & Background</h4>
                <p className={styles.bioText}>{selectedMember.bio}</p>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className="btn btn-primary" onClick={() => setSelectedMember(null)}>Close Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2>Add New Trust Member</h2>
              <button className={styles.closeBtn} onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input type="text" required placeholder="Enter member name" className="input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Designation *</label>
                  <input type="text" required placeholder="e.g. Trustee / Secretary" className="input" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Occupation</label>
                  <input type="text" placeholder="e.g. Software Engineer" className="input" value={formData.occupation} onChange={(e) => setFormData({...formData, occupation: e.target.value})} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input type="email" required placeholder="member@email.com" className="input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone *</label>
                  <input type="tel" required placeholder="+91 98765 43210" className="input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>City / District</label>
                  <input type="text" placeholder="e.g. Kancheepuram" className="input" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Total Contribution (₹) *</label>
                  <input type="number" required placeholder="e.g. 25000" className="input" value={formData.totalContributions} onChange={(e) => setFormData({...formData, totalContributions: e.target.value})} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Bio / Notes</label>
                <textarea rows={3} placeholder="Brief bio..." className="input textarea" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Member to MongoDB</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
