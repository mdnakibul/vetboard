import { NavLink } from "react-router-dom"
import { FaPaw, FaUser, FaCalendarAlt, FaCog } from "react-icons/fa"

const navItems = [
    { name: "Dashboard", path: "/", icon: <FaPaw /> },
    { name: "Patients", path: "/patients", icon: <FaUser /> },
    { name: "Appointments", path: "/appointments", icon: <FaCalendarAlt /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
]

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-10">VetBoard</div>
            <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 rounded-md text-sm font-medium ${isActive
                                ? "bg-green-100 text-green-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                        }
                    >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}
