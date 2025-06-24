import type { Patient } from "@/types/patient";
import type { Appointment } from "../types/appointment";

const STORAGE_KEYS = {
  patients: "vetboard-patients",
  appointments: "vetboard-appointments"
};

export function getStoredPatients(): Patient[] {
  const json = localStorage.getItem(STORAGE_KEYS.patients);
  return json ? JSON.parse(json) : [];
}

export function savePatients(data: Patient[]) {
  localStorage.setItem(STORAGE_KEYS.patients, JSON.stringify(data));
}

export function getStoredAppointments(): Appointment[] {
  const json = localStorage.getItem(STORAGE_KEYS.appointments);
  return json ? JSON.parse(json) : [];
}

export function saveAppointments(data: Appointment[]) {
  localStorage.setItem(STORAGE_KEYS.appointments, JSON.stringify(data));
}
