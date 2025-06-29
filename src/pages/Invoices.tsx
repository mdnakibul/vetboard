import { useEffect, useState } from "react"
import { getStoredInvoices, deleteInvoice } from "@/lib/invoice-storage"
import { getStoredPatients } from "@/lib/storage"
import type { Invoice } from "@/types/invoice"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [patientMap, setPatientMap] = useState<Record<string, string>>({})

    useEffect(() => {
        const patients = getStoredPatients()
        const map: Record<string, string> = {}
        patients.forEach((p) => (map[p.id] = p.name))
        setPatientMap(map)
        setInvoices(getStoredInvoices())
    }, [])

    const handleDelete = (id: string) => {
        if (confirm("Delete this invoice?")) {
            deleteInvoice(id)
            setInvoices(getStoredInvoices())
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Invoices</h2>
                <Button>Add Invoice</Button> {/* Will connect later */}
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
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
                                <TableCell colSpan={5} className="text-center text-gray-400">
                                    No invoices found.
                                </TableCell>
                            </TableRow>
                        )}
                        {invoices.map((inv) => (
                            <TableRow key={inv.id}>
                                <TableCell>{patientMap[inv.patientId] || "Unknown"}</TableCell>
                                <TableCell>{inv.date}</TableCell>
                                <TableCell>৳ {inv.total}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={inv.status === "Paid" ? "default" : "secondary"}
                                        className={
                                            inv.status === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-800"
                                        }
                                    >
                                        {inv.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="link" size="sm" className="text-xs px-0 mr-2">
                                        View
                                    </Button>
                                    <Button variant="link" size="sm" className="text-xs px-0 mr-2">
                                        Edit
                                    </Button>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        className="text-xs text-red-600 px-0"
                                        onClick={() => handleDelete(inv.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
