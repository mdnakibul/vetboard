export interface Invoice {
  id: string;
  patientId: string;
  date: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  total: number;
  status: "Paid" | "Unpaid";
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}
