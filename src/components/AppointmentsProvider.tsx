"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearLastAppointmentId,
  readAppointments,
  readLastAppointmentId,
  saveAppointments,
  saveLastAppointmentId,
  storageKeys,
} from "@/lib/storage";
import { AppointmentsContext } from "@/contexts/appointments-context";
import type { Appointment, AppointmentStatus, NewAppointment } from "@/types/appointment";

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [lastAppointmentId, setLastAppointmentId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function initialize() {
      const stored = await Promise.resolve().then(readAppointments);
      if (!isActive) return;
      setAppointments(stored.appointments);
      setStorageAvailable(stored.available);
      setLastAppointmentId(readLastAppointmentId());
      setIsLoaded(true);
    }

    void initialize();

    function syncFromAnotherTab(event: StorageEvent) {
      if (event.key === storageKeys.appointments) {
        const updated = readAppointments();
        setAppointments(updated.appointments);
        setStorageAvailable(updated.available);
      }
      if (event.key === storageKeys.lastAppointment) {
        setLastAppointmentId(event.newValue);
      }
    }

    window.addEventListener("storage", syncFromAnotherTab);
    return () => {
      isActive = false;
      window.removeEventListener("storage", syncFromAnotherTab);
    };
  }, []);

  const addAppointment = useCallback(
    (details: NewAppointment) => {
      if (!isLoaded || !storageAvailable) {
        throw new Error("O armazenamento local não está disponível. Verifique as permissões do navegador.");
      }

      const appointment: Appointment = {
        ...details,
        id: crypto.randomUUID(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      const updated = [appointment, ...appointments];
      saveAppointments(updated);
      try {
        saveLastAppointmentId(appointment.id);
      } catch (error) {
        saveAppointments(appointments);
        throw error;
      }
      setAppointments(updated);
      setLastAppointmentId(appointment.id);
      return appointment;
    },
    [appointments, isLoaded, storageAvailable],
  );

  const updateAppointmentStatus = useCallback(
    (id: string, status: AppointmentStatus) => {
      if (!isLoaded || !storageAvailable) {
        throw new Error("O armazenamento local não está disponível.");
      }
      const current = appointments.find((appointment) => appointment.id === id);
      if (!current || current.status === status || current.status === "cancelled") return;
      const updated = appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment,
      );
      saveAppointments(updated);
      setAppointments(updated);
    },
    [appointments, isLoaded, storageAvailable],
  );

  const removeAppointment = useCallback(
    (id: string) => {
      if (!isLoaded || !storageAvailable) {
        throw new Error("O armazenamento local não está disponível.");
      }
      if (!appointments.some((appointment) => appointment.id === id)) return;
      const updated = appointments.filter((appointment) => appointment.id !== id);
      if (lastAppointmentId === id) {
        clearLastAppointmentId();
        try {
          saveAppointments(updated);
        } catch (error) {
          saveLastAppointmentId(id);
          throw error;
        }
        setLastAppointmentId(null);
      } else {
        saveAppointments(updated);
      }
      setAppointments(updated);
    },
    [appointments, isLoaded, lastAppointmentId, storageAvailable],
  );

  const getAppointmentById = useCallback(
    (id: string) => appointments.find((appointment) => appointment.id === id),
    [appointments],
  );

  const value = useMemo(
    () => ({
      appointments,
      isLoaded,
      storageAvailable,
      lastAppointmentId,
      addAppointment,
      updateAppointmentStatus,
      removeAppointment,
      getAppointmentById,
    }),
    [
      appointments,
      isLoaded,
      storageAvailable,
      lastAppointmentId,
      addAppointment,
      updateAppointmentStatus,
      removeAppointment,
      getAppointmentById,
    ],
  );

  return <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>;
}
