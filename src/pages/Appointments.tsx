interface Appointment {
    id: string
    patientName: string
    date: string
    reason: string
    status: "Pending" | "Completed" | "Canceled"
}

const mockAppointments: Appointment[] = [
    {
        id: "1",
        patientName: "Bella",
        date: "2025-06-19",
        reason: "Vaccination",
        status: "Completed",
    },
    {
        id: "2",
        patientName: "Max",
        date: "2025-06-21",
        reason: "Check-up",
        status: "Pending",
    },
]

export default function Appointments() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                    + New Appointment
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2">Patient</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Reason</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {mockAppointments.map((appt) => (
                            <tr key={appt.id} className="border-t">
                                <td className="px-4 py-2">{appt.patientName}</td>
                                <td className="px-4 py-2">{appt.date}</td>
                                <td className="px-4 py-2">{appt.reason}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${appt.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : appt.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {appt.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <button className="text-blue-600 hover:underline text-xs mr-2">
                                        Edit
                                    </button>
                                    <button className="text-red-600 hover:underline text-xs">
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
