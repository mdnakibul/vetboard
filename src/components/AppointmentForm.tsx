import { useState, useEffect } from "react"
import type { Appointment } from "../types/appointment"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleStatusChange = (value: Appointment["status"]) => {
        setFormData((prev) => ({ ...prev, status: value }))
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
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Edit Appointment" : "New Appointment"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        placeholder="Patient Name"
                        required
                    />
                    <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Reason"
                        required
                    />
                    <Select value={formData.status} onValueChange={handleStatusChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Canceled">Canceled</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
