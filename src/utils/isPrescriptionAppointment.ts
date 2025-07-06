import type { Appointment } from "../types/appointment";
import type { Prescription } from "../types/prescriptionType";

export const isPrescriptionOverdue = (
  prescription: Prescription,
  patientAppointments: Appointment[] = []
): boolean => {
  if (!prescription.nextReviewDate) return false;

  const today = new Date().toISOString().split("T")[0];

  const hasFutureAppointment = patientAppointments.some(
    (appt) => appt.date > prescription.nextReviewDate
  );

  return prescription.nextReviewDate < today && !hasFutureAppointment;
};
