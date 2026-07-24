import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import styles from "./layout.module.css";
import { Bell, UserCircle, LogOut } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Topbar from "@/components/layout/Topbar";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Topbar user={session?.user} />
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
}
