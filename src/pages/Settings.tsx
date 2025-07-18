import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "@/hooks/useTheme"
import type { ControllerRenderProps } from "react-hook-form";
import type { Theme } from "../contexts/theme-context-value"

const formSchema = z.object({
    clinicName: z.string().min(1),
    address: z.string().optional(),
    contact: z.string().optional(),
    userName: z.string().min(1),
    email: z.string().email(),
    appointmentDuration: z.enum(["15", "30", "60"]),
    timeFormat: z.enum(["12", "24"]),
    darkMode: z.boolean(),
})
type FormValues = z.infer<typeof formSchema>

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clinicName: "Happy Pets Clinic",
            address: "123 Main Street",
            contact: "01700000000",
            userName: "Dr. Nahid",
            email: "nahid@vetboard.com",
            appointmentDuration: "30",
            timeFormat: "24",
            darkMode: true,
        },
    })

    const onSubmit = (data: FormValues) => {
        console.log("Settings Saved", data)
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <Tabs defaultValue="clinic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="clinic">Clinic Info</TabsTrigger>
                    <TabsTrigger value="user">User Profile</TabsTrigger>
                    <TabsTrigger value="preferences">Appointment Prefs</TabsTrigger>
                </TabsList>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">

                        <TabsContent value="clinic">
                            <FormField
                                control={form.control}
                                name="clinicName"
                                render={({ field }: {
                                    field: ControllerRenderProps<string>; // specify generics as needed
                                }) => (
                                    <FormItem>
                                        <FormLabel>Clinic Name</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }: {
                                    field: ControllerRenderProps<string>; // specify generics as needed
                                }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="contact"
                                render={({ field }: {
                                    field: ControllerRenderProps<string>; // specify generics as needed
                                }) => (
                                    <FormItem>
                                        <FormLabel>Contact</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                    </FormItem>
                                )}
                            />
                        </TabsContent>

                        <TabsContent value="user">
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }: {
                                    field: ControllerRenderProps<string>; // specify generics as needed
                                }) => (
                                    <FormItem>
                                        <FormLabel>Your Name</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }: {
                                    field: ControllerRenderProps<string>; // specify generics as needed
                                }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormItem>
                                <FormLabel>Theme Preference</FormLabel>
                                <Select value={theme} onValueChange={(val) => setTheme(val as Theme)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="system">System Default</SelectItem>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>

                        </TabsContent>

                        <TabsContent value="preferences">
                            <FormField
                                control={form.control}
                                name="timeFormat"
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<string>; // specify generics as needed
                                }) => (
                                    <FormItem>
                                        <FormLabel>Time Format</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select format" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="12">12-Hour</SelectItem>
                                                <SelectItem value="24">24-Hour</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="timeFormat"
                                render={({ field }: {
                                    field: ControllerRenderProps<string>; // specify generics as needed
                                }) => (
                                    <FormItem>
                                        <FormLabel>Time Format</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select format" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="12">12-Hour</SelectItem>
                                                <SelectItem value="24">24-Hour</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </TabsContent>

                        <div className="pt-4">
                            <Button type="submit">Save Settings</Button>
                        </div>
                    </form>
                </Form>
            </Tabs>
        </div>
    )
}
