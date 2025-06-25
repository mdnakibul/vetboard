import { isLoggedIn } from "@/lib/auth"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    return isLoggedIn() ? <>{children}</> : <Navigate to="/login" replace />
}
