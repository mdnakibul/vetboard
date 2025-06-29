import { Badge } from "@/components/ui/badge"

export type Status = "Completed" | "Pending" | "Canceled"

interface StatusBadgeProps {
    status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const statusStyles = {
        Completed: "bg-green-100 text-green-700",
        Paid: "bg-green-100 text-green-700",
        Pending: "bg-yellow-100 text-yellow-700",
        Canceled: "bg-red-100 text-red-700",
        Unpaid: "bg-red-100 text-red-700",
    }

    return <Badge className={statusStyles[status]}>{status}</Badge>
}
