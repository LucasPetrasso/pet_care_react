import Link from "next/link";
import styles from "@/styles/components.module.css";

export function CTA() {
  return (
    <section className={styles.cta}>
      <div>
        <span className="eyebrow">Um cuidado de cada vez</span>
        <h2>O próximo momento especial começa aqui.</h2>
        <p>Escolha o melhor horário e deixe o resto com a gente.</p>
      </div>
      <Link href="/#agendar" className="button button-light">Agendar agora</Link>
    </section>
  );
}
