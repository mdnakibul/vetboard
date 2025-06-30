import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Invoice } from "@/types/invoice"
import { getStoredPatientById } from "@/lib/storage"
import { useRef } from "react"
import { InvoicePrint } from "@/components/InvoicePrint"
import { useReactToPrint } from "react-to-print"
interface Props {
    invoice: Invoice
    onClose: () => void
}

export default function InvoiceView({ invoice, onClose }: Props) {
    const patient = getStoredPatientById(invoice.patientId)
    const pdfRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef: pdfRef, documentTitle: `invoice-${invoice.id.slice(0, 8)}` });


    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Invoice Details</DialogTitle>
                </DialogHeader>
                <InvoicePrint invoice={invoice} ref={pdfRef} patient={patient} />
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    <Button onClick={handlePrint}>Print</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
