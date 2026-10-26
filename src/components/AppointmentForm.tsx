"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { petTypes, services } from "@/data/services";
import { useAppointments } from "@/hooks/useAppointments";
import type { NewAppointment } from "@/types/appointment";
import styles from "@/styles/form.module.css";

type FormValues = NewAppointment;
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  ownerName: "",
  petName: "",
  petType: "",
  service: "",
  date: "",
  time: "",
  phone: "",
  notes: "",
};

function getTodayLocal() {
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60_000;
  return new Date(today.getTime() - offset).toISOString().slice(0, 10);
}

export function AppointmentForm() {
  const router = useRouter();
  const { addAppointment, isLoaded } = useAppointments();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    void Promise.resolve().then(() => setToday(getTodayLocal()));
  }, []);

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: FormErrors = {};
    if (!values.ownerName.trim()) nextErrors.ownerName = "Informe seu nome.";
    if (!values.petName.trim()) nextErrors.petName = "Informe o nome do pet.";
    if (!values.petType) nextErrors.petType = "Selecione o tipo do animal.";
    if (!values.service) nextErrors.service = "Selecione um serviço.";
    if (!values.date) nextErrors.date = "Selecione uma data.";
    else if (values.date < (today || getTodayLocal())) nextErrors.date = "Escolha uma data a partir de hoje.";
    if (!values.time) nextErrors.time = "Selecione um horário.";
    else if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(values.time)) {
      nextErrors.time = "Informe um horário válido.";
    }
    const digits = values.phone.replace(/\D/g, "");
    if (!digits) nextErrors.phone = "Informe um telefone para contato.";
    else if (digits.length < 10 || digits.length > 13) {
      nextErrors.phone = "Informe um telefone válido com DDD.";
    }
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      addAppointment({
        ...values,
        ownerName: values.ownerName.trim(),
        petName: values.petName.trim(),
        notes: values.notes.trim(),
        phone: values.phone.trim(),
      });
      router.push("/confirm");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Não foi possível criar o agendamento.");
      setIsSubmitting(false);
    }
  }

  function fieldError(field: keyof FormValues) {
    return errors[field] ? <span className={styles.errorText} id={`${field}-error`}>{errors[field]}</span> : null;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formIntro}>
        <span className="eyebrow">Vamos cuidar de quem você ama</span>
        <h2>Agende um atendimento</h2>
        <p>Preencha os dados e nossa equipe deixa tudo organizado para vocês.</p>
      </div>

      <div className={styles.formGrid}>
        <label className={styles.field}>
          Nome do responsável
          <input value={values.ownerName} onChange={(event) => updateField("ownerName", event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.ownerName)} aria-describedby={errors.ownerName ? "ownerName-error" : undefined} />
          {fieldError("ownerName")}
        </label>
        <label className={styles.field}>
          Nome do pet
          <input value={values.petName} onChange={(event) => updateField("petName", event.target.value)} aria-invalid={Boolean(errors.petName)} aria-describedby={errors.petName ? "petName-error" : undefined} />
          {fieldError("petName")}
        </label>
        <label className={styles.field}>
          Tipo do animal
          <select value={values.petType} onChange={(event) => updateField("petType", event.target.value)} aria-invalid={Boolean(errors.petType)} aria-describedby={errors.petType ? "petType-error" : undefined}>
            <option value="">Selecione</option>
            {petTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          {fieldError("petType")}
        </label>
        <label className={styles.field}>
          Serviço desejado
          <select value={values.service} onChange={(event) => updateField("service", event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}>
            <option value="">Selecione</option>
            {services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
          {fieldError("service")}
        </label>
        <label className={styles.field}>
          Data
          <input type="date" min={today || undefined} value={values.date} onChange={(event) => updateField("date", event.target.value)} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "date-error" : undefined} />
          {fieldError("date")}
        </label>
        <label className={styles.field}>
          Horário
          <select value={values.time} onChange={(event) => updateField("time", event.target.value)} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? "time-error" : undefined}>
            <option value="">Selecione</option>
            {Array.from({ length: 10 }, (_, index) => {
              const minutes = 8 * 60 + index * 60;
              const time = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
              return <option key={time} value={time}>{time}</option>;
            })}
          </select>
          {fieldError("time")}
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          Telefone para contato
          <input type="tel" inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999" value={values.phone} onChange={(event) => updateField("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {fieldError("phone")}
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          Observações <span className={styles.optional}>(opcional)</span>
          <textarea rows={3} value={values.notes} onChange={(event) => updateField("notes", event.target.value)} placeholder="Conte algo que possa ajudar no atendimento." />
        </label>
      </div>
      {formError && <p className={styles.formError} role="alert">{formError}</p>}
      <button className="button button-primary" type="submit" disabled={isSubmitting || !isLoaded}>
        {isSubmitting ? "Salvando agendamento..." : "Solicitar agendamento"}
      </button>
      <p className={styles.privacyNote}>Seus dados ficam salvos somente neste navegador.</p>
    </form>
  );
}
