export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <h2 className="text-sm font-medium text-gray-500">Total Patients</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">125</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <h2 className="text-sm font-medium text-gray-500">Active Cases</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">32</p>
                </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Appointments</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="px-4 py-2">Patient</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Reason</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            <tr className="border-t">
                                <td className="px-4 py-2">Bella</td>
                                <td className="px-4 py-2">2025-06-20</td>
                                <td className="px-4 py-2">Vaccination</td>
                                <td className="px-4 py-2">Completed</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-4 py-2">Max</td>
                                <td className="px-4 py-2">2025-06-19</td>
                                <td className="px-4 py-2">Checkup</td>
                                <td className="px-4 py-2">Pending</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
