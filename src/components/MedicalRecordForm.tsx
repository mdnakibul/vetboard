// src/components/MedicalRecordForm.tsx

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { MedicalRecord } from "@/types/medical-record"
import { getStoredPatients } from "../lib/storage"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"

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
        prescriptions: []
    })
    const [prescriptionInput, setPrescriptionInput] = useState<Prescription>({
        id: crypto.randomUUID(),
        medicine: "",
        dosage: "",
        frequency: "",
        duration: "",
        notes: "",
    });
    const [patients,] = useState<Patient[]>(() => getStoredPatients())

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

    const handlePrescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPrescriptionInput((prev) => ({ ...prev, [name]: value }));
    };

    const addPrescription = () => {
        if (!prescriptionInput.medicine || !prescriptionInput.dosage) return;

        setForm((prev) => ({
            ...prev,
            prescriptions: [...prev.prescriptions, { ...prescriptionInput, id: crypto.randomUUID() }],
        }));

        setPrescriptionInput({
            id: crypto.randomUUID(),
            medicine: "",
            dosage: "",
            frequency: "",
            duration: "",
            notes: "",
        });
    };

    const removePrescription = (id: string) => {
        setForm((prev) => ({
            ...prev,
            prescriptions: prev.prescriptions.filter((p) => p.id !== id),
        }));
    };

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
            <DialogContent className="sm:max-w-md p-0 max-h-[90vh]">
                <div className="flex flex-col h-[90vh]">

                    {/* Header  */}
                    <div className="p-6 border-b">
                        <DialogHeader>
                            <DialogTitle>{initialData ? "Edit" : "Add"} Medical Record</DialogTitle>
                        </DialogHeader>
                    </div>

                    {/* Scrollable Form Body */}
                    <div className="flex-1 overflow-y-auto px-6 pb-6 pt-3 space-y-3">
                        <form onSubmit={handleSubmit} className="space-y-3" id="medical-record-form">
                            <Select value={form.patientId} onValueChange={(value) => setForm({ ...form, patientId: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    {patients.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.name} ({p.ownerName})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

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
                            {/* 🧪 Prescription Section */}
                            <div className="space-y-2 border-t pt-3 mt-4">
                                <h4 className="font-semibold">Prescriptions</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <Input name="medicine" placeholder="Medicine" value={prescriptionInput.medicine} onChange={handlePrescriptionChange} />
                                    <Input name="dosage" placeholder="Dosage" value={prescriptionInput.dosage} onChange={handlePrescriptionChange} />
                                    <Input name="frequency" placeholder="Frequency" value={prescriptionInput.frequency} onChange={handlePrescriptionChange} />
                                    <Input name="duration" placeholder="Duration" value={prescriptionInput.duration} onChange={handlePrescriptionChange} />
                                    <Input name="notes" placeholder="Notes (optional)" value={prescriptionInput.notes} onChange={handlePrescriptionChange} className="col-span-2" />
                                </div>
                                <Button type="button" variant="secondary" onClick={addPrescription}>+ Add Prescription</Button>

                                {/* 🧾 Show List */}
                                {form.prescriptions.length > 0 && (
                                    <div className="space-y-2 mt-2">
                                        {form.prescriptions.map((rx) => (
                                            <div key={rx.id} className="flex justify-between items-center border rounded p-2 text-sm">
                                                <div>
                                                    <div><strong>{rx.medicine}</strong> – {rx.dosage}, {rx.frequency}, {rx.duration}</div>
                                                    {rx.notes && <div className="text-xs text-muted-foreground">{rx.notes}</div>}
                                                </div>
                                                <Button type="button" variant="ghost" onClick={() => removePrescription(rx.id)}>🗑</Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Sticky Footer */}
                    <div className="border-t px-6 py-4 bg-background">
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit" form="medical-record-form">Save</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
