import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import styles from "./AppLayout.module.css";

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <BottomNav />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
