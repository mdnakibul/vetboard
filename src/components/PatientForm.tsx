import { useState, useEffect } from "react"
import type { Patient } from "../types/patient"

interface Props {
    initialData?: Patient
    onSave: (data: Omit<Patient, "id">, id?: string) => void
    onClose: () => void
}

export default function PatientForm({ initialData, onSave, onClose }: Props) {
    const [formData, setFormData] = useState<Omit<Patient, "id">>({
        name: "",
        species: "",
        age: 0,
        ownerName: "",
        contact: "",
    })

    useEffect(() => {
        if (initialData) {
            const { ...rest } = initialData
            setFormData(rest)
        }
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "age" ? Number(value) : value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData, initialData?.id)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                    {initialData ? "Edit Patient" : "Add Patient"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {(["name", "species", "ownerName", "contact"] as (keyof Omit<Patient, "id" | "age">)[]).map((field) => (
                        <input
                            key={field}
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            placeholder={field[0].toUpperCase() + field.slice(1)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    ))}
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded border text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-green-600 text-white"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
