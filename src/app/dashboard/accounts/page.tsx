"use client";

import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function AccountsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for manual expense entry
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    if (data.success) {
      setTransactions(data.data);
    }
    setLoading(false);
  };

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseAmount || !expenseDesc) return;
    
    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'expense', amount: Number(expenseAmount), description: expenseDesc })
    });
    setExpenseAmount('');
    setExpenseDesc('');
    fetchData();
  };

  const downloadCSV = () => {
    let csv = 'Date,Type,Description,Amount\n';
    transactions.forEach(t => {
      csv += `${new Date(t.createdAt).toLocaleDateString()},${t.type},"${t.description}",${t.amount}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'accounts_report.csv';
    a.click();
  };

  if (loading) return <div>Loading Accounts...</div>;

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Accounts Management</h1>
        <button onClick={downloadCSV} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          <Download size={18} /> Download CSV
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 30 }}>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#6c757d', margin: '0 0 10px 0' }}>Total Income</h3>
          <h2 style={{ margin: 0, color: '#28a745' }}>₹{totalIncome}</h2>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#6c757d', margin: '0 0 10px 0' }}>Total Expenses</h3>
          <h2 style={{ margin: 0, color: '#dc3545' }}>₹{totalExpense}</h2>
        </div>
        <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: '#6c757d', margin: '0 0 10px 0' }}>Current Balance</h3>
          <h2 style={{ margin: 0, color: '#007bff' }}>₹{totalIncome - totalExpense}</h2>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 2, background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: 20, borderBottom: '1px solid #eee', paddingBottom: 10 }}>Transaction History</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: 12 }}>Date</th>
                <th style={{ padding: 12 }}>Type</th>
                <th style={{ padding: 12 }}>Description</th>
                <th style={{ padding: 12, textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 12 }}>{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{ color: t.type === 'income' ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                      {t.type.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: 12 }}>{t.description}</td>
                  <td style={{ padding: 12, textAlign: 'right', fontWeight: 'bold' }}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ flex: 1, background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', alignSelf: 'flex-start' }}>
          <h3 style={{ marginBottom: 20, borderBottom: '1px solid #eee', paddingBottom: 10 }}>Record Expense</h3>
          <form onSubmit={addExpense}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5 }}>Amount (₹)</label>
              <input type="number" required value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} style={{ width: '100%', padding: 8, border: '1px solid #ced4da', borderRadius: 4 }} />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ display: 'block', marginBottom: 5 }}>Description</label>
              <textarea required rows={3} value={expenseDesc} onChange={e => setExpenseDesc(e.target.value)} style={{ width: '100%', padding: 8, border: '1px solid #ced4da', borderRadius: 4 }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: 10, background: '#dc3545', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
              Record Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
