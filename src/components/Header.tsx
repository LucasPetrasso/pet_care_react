import Link from "next/link";
import styles from "@/styles/layout.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerInner} container`}>
        <Link className={styles.brand} href="/" aria-label="PetCare, página inicial">
          <span className={styles.brandMark} aria-hidden="true">
            <svg viewBox="0 0 36 36" fill="none">
              <path d="M18 30.2c-5.7-3.2-10.2-6.9-10.2-12a5.8 5.8 0 0 1 10.2-3.8 5.8 5.8 0 0 1 10.2 3.8c0 5.1-4.5 8.8-10.2 12Z" fill="currentColor" />
              <circle cx="9" cy="9" r="3.2" fill="currentColor" />
              <circle cx="17.8" cy="6.2" r="3.2" fill="currentColor" />
              <circle cx="27" cy="9" r="3.2" fill="currentColor" />
            </svg>
          </span>
          <span>petcare</span>
        </Link>
        <nav className={styles.navigation} aria-label="Navegação principal">
          <Link href="/">Início</Link>
          <Link href="/dashboard">Agenda</Link>
          <Link className={styles.navCta} href="/#agendar">Agendar atendimento</Link>
        </nav>
      </div>
    </header>
  );
}
