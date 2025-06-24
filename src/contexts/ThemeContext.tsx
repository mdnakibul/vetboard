import { useEffect, useState } from "react"
import { ThemeContext } from "@/contexts/theme-context-value"
import type { Theme } from "./theme-context-value"

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() =>
        localStorage.getItem("theme") === "dark" ? "dark" : "light"
    )

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove(theme === "dark" ? "light" : "dark")
        root.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () =>
        setTheme(prev => (prev === "light" ? "dark" : "light"))

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
