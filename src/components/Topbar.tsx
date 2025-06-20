export default function Topbar() {
    return (
        <header className="h-16 flex items-center justify-between px-6 border-b bg-white shadow-sm">
            <div className="text-lg font-semibold text-gray-800">
                Welcome to VetBoard
            </div>
            <div className="flex items-center gap-3">
                {/* Future: Notification icon or search */}
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    V
                </div>
            </div>
        </header>
    )
}
