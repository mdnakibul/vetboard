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
import { Badge } from "@/components/ui/badge"

export default function Appointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([
        {
            id: "1",
            patientName: "Bella",
            date: "2025-06-19",
            reason: "Vaccination",
            status: "Completed",
        },
        {
            id: "2",
            patientName: "Max",
            date: "2025-06-21",
            reason: "Check-up",
            status: "Pending",
        },
    ])

    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState<Appointment | null>(null)

    const handleSave = (data: Omit<Appointment, "id">, id?: string) => {
        if (id) {
            setAppointments((prev) =>
                prev.map((a) => (a.id === id ? { ...a, ...data } : a))
            )
        } else {
            setAppointments((prev) => [
                ...prev,
                { id: crypto.randomUUID(), ...data },
            ])
        }
    }

    const handleEdit = (appt: Appointment) => {
        setEditing(appt)
        setShowForm(true)
    }

    const handleDelete = (id: string) => {
        if (confirm("Are you sure?")) {
            setAppointments((prev) => prev.filter((a) => a.id !== id))
        }
    }

    const renderStatusBadge = (status: Appointment["status"]) => {
        switch (status) {
            case "Completed":
                return <Badge className="bg-green-100 text-green-700" variant="outline">Completed</Badge>
            case "Pending":
                return <Badge className="bg-yellow-100 text-yellow-700" variant="outline">Pending</Badge>
            case "Canceled":
                return <Badge className="bg-red-100 text-red-700" variant="outline">Canceled</Badge>
            default:
                return null
        }
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
                                    <TableCell>{a.patientName}</TableCell>
                                    <TableCell>{a.date}</TableCell>
                                    <TableCell>{a.reason}</TableCell>
                                    <TableCell>{renderStatusBadge(a.status)}</TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() => handleEdit(a)}
                                            className="text-blue-600 hover:underline text-xs mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(a.id)}
                                            className="text-red-600 hover:underline text-xs"
                                        >
                                            Delete
                                        </button>
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
