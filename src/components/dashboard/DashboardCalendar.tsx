import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState } from "react"
import { format as formatDate, isSameDay } from "date-fns"
import { Link } from "react-router-dom"

const locales = {
    "en-US": enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

// Sample event data
const events = [
    {
        id: 1,
        title: "Bella - Checkup",
        start: new Date(2025, 5, 24, 10, 0),
        end: new Date(2025, 5, 24, 11, 0),
    },
    {
        id: 2,
        title: "Milo - Vaccination",
        start: new Date(2025, 5, 25, 14, 30),
        end: new Date(2025, 5, 25, 15, 0),
    },
]

export const DashboardCalendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const handleSelectSlot = ({ start }: { start: Date }) => {
        setSelectedDate(start)
    }

    const appointmentsForSelectedDate = events.filter((event) =>
        selectedDate ? isSameDay(event.start, selectedDate) : false
    )

    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow space-y-4">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                views={["week"]}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={(event) => setSelectedDate(event.start)}
                style={{ height: 500 }}
            />

            {selectedDate && (
                <div className="mt-4 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2">
                        Appointments on {formatDate(selectedDate, "MMMM d, yyyy")}
                    </h3>
                    {appointmentsForSelectedDate.length > 0 ? (
                        <ul className="space-y-1">
                            {appointmentsForSelectedDate.map((event) => (
                                <li
                                    key={event.id}
                                    className="text-sm text-muted-foreground flex items-center gap-2"
                                >
                                    🐾 {event.title} ({formatDate(event.start, "hh:mm a")})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">No appointments.</p>
                    )}
                </div>
            )}

            <div className="pt-2">
                <Link
                    to="/appointments"
                    className="text-sm text-primary hover:underline inline-block"
                >
                    View full calendar →
                </Link>
            </div>
        </div>
    )
}
