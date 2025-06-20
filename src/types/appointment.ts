export interface Appointment {
  id: string;
  patientName: string;
  date: string; // format: YYYY-MM-DD
  reason: string;
  status: "Pending" | "Completed" | "Canceled";
}
