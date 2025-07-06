// src/pages/MedicalRecords.tsx

import { useEffect, useState } from "react"
import type { MedicalRecord } from "@/types/medical-records"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getStoredMedicalRecords, saveMedicalRecords } from "@/lib/medical-records.ts"
import MedicalRecordForm from "@/components/MedicalRecordForm"
import { generateId } from "@/lib/id"
import PrescriptionViewer from "@/components/PrescriptionViewer"
import { getStoredPatientById } from "../lib/storage"

export default function MedicalRecords() {
    const [records, setRecords] = useState<MedicalRecord[]>([])
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState<MedicalRecord | null>(null)
    const [selectedPrescriptions, setSelectedPrescriptions] = useState<Prescription[]>([])
    const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false)

    const handleSave = (data: Omit<MedicalRecord, "id">, id?: string) => {
        let updated: MedicalRecord[]
        if (id) {
            updated = records.map((r) => (r.id === id ? { ...r, ...data } : r))
        } else {
            updated = [...records, { id: generateId(), ...data }]
        }
        saveMedicalRecords(updated)
        setRecords(getStoredMedicalRecords())
    }

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this record?")) {
            const updated = records.filter((r) => r.id !== id)
            saveMedicalRecords(updated)
            setRecords(updated)
        }
    }

    const handleViewPrescription = (record: MedicalRecord) => {
        const patient = getStoredPatientById(record.patientId)
        if (record.prescriptions) {
            record.prescriptions.forEach(prescription => {
                prescription.patient = patient
                prescription.visitDate = record.visitDate
            })
        }
        setSelectedPrescriptions(record.prescriptions)
        setPrescriptionModalOpen(true)
    }

    useEffect(() => {
        setRecords(getStoredMedicalRecords())
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Medical Records</h2>
                <Button onClick={() => { setEditing(null); setShowForm(true) }}>Add Record</Button>
            </div>

            {records.length === 0 ? (
                <p className="text-gray-500 text-sm">No medical records found.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {records.map((record) => (
                        <Card key={record.id}>
                            <CardHeader>
                                <CardTitle>{record.diagnosis}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-700 space-y-1">
                                <p><strong>Visit:</strong> {record.visitDate}</p>
                                <p><strong>Patient ID:</strong> {record.patientId}</p>
                                <p><strong>Symptoms:</strong> {record.symptoms}</p>
                                <p><strong>Treatment:</strong> {record.treatment}</p>
                                {record.notes && <p><strong>Notes:</strong> {record.notes}</p>}

                                {/* Show prescriptions inline if they exist */}
                                <div className="mt-2 space-y-3">
                                    <div className="text-sm font-medium">Total prescriptions: {record.prescriptions?.length || 0}</div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-2 flex flex-wrap gap-2">
                                    <Button
                                        onClick={() => handleViewPrescription(record)}
                                        variant="secondary"
                                    >
                                        View Prescription
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setEditing(record)
                                            setShowForm(true)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="text-amber-50"
                                        onClick={() => handleDelete(record.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            )}

            <PrescriptionViewer
                open={prescriptionModalOpen}
                onClose={() => setPrescriptionModalOpen(false)}
                prescriptions={selectedPrescriptions}
                visitDate={selectedPrescriptions?.length ? selectedPrescriptions[0].visitDate : ''}
                patient={selectedPrescriptions?.length ? selectedPrescriptions[0].patient : {}}
            />


            {showForm && (
                <MedicalRecordForm
                    initialData={editing ?? undefined}
                    onSave={handleSave}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    )
}
