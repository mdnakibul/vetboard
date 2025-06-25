// src/components/MedicalRecordForm.tsx

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { MedicalRecord } from "@/types/medical-record"

interface Props {
    initialData?: MedicalRecord
    onSave: (data: Omit<MedicalRecord, "id">, id?: string) => void
    onClose: () => void
}

export default function MedicalRecordForm({ initialData, onSave, onClose }: Props) {
    const [form, setForm] = useState<Omit<MedicalRecord, "id">>({
        patientId: "",
        visitDate: "",
        symptoms: "",
        diagnosis: "",
        treatment: "",
        notes: "",
    })

    useEffect(() => {
        if (initialData) {
            const { ...rest } = initialData
            setForm(rest)
        }
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.patientId || !form.diagnosis || !form.visitDate) {
            alert("Patient ID, Visit Date and Diagnosis are required")
            return
        }
        onSave(form, initialData?.id)
        onClose()
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit" : "Add"} Medical Record</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <Input name="patientId" value={form.patientId} onChange={handleChange} placeholder="Patient ID" required />
                    <Input name="visitDate" type="date" value={form.visitDate} onChange={handleChange} required />
                    <Input name="symptoms" value={form.symptoms} onChange={handleChange} placeholder="Symptoms" />
                    <Input name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="Diagnosis" required />
                    <Input name="treatment" value={form.treatment} onChange={handleChange} placeholder="Treatment" />
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Notes"
                        className="w-full border rounded p-2 text-sm"
                    />
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
