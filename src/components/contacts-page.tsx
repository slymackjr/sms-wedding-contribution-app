"use client"

import { useState } from "react"
import { Filter, Plus, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])

  const contacts = [
    {
      id: "1",
      name: "John Smith",
      phone: "+1234567890",
      group: "Family",
      status: "Paid",
      lastContacted: "2 days ago",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      phone: "+1987654321",
      group: "Friends",
      status: "Pending",
      lastContacted: "1 week ago",
    },
    {
      id: "3",
      name: "Michael Brown",
      phone: "+1122334455",
      group: "Family",
      status: "Pending",
      lastContacted: "3 days ago",
    },
    {
      id: "4",
      name: "Emily Davis",
      phone: "+1555666777",
      group: "Colleagues",
      status: "Paid",
      lastContacted: "Yesterday",
    },
    {
      id: "5",
      name: "David Wilson",
      phone: "+1888999000",
      group: "Friends",
      status: "Pending",
      lastContacted: "5 days ago",
    },
    {
      id: "6",
      name: "Jennifer Taylor",
      phone: "+1222333444",
      group: "Family",
      status: "Paid",
      lastContacted: "1 day ago",
    },
    {
      id: "7",
      name: "Robert Anderson",
      phone: "+1777888999",
      group: "Colleagues",
      status: "Pending",
      lastContacted: "2 weeks ago",
    },
  ]

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery) ||
      contact.group.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map((contact) => contact.id))
    }
  }

  const toggleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter((contactId) => contactId !== id))
    } else {
      setSelectedContacts([...selectedContacts, id])
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Contacts</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex w-full md:w-auto items-center space-x-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-9 w-9 p-0"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear</span>
                </Button>
              )}
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {selectedContacts.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedContacts.length} selected</span>
              <Button variant="outline" size="sm">
                Send Message
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="hidden md:table-cell">Group</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Last Contacted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No contacts found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => toggleSelectContact(contact.id)}
                        aria-label={`Select ${contact.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell className="hidden md:table-cell">{contact.group}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={contact.status === "Paid" ? "outline" : "secondary"}
                        className={contact.status === "Paid" ? "bg-green-50 text-green-700 border-green-200" : ""}
                      >
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{contact.lastContacted}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

