import type { MedicalRecord } from "./medical-records";

export interface Patient {
  id: string;
  name: string;
  species: string;
  age: number;
  ownerName: string;
  contact: string;
  medicalHistory?: MedicalRecord[];
}
