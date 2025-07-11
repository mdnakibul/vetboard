import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Patient } from "@/types/patient"
import { FiArrowLeft } from "react-icons/fi"
import { getAppointmentsByPatientId, getStoredPatientById } from "@/lib/storage"
import type { MedicalRecord } from "@/types/medical-record"
import { getMedicalRecordsByPatientId } from "@/lib/medical-records"
import type { Appointment } from "@/types/appointment"
import { Table, TableCell, TableBody, TableHead, TableRow, TableHeader } from "@/components/ui/table"
import { StatusBadge } from "@/components/StatusBadge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import PrescriptionViewer from "@/components/PrescriptionViewer"

export default function PatientView() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [patient, setPatient] = useState<Patient | null>(null)
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord | null>(null)
    const [appointments, setAppointments] = useState<Appointment | null>(getAppointmentsByPatientId(id))
    const [selectedPrescriptions, setSelectedPrescriptions] = useState<Prescription[]>([])
    const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false)

    const handleViewPrescription = (record: MedicalRecord) => {
        if (!record.prescriptions?.length) return
        setSelectedPrescriptions(record.prescriptions)
        setPrescriptionModalOpen(true)
    }

    useEffect(() => {
        const found = getStoredPatientById(id)
        setPatient(found || null)

        const patientRecords = getMedicalRecordsByPatientId(id)
        setMedicalRecords(patientRecords)

        const patientAppointments = getAppointmentsByPatientId(id)
        setAppointments(patientAppointments)
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



            <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="info">Basic Info</TabsTrigger>
                    <TabsTrigger value="medical">Medical History</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </TabsList>

                <TabsContent value="info">
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
                </TabsContent>
                <TabsContent value="medical">            {/* Medical History */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Medical History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {medicalRecords?.length ? (
                                medicalRecords.map((record) => (
                                    <div key={record.id} className="mb-4 border-b pb-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-medium">{record.visitDate}</span>
                                            {record.vet && <Badge variant="outline">{record.vet || "Dr. Nahid"}</Badge>}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{record.description}</p>
                                        {record.diagnosis && <p className="text-sm">🩺 Diagnosis: {record.diagnosis}</p>}
                                        {record.treatment && <p className="text-sm">💊 Treatment: {record.treatment}</p>}
                                        {/* ✅ View Prescription button if prescriptions exist */}
                                        {record.prescriptions?.length > 0 && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="mt-2"
                                                onClick={() => handleViewPrescription(record)}
                                            >
                                                View Prescription
                                            </Button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground">No medical records yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="appointments">
                    {/* Appoitment History  */}
                    <div className="space-y-2 mt-8">
                        <h3 className="text-lg font-semibold">Appointment History</h3>
                        {appointments.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No appointments found.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Reason</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((appt) => (
                                        <TableRow key={appt.id}>
                                            <TableCell>{appt.date}</TableCell>
                                            <TableCell>{appt.reason}</TableCell>
                                            <TableCell>
                                                <StatusBadge
                                                    status={
                                                        appt.status
                                                    }
                                                >
                                                    {appt.status}
                                                </StatusBadge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </TabsContent>
            </Tabs>


            <PrescriptionViewer
                open={prescriptionModalOpen}
                onClose={() => setPrescriptionModalOpen(false)}
                prescriptions={selectedPrescriptions}
            />


        </div>
    )
}