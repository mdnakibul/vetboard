import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-muted-foreground mb-6">
                Sorry, we couldn’t find the page you were looking for.
            </p>
            <Link
                to="/dashboard"
                className="text-primary underline hover:opacity-80"
            >
                ← Back to Dashboard
            </Link>
        </div>
    )
}
