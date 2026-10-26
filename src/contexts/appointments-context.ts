import { createContext } from "react";
import type { Appointment, AppointmentStatus, NewAppointment } from "@/types/appointment";

export type AppointmentsContextValue = {
  appointments: Appointment[];
  isLoaded: boolean;
  storageAvailable: boolean;
  lastAppointmentId: string | null;
  addAppointment: (appointment: NewAppointment) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  removeAppointment: (id: string) => void;
  getAppointmentById: (id: string) => Appointment | undefined;
};

export const AppointmentsContext = createContext<AppointmentsContextValue | null>(null);
