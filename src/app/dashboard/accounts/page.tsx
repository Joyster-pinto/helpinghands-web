'use client';

import React, { useState, useMemo, useEffect } from 'react';
import styles from './page.module.css';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Plus, 
  Filter,
  Download,
  X
} from 'lucide-react';

// Chart component needs to be client-side
import dynamic from 'next/dynamic';
const IncomeExpenseChart = dynamic(() => import('./Chart'), { ssr: false });

export default function AccountsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        if (Array.isArray(data)) {
          setTransactions(data);
        }
      } catch (err) {
        console.warn('Failed to load DB transactions');
      } finally {
        setLoading(false);
      }
    }
    loadTransactions();
  }, []);

  const [formData, setFormData] = useState({
    type: 'donation',
    category: 'general_donation',
    amount: '',
    description: '',
    paymentMode: 'upi',
    receiptNumber: '',
    paidTo: '',
    receivedFrom: '',
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate stats
  const totalIncome = transactions
    .filter(t => t.type === 'donation' || t.type === 'member_contribution' || t.type === 'sponsorship')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const openingBalance = 150000;
  const closingBalance = openingBalance + totalIncome - totalExpense;

  const filteredTransactions = transactions.filter(t => {
    if (activeFilter === 'income') return t.type !== 'expense';
    if (activeFilter === 'expense') return t.type === 'expense';
    return true;
  });

  const handleExportCSV = () => {
    let csv = 'Date,Description,Type,Payment Mode,Receipt Number,Amount (INR)\n';
    transactions.forEach(tx => {
      csv += `"${tx.date}","${tx.description}","${tx.type}","${tx.paymentMode}","${tx.receiptNumber || ''}",${tx.amount}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HelpingHands_Financial_Transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTx = {
      id: `tx${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: formData.type as any,
      category: formData.category as any,
      amount: Number(formData.amount) || 0,
      description: formData.description,
      paymentMode: formData.paymentMode as any,
      receiptNumber: formData.receiptNumber || `REC-${Math.floor(1000 + Math.random() * 9000)}`,
      recordedBy: 'Fr. Administrator',
    };
    
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTx),
      });
      const resData = await res.json();
      if (resData.success) {
        setTransactions([resData.data, ...transactions]);
      } else {
        setTransactions([newTx as any, ...transactions]);
      }
    } catch (err) {
      setTransactions([newTx as any, ...transactions]);
    }
    
    setShowAddModal(false);
    setFormData({ type: 'donation', category: 'general_donation', amount: '', description: '', paymentMode: 'upi', receiptNumber: '', paidTo: '', receivedFrom: '' });
    alert('Transaction recorded successfully!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Accounts Management</h1>
          <p className={styles.subtitle}>Manage trust finances, donations, and expenses</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={handleExportCSV}>
            <Download size={18} />
            Export CSV
          </button>
          <button className={styles.btnPrimary} onClick={() => setShowAddModal(true)}>
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(248, 157, 53, 0.1)', color: 'var(--color-primary)' }}>
            <Wallet size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Opening Balance</p>
            <h3 className={styles.statValue}>{formatCurrency(openingBalance)}</h3>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'var(--color-success)' }}>
            <ArrowUpRight size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Income</p>
            <h3 className={styles.statValue}>{formatCurrency(totalIncome)}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)' }}>
            <ArrowDownRight size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Expenses</p>
            <h3 className={styles.statValue}>{formatCurrency(totalExpense)}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(234, 179, 8, 0.1)', color: 'var(--color-warning)' }}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Closing Balance</p>
            <h3 className={styles.statValue}>{formatCurrency(closingBalance)}</h3>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.chartSection}>
          <h2 className={styles.sectionTitle}>Income vs Expenses</h2>
          <div className={styles.chartContainer}>
            <IncomeExpenseChart transactions={transactions} />
          </div>
        </div>

        <div className={styles.tableSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Transactions</h2>
            <div className={styles.filters} style={{ display: 'flex', gap: '8px' }}>
              <button 
                className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.activeFilterBtn : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`${styles.filterBtn} ${activeFilter === 'income' ? styles.activeFilterBtn : ''}`}
                onClick={() => setActiveFilter('income')}
              >
                Income
              </button>
              <button 
                className={`${styles.filterBtn} ${activeFilter === 'expense' ? styles.activeFilterBtn : ''}`}
                onClick={() => setActiveFilter('expense')}
              >
                Expenses
              </button>
            </div>
          </div>
          
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Mode</th>
                  <th>Reference</th>
                  <th className={styles.textRight}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{new Date(tx.date).toLocaleDateString()}</td>
                    <td>{tx.description}</td>
                    <td>
                      <span className={`${styles.badge} ${tx.type === 'expense' ? styles.badgeExpense : styles.badgeIncome}`}>
                        {tx.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className={styles.capitalize}>{tx.paymentMode}</td>
                    <td className={styles.reference}>{tx.receiptNumber || '-'}</td>
                    <td className={`${styles.textRight} ${tx.type === 'expense' ? styles.textError : styles.textSuccess}`}>
                      {tx.type === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2>Record Financial Transaction</h2>
              <button className={styles.closeBtn} onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>

            <form onSubmit={handleAddSubmit} className={styles.modalForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Transaction Type *</label>
                  <select className="input select" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option value="donation">General Donation (Income)</option>
                    <option value="sponsorship">Sponsorship Payment (Income)</option>
                    <option value="member_contribution">Member Contribution (Income)</option>
                    <option value="expense">Trust Expense</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Amount (₹) *</label>
                  <input type="number" required placeholder="e.g. 15000" className="input" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description / Notes *</label>
                <input type="text" required placeholder="e.g. Tuition Fee Payment - Kamarajar Scheme" className="input" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Payment Mode *</label>
                  <select className="input select" value={formData.paymentMode} onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}>
                    <option value="upi">UPI / GPay / PhonePe</option>
                    <option value="bank_transfer">Direct Bank NEFT / RTGS</option>
                    <option value="cheque">Cheque</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Receipt / Transaction Ref Number</label>
                  <input type="text" placeholder="e.g. UPI/1293849102" className="input" value={formData.receiptNumber} onChange={(e) => setFormData({...formData, receiptNumber: e.target.value})} />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
