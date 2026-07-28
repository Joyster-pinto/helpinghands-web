"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { 
  Users, 
  Heart, 
  TrendingUp, 
  Wallet,
  UserPlus,
  ArrowRightLeft,
  Calendar,
  FileBarChart
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid } from "recharts";

const financesData = [
  { name: "Jan", donations: 4000, expenses: 2400 },
  { name: "Feb", donations: 3000, expenses: 1398 },
  { name: "Mar", donations: 2000, expenses: 9800 },
  { name: "Apr", donations: 2780, expenses: 3908 },
  { name: "May", donations: 1890, expenses: 4800 },
  { name: "Jun", donations: 2390, expenses: 3800 },
  { name: "Jul", donations: 3490, expenses: 4300 },
];

const schemeData = [
  { name: "School Education", value: 35, color: "#f89d35" },
  { name: "College Education", value: 25, color: "#22c55e" },
  { name: "NEET Coaching", value: 10, color: "#3b82f6" },
  { name: "Medical Assistance", value: 5, color: "#ef4444" },
];

export default function DashboardHome() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === "authenticated") {
      const role = (session?.user as any)?.role;
      if (role === "trust_member") {
        router.replace("/dashboard/trust-member");
      }
    }
  }, [session, status, router]);

  if (status === "loading" || (session?.user as any)?.role === "trust_member") {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading your dashboard...</div>;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, {session?.user?.name?.split(' ')[0] || 'Admin'}</h1>
          <p className={styles.subtitle}>Here's what's happening with Helping Hands today.</p>
        </div>
        <div className={styles.actions}>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(248, 157, 53, 0.1)', color: 'var(--color-primary)' }}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Beneficiaries</p>
            <h3 className={styles.statValue}>64</h3>
            <p className={styles.statTrend}><TrendingUp size={14} /> +8 this year</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', color: 'var(--color-warning)' }}>
            <Heart size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Active Sponsors</p>
            <h3 className={styles.statValue}>14</h3>
            <p className={styles.statTrend}><TrendingUp size={14} /> +3 this year</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--color-success)' }}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Funds Raised</p>
            <h3 className={styles.statValue}>₹28.5L</h3>
            <p className={styles.statTrend}>Lifetime total</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <Wallet size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Current Balance</p>
            <h3 className={styles.statValue}>₹7.5L</h3>
            <p className={styles.statTrend}>Available for distribution</p>
          </div>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Finances Overview</h3>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-text)' }}
                />
                <Area type="monotone" dataKey="donations" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorDonations)" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Beneficiaries by Scheme</h3>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={schemeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {schemeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-text)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.legend}>
            {schemeData.map((item, idx) => (
              <div key={idx} className={styles.legendItem}>
                <div className={styles.legendDot} style={{ backgroundColor: item.color }}></div>
                <span>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Recent Transactions</h3>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "Oct 24, 2023", desc: "Donation from Dr. Smith", type: "Income", amount: "+₹15,000", status: "Completed" },
                  { date: "Oct 22, 2023", desc: "School Fee - Rahul Kumar", type: "Expense", amount: "-₹8,500", status: "Completed" },
                  { date: "Oct 18, 2023", desc: "NEET Coaching - Priya", type: "Expense", amount: "-₹25,000", status: "Pending" },
                  { date: "Oct 15, 2023", desc: "Monthly Sponsor - John D", type: "Income", amount: "+₹5,000", status: "Completed" },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.textSecondary}>{row.date}</td>
                    <td>{row.desc}</td>
                    <td>
                      <span className={`${styles.badge} ${row.type === 'Income' ? styles.badgeSuccess : styles.badgeError}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className={row.type === 'Income' ? styles.textSuccess : styles.textError}>{row.amount}</td>
                    <td>{row.status}</td>
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
