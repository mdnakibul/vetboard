export interface MedicalRecord {
  id: string;
  patientId: string;
  visitDate: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
}
