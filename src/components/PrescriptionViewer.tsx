import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PrescriptionPrintModal } from './PrescriptionPrintModal';
import type { Prescription } from '../types/prescriptionType';
import type { Patient } from '../types/patient';


interface Props {
    open: boolean
    onClose: () => void
    patient: Patient
    prescriptions: Prescription[]
    visitDate?: string
}
// Main component demonstration
const PrescriptionViewer = ({
    open,
    onClose,
    patient,
    prescriptions,
    visitDate,
}: Props) => {
    const [printModalOpen, setPrintModalOpen] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);

    const handlePrintPrescription = (prescription) => {
        setSelectedPrescription(prescription);
        setPrintModalOpen(true);
    };

    return (
        <div className="p-6 max-w-5xl">
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="max-w-5xl">
                    <DialogHeader>
                        <DialogTitle>Prescriptions</DialogTitle>
                    </DialogHeader>
                    {visitDate && <p className="text-sm text-muted-foreground">Visit Date: {visitDate}</p>}
                    <p className="text-sm mb-3">Patient: {patient.name}</p>
                    <div className="space-y-4">
                        {prescriptions.map((rx, index) => (
                            <div key={rx.id} className="border rounded p-4 relative shadow-sm">
                                <div className="text-sm space-y-1 mb-2">
                                    <p className="font-medium">Prescription {index + 1}</p>
                                    {rx.medicines.map((med, i) => (
                                        <div key={i}>
                                            • <strong>{med.medicineName}</strong> – {med.dosage}, {med.frequency},{" "}
                                            {med.duration}
                                            {med.notes && (
                                                <div className="text-xs text-muted-foreground ml-4">Note: {med.notes}</div>
                                            )}
                                        </div>
                                    ))}
                                    {rx.notes && (
                                        <p className="text-xs mt-2">
                                            📝 <strong>Notes:</strong> {rx.notes}
                                        </p>
                                    )}
                                    {rx.nextReviewDate && (
                                        <p className="text-xs text-red-600 mt-1">
                                            📅 Next Review: {rx.nextReviewDate}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handlePrintPrescription(rx.id)}
                                    className="absolute top-2 right-2"
                                >
                                    🖨️
                                </Button>

                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
            {/* Print Modal */}
            <PrescriptionPrintModal
                open={printModalOpen}
                onClose={() => setPrintModalOpen(false)}
                prescription={selectedPrescription}
                patient={patient}
            />
        </div>
    );
};

export default PrescriptionViewer;