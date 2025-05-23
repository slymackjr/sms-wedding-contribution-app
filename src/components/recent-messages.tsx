import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentMessages() {
  const messages = [
    {
      id: 1,
      recipient: "John Smith",
      phone: "+1234567890",
      template: "August Wedding Reminder",
      status: "Delivered",
      time: "2 hours ago",
      paid: true,
    },
    {
      id: 2,
      recipient: "Sarah Johnson",
      phone: "+1987654321",
      template: "September Wedding Reminder",
      status: "Delivered",
      time: "3 hours ago",
      paid: false,
    },
    {
      id: 3,
      recipient: "Michael Brown",
      phone: "+1122334455",
      template: "August Wedding Reminder",
      status: "Failed",
      time: "5 hours ago",
      paid: false,
    },
    {
      id: 4,
      recipient: "Emily Davis",
      phone: "+1555666777",
      template: "Payment Thank You",
      status: "Delivered",
      time: "Yesterday",
      paid: true,
    },
    {
      id: 5,
      recipient: "David Wilson",
      phone: "+1888999000",
      template: "August Wedding Reminder",
      status: "Scheduled",
      time: "Tomorrow",
      paid: false,
    },
  ]

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${message.recipient.charAt(0)}`} />
              <AvatarFallback>{message.recipient.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{message.recipient}</p>
              <p className="text-sm text-muted-foreground">{message.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground hidden md:block">{message.template}</p>
            <Badge
              variant={
                message.status === "Delivered" ? "default" : message.status === "Failed" ? "destructive" : "outline"
              }
            >
              {message.status}
            </Badge>
            {message.paid && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Paid
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">{message.time}</div>
        </div>
      ))}
    </div>
  )
}

