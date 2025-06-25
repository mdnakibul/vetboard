// components/shared/topbar.tsx
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggleButton } from "./shared/ThemeToggleButton"
import { logout } from "@/lib/auth"
import { useNavigate } from "react-router-dom"

export default function Topbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }
    return (
        <header className="h-16 px-6 border-b flex items-center justify-between bg-background shadow-sm">
            <h1 className="text-lg font-semibold text-foreground">
                Welcome to VetBoard
            </h1>

            <div className="flex items-center gap-4">
                <ThemeToggleButton />

                {/* Placeholder for future notification or search */}
                {/* <BellIcon className="w-5 h-5 text-muted-foreground" /> */}

                <Separator orientation="vertical" className="h-6" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-10 w-10 cursor-pointer">
                            <AvatarImage src="" alt="User" />
                            <AvatarFallback>V</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}