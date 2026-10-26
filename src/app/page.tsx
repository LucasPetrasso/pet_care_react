import Link from "next/link";
import { AppointmentForm } from "@/components/AppointmentForm";
import { CTA } from "@/components/CTA";
import styles from "@/styles/home.module.css";

const benefits = [
  { number: "01", title: "Agende sem complicação", text: "Escolha o serviço e o melhor horário em poucos passos." },
  { number: "02", title: "Tudo organizado", text: "Tenha os detalhes de cada atendimento sempre à mão." },
  { number: "03", title: "Cuidado para cada pet", text: "Opções de serviços para diferentes necessidades." },
  { number: "04", title: "Acompanhe cada etapa", text: "Veja quando o pedido está em análise ou confirmado." },
];

export default function Home() {
  return (
    <main>
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow"><span className={styles.eyebrowDot} /> Um cuidado mais leve começa aqui</span>
          <h1>Seu pet merece cuidado, <span>carinho e praticidade.</span></h1>
          <p>Agende banho, tosa ou consulta com facilidade. Mais organização para você, mais cuidado para quem está sempre ao seu lado.</p>
          <div className={styles.heroActions}>
            <Link href="/#agendar" className="button button-primary">Agendar atendimento <span aria-hidden="true">→</span></Link>
            <Link href="/dashboard" className={styles.textLink}>Conheça sua agenda</Link>
          </div>
          <div className={styles.trustNote}><span aria-hidden="true">✓</span> Simples, organizado e feito com carinho</div>
        </div>
        <div className={styles.heroArt} aria-label="Ilustração abstrata de uma pata, representando o cuidado com os pets" role="img">
          <div className={styles.artCircle}><div className={styles.artInner}>
            <svg viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <ellipse cx="100" cy="124" rx="42" ry="34" fill="#F3A77A"/>
              <ellipse cx="54" cy="81" rx="16" ry="23" transform="rotate(-24 54 81)" fill="#F3A77A"/>
              <ellipse cx="88" cy="63" rx="16" ry="23" transform="rotate(-7 88 63)" fill="#F3A77A"/>
              <ellipse cx="124" cy="64" rx="16" ry="23" transform="rotate(10 124 64)" fill="#F3A77A"/>
              <ellipse cx="151" cy="85" rx="16" ry="23" transform="rotate(28 151 85)" fill="#F3A77A"/>
              <path d="M100 142c-12-7-22-15-22-26a13 13 0 0 1 22-8 13 13 0 0 1 22 8c0 11-10 19-22 26Z" fill="#fff" fillOpacity=".83"/>
            </svg>
          </div></div>
          <div className={styles.floatingNote}><span className={styles.noteCheck}>✓</span><span><strong>Seu próximo cuidado</strong><small>Está a alguns cliques</small></span></div>
          <span className={styles.artCaption}>Cuidar também é estar presente.</span>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className="container">
          <div className={styles.sectionHeading}>
            <span className="eyebrow">Pequenos detalhes, mais tranquilidade</span>
            <h2>Mais tempo para o que importa.</h2>
            <p>Um jeito simples de organizar a rotina de cuidado do seu melhor amigo.</p>
          </div>
          <div className={styles.benefitGrid}>
            {benefits.map((benefit) => (
              <article className={styles.benefitCard} key={benefit.number}>
                <span className={styles.benefitNumber}>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.bookingSection} container`} id="agendar">
        <div className={styles.bookingAside}>
          <span className="eyebrow">Seu pet está em boas mãos</span>
          <h2>Um momento de cuidado muda o dia inteiro.</h2>
          <p>Escolha o serviço e um horário para começar. Seu pedido fica registrado para você consultar sempre que precisar.</p>
          <div className={styles.bookingTip}><span aria-hidden="true">↗</span><p>Depois de solicitar, você pode acompanhar e atualizar o atendimento no painel da agenda.</p></div>
        </div>
        <div className={styles.formCard}><AppointmentForm /></div>
      </section>

      <div className="container"><CTA /></div>
    </main>
  );
}
