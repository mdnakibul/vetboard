import { useContext } from "react";
import { ThemeContext } from "../contexts/theme-context-value";

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
