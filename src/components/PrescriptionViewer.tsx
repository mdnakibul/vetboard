// src/components/PrescriptionViewer.tsx

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Prescription } from "@/types/prescription"

interface Props {
    open: boolean
    onClose: () => void
    prescriptions: Prescription[]
    visitDate?: string
    patientName?: string
}

export default function PrescriptionViewer({ open, onClose, prescriptions, visitDate, patientName }: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Prescription</DialogTitle>
                </DialogHeader>

                {visitDate && <p className="text-sm text-muted-foreground">Visit Date: {visitDate}</p>}
                {patientName && <p className="text-sm mb-2">Patient: {patientName}</p>}

                <div className="space-y-3">
                    {prescriptions.map((p, index) => (
                        <div key={p.id} className="border rounded p-3 text-sm">
                            <div><strong>{index + 1}. {p.medicine}</strong></div>
                            <div>Dosage: {p.dosage}</div>
                            <div>Frequency: {p.frequency}</div>
                            <div>Duration: {p.duration}</div>
                            {p.notes && <div className="text-muted-foreground text-xs mt-1">Note: {p.notes}</div>}
                        </div>
                    ))}
                </div>

                {/* Optional: Add print/export later */}
                <div className="pt-4 text-right">
                    <Button onClick={onClose} variant="outline">Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
