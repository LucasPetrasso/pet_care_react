import { isAppointment, type Appointment } from "@/types/appointment";

const APPOINTMENTS_KEY = "petcare:appointments";
const LAST_APPOINTMENT_KEY = "petcare:last-appointment";

type StoredAppointments = {
  appointments: Appointment[];
  available: boolean;
};

export function readAppointments(): StoredAppointments {
  if (typeof window === "undefined") return { appointments: [], available: false };

  let stored: string | null;
  try {
    stored = window.localStorage.getItem(APPOINTMENTS_KEY);
  } catch (error) {
    console.error("Não foi possível ler os agendamentos do navegador.", error);
    return { appointments: [], available: false };
  }
  if (!stored) return { appointments: [], available: true };

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch (error) {
    console.error("Os agendamentos salvos no navegador contêm JSON inválido.", error);
    return { appointments: [], available: true };
  }
  if (!Array.isArray(parsed)) {
    console.error("Os agendamentos salvos no navegador possuem um formato inválido.");
    return { appointments: [], available: true };
  }

  const appointments = parsed.filter(isAppointment);
  if (appointments.length !== parsed.length) {
    console.error("Um ou mais agendamentos inválidos foram ignorados.");
  }
  return { appointments, available: true };
}

export function readLastAppointmentId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(LAST_APPOINTMENT_KEY);
  } catch (error) {
    console.error("Não foi possível recuperar o último agendamento.", error);
    return null;
  }
}

export function saveAppointments(appointments: Appointment[]): void {
  if (typeof window === "undefined") {
    throw new Error("O armazenamento local só está disponível no navegador.");
  }
  try {
    window.localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error("Não foi possível salvar os agendamentos no navegador.", error);
    throw new Error("Não foi possível salvar os dados neste navegador.", { cause: error });
  }
}

export function saveLastAppointmentId(id: string): void {
  if (typeof window === "undefined") {
    throw new Error("O armazenamento local só está disponível no navegador.");
  }
  try {
    window.localStorage.setItem(LAST_APPOINTMENT_KEY, id);
  } catch (error) {
    console.error("Não foi possível salvar a referência do último agendamento.", error);
    throw new Error("Não foi possível salvar a confirmação do agendamento.", { cause: error });
  }
}

export function clearLastAppointmentId(): void {
  if (typeof window === "undefined") {
    throw new Error("O armazenamento local só está disponível no navegador.");
  }
  try {
    window.localStorage.removeItem(LAST_APPOINTMENT_KEY);
  } catch (error) {
    console.error("Não foi possível remover a referência do último agendamento.", error);
    throw new Error("Não foi possível atualizar a confirmação do agendamento.", { cause: error });
  }
}

export const storageKeys = {
  appointments: APPOINTMENTS_KEY,
  lastAppointment: LAST_APPOINTMENT_KEY,
};
