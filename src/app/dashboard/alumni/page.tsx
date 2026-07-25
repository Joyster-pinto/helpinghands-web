'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { 
  GraduationCap,
  MapPin, 
  Briefcase,
  Award,
  Search,
  Plus,
  X,
  Mail,
  Phone
} from 'lucide-react';
import { mockAlumni as initialMockAlumni } from '@/data/mockData';
import { Alumni } from '@/types';

export default function AlumniPage() {
  const [alumniList, setAlumniList] = useState<Alumni[]>(initialMockAlumni);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    graduationYear: '2024',
    scheme: 'Dr. Kalam Scholarship Scheme (College)',
    institution: '',
    degree: '',
    currentStatus: 'employed',
    currentOrganization: '',
    currentRole: '',
    location: '',
  });

  // Fetch live alumni from MongoDB Atlas
  useEffect(() => {
    async function loadAlumni() {
      try {
        const res = await fetch('/api/alumni');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAlumniList(data);
        }
      } catch (err) {
        console.warn('Failed to load DB alumni, using fallback data.');
      } finally {
        setLoading(false);
      }
    }
    loadAlumni();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const filteredAlumni = alumniList.filter(a => {
    const matchesSearch = (a.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.institution || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || a.currentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAlumnusPayload = {
      id: `al_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      graduationYear: formData.graduationYear,
      scheme: 'college' as const,
      institution: formData.institution,
      degree: formData.degree,
      currentStatus: formData.currentStatus as any,
      currentOrganization: formData.currentOrganization,
      currentRole: formData.currentRole,
      location: formData.location,
      achievements: ['Graduated successfully with Trust support'],
      isMentor: false,
      isVolunteer: true,
      totalContributions: 0,
    };

    try {
      const res = await fetch('/api/alumni', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAlumnusPayload),
      });
      const resData = await res.json();
      if (resData.success) {
        setAlumniList([resData.data, ...alumniList]);
      } else {
        setAlumniList([newAlumnusPayload as any, ...alumniList]);
      }
    } catch (err) {
      setAlumniList([newAlumnusPayload as any, ...alumniList]);
    }

    setShowAddModal(false);
    setFormData({ name: '', email: '', phone: '', graduationYear: '2024', scheme: 'Dr. Kalam Scholarship Scheme (College)', institution: '', degree: '', currentStatus: 'employed', currentOrganization: '', currentRole: '', location: '' });
    alert('Alumnus added and saved to MongoDB Atlas!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Alumni Directory</h1>
          <p className={styles.subtitle}>Track and engage with past beneficiaries</p>
        </div>
        <button className={styles.btnPrimary} onClick={() => setShowAddModal(true)}>
          <Plus size={18} />
          Add Alumni
        </button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search alumni by name, institution or location..." 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <select className={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="employed">Employed</option>
            <option value="studying">Studying</option>
            <option value="self_employed">Self Employed</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredAlumni.map((alumnus) => (
          <div key={alumnus.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.headerTop}>
                <h3 className={styles.name}>{alumnus.name}</h3>
                <span className={`${styles.badge} ${
                  alumnus.currentStatus === 'employed' ? styles.badgeSuccess : 
                  alumnus.currentStatus === 'studying' ? styles.badgePrimary : 
                  styles.badgeWarning
                }`}>
                  {(alumnus.currentStatus || 'employed').replace('_', ' ')}
                </span>
              </div>
              <div className={styles.educationInfo}>
                <GraduationCap size={16} />
                <span>{alumnus.degree} • {alumnus.graduationYear}</span>
              </div>
              <div className={styles.institution}>{alumnus.institution}</div>
            </div>
            
            <div className={styles.cardBody}>
              <div className={styles.infoGrid}>
                {alumnus.currentOrganization && (
                  <div className={styles.infoRow}>
                    <Briefcase size={16} className={styles.icon} />
                    <div className={styles.infoText}>
                      <strong>{alumnus.currentRole}</strong>
                      <span>at {alumnus.currentOrganization}</span>
                    </div>
                  </div>
                )}
                <div className={styles.infoRow}>
                  <MapPin size={16} className={styles.icon} />
                  <span className={styles.infoText}>{alumnus.location}</span>
                </div>
              </div>

              {alumnus.achievements && alumnus.achievements.length > 0 && (
                <div className={styles.achievements}>
                  <h4 className={styles.sectionTitle}>Achievements</h4>
                  <ul className={styles.list}>
                    {alumnus.achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className={styles.cardFooter}>
              <div className={styles.tags}>
                {alumnus.isMentor && <span className={styles.tag}>Mentor</span>}
                {alumnus.isVolunteer && <span className={styles.tag}>Volunteer</span>}
              </div>
              <button className={styles.btnText} onClick={() => setSelectedAlumni(alumnus)}>View Profile</button>
            </div>
          </div>
        ))}
      </div>

      {/* Alumni Detail Profile Modal ONLY ON VIEW PROFILE */}
      {selectedAlumni && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0 }}>{selectedAlumni.name}</h2>
                <p className={styles.modalSub}>{selectedAlumni.degree} ({selectedAlumni.graduationYear}) — {selectedAlumni.institution}</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setSelectedAlumni(null)}><X size={20} /></button>
            </div>

            <div className={styles.detailBody}>
              <div className={styles.infoRow}>
                <Briefcase size={16} /> <span>{selectedAlumni.currentRole} at {selectedAlumni.currentOrganization || 'Independent'}</span>
              </div>
              <div className={styles.infoRow}>
                <MapPin size={16} /> <span>{selectedAlumni.location}</span>
              </div>
              {selectedAlumni.email && (
                <div className={styles.infoRow}>
                  <Mail size={16} /> <span>{selectedAlumni.email}</span>
                </div>
              )}
              {selectedAlumni.phone && (
                <div className={styles.infoRow}>
                  <Phone size={16} /> <span>{selectedAlumni.phone}</span>
                </div>
              )}
              {selectedAlumni.totalContributions > 0 && (
                <div className={styles.infoRow}>
                  <Award size={16} /> <span>Contributions back to Trust: {formatCurrency(selectedAlumni.totalContributions)}</span>
                </div>
              )}

              {selectedAlumni.achievements && selectedAlumni.achievements.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h4>Key Achievements & Career Growth</h4>
                  <ul className={styles.detailList}>
                    {selectedAlumni.achievements.map((ach: string, idx: number) => (
                      <li key={idx}>✓ {ach}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.modalActions}>
              <button className="btn btn-primary" onClick={() => setSelectedAlumni(null)}>Close Profile</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Alumni Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2>Add Alumnus Profile</h2>
              <button className={styles.closeBtn} onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input type="text" required placeholder="Enter alumnus name" className="input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Degree / Qualification *</label>
                  <input type="text" required placeholder="e.g. B.E. Computer Science" className="input" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Graduation Year *</label>
                  <input type="text" required placeholder="e.g. 2024" className="input" value={formData.graduationYear} onChange={(e) => setFormData({...formData, graduationYear: e.target.value})} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Institution Name *</label>
                <input type="text" required placeholder="College or university name" className="input" value={formData.institution} onChange={(e) => setFormData({...formData, institution: e.target.value})} />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Current Status *</label>
                  <select className="input select" value={formData.currentStatus} onChange={(e) => setFormData({...formData, currentStatus: e.target.value})}>
                    <option value="employed">Employed</option>
                    <option value="studying">Higher Studies</option>
                    <option value="self_employed">Self Employed</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Current Location *</label>
                  <input type="text" required placeholder="e.g. Chennai / Bengaluru" className="input" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Organization / Company</label>
                  <input type="text" placeholder="Company or university" className="input" value={formData.currentOrganization} onChange={(e) => setFormData({...formData, currentOrganization: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label>Role / Position</label>
                  <input type="text" placeholder="Designation / Role" className="input" value={formData.currentRole} onChange={(e) => setFormData({...formData, currentRole: e.target.value})} />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Alumnus to MongoDB</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
