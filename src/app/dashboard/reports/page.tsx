'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { 
  BarChart, 
  Download, 
  Users, 
  Wallet, 
  Calendar, 
  Heart,
  GraduationCap,
  Briefcase,
  Printer,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockBeneficiaries, mockTransactions, mockActivities, mockMembers, mockSponsors, mockAlumni } from '@/data/mockData';

const reportTypes = [
  { id: 'financial', title: 'Financial Report', icon: Wallet },
  { id: 'beneficiary', title: 'Beneficiary Report', icon: Users },
  { id: 'activity', title: 'Activity Report', icon: Calendar },
  { id: 'sponsorship', title: 'Sponsorship Report', icon: Heart },
  { id: 'alumni', title: 'Alumni Report', icon: GraduationCap },
  { id: 'member', title: 'Member Report', icon: Briefcase },
];

const COLORS = ['#f89d35', '#22c55e', '#3b82f6', '#eab308', '#ef4444', '#8b5cf6'];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('financial');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Financial Data Processing
  const financialData = mockTransactions.reduce((acc: any, curr) => {
    const month = new Date(curr.date).toLocaleString('default', { month: 'short' });
    const existing = acc.find((item: any) => item.name === month);
    if (existing) {
      if (curr.type === 'expense') existing.expense += curr.amount;
      else existing.income += curr.amount;
    } else {
      acc.push({
        name: month,
        income: curr.type === 'expense' ? 0 : curr.amount,
        expense: curr.type === 'expense' ? curr.amount : 0
      });
    }
    return acc;
  }, []);

  // Beneficiary Data Processing
  const schemeCounts = mockBeneficiaries.reduce((acc: any, curr) => {
    acc[curr.scheme] = (acc[curr.scheme] || 0) + 1;
    return acc;
  }, {});
  const beneficiaryData = Object.keys(schemeCounts).map(key => ({
    name: key.replace('_', ' ').toUpperCase(),
    value: schemeCounts[key]
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // --- Export Generators ---
  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    let csv = '';
    if (selectedType === 'financial') {
      csv = 'Date,Description,Type,Category,Amount (INR),Payment Mode\n';
      mockTransactions.forEach(t => {
        csv += `"${t.date}","${t.description}","${t.type}","${t.category}",${t.amount},"${t.paymentMode}"\n`;
      });
    } else if (selectedType === 'beneficiary') {
      csv = 'ID,Full Name,Scheme,Status,Institution,Class,Total Support (INR)\n';
      mockBeneficiaries.forEach(b => {
        csv += `"${b.id}","${b.fullName}","${b.scheme}","${b.status}","${b.currentInstitution}","${b.currentClass}",${b.totalSupportReceived}\n`;
      });
    } else if (selectedType === 'activity') {
      csv = 'Title,Date,Location,Status,Budget (INR),Actual Spent (INR),Beneficiaries Covered\n';
      mockActivities.forEach(a => {
        csv += `"${a.title}","${a.date}","${a.location}","${a.status}",${a.budget},${a.actualSpent},${a.beneficiariesCovered}\n`;
      });
    } else if (selectedType === 'sponsorship') {
      csv = 'Sponsor Name,Type,Email,Committed (INR),Paid (INR),Beneficiaries Count\n';
      mockSponsors.forEach(s => {
        csv += `"${s.name}","${s.type}","${s.email}",${s.totalCommitted},${s.totalPaid},${s.beneficiaries ? s.beneficiaries.length : 0}\n`;
      });
    } else if (selectedType === 'alumni') {
      csv = 'Name,Degree,Institution,Graduation Year,Status,Role,Organization\n';
      mockAlumni.forEach(al => {
        csv += `"${al.name}","${al.degree}","${al.institution}","${al.graduationYear}","${al.currentStatus}","${al.currentRole}","${al.currentOrganization}"\n`;
      });
    } else {
      csv = 'Name,Designation,Email,Phone,Status,Total Contributions (INR)\n';
      mockMembers.forEach(m => {
        csv += `"${m.name}","${m.designation}","${m.email}","${m.phone}","${m.status}",${m.totalContributions}\n`;
      });
    }
    downloadFile(csv, `HelpingHands_${selectedType}_Report.csv`, 'text/csv;charset=utf-8;');
  };

  const handleExportExcel = () => {
    // Standard Excel-compatible TSV/CSV format
    handleExportCSV();
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Reports & Analytics</h1>
          <p className={styles.subtitle}>Generate and export insights across all modules</p>
        </div>
      </div>

      <div className={styles.controlsSection}>
        <div className={styles.reportSelector}>
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                className={`${styles.typeCard} ${selectedType === type.id ? styles.activeType : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                <Icon size={24} className={styles.typeIcon} />
                <span>{type.title}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.dateFilters}>
          <div className={styles.dateInputGroup}>
            <label>From Date</label>
            <input 
              type="date" 
              className={styles.dateInput} 
              value={dateRange.from}
              onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
            />
          </div>
          <div className={styles.dateInputGroup}>
            <label>To Date</label>
            <input 
              type="date" 
              className={styles.dateInput} 
              value={dateRange.to}
              onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
            />
          </div>
          <button className={styles.btnPrimary} onClick={() => alert(`Report generated for ${selectedType}!`)}>
            Generate Report
          </button>
        </div>
      </div>

      <div className={styles.reportContent}>
        <div className={styles.contentHeader}>
          <h2 className={styles.reportTitle}>
            {reportTypes.find(t => t.id === selectedType)?.title}
          </h2>
          <div className={styles.exportActions}>
            <button className={styles.btnExport} onClick={handleExportPDF}>
              <Printer size={16} /> PDF Print
            </button>
            <button className={styles.btnExport} onClick={handleExportExcel}>
              <FileSpreadsheet size={16} /> Excel
            </button>
            <button className={styles.btnExport} onClick={handleExportCSV}>
              <FileCode size={16} /> CSV
            </button>
          </div>
        </div>

        {selectedType === 'financial' && (
          <div className={styles.reportDashboard}>
            <div className={styles.summaryStats}>
              <div className={styles.statBox}>
                <p>Total Income</p>
                <h3>{formatCurrency(financialData.reduce((sum: number, i: any) => sum + i.income, 0))}</h3>
              </div>
              <div className={styles.statBox}>
                <p>Total Expenses</p>
                <h3 className={styles.textError}>{formatCurrency(financialData.reduce((sum: number, i: any) => sum + i.expense, 0))}</h3>
              </div>
            </div>
            <div className={styles.chartWrapper}>
              <h3 className={styles.chartTitle}>Income vs Expense Trend</h3>
              <div className={styles.chartArea}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                    <XAxis dataKey="name" stroke="#a0a0a0" />
                    <YAxis stroke="#a0a0a0" tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }} />
                    <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {selectedType === 'beneficiary' && (
          <div className={styles.reportDashboard}>
            <div className={styles.summaryStats}>
              <div className={styles.statBox}>
                <p>Total Beneficiaries</p>
                <h3>{mockBeneficiaries.length}</h3>
              </div>
              <div className={styles.statBox}>
                <p>Active Schemes</p>
                <h3>{beneficiaryData.length}</h3>
              </div>
            </div>
            <div className={styles.chartWrapper}>
              <h3 className={styles.chartTitle}>Beneficiaries by Scheme</h3>
              <div className={styles.chartArea}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={beneficiaryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }: { name?: string; percent?: number }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    >
                      {beneficiaryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {(selectedType !== 'financial' && selectedType !== 'beneficiary') && (
          <div className={styles.placeholderState}>
            <BarChart size={48} className={styles.placeholderIcon} />
            <h3>Summary Report for {reportTypes.find(t => t.id === selectedType)?.title}</h3>
            <p>Click PDF, Excel, or CSV above to download the full detailed dataset for this section.</p>
          </div>
        )}
      </div>
    </div>
  );
}
