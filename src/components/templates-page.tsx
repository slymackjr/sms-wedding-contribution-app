"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import { Copy, Edit, MessageSquare, MoreHorizontal, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"

export function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const templates = [
    {
      id: 1,
      name: "August Wedding Reminder",
      description: "Reminder for James & Mary's wedding in August",
      lastUsed: "2 days ago",
      placeholders: ["NAME", "AMOUNT", "DATE"],
    },
    {
      id: 2,
      name: "September Wedding Reminder",
      description: "Reminder for Robert & Jennifer's wedding in September",
      lastUsed: "1 week ago",
      placeholders: ["NAME", "AMOUNT", "DATE", "LOCATION"],
    },
    {
      id: 3,
      name: "Payment Thank You",
      description: "Thank you message for contribution payments",
      lastUsed: "3 days ago",
      placeholders: ["NAME", "AMOUNT", "EVENT"],
    },
    {
      id: 4,
      name: "Final Reminder",
      description: "Last reminder before the wedding date",
      lastUsed: "2 weeks ago",
      placeholders: ["NAME", "DATE", "DAYS_LEFT"],
    },
  ]

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">SMS Templates</h2>
          <Link
            href="/templates/new"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search templates..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Duplicate</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Last used: {template.lastUsed}</div>
                <div className="mt-2">
                  <p className="text-sm font-medium">Placeholders:</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {template.placeholders.map((placeholder) => (
                      <Badge key={placeholder} variant="secondary">
                        {`{${placeholder}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

