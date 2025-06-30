// components/InvoicePrint.tsx
import React from "react"
import type { Invoice } from "@/types/invoice"
import type { Patient } from "../types/patient"

interface Props {
    invoice: Invoice,
    patient: Patient
}

export const InvoicePrint = React.forwardRef<HTMLDivElement, Props>(
    ({ invoice, patient }, ref) => {
        return (
            <div ref={ref} className="p-8 text-gray-800 font-sans max-w-[800px] mx-auto bg-white" id="pdf-section">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">VetBoard Clinic</h1>
                        <p className="text-sm text-gray-500">123 Animal St, Dhaka</p>
                        <p className="text-sm text-gray-500">Email: support@vetboard.com</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-lg font-semibold">Invoice</h2>
                        <p className="text-sm">#{invoice.id.slice(0, 8)}</p>
                        <p className="text-sm">Date: {invoice.date}</p>
                    </div>
                </div>

                {/* Patient Info */}
                <div className="mb-6">
                    <h3 className="text-md font-semibold">Patient Information</h3>
                    <p>Name: {patient?.name}</p>
                </div>

                {/* Items Table */}
                <table className="w-full border text-sm mb-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-1 text-left">Description</th>
                            <th className="border px-2 py-1">Quantity</th>
                            <th className="border px-2 py-1">Unit Price</th>
                            <th className="border px-2 py-1">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-2 py-1">{item.description}</td>
                                <td className="border px-2 py-1">{item.quantity}</td>
                                <td className="border px-2 py-1">{item.unitPrice}</td>
                                <td className="border px-2 py-1 text-right">৳{item.quantity * item.unitPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Total */}
                <div className="text-right font-semibold mb-8">
                    Total: ৳{invoice.total}
                </div>

                {/* Footer */}
                <div className="mt-10 text-sm flex justify-between">
                    <div>
                        <p>________________________</p>
                        <p>Signature (Vet)</p>
                    </div>
                    <p className="text-gray-400 text-xs">
                        Powered by VetBoard | vetboard.com
                    </p>
                </div>
            </div>
        )
    }
)
