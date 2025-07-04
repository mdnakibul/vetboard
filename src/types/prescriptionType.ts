import type { Medicine } from "./medicineType";

// One prescription per visit (can include multiple medicines)
export interface Prescription {
  id: string;
  medicines: Medicine[];
  notes?: string;
  nextReviewDate?: string; // 🧭 when the patient should return/review
}
