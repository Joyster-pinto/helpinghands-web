'use client';
import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function Chart({ transactions }: { transactions?: any[] }) {
  const data = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];
    
    // Create a map to aggregate by month
    const monthlyData: Record<string, { name: string, income: number, expense: number, dateObj: Date }> = {};
    
    transactions.forEach(tx => {
      const d = new Date(tx.date);
      const monthName = d.toLocaleString('en-US', { month: 'short' });
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      
      if (!monthlyData[key]) {
        monthlyData[key] = { name: monthName, income: 0, expense: 0, dateObj: d };
      }
      
      if (tx.type === 'expense') {
        monthlyData[key].expense += tx.amount;
      } else {
        monthlyData[key].income += tx.amount;
      }
    });

    // Sort chronologically and take last 6 months
    return Object.values(monthlyData)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
      .slice(-6);
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div style={{ width: '100%', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6c757d' }}>
        No transaction data available yet.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '320px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" vertical={false} />
          <XAxis dataKey="name" stroke="#6c757d" tick={{ fill: '#495057', fontSize: 12 }} axisLine={{ stroke: '#e9ecef' }} tickLine={false} />
          <YAxis stroke="#6c757d" tick={{ fill: '#495057', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #ced4da', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            itemStyle={{ fontSize: '13px' }}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Bar dataKey="income" name="Income (₹)" fill="#28a745" radius={[4, 4, 0, 0]} barSize={28} />
          <Bar dataKey="expense" name="Expense (₹)" fill="#dc3545" radius={[4, 4, 0, 0]} barSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
