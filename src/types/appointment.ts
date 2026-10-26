export const appointmentStatuses = [
  "pending",
  "confirmed",
  "cancelled",
] as const;

export type AppointmentStatus = (typeof appointmentStatuses)[number];

export type Appointment = {
  id: string;
  ownerName: string;
  petName: string;
  petType: string;
  service: string;
  date: string;
  time: string;
  phone: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
};

export type NewAppointment = Omit<Appointment, "id" | "status" | "createdAt">;

export function isAppointment(value: unknown): value is Appointment {
  if (typeof value !== "object" || value === null) return false;

  const appointment = value as Record<string, unknown>;
  return (
    typeof appointment.id === "string" &&
    typeof appointment.ownerName === "string" &&
    typeof appointment.petName === "string" &&
    typeof appointment.petType === "string" &&
    typeof appointment.service === "string" &&
    typeof appointment.date === "string" &&
    typeof appointment.time === "string" &&
    typeof appointment.phone === "string" &&
    typeof appointment.notes === "string" &&
    typeof appointment.createdAt === "string" &&
    appointmentStatuses.includes(appointment.status as AppointmentStatus)
  );
}
