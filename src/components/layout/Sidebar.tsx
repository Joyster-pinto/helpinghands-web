"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import styles from "./Sidebar.module.css";
import { 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  Heart, 
  Award,
  Calendar,
  FileText,
  Wallet,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HandHeart
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const role = (session?.user as any)?.role || 'admin'; // default to admin for preview

  const adminMenuGroups = [
    {
      title: "MAIN",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      ]
    },
    {
      title: "MANAGEMENT",
      items: [
        { label: "Beneficiaries", href: "/dashboard/beneficiaries", icon: GraduationCap },
        { label: "Members", href: "/dashboard/members", icon: Users },
        { label: "Sponsors", href: "/dashboard/sponsorships", icon: Heart },
        { label: "Alumni", href: "/dashboard/alumni", icon: Award },
      ]
    },
    {
      title: "OPERATIONS",
      items: [
        { label: "Requests", href: "/dashboard/requests", icon: FileText },
        { label: "Activities", href: "/dashboard/activities", icon: Calendar },
        { label: "Meetings", href: "/dashboard/meetings", icon: FileText },
        { label: "Accounts", href: "/dashboard/accounts", icon: Wallet },
      ]
    }
  ];

  const memberMenuGroups = [
    {
      title: "MAIN",
      items: [
        { label: "Member Dashboard", href: "/dashboard/trust-member", icon: LayoutDashboard },
      ]
    }
  ];

  const menuGroups = role === 'admin' ? adminMenuGroups : memberMenuGroups;

  // Prevent flashing of admin menu for non-admin users on reload
  if (status === 'loading') {
    return (
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <HandHeart size={28} color="var(--color-primary)" />
            {!collapsed && <span>Helping Hands</span>}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <HandHeart size={28} color="var(--color-primary)" />
          {!collapsed && <span>Helping Hands</span>}
        </div>
        <button 
          className={styles.collapseBtn} 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className={styles.menuContainer}>
        {menuGroups.map((group, idx) => (
          <div key={idx} className={styles.menuGroup}>
            {!collapsed && <h3 className={styles.groupTitle}>{group.title}</h3>}
            <nav className={styles.nav}>
              {group.items.map((item, itemIdx) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                
                return (
                  <Link 
                    key={itemIdx} 
                    href={item.href}
                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                    title={collapsed ? item.label : ""}
                  >
                    <Icon size={20} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button 
          className={styles.logoutBtn} 
          onClick={async () => {
            await signOut({ redirect: false });
            window.location.href = "/login";
          }}
        >
          <LogOut size={20} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
