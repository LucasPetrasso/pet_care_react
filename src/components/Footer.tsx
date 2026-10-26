import Link from "next/link";
import styles from "@/styles/layout.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} container`}>
        <Link className={styles.footerBrand} href="/">petcare</Link>
        <p>Cuidado de confiança para quem faz parte da família.</p>
        <span>PetCare · Projeto demonstrativo</span>
      </div>
    </footer>
  );
}
