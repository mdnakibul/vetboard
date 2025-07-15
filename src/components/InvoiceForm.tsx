import { useEffect, useState } from "react"
import type { Invoice } from "@/types/invoice"
import { getStoredPatients } from "@/lib/storage"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogDescription } from "./ui/dialog"
import type { InvoiceItem } from "../types/invoice"
import type { Patient } from "../types/patient"

interface Props {
    initialData?: Invoice
    onSave: (data: Omit<Invoice, "id">, id?: string) => void
    onClose: () => void
}

export default function InvoiceForm({ initialData, onSave, onClose }: Props) {
    const [formData, setFormData] = useState<Omit<Invoice, "id">>({
        patientId: "",
        date: "",
        items: [{ description: "", quantity: 1, unitPrice: 0 }],
        total: 0,
        status: "Unpaid",
    })

    const [patients, setPatients] = useState<{ id: string; name: string }[]>([])

    useEffect(() => {
        setPatients(getStoredPatients())
        if (initialData) {
            const { ...rest } = initialData
            setFormData(rest)
        }
    }, [initialData])

    const updateTotal = (items = formData.items) => {
        const total = items.reduce(
            (sum, item) => sum + item.quantity * item.unitPrice,
            0
        )
        setFormData((prev) => ({ ...prev, total }))
    }

    const handleItemChange = (index: number, field: string, value: string | number) => {
        const updatedItems = [...formData.items]
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: field === "description" ? value : Number(value),
        }
        setFormData((prev) => ({ ...prev, items: updatedItems }))
        updateTotal(updatedItems)
    }

    const addItem = () => {
        const updatedItems = [...formData.items, { description: "", quantity: 1, unitPrice: 0 }]
        setFormData((prev) => ({ ...prev, items: updatedItems }))
    }

    const removeItem = (index: number) => {
        const updatedItems = formData.items.filter((_: InvoiceItem, i: number) => i !== index)
        setFormData((prev) => ({ ...prev, items: updatedItems }))
        updateTotal(updatedItems)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.patientId || !formData.date || formData.items.length === 0) {
            alert("Please fill all required fields.")
            return
        }
        onSave(formData, initialData?.id)
        onClose()
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogDescription className="sr-only">
                    This dialog displays a form to generate invoice.
                </DialogDescription>

                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Invoice" : "New Invoice"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Patient</Label>
                            <Select
                                value={formData.patientId}
                                onValueChange={(val: string) =>
                                    setFormData((prev) => ({ ...prev, patientId: val }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    {patients.map((p: Patient) => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Date</Label>
                            <Input
                                type="date"
                                value={formData.date}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label>Items</Label>
                        {formData.items.map((item: InvoiceItem, index: number) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                                <Input
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(index, "description", e.target.value)}
                                    required
                                />
                                <Input
                                    type="number"
                                    placeholder="Quantity"
                                    value={item.quantity}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(index, "quantity", Number(e.target.value))}
                                    required
                                />
                                <Input
                                    type="number"
                                    placeholder="Unit Price"
                                    value={item.unitPrice}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(index, "unitPrice", Number(e.target.value))}
                                    required
                                />
                                <Button type="button" variant="ghost" onClick={() => removeItem(index)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={addItem} variant="outline">
                            + Add Item
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        <div>
                            <Label>Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(val: Invoice["status"]) =>
                                    setFormData((prev) => ({ ...prev, status: val as Invoice["status"] }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                                    <SelectItem value="Paid">Paid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Total</Label>
                            <Input type="text" value={`৳ ${formData.total}`} disabled />
                        </div>
                    </div>

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
