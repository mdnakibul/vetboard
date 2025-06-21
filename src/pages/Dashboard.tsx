import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function Dashboard() {
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
                            <TableRow>
                                <TableCell>Bella</TableCell>
                                <TableCell>2025-06-20</TableCell>
                                <TableCell>Vaccination</TableCell>
                                <TableCell>Completed</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Max</TableCell>
                                <TableCell>2025-06-19</TableCell>
                                <TableCell>Checkup</TableCell>
                                <TableCell>Pending</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}