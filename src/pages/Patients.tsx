import PatientForm from "../components/PatientForm"
import type { Patient } from "../types/patient"
import { useState } from "react"

export default function Patients() {
    const [patients, setPatients] = useState<Patient[]>([
        {
            id: "1",
            name: "Bella",
            species: "Dog",
            age: 4,
            ownerName: "John Doe",
            contact: "01234567890",
        },
        {
            id: "2",
            name: "Max",
            species: "Cat",
            age: 2,
            ownerName: "Jane Smith",
            contact: "09876543210",
        },
    ])

    const [showForm, setShowForm] = useState(false)
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null)

    const handleSave = (data: Omit<Patient, "id">, id?: string) => {
        if (id) {
            setPatients((prev) =>
                prev.map((p) => (p.id === id ? { ...p, ...data } : p))
            )
        } else {
            setPatients((prev) => [
                ...prev,
                { id: crypto.randomUUID(), ...data },
            ])
        }
    }

    const handleEdit = (patient: Patient) => {
        setEditingPatient(patient)
        setShowForm(true)
    }

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this patient?")) {
            setPatients((prev) => prev.filter((p) => p.id !== id))
        }
    }
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Patients</h2>
                <button
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                        setEditingPatient(null)
                        setShowForm(true)
                    }}
                >
                    + Add Patient
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Species</th>
                            <th className="px-4 py-2">Age</th>
                            <th className="px-4 py-2">Owner</th>
                            <th className="px-4 py-2">Contact</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {patients.map((patient) => (
                            <tr key={patient.id} className="border-t">
                                <td className="px-4 py-2">{patient.name}</td>
                                <td className="px-4 py-2">{patient.species}</td>
                                <td className="px-4 py-2">{patient.age}</td>
                                <td className="px-4 py-2">{patient.ownerName}</td>
                                <td className="px-4 py-2">{patient.contact}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(patient)}
                                        className="text-blue-600 hover:underline text-xs mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(patient.id)}
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
                <PatientForm
                    initialData={editingPatient ?? undefined}
                    onSave={handleSave}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    )
}
