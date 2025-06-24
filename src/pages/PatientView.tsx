import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Patient } from "@/types/patient"
import { FiArrowLeft } from "react-icons/fi"
import { getStoredPatientById } from "../lib/storage"

export default function PatientView() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [patient, setPatient] = useState<Patient | null>(null)

    useEffect(() => {
        const found = getStoredPatientById(id)
        setPatient(found || null)
    }, [id])

    if (!patient) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Patient not found</h2>
                <Button variant="outline" onClick={() => navigate("/patients")}>
                    ← Back to Patients
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Patient: {patient.name}</h2>
                <Button variant="outline" onClick={() => navigate("/patients")}>
                    <FiArrowLeft className="w-4 h-4" />
                </Button>
            </div>

            {/* Patient Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Info</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><strong>Species:</strong> {patient.species}</p>
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Owner:</strong> {patient.ownerName}</p>
                    <p><strong>Contact:</strong> {patient.contact}</p>
                </CardContent>
            </Card>

            {/* Medical History */}
            <Card>
                <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                    {patient.medicalHistory?.length ? (
                        patient.medicalHistory.map((record) => (
                            <div key={record.id} className="mb-4 border-b pb-2">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium">{record.date}</span>
                                    {record.vet && <Badge variant="outline">{record.vet}</Badge>}
                                </div>
                                <p className="text-sm text-muted-foreground">{record.description}</p>
                                {record.diagnosis && <p className="text-sm">🩺 Diagnosis: {record.diagnosis}</p>}
                                {record.treatment && <p className="text-sm">💊 Treatment: {record.treatment}</p>}
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No medical records yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}