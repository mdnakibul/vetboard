import { useState } from "react"
import type { Appointment } from "../types/appointment"
import AppointmentForm from "../components/AppointmentForm"
interface Appointment {
    id: string
    patientName: string
    date: string
    reason: string
    status: "Pending" | "Completed" | "Canceled"
}


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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                        setEditing(null)
                        setShowForm(true)
                    }}
                >
                    + New Appointment
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2">Patient</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Reason</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {appointments.map((a) => (
                            <tr key={a.id} className="border-t">
                                <td className="px-4 py-2">{a.patientName}</td>
                                <td className="px-4 py-2">{a.date}</td>
                                <td className="px-4 py-2">{a.reason}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${a.status === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : a.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {a.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
