import { useState } from "react"
import type { Appointment } from "../types/appointment"
import AppointmentForm from "../components/AppointmentForm"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { StatusBadge } from "../components/StatusBadge"
import { getStoredAppointments, getStoredPatients, saveAppointments } from "../lib/storage"
import { generateId } from "../lib/id"
import type { Patient } from "../types/patient"

export default function Appointments() {
    const [appointments, setAppointments] = useState<Appointment[]>(getStoredAppointments())

    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState<Appointment | null>(null)
    const [patients,] = useState<Patient[]>(getStoredPatients())

    const handleSave = (data: Omit<Appointment, "id">, id?: string) => {
        let updatedAppointments: Appointment[] = []

        if (id) {
            // Edit existing appointment
            updatedAppointments = appointments.map((a) =>
                a.id === id ? { ...a, ...data } : a
            )
            saveAppointments(updatedAppointments)
        } else {
            // Add new appointment
            const newAppointment: Appointment = {
                id: generateId(),
                ...data,
            }
            updatedAppointments = [...appointments, newAppointment]
            saveAppointments(updatedAppointments)
        }
        setAppointments(getStoredAppointments())

    }


    const handleEdit = (appt: Appointment) => {
        setEditing(appt)
        setShowForm(true)
    }

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this appointment?")) return

        const updatedAppointments = appointments.filter((a) => a.id !== id)
        saveAppointments(updatedAppointments)
        setAppointments(getStoredAppointments())
    }

    const getPatientName = (id: string) => {
        const p = patients.find(p => p.id === id)
        return p ? p.name : "Unknown"
    }


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">Appointments</h2>
                <Button onClick={() => {
                    setEditing(null)
                    setShowForm(true)
                }}>
                    + New Appointment
                </Button>
            </div>

            {/* Appointment Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Upcoming & Recent Appointments</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.map((a) => (
                                <TableRow key={a.id}>
                                    <TableCell>{getPatientName(a.patientId)}</TableCell>
                                    <TableCell>{a.date}</TableCell>
                                    <TableCell>{a.reason}</TableCell>
                                    <TableCell><StatusBadge status={a.status} /></TableCell>

                                    <TableCell className="flex space-x-2">
                                        <Button
                                            variant="secondary" size="icon" className="size-8"
                                            onClick={() => handleEdit(a)}
                                            aria-label={`Edit appointment for ${a.patientName}`}
                                        >
                                            <Pencil1Icon className="w-4 h-4 mr-1" />
                                        </Button>
                                        <Button
                                            variant="destructive" size="icon"
                                            onClick={() => handleDelete(a.id)}
                                            aria-label={`Delete appointment for ${a.patientName}`}
                                            className="text-white size-8"
                                        >
                                            <TrashIcon />
                                        </Button>
                                    </TableCell>


                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {showForm && (
                <AppointmentForm
                    initialData={editing ?? undefined}
                    onSave={handleSave}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    )
}
