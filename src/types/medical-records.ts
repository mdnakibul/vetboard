import type { Prescription } from "./prescription";

// types/patient.ts
export type MedicalRecord = {
  id: string;
  date: string;
  description: string;
  diagnosis?: string;
  treatment?: string;
  vet?: string;
  prescriptions: Prescription[];
};
