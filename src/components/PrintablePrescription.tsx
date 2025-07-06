// src/components/PrintablePrescription.tsx

import { forwardRef } from "react"
import type { Patient } from "@/types/patient"
import type { Prescription } from "@/types/medical-record"
import "@/assets/style/PrintablePrescription.css" // Optional: if you want to scope print styles

interface Props {
    patient: Patient
    prescription: Prescription // Changed back to single prescription
    vetName?: string
    visitDate?: string
}

// Forward ref is required by react-to-print
export const PrintablePrescription = forwardRef<HTMLDivElement, Props>(
    ({ patient, prescription, vetName = "Dr. Nahid", visitDate }, ref) => {
        return (
            <div ref={ref} className="p-6 text-sm text-black font-serif max-w-[700px] mx-auto bg-white">
                {/* Header */}
                <div className="text-center border-b pb-2 mb-4">
                    <h1 className="text-2xl font-bold">VetBoard Animal Health Center</h1>
                    <p className="text-sm">123 Vet Street, Dhaka | +880123456789</p>
                </div>

                {/* Doctor and Visit Info */}
                <div className="flex justify-between mb-2">
                    <p><strong>Doctor:</strong> {vetName}</p>
                    {visitDate && <p><strong>Date:</strong> {visitDate}</p>}
                </div>

                {/* Patient Info */}
                <div className="border p-3 mb-4 rounded">
                    <p><strong>Patient:</strong> {patient.name}</p>
                    <p><strong>Owner:</strong> {patient.ownerName}</p>
                    <p><strong>Species:</strong> {patient.species} | <strong>Age:</strong> {patient.age}</p>
                    <p><strong>Sex:</strong> {patient.gender}</p>
                </div>

                {/* Single Prescription */}
                <div className="mb-4">
                    <p className="font-semibold mb-2">Prescription</p>
                    <div className="pl-4">
                        {prescription.medicines.map((med, j) => (
                            <div key={j} className="mb-2">
                                <span className="block">
                                    {j + 1}. <strong>{med.medicineName}</strong>
                                </span>
                                <div className="ml-4 text-sm">
                                    {med.dosage && <span>Dosage: {med.dosage}</span>}
                                    {med.frequency && <span className="ml-2">Frequency: {med.frequency}</span>}
                                    {med.duration && <span className="ml-2">Duration: {med.duration}</span>}
                                </div>
                                {med.notes && (
                                    <div className="ml-4 text-xs text-gray-600 mt-1">
                                        Note: {med.notes}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {prescription.notes && (
                        <div className="mt-3 p-2 bg-gray-50 rounded">
                            <p className="text-sm"><strong>Prescription Notes:</strong> {prescription.notes}</p>
                        </div>
                    )}

                    {prescription.nextReviewDate && (
                        <div className="mt-2 p-2 bg-red-50 rounded border-l-4 border-red-200">
                            <p className="text-sm text-red-700">
                                <strong>Next Review Date:</strong> {prescription.nextReviewDate}
                            </p>
                        </div>
                    )}
                </div>

                {/* Signature */}
                <div className="mt-16 text-right pr-10">
                    <div className="border-t border-black w-48 ml-auto mb-2"></div>
                    <p className="text-sm">Doctor's Signature</p>
                    <p className="text-xs text-gray-600 mt-1">{vetName}</p>
                </div>
            </div>
        )
    }
)

PrintablePrescription.displayName = "PrintablePrescription"