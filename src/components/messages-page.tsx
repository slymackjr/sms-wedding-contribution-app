"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { CalendarIcon, Check, Clock, Filter, Plus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export function MessagesPage() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Message Scheduling</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule New
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="create">Create Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ScheduledMessageCard
                title="August Wedding Reminder"
                date="August 1, 2024"
                time="10:00 AM"
                recipients={45}
                template="August Wedding Reminder"
                status="Scheduled"
              />
              <ScheduledMessageCard
                title="Payment Reminder - August Wedding"
                date="July 25, 2024"
                time="9:00 AM"
                recipients={32}
                template="Payment Reminder"
                status="Scheduled"
              />
              <ScheduledMessageCard
                title="September Wedding Reminder"
                date="September 8, 2024"
                time="10:00 AM"
                recipients={38}
                template="September Wedding Reminder"
                status="Scheduled"
              />
              <ScheduledMessageCard
                title="Final Reminder - August Wedding"
                date="August 10, 2024"
                time="9:00 AM"
                recipients={28}
                template="Final Reminder"
                status="Scheduled"
              />
            </div>
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ScheduledMessageCard
                title="Initial Invitation - August Wedding"
                date="June 15, 2024"
                time="10:00 AM"
                recipients={50}
                template="Wedding Invitation"
                status="Sent"
                deliveryRate={98}
              />
              <ScheduledMessageCard
                title="Initial Invitation - September Wedding"
                date="July 1, 2024"
                time="9:00 AM"
                recipients={45}
                template="Wedding Invitation"
                status="Sent"
                deliveryRate={96}
              />
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Schedule</CardTitle>
                <CardDescription>Schedule SMS messages to be sent at a specific date and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-name">Schedule Name</Label>
                    <Input id="schedule-name" placeholder="Enter a name for this schedule" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template">Template</Label>
                    <Select>
                      <SelectTrigger id="template">
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="august">August Wedding Reminder</SelectItem>
                        <SelectItem value="september">September Wedding Reminder</SelectItem>
                        <SelectItem value="payment">Payment Reminder</SelectItem>
                        <SelectItem value="final">Final Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Schedule Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Schedule Time</Label>
                    <Select>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9am">9:00 AM</SelectItem>
                        <SelectItem value="10am">10:00 AM</SelectItem>
                        <SelectItem value="11am">11:00 AM</SelectItem>
                        <SelectItem value="12pm">12:00 PM</SelectItem>
                        <SelectItem value="1pm">1:00 PM</SelectItem>
                        <SelectItem value="2pm">2:00 PM</SelectItem>
                        <SelectItem value="3pm">3:00 PM</SelectItem>
                        <SelectItem value="4pm">4:00 PM</SelectItem>
                        <SelectItem value="5pm">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Select>
                    <SelectTrigger id="recipients">
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Contacts</SelectItem>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="friends">Friends</SelectItem>
                      <SelectItem value="colleagues">Colleagues</SelectItem>
                      <SelectItem value="pending">Pending Payment</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message-preview">Message Preview</Label>
                  <div className="rounded-md border p-4 text-sm">
                    <p>
                      Dear {"{NAME}"}, this is a reminder for the upcoming wedding on {"{DATE}"}. Your contribution of{" "}
                      {"{AMOUNT}"} would be greatly appreciated. Thank you!
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface ScheduledMessageCardProps {
  title: string
  date: string
  time: string
  recipients: number
  template: string
  status: "Scheduled" | "Sent" | "Failed"
  deliveryRate?: number
}

function ScheduledMessageCard({
  title,
  date,
  time,
  recipients,
  template,
  status,
  deliveryRate,
}: ScheduledMessageCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge
            variant={status === "Sent" ? "outline" : status === "Failed" ? "destructive" : "secondary"}
            className={status === "Sent" ? "bg-green-50 text-green-700 border-green-200" : ""}
          >
            {status}
          </Badge>
        </div>
        <CardDescription>{template}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm">
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>
            {date} at {time}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className="font-medium">{recipients}</span>
          <span className="ml-1 text-muted-foreground">recipients</span>
        </div>
        {status === "Sent" && deliveryRate && (
          <div className="flex items-center text-sm">
            <Check className="mr-2 h-4 w-4 text-green-600" />
            <span>{deliveryRate}% delivery rate</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {status === "Scheduled" ? (
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1">
              Edit
            </Button>
            <Button variant="outline" className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Send Now
            </Button>
          </div>
        ) : (
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

