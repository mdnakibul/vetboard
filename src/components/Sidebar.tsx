import { NavLink } from "react-router-dom"
import { FaPaw, FaUser, FaCalendarAlt, FaCog } from "react-icons/fa"
import { Stethoscope } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button-variants"
import { FaFileInvoiceDollar } from "react-icons/fa"

const navItems = [
    { name: "Dashboard", path: "/", icon: <FaPaw /> },
    { name: "Patients", path: "/patients", icon: <FaUser /> },
    { name: "Medical Record", path: "/medical-records", icon: <Stethoscope /> },
    { name: "Appointments", path: "/appointments", icon: <FaCalendarAlt /> },
    { name: "Invoices", path: "/invoices", icon: <FaFileInvoiceDollar /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
]

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-background border-r p-4 shadow-sm flex flex-col">
            {/* Logo */}
            <div className="mb-6">
                <img
                    src="/src/assets/vetboard_logo.png"
                    alt="VetBoard Logo"
                    className="w-full h-28 object-cover rounded-md"
                />
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            cn(
                                buttonVariants({ variant: "ghost", size: "sm" }),
                                "justify-start",
                                isActive
                                    ? "bg-muted text-primary"
                                    : "text-muted-foreground hover:bg-accent"
                            )
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