import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
    const navigate = useNavigate()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Fake login logic
        navigate("/dashboard")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Vetboard Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input type="email" placeholder="Email" required />
                        <Input type="password" placeholder="Password" required />
                        <Button type="submit" className="w-full">
                            Log In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
