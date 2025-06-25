// src/lib/storage/medical-records.ts

import type { MedicalRecord } from "@/types/medical-record";

const STORAGE_KEY = "vetboard_medical_records";

export function getStoredMedicalRecords(): MedicalRecord[] {
  const json = localStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export function saveMedicalRecords(records: MedicalRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
