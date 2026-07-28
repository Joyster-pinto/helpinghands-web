"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { Beneficiary, AcademicRecord, SupportRecord } from "@/types";
import { ArrowLeft, Edit, Download, GraduationCap, MapPin, Phone, User, Calendar, Briefcase, FileText } from "lucide-react";

export default function BeneficiaryDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [beneficiary, setBeneficiary] = useState<Beneficiary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBen() {
      try {
        const res = await fetch('/api/beneficiaries');
        const data = await res.json();
        const found = data.find((b: any) => b.id === resolvedParams.id);
        setBeneficiary(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBen();
  }, [resolvedParams.id]);

  if (loading) return <div className={styles.container}>Loading...</div>;

  if (!beneficiary) {
    return <div className={styles.container}>Beneficiary not found</div>;
  }

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
        <div className={styles.headerLeft}>
          <Link href="/dashboard/beneficiaries" className={styles.backBtn}>
            <ArrowLeft size={20} />
          </Link>
          <div className={styles.titleInfo}>
            <h1 className={styles.title}>{beneficiary.fullName}</h1>
            <div className={styles.badges}>
              <span className={styles.schemeBadge}>{beneficiary.scheme}</span>
              {getStatusBadge(beneficiary.status)}
            </div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.secondaryBtn} onClick={() => window.print()}>
            <Download size={16} />
            <span>Export PDF</span>
          </button>
          <button className={styles.primaryBtn} onClick={() => alert(`Opening Edit Profile for ${beneficiary.fullName}`)}>
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <User size={18} /> Personal Information
              </h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>Date of Birth</label>
                  <span>{beneficiary.dateOfBirth}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Gender</label>
                  <span>{beneficiary.gender}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Religion</label>
                  <span>{beneficiary.religion}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Caste</label>
                  <span>{beneficiary.caste}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Aadhaar Number</label>
                  <span>{beneficiary.aadhaarNumber || 'N/A'}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Phone Number</label>
                  <span>{beneficiary.phone}</span>
                </div>
                <div className={styles.infoItem} style={{ gridColumn: '1 / -1' }}>
                  <label>Address</label>
                  <span>{beneficiary.address}, {beneficiary.city}, {beneficiary.state} - {beneficiary.pincode}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <GraduationCap size={18} /> Academic Information
              </h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>Current Institution</label>
                  <span>{beneficiary.currentInstitution}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Current Class/Course</label>
                  <span>{beneficiary.currentClass}</span>
                </div>
              </div>

              <h3 className={styles.subTitle}>Academic Records</h3>
              <div className={styles.tableResponsive}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Grade</th>
                      <th>Institution</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiary.academicRecords.map((record: AcademicRecord, idx: number) => (
                      <tr key={idx}>
                        <td>{record.year}</td>
                        <td>{record.grade}</td>
                        <td>{record.institution}</td>
                        <td>{record.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <FileText size={18} /> Support History
              </h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.tableResponsive}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiary.supportRecords && beneficiary.supportRecords.length > 0 ? (
                      beneficiary.supportRecords.map((sup: SupportRecord) => (
                        <tr key={sup.id}>
                          <td>{sup.date}</td>
                          <td>{sup.type}</td>
                          <td>₹{sup.amount.toLocaleString()}</td>
                          <td>{sup.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4}>No support records yet</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2} style={{ textAlign: 'right', fontWeight: 600 }}>Total Support Received</td>
                      <td colSpan={2} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                        ₹{beneficiary.totalSupportReceived.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <Briefcase size={18} /> Family Details
              </h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.familyInfoList}>
                <div className={styles.familyItem}>
                  <label>Father's Name</label>
                  <span>{beneficiary.fatherName}</span>
                  <span className={styles.occupationText}>{beneficiary.fatherOccupation}</span>
                </div>
                <div className={styles.familyItem}>
                  <label>Mother's Name</label>
                  <span>{beneficiary.motherName}</span>
                  <span className={styles.occupationText}>{beneficiary.motherOccupation}</span>
                </div>
                <div className={styles.familyItem}>
                  <label>Annual Income</label>
                  <span className={styles.incomeText}>₹{beneficiary.familyIncome.toLocaleString()}</span>
                </div>
                <div className={styles.familyItem}>
                  <label>Siblings</label>
                  <span>{beneficiary.siblings}</span>
                </div>
              </div>
            </div>
          </div>

          {beneficiary.sponsorId && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Assigned Sponsor</h2>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.sponsorCard}>
                  <div className={styles.sponsorAvatar}>
                    {(beneficiary.sponsorName || 'SP').substring(0, 2).toUpperCase()}
                  </div>
                  <div className={styles.sponsorInfo}>
                    <h4>{beneficiary.sponsorName || 'Sponsor'}</h4>
                    <p>Sponsor ID: {beneficiary.sponsorId}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
