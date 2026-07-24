import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import styles from "./layout.module.css";
import { Bell, UserCircle, LogOut } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.greeting}>
            <h2>Dashboard</h2>
          </div>
          <div className={styles.actions}>
            <button className={styles.iconButton}>
              <Bell size={20} />
            </button>
            <div className={styles.userInfo}>
              <UserCircle size={32} />
              <div className={styles.userDetails}>
                <span className={styles.userName}>{session?.user?.name || "User"}</span>
                <span className={styles.userRole}>{(session?.user as any)?.role || "Role"}</span>
              </div>
            </div>
          </div>
        </header>
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
}
