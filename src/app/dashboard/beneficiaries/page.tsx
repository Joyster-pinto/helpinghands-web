"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { mockBeneficiaries as beneficiaries } from "@/data/mockData";
import { Beneficiary } from "@/types";
import { Search, Plus, Filter, Eye, Edit, X } from "lucide-react";

export default function BeneficiariesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [schemeFilter, setSchemeFilter] = useState("All");

  const tabs = ["All", "School", "College", "NEET", "Pending", "Graduated"];

  const filteredData = beneficiaries.filter((b: Beneficiary) => {
    const matchesSearch = b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.currentInstitution.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check tab filter
    let matchesTab = true;
    if (activeTab === "Pending") matchesTab = b.status === "pending";
    else if (activeTab === "Graduated") matchesTab = b.status === "graduated";
    else if (activeTab !== "All") matchesTab = b.scheme.toLowerCase() === activeTab.toLowerCase();

    // Check scheme dropdown filter
    let matchesScheme = true;
    if (schemeFilter !== "All") {
      matchesScheme = b.scheme.toLowerCase() === schemeFilter.toLowerCase();
    }

    return matchesSearch && matchesTab && matchesScheme;
  });

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return <span className={`${styles.badge} ${styles.badgeActive}`}>Active</span>;
      case "pending": return <span className={`${styles.badge} ${styles.badgePending}`}>Pending</span>;
      case "graduated": return <span className={`${styles.badge} ${styles.badgeGraduated}`}>Graduated</span>;
      default: return <span className={`${styles.badge} ${styles.badgeError}`}>Discontinued</span>;
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
                      <div className={styles.avatar}>{ben.fullName.charAt(0)}</div>
                      <div>
                        <div className={styles.userName}>{ben.fullName}</div>
                        <div className={styles.userSub}>{ben.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.schemeTag}>{ben.scheme.toUpperCase()}</span>
                  </td>
                  <td>
                    <div className={styles.cellText}>{ben.currentInstitution}</div>
                    <div className={styles.cellSub}>{ben.currentClass}</div>
                  </td>
                  <td>{getStatusBadge(ben.status)}</td>
                  <td className={styles.supportText}>₹{ben.totalSupportReceived.toLocaleString()}</td>
                  <td>
                    <div className={styles.actionBtns}>
                      <Link href={`/dashboard/beneficiaries/${ben.id}`} className={styles.iconBtn} title="View Beneficiary">
                        <Eye size={16} />
                      </Link>
                      <Link href={`/dashboard/beneficiaries/${ben.id}`} className={styles.iconBtn} title="Edit Student Profile">
                        <Edit size={16} />
                      </Link>
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
    </div>
  );
}
