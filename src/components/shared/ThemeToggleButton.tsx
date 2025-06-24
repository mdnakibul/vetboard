import { FiSun, FiMoon, FiMonitor } from "react-icons/fi"
import { useTheme } from "@/hooks/useTheme"
import { Button } from "@/components/ui/button"

export const ThemeToggleButton = () => {
    const { theme, setTheme } = useTheme()

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
        <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            title={`Switch theme (Current: ${theme})`}
        >
            {getIcon()}
        </Button>
    )
}
