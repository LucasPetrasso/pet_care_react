"use client";

import type { Appointment, AppointmentStatus } from "@/types/appointment";
import styles from "@/styles/dashboard.module.css";

const statusLabels: Record<AppointmentStatus, string> = {
  pending: "Em análise",
  confirmed: "Confirmado",
  cancelled: "Cancelado",
};

type AppointmentCardProps = {
  appointment: Appointment;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
  onRemove: (appointment: Appointment) => void;
};

export function AppointmentCard({ appointment, onStatusChange, onRemove }: AppointmentCardProps) {
  const date = new Date(`${appointment.date}T12:00:00`);
  const createdAt = new Date(appointment.createdAt);
  return (
    <article className={styles.appointmentCard}>
      <div className={styles.cardTop}>
        <div>
          <span className={styles.cardLabel}>Atendimento para</span>
          <h3>{appointment.petName}</h3>
          <p>{appointment.petType} <span aria-hidden="true">·</span> responsável: {appointment.ownerName}</p>
        </div>
        <span className={`${styles.badge} ${styles[`badge_${appointment.status}`]}`}>{statusLabels[appointment.status]}</span>
      </div>
      <dl className={styles.details}>
        <div><dt>Serviço</dt><dd>{appointment.service}</dd></div>
        <div><dt>Data e horário</dt><dd>{date.toLocaleDateString("pt-BR")} às {appointment.time}</dd></div>
        <div><dt>Telefone</dt><dd><a href={`tel:${appointment.phone.replace(/\D/g, "")}`}>{appointment.phone}</a></dd></div>
        {appointment.notes && <div className={styles.notes}><dt>Observações</dt><dd>{appointment.notes}</dd></div>}
      </dl>
      <div className={styles.cardBottom}>
        <span>Solicitado em {createdAt.toLocaleDateString("pt-BR")}</span>
        <div className={styles.actions}>
          {appointment.status === "pending" && (
            <>
              <button type="button" className={styles.confirmAction} onClick={() => onStatusChange(appointment.id, "confirmed")}>Confirmar</button>
              <button type="button" className={styles.cancelAction} onClick={() => onStatusChange(appointment.id, "cancelled")}>Cancelar</button>
            </>
          )}
          {appointment.status === "confirmed" && (
            <button type="button" className={styles.cancelAction} onClick={() => onStatusChange(appointment.id, "cancelled")}>Cancelar</button>
          )}
          <button type="button" className={styles.removeAction} onClick={() => onRemove(appointment)}>Remover</button>
        </div>
      </div>
    </article>
  );
}
