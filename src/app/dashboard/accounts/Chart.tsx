'use client';
import React from 'react';
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

const data = [
  { name: 'Jan', income: 45000, expense: 32000 },
  { name: 'Feb', income: 52000, expense: 28000 },
  { name: 'Mar', income: 48000, expense: 35000 },
  { name: 'Apr', income: 61000, expense: 29000 },
  { name: 'May', income: 55000, expense: 41000 },
  { name: 'Jun', income: 67000, expense: 38000 },
];

export default function Chart() {
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
