// Each individual medicine entry in a prescription
export interface Medicine {
  index: number; // for internal sorting/display
  medicineId: string; // optional, if using stock system later
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}
