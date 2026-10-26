import styles from "@/styles/dashboard.module.css";

type StatsCardProps = {
  label: string;
  value: number;
  tone: "all" | "pending" | "confirmed" | "cancelled";
};

export function StatsCard({ label, value, tone }: StatsCardProps) {
  return (
    <article className={`${styles.statCard} ${styles[`stat_${tone}`]}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
