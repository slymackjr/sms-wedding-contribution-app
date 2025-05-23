import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "James & Mary Wedding",
      date: "August 15, 2024",
      reminderCount: 45,
      reminderDate: "August 1, 2024",
    },
    {
      id: 2,
      title: "Robert & Jennifer Wedding",
      date: "September 22, 2024",
      reminderCount: 32,
      reminderDate: "September 8, 2024",
    },
  ]

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{event.title}</h3>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Upcoming
            </Badge>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Event: {event.date}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>Reminder scheduled: {event.reminderDate}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">{event.reminderCount}</span> reminders to be sent
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

