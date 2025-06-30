import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import InvoiceForm from "@/components/InvoiceForm"
import type { Invoice } from "@/types/invoice"
import { getStoredInvoices, saveInvoices } from "@/lib/invoice-storage"
import { generateId } from "@/lib/id"
import { StatusBadge } from "@/components/StatusBadge"
import { deleteInvoice } from "@/lib/invoice-storage"

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [showForm, setShowForm] = useState(false)
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)

    useEffect(() => {
        setInvoices(getStoredInvoices())
    }, [])

    const handleSave = (data: Omit<Invoice, "id">, id?: string) => {
        let updatedInvoices: Invoice[] = []

        if (id) {
            updatedInvoices = invoices.map((inv) =>
                inv.id === id ? { ...inv, ...data } : inv
            )
        } else {
            const newInvoice: Invoice = { id: generateId(), ...data }
            updatedInvoices = [...invoices, newInvoice]
        }

        saveInvoices(updatedInvoices)
        setInvoices(getStoredInvoices())
    }

    const handleEdit = (invoice: Invoice) => {
        setEditingInvoice(invoice)
        setShowForm(true)
    }

    const handleDelete = (invoiceId: string) => {
        const isConfirmed = window.confirm('Are you sure to delete this invoice?')
        if (isConfirmed) {
            deleteInvoice(invoiceId)
            setInvoices(getStoredInvoices())
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Invoices</h2>
                <Button
                    onClick={() => {
                        setEditingInvoice(null)
                        setShowForm(true)
                    }}
                >
                    + New Invoice
                </Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                                        No invoices found.
                                    </TableCell>
                                </TableRow>
                            )}
                            {invoices.map((inv) => (
                                <TableRow key={inv.id}>
                                    <TableCell>{inv.patientId}</TableCell>
                                    <TableCell>{inv.date}</TableCell>
                                    <TableCell>৳ {inv.total}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={inv.status} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="secondary" size="sm" onClick={() => handleEdit(inv)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(inv.id)} className="text-white">
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {showForm && (
                <InvoiceForm
                    initialData={editingInvoice ?? undefined}
                    onSave={handleSave}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    )
}
