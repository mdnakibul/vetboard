import { getStoredMedicalRecords } from "./medical-records";

export function getPrescriptionsByPatient(patientId: string) {
  return getStoredMedicalRecords()
    .filter((r) => r.patientId === patientId)
    .flatMap((r) =>
      r.prescriptions.map((p) => ({
        ...p,
        date: r.visitDate,
        recordId: r.id
      }))
    );
}
