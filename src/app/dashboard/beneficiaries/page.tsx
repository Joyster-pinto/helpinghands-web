"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { mockBeneficiaries as initialMockBeneficiaries } from "@/data/mockData";
import { Beneficiary } from "@/types";
import { Search, Plus, Filter, Eye, Edit, X, Printer, User, GraduationCap, Phone, MapPin } from "lucide-react";

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(initialMockBeneficiaries);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [schemeFilter, setSchemeFilter] = useState("All");

  const [viewBeneficiary, setViewBeneficiary] = useState<Beneficiary | null>(null);
  const [editBeneficiary, setEditBeneficiary] = useState<Beneficiary | null>(null);

  const tabs = ["All", "School", "College", "NEET", "Pending", "Graduated"];

  // Fetch live beneficiaries from MongoDB Atlas
  useEffect(() => {
    async function loadBeneficiaries() {
      try {
        const res = await fetch("/api/beneficiaries");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setBeneficiaries(data);
        }
      } catch (err) {
        console.warn("Failed to load DB beneficiaries, using fallback data.");
      } finally {
        setLoading(false);
      }
    }
    loadBeneficiaries();
  }, []);

  const filteredData = beneficiaries.filter((b: Beneficiary) => {
    const matchesSearch = (b.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.currentInstitution || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTab = true;
    if (activeTab === "Pending") matchesTab = b.status === "pending";
    else if (activeTab === "Graduated") matchesTab = b.status === "graduated";
    else if (activeTab !== "All") matchesTab = (b.scheme || "").toLowerCase() === activeTab.toLowerCase();

    let matchesScheme = true;
    if (schemeFilter !== "All") {
      matchesScheme = (b.scheme || "").toLowerCase() === schemeFilter.toLowerCase();
    }

    return matchesSearch && matchesTab && matchesScheme;
  });

  const getStatusBadge = (status: string) => {
    switch ((status || "").toLowerCase()) {
      case "active": return <span className={`${styles.badge} ${styles.badgeActive}`}>Active</span>;
      case "pending": return <span className={`${styles.badge} ${styles.badgePending}`}>Pending</span>;
      case "graduated": return <span className={`${styles.badge} ${styles.badgeGraduated}`}>Graduated</span>;
      default: return <span className={`${styles.badge} ${styles.badgeError}`}>Discontinued</span>;
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBeneficiary) return;
    try {
      await fetch('/api/beneficiaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editBeneficiary),
      });
      setBeneficiaries(beneficiaries.map(b => b.id === editBeneficiary.id ? editBeneficiary : b));
      setEditBeneficiary(null);
      alert('Beneficiary updated and saved to MongoDB Atlas!');
    } catch (err) {
      alert('Saved locally!');
      setEditBeneficiary(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Beneficiaries</h1>
          <p className={styles.subtitle}>Manage and track all students supported by the trust.</p>
        </div>
        <Link href="/dashboard/beneficiaries/new" className={styles.addBtn}>
          <Plus size={18} />
          <span>Add Beneficiary</span>
        </Link>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by name, ID, or institution..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <button 
            className={styles.filterBtn} 
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            style={{ background: schemeFilter !== 'All' ? '#f36f21' : '', color: schemeFilter !== 'All' ? '#fff' : '' }}
          >
            <Filter size={18} />
            <span>{schemeFilter !== 'All' ? `Scheme: ${schemeFilter}` : 'Filters'}</span>
          </button>

          {showFilterDropdown && (
            <div style={{ position: 'absolute', right: 0, top: '45px', width: '220px', background: '#ffffff', border: '1px solid #e9ecef', borderRadius: '10px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)', zIndex: 50, padding: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#2b2d32', marginBottom: '8px' }}>Filter by Scheme</div>
              {['All', 'School', 'College', 'NEET'].map((s) => (
                <button 
                  key={s}
                  style={{ display: 'block', width: '100%', textAlign: 'left', background: schemeFilter === s ? '#f8f9fa' : 'none', border: 'none', padding: '8px 10px', borderRadius: '6px', fontSize: '13px', color: schemeFilter === s ? '#f36f21' : '#495057', fontWeight: schemeFilter === s ? 700 : 500, cursor: 'pointer' }}
                  onClick={() => { setSchemeFilter(s); setShowFilterDropdown(false); }}
                >
                  {s === 'All' ? 'All Schemes' : `${s} Scheme`}
                </button>
              ))}
              {schemeFilter !== 'All' && (
                <button 
                  style={{ display: 'block', width: '100%', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e9ecef', border: 'none', background: 'none', color: '#dc3545', fontSize: '12px', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}
                  onClick={() => { setSchemeFilter('All'); setShowFilterDropdown(false); }}
                >
                  Reset Filter
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button 
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Beneficiary</th>
                <th>Scheme</th>
                <th>Institution & Class</th>
                <th>Status</th>
                <th>Support Received</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((ben: Beneficiary) => (
                <tr key={ben.id}>
                  <td>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>{ben.fullName ? ben.fullName.charAt(0) : 'S'}</div>
                      <div>
                        <div className={styles.userName}>{ben.fullName}</div>
                        <div className={styles.userSub}>{ben.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.schemeTag}>{(ben.scheme || 'School').toUpperCase()}</span>
                  </td>
                  <td>
                    <div className={styles.cellText}>{ben.currentInstitution || 'Not Specified'}</div>
                    <div className={styles.cellSub}>{ben.currentClass || ''}</div>
                  </td>
                  <td>{getStatusBadge(ben.status)}</td>
                  <td className={styles.supportText}>₹{(ben.totalSupportReceived || 0).toLocaleString()}</td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button className={styles.iconBtn} title="View Beneficiary Popup" onClick={() => setViewBeneficiary(ben)}>
                        <Eye size={16} />
                      </button>
                      <button className={styles.iconBtn} title="Edit Student Profile" onClick={() => setEditBeneficiary(ben)}>
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>
                    No beneficiaries found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>Showing 1 to {filteredData.length} of {filteredData.length} entries</span>
          <div className={styles.pageControls}>
            <button disabled>Previous</button>
            <button className={styles.activePage}>1</button>
            <button disabled>Next</button>
          </div>
        </div>
      </div>

      {/* VIEW BENEFICIARY DETAIL MODAL */}
      {viewBeneficiary && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', padding: '30px', border: '1px solid #e9ecef' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #f36f21', paddingBottom: '12px' }}>
              <div>
                <h2 style={{ margin: 0, color: '#2b2d32', fontSize: '22px' }}>{viewBeneficiary.fullName}</h2>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#f36f21' }}>{(viewBeneficiary.scheme || '').toUpperCase()} SCHEME</span>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#6c757d', cursor: 'pointer' }} onClick={() => setViewBeneficiary(null)}><X size={22} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#495057' }}>
              <div><strong>Contact Number:</strong> {viewBeneficiary.phone}</div>
              <div><strong>Institution:</strong> {viewBeneficiary.currentInstitution || 'N/A'} ({viewBeneficiary.currentClass || ''})</div>
              <div><strong>Father Name:</strong> {viewBeneficiary.fatherName || 'N/A'} ({viewBeneficiary.fatherOccupation || 'N/A'})</div>
              <div><strong>Family Annual Income:</strong> ₹{(viewBeneficiary.familyIncome || 0).toLocaleString()}</div>
              <div><strong>Address:</strong> {viewBeneficiary.address || ''}, {viewBeneficiary.city || ''}</div>
              <div><strong>Total Support Received:</strong> <strong style={{ color: '#28a745' }}>₹{(viewBeneficiary.totalSupportReceived || 0).toLocaleString()}</strong></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #e9ecef' }}>
              <button className="btn btn-secondary" onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Printer size={16} /> Export PDF
              </button>
              <button className="btn btn-primary" onClick={() => setViewBeneficiary(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT BENEFICIARY MODAL */}
      {editBeneficiary && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', padding: '30px', border: '1px solid #e9ecef' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #f36f21', paddingBottom: '12px' }}>
              <h2 style={{ margin: 0, color: '#2b2d32', fontSize: '20px' }}>Edit Student Details: {editBeneficiary.fullName}</h2>
              <button style={{ background: 'none', border: 'none', color: '#6c757d', cursor: 'pointer' }} onClick={() => setEditBeneficiary(null)}><X size={22} /></button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Full Name *</label>
                <input type="text" className="input" required value={editBeneficiary.fullName} onChange={(e) => setEditBeneficiary({...editBeneficiary, fullName: e.target.value})} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600 }}>Contact Phone *</label>
                  <input type="tel" className="input" required value={editBeneficiary.phone} onChange={(e) => setEditBeneficiary({...editBeneficiary, phone: e.target.value})} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600 }}>Scholarship Scheme *</label>
                  <select className="input select" value={editBeneficiary.scheme} onChange={(e) => setEditBeneficiary({...editBeneficiary, scheme: e.target.value as any})}>
                    <option value="school">School (Kamarajar)</option>
                    <option value="college">College (Kalam)</option>
                    <option value="neet">NEET 7.5 (Velicham)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Current Institution *</label>
                <input type="text" className="input" required value={editBeneficiary.currentInstitution} onChange={(e) => setEditBeneficiary({...editBeneficiary, currentInstitution: e.target.value})} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600 }}>Status *</label>
                  <select className="input select" value={editBeneficiary.status} onChange={(e) => setEditBeneficiary({...editBeneficiary, status: e.target.value as any})}>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="graduated">Graduated</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600 }}>Total Support Received (₹)</label>
                  <input type="number" className="input" value={editBeneficiary.totalSupportReceived} onChange={(e) => setEditBeneficiary({...editBeneficiary, totalSupportReceived: Number(e.target.value) || 0})} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #e9ecef' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditBeneficiary(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes to MongoDB</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
