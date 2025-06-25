export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  reason: string;
  status: "Pending" | "Completed" | "Canceled";
}
