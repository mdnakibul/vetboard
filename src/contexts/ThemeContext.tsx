import { useEffect, useState } from "react"
import { ThemeContext } from "@/contexts/theme-context-value"
import type { Theme } from "./theme-context-value"

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

    const [theme, setTheme] = useState<Theme>(() =>
        (localStorage.getItem("theme") as Theme) || "system"
    )
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(getSystemTheme())

    useEffect(() => {
        const root = window.document.documentElement

        const applyTheme = () => {
            const system = getSystemTheme()
            const finalTheme = theme === "system" ? system : theme
            setResolvedTheme(finalTheme)

            root.classList.remove("light", "dark")
            root.classList.add(finalTheme)
        }

        applyTheme()

        // Watch system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const listener = () => {
            if (theme === "system") applyTheme()
        }

        mediaQuery.addEventListener("change", listener)
        return () => mediaQuery.removeEventListener("change", listener)
    }, [theme])

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () =>
        setTheme(prev => (prev === "light" ? "dark" : "light"))

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
