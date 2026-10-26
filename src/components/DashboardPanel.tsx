"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAppointments } from "@/hooks/useAppointments";
import type { Appointment, AppointmentStatus } from "@/types/appointment";
import { AppointmentCard } from "@/components/AppointmentCard";
import { StatsCard } from "@/components/StatsCard";
import styles from "@/styles/dashboard.module.css";

export function DashboardPanel() {
  const {
    appointments,
    isLoaded,
    storageAvailable,
    updateAppointmentStatus,
    removeAppointment,
  } = useAppointments();
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => ({
    all: appointments.length,
    pending: appointments.filter((appointment) => appointment.status === "pending").length,
    confirmed: appointments.filter((appointment) => appointment.status === "confirmed").length,
    cancelled: appointments.filter((appointment) => appointment.status === "cancelled").length,
  }), [appointments]);

  const filteredAppointments = useMemo(() => appointments
    .filter((appointment) => {
      const query = search.trim().toLocaleLowerCase("pt-BR");
      return !query || `${appointment.petName} ${appointment.ownerName}`.toLocaleLowerCase("pt-BR").includes(query);
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [appointments, search]);

  function changeStatus(id: string, status: AppointmentStatus) {
    try {
      updateAppointmentStatus(id, status);
      setMessage(status === "confirmed" ? "Agendamento confirmado." : "Agendamento cancelado.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível atualizar o agendamento.");
    }
  }

  function remove(appointment: Appointment) {
    if (!window.confirm(`Remover permanentemente o agendamento de ${appointment.petName}?`)) return;
    try {
      removeAppointment(appointment.id);
      setMessage(`Agendamento de ${appointment.petName} removido.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível remover o agendamento.");
    }
  }

  if (!isLoaded) {
    return <div className={styles.loading} role="status">Carregando sua agenda...</div>;
  }

  return (
    <>
      <section className={styles.statsGrid} aria-label="Resumo dos agendamentos">
        <StatsCard label="Agendamentos" value={counts.all} tone="all" />
        <StatsCard label="Em análise" value={counts.pending} tone="pending" />
        <StatsCard label="Confirmados" value={counts.confirmed} tone="confirmed" />
        <StatsCard label="Cancelados" value={counts.cancelled} tone="cancelled" />
      </section>
      {!storageAvailable && (
        <p className={styles.storageWarning} role="alert">
          O navegador não permitiu acessar o armazenamento local. A agenda não pode ser carregada ou alterada.
        </p>
      )}
      <div className={styles.listHeading}>
        <div>
          <span className="eyebrow">Visão geral</span>
          <h2>Sua agenda</h2>
        </div>
        {appointments.length > 0 && (
          <label className={styles.search}>
            <span className="srOnly">Buscar por pet ou responsável</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" strokeWidth="1.6"/><path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            <input type="search" placeholder="Buscar agendamento" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
        )}
      </div>
      {message && <p className={styles.feedback} role="status">{message}</p>}
      {appointments.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true">+</span>
          <h3>Seu espaço está pronto para o primeiro cuidado.</h3>
          <p>Os agendamentos que você criar aparecerão aqui para acompanhar e organizar.</p>
          <Link href="/#agendar" className="button button-primary">Criar agendamento</Link>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className={styles.emptySearch}>Nenhum agendamento corresponde a “{search}”.</div>
      ) : (
        <div className={styles.appointmentsList}>
          {filteredAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} onStatusChange={changeStatus} onRemove={remove} />
          ))}
        </div>
      )}
    </>
  );
}
