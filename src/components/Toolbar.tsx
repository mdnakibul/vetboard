export default function Topbar() {
    return (
        <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center gap-4">
                {/* Placeholder for future profile avatar or user settings */}
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    V
                </div>
            </div>
        </header>
    )
}
