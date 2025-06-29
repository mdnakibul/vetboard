import type { Invoice } from "@/types/invoice";

const STORAGE_KEYS = {
  invoices: "vetboard_invoices"
};

// 🔹 Get all invoices
export function getStoredInvoices(): Invoice[] {
  const json = localStorage.getItem(STORAGE_KEYS.invoices);
  return json ? JSON.parse(json) : [];
}

// 🔹 Save invoices to localStorage
export function saveInvoices(invoices: Invoice[]): void {
  localStorage.setItem(STORAGE_KEYS.invoices, JSON.stringify(invoices));
}

// 🔹 Get single invoice by ID
export function getInvoiceById(id: string): Invoice | undefined {
  const invoices = getStoredInvoices();
  return invoices.find((inv) => inv.id === id);
}

// 🔹 Delete invoice by ID
export function deleteInvoice(id: string): void {
  const updated = getStoredInvoices().filter((inv) => inv.id !== id);
  saveInvoices(updated);
}
