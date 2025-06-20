import { useState, useEffect } from "react"
import type { Appointment } from "../types/appointment"

interface Props {
    initialData?: Appointment
    onSave: (data: Omit<Appointment, "id">, id?: string) => void
    onClose: () => void
}

export default function AppointmentForm({ initialData, onSave, onClose }: Props) {
    const [formData, setFormData] = useState<Omit<Appointment, "id">>({
        patientName: "",
        date: "",
        reason: "",
        status: "Pending",
    })

    useEffect(() => {
        if (initialData) {
            const { ...rest } = initialData
            setFormData(rest)
        }
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.patientName || !formData.date || !formData.reason) {
            alert("All fields are required.")
            return
        }
        onSave(formData, initialData?.id)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                    {initialData ? "Edit Appointment" : "New Appointment"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        placeholder="Patient Name"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Reason"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>

                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
