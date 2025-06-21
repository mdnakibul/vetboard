// components/shared/topbar.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function Topbar() {
    return (
        <header className="h-16 px-6 border-b flex items-center justify-between bg-background shadow-sm">
            <h1 className="text-lg font-semibold text-foreground">
                Welcome to VetBoard
            </h1>

            <div className="flex items-center gap-4">
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