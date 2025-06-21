import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"

const mockAppointments: Appointment[] = [
    {
        id: "1",
        patientName: "Bella",
        date: "2025-06-20",
        reason: "Vaccination",
        status: "Completed",
    },
    {
        id: "2",
        patientName: "Max",
        date: "2025-06-19",
        reason: "Checkup",
        status: "Pending",
    },
]

function StatusBadge({ status }: { status: Appointment["status"] }) {
    const statusStyles = {
        Completed: "bg-green-100 text-green-700",
        Pending: "bg-yellow-100 text-yellow-700",
        Canceled: "bg-red-100 text-red-700",
    }
    return <Badge className={statusStyles[status]}>{status}</Badge>
}

export default function Dashboard() {
    const [appointments] = useState(mockAppointments)
    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Patients
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-3xl font-bold text-primary mt-2">125</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Cases
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-3xl font-bold text-primary mt-2">32</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Appointments */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg text-foreground">
                        Recent Appointments
                    </CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.map((a) => (
                                <TableRow key={a.id}>
                                    <TableCell>{a.patientName}</TableCell>
                                    <TableCell>{a.date}</TableCell>
                                    <TableCell>{a.reason}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={a.status} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}