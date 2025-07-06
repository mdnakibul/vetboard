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
export function getPrescriptionById(prescriptionId: string) {
  const medicalRecords = getStoredMedicalRecords();
  for (const mr of medicalRecords) {
    const match = mr.prescriptions?.find((p) => p.id === prescriptionId);
    if (match) return match;
  }
  return {};
}
