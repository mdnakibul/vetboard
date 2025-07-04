// src/components/MedicalRecordForm.tsx

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { MedicalRecord } from "@/types/medical-record"
import { getStoredPatients } from "../lib/storage"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import { Label } from "./ui/label"
import { generateId } from "../lib/id"

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

    const [patients,] = useState<Patient[]>(() => getStoredPatients())
    // One temporary medicine form before adding to list
    const [medicineInput, setMedicineInput] = useState<Medicine>({
        index: 0,
        medicineId: "",
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        notes: "",
    })

    // Temporarily added medicines for this prescription 
    const [tempMedicines, setTempMedicines] = useState<Medicine[]>([])

    // Prescription metadata: notes, nextReviewDate
    const [prescriptionMeta, setPrescriptionMeta] = useState<{
        notes?: string
        nextReviewDate?: string
    }>({})


    const addMedicineToList = () => {
        if (!medicineInput.medicineName || !medicineInput.dosage) {
            alert("Medicine name and dosage are required")
            return
        }

        const newMed: Medicine = {
            ...medicineInput,
            index: tempMedicines.length + 1,
            medicineId: medicineInput.medicineId || crypto.randomUUID(),
        }

        setTempMedicines((prev) => [...prev, newMed])

        // Reset the input
        setMedicineInput({
            index: 0,
            medicineId: "",
            medicineName: "",
            dosage: "",
            frequency: "",
            duration: "",
            notes: "",
        })
    }

    const removeMedicineFromList = (index: number) => {
        setTempMedicines((prev) => prev.filter((_, i) => i !== index))
    }


    const handleMedicineChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setMedicineInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Final prescription save
    const submitFullPrescription = () => {
        const newPrescription: Prescription = {
            id: generateId(),
            medicines: tempMedicines,
            notes: prescriptionMeta.notes,
            nextReviewDate: prescriptionMeta.nextReviewDate,
        }
        setForm((prev) => ({
            ...prev,
            prescriptions: [...prev.prescriptions, newPrescription],
        }))
        setTempMedicines([])
        setPrescriptionMeta({})
    }


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
                                <h4 className="font-semibold">Prescription</h4>

                                {/* Add Medicines (inside prescription) */}
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        name="medicineName"
                                        placeholder="Medicine"
                                        value={medicineInput.medicineName}
                                        onChange={handleMedicineChange}
                                    />
                                    <Input
                                        name="dosage"
                                        placeholder="Dosage"
                                        value={medicineInput.dosage}
                                        onChange={handleMedicineChange}
                                    />
                                    <Input
                                        name="frequency"
                                        placeholder="Frequency"
                                        value={medicineInput.frequency}
                                        onChange={handleMedicineChange}
                                    />
                                    <Input
                                        name="duration"
                                        placeholder="Duration"
                                        value={medicineInput.duration}
                                        onChange={handleMedicineChange}
                                    />
                                    <Input
                                        name="notes"
                                        placeholder="Notes (optional)"
                                        value={medicineInput.notes}
                                        onChange={handleMedicineChange}
                                        className="col-span-2"
                                    />
                                    <Button type="button" variant="outline" onClick={addMedicineToList}>
                                        + Add Medicine
                                    </Button>
                                </div>

                                {/* Medicine List (before submitting prescription) */}
                                {tempMedicines.length > 0 && (
                                    <div className="space-y-2 mt-2">
                                        {tempMedicines.map((med, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between items-center border rounded p-2 text-sm"
                                            >
                                                <div>
                                                    <strong>{med.medicineName}</strong> – {med.dosage}, {med.frequency},{" "}
                                                    {med.duration}
                                                    {med.notes && (
                                                        <div className="text-xs text-muted-foreground">{med.notes}</div>
                                                    )}
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => removeMedicineFromList(i)}
                                                >
                                                    🗑
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Prescription-level fields */}
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <Label>Next Review Date</Label>
                                    <Input
                                        type="date"
                                        name="nextReviewDate"
                                        value={prescriptionMeta.nextReviewDate || ""}
                                        onChange={(e) =>
                                            setPrescriptionMeta((prev) => ({
                                                ...prev,
                                                nextReviewDate: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        name="notes"
                                        placeholder="Prescription Notes (optional)"
                                        className="col-span-2"
                                        value={prescriptionMeta.notes}
                                        onChange={(e) =>
                                            setPrescriptionMeta((prev) => ({ ...prev, notes: e.target.value }))
                                        }
                                    />
                                </div>

                                {/* Submit Prescription (with all medicines) */}
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="mt-2"
                                    onClick={submitFullPrescription}
                                    disabled={tempMedicines.length === 0}
                                >
                                    + Add Prescription
                                </Button>

                                {/* Existing Prescriptions Display */}
                                {form.prescriptions.length > 0 && (
                                    <div className="space-y-4 mt-4">
                                        {form.prescriptions.map((rx) => (
                                            <div
                                                key={rx.id}
                                                className="border rounded p-3 text-sm bg-muted/30 relative"
                                            >
                                                <div className="mb-1 font-medium">
                                                    🧾 Prescription ({rx.medicines.length} items)
                                                </div>
                                                {rx.medicines.map((med, i) => (
                                                    <div key={i} className="text-sm mb-1">
                                                        • <strong>{med.medicineName}</strong> – {med.dosage},{" "}
                                                        {med.frequency}, {med.duration}
                                                        {med.notes && (
                                                            <div className="text-xs text-muted-foreground">
                                                                {med.notes}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                {rx.notes && (
                                                    <p className="text-xs mt-1 text-muted-foreground">
                                                        📝 Notes: {rx.notes}
                                                    </p>
                                                )}
                                                {rx.nextReviewDate && (
                                                    <p className="text-xs mt-1 text-muted-foreground">
                                                        📅 Next Review: {rx.nextReviewDate}
                                                    </p>
                                                )}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    className="absolute top-2 right-2"
                                                    onClick={() => removePrescription(rx.id)}
                                                >
                                                    🗑
                                                </Button>
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
