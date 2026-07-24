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
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
        <XAxis dataKey="name" stroke="#a0a0a0" tick={{ fill: '#a0a0a0' }} axisLine={false} tickLine={false} />
        <YAxis stroke="#a0a0a0" tick={{ fill: '#a0a0a0' }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px' }}
          itemStyle={{ color: '#fff' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={32} />
        <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}
