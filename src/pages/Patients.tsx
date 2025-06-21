import { useState } from "react"
import PatientForm from "../components/PatientForm"
import type { Patient } from "../types/patient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    const [searchTerm, setSearchTerm] = useState("")

    const filteredPatients = patients.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">Patients</h2>
                <Button onClick={() => {
                    setEditingPatient(null)
                    setShowForm(true)
                }}>
                    + Add Patient
                </Button>
            </div>

            {/* Patient Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Patient Records</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Search by name or owner..."
                        className="max-w-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Species</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPatients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground py-4">
                                        No matching patients found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPatients.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell>{patient.name}</TableCell>
                                        <TableCell>{patient.species}</TableCell>
                                        <TableCell>{patient.age}</TableCell>
                                        <TableCell>{patient.ownerName}</TableCell>
                                        <TableCell>{patient.contact}</TableCell>
                                        <TableCell className="flex space-x-2">
                                            <Button
                                                onClick={() => handleEdit(patient)}
                                                className="size-8"
                                                variant="secondary" size="icon"
                                            >
                                                <Pencil1Icon className="w-4 h-4 mr-1" />
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(patient.id)}
                                                variant="destructive" size="icon" className="size-8 text-white"
                                            >
                                                <TrashIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

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