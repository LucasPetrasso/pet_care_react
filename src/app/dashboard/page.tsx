import { DashboardPanel } from "@/components/DashboardPanel";
import styles from "@/styles/dashboard.module.css";

export default function DashboardPage() {
  return (
    <main className={`container ${styles.dashboardPage}`}>
      <div className={styles.pageIntro}>
        <span className="eyebrow">Tudo em um só lugar</span>
        <h1>Agenda de atendimentos</h1>
        <p>Acompanhe os pedidos e mantenha cada cuidado organizado.</p>
      </div>
      <DashboardPanel />
    </main>
  );
}
