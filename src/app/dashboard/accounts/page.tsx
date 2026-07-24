'use client';

import React from 'react';
import styles from './page.module.css';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Plus, 
  Filter,
  Download
} from 'lucide-react';
import { mockTransactions } from '@/data/mockData';

// Chart component needs to be client-side
import dynamic from 'next/dynamic';
const IncomeExpenseChart = dynamic(() => import('./Chart'), { ssr: false });

export default function AccountsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate stats
  const totalIncome = mockTransactions
    .filter(t => t.type === 'donation' || t.type === 'member_contribution' || t.type === 'sponsorship')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpense = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const openingBalance = 150000; // Mock starting balance
  const closingBalance = openingBalance + totalIncome - totalExpense;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Accounts Management</h1>
          <p className={styles.subtitle}>Manage trust finances, donations, and expenses</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnSecondary}>
            <Download size={18} />
            Export
          </button>
          <button className={styles.btnPrimary}>
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
            <IncomeExpenseChart />
          </div>
        </div>

        <div className={styles.tableSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Transactions</h2>
            <div className={styles.filters}>
              <button className={styles.filterBtn}>
                <Filter size={16} />
                Filter
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
                {mockTransactions.map((tx) => (
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
    </div>
  );
}
