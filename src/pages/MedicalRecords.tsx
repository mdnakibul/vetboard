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
import { getStoredRecords } from "@/lib/medical-records.ts"

export default function MedicalRecords() {
    const [records, setRecords] = useState<MedicalRecord[]>([])

    useEffect(() => {
        setRecords(getStoredRecords())
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Medical Records</h2>
                <Button>Add Record</Button>
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
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
