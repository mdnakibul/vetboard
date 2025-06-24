import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import "react-big-calendar/lib/css/react-big-calendar.css"
import enUS from "date-fns/locale/en-US"

const locales = {
    "en-US": enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: "Checkup - Bella (Dog)",
        start: new Date(2025, 5, 24, 10, 0), // June is month 5 (0-indexed)
        end: new Date(2025, 5, 24, 11, 0),
    },
    {
        title: "Vaccination - Milo (Cat)",
        start: new Date(2025, 5, 25, 14, 30),
        end: new Date(2025, 5, 25, 15, 0),
    },
]

export const AppointmentCalendar = () => {
    return (
        <div className="p-4 bg-white dark:bg-slate-900 rounded-md shadow">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
            />
        </div>
    )
}
