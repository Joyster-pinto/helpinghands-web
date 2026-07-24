"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { mockBeneficiaries as beneficiaries } from "@/data/mockData";
import { Beneficiary } from "@/types";
import { Search, Plus, Filter, MoreVertical, Eye, Edit } from "lucide-react";

export default function BeneficiariesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "School", "College", "NEET", "Pending", "Graduated"];

  const filteredData = beneficiaries.filter((b: Beneficiary) => {
    const matchesSearch = b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.currentInstitution.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === "All") return matchesSearch;
    if (activeTab === "Pending") return matchesSearch && b.status === "pending";
    if (activeTab === "Graduated") return matchesSearch && b.status === "graduated";
    return matchesSearch && b.scheme.toLowerCase() === activeTab.toLowerCase();
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
        <button className={styles.filterBtn}>
          <Filter size={18} />
          <span>Filters</span>
        </button>
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
                <th>Institution</th>
                <th>Status</th>
                <th>Total Support</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((ben: Beneficiary) => (
                <tr key={ben.id}>
                  <td>
                    <div className={styles.nameCell}>
                      <div className={styles.avatar}>{ben.fullName.charAt(0)}</div>
                      <div>
                        <div className={styles.name}>{ben.fullName}</div>
                        <div className={styles.idText}>{ben.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{ben.scheme}</td>
                  <td>
                    <div className={styles.institutionText}>{ben.currentInstitution}</div>
                    <div className={styles.classText}>{ben.currentClass}</div>
                  </td>
                  <td>{getStatusBadge(ben.status)}</td>
                  <td className={styles.supportText}>₹{ben.totalSupportReceived.toLocaleString()}</td>
                  <td>
                    <div className={styles.actionBtns}>
                      <Link href={`/dashboard/beneficiaries/${ben.id}`} className={styles.iconBtn}>
                        <Eye size={16} />
                      </Link>
                      <Link href={`/dashboard/beneficiaries/${ben.id}`} className={styles.iconBtn} title="Edit / View Student">
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
