import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"

export default function Settings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This page will let you update clinic info later.
                </p>
            </CardContent>
        </Card>
    )
}
