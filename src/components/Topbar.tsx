// components/shared/topbar.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/hooks/useTheme"

export default function Topbar() {
    const { resolvedTheme, setTheme, theme } = useTheme()
    const cycleTheme = () => {
        const next = {
            light: "dark",
            dark: "system",
            system: "light",
        } as const

        setTheme(next[theme])
    }

    const getIcon = () => {
        switch (theme) {
            case "light":
                return <FiSun size={18} />
            case "dark":
                return <FiMoon size={18} />
            case "system":
            default:
                return <FiMonitor size={18} />
        }
    }
    return (
        <header className="h-16 px-6 border-b flex items-center justify-between bg-background shadow-sm">
            <h1 className="text-lg font-semibold text-foreground">
                Welcome to VetBoard
            </h1>

            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={cycleTheme}
                    title={`Switch theme (Current: ${theme})`}
                >
                    {getIcon()}
                </Button>

                <span className="text-sm text-muted-foreground">
                    Active Theme: <span className="capitalize">{resolvedTheme}</span>
                </span>
                {/* Placeholder for future notification or search */}
                {/* <BellIcon className="w-5 h-5 text-muted-foreground" /> */}

                <Separator orientation="vertical" className="h-6" />

                <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback>V</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}