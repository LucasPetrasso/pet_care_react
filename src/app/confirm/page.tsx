"use client";

import Link from "next/link";
import { useAppointments } from "@/hooks/useAppointments";
import type { AppointmentStatus } from "@/types/appointment";
import styles from "@/styles/components.module.css";

const statusLabels: Record<AppointmentStatus, string> = {
  pending: "Em análise",
  confirmed: "Confirmado",
  cancelled: "Cancelado",
};

export default function ConfirmPage() {
  const { isLoaded, storageAvailable, lastAppointmentId, getAppointmentById } = useAppointments();
  if (!isLoaded) return <main className="container pageShell"><p role="status">Carregando confirmação...</p></main>;

  const appointment = lastAppointmentId ? getAppointmentById(lastAppointmentId) : undefined;
  if (!appointment) {
    return (
      <main className="container pageShell">
        <section className={styles.confirmCard}>
          <span className={styles.confirmMark} aria-hidden="true">i</span>
          <span className="eyebrow">Ainda não há agendamento</span>
          <h1>Vamos marcar o primeiro cuidado?</h1>
          <p>{storageAvailable
            ? "Quando você solicitar um horário, os detalhes e o status aparecerão nesta página."
            : "O navegador não permitiu acessar o armazenamento local. Não foi possível recuperar um agendamento."}</p>
          <Link href="/#agendar" className="button button-primary">Criar agendamento</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container pageShell">
      <section className={styles.confirmCard}>
        <span className={styles.confirmMark} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <span className="eyebrow">Pedido recebido com carinho</span>
        <h1>Agendamento registrado!</h1>
        <p>Seu pedido está em análise. Você pode acompanhar o status e organizar os atendimentos no painel.</p>
        <dl className={styles.confirmDetails}>
          <div><dt>Responsável</dt><dd>{appointment.ownerName}</dd></div>
          <div><dt>Pet</dt><dd>{appointment.petName}</dd></div>
          <div><dt>Serviço</dt><dd>{appointment.service}</dd></div>
          <div><dt>Data e horário</dt><dd>{new Date(`${appointment.date}T12:00:00`).toLocaleDateString("pt-BR")} às {appointment.time}</dd></div>
          <div><dt>Status</dt><dd><span className={styles[`status_${appointment.status}`]}>{statusLabels[appointment.status]}</span></dd></div>
        </dl>
        <div className={styles.confirmActions}>
          <Link href="/" className="button button-secondary">Voltar à página inicial</Link>
          <Link href="/dashboard" className="button button-primary">Acessar agenda</Link>
        </div>
      </section>
    </main>
  );
}
