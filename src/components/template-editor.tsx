"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Save, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MainNav } from "@/components/main-nav"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function TemplateEditor() {
  const [templateName, setTemplateName] = useState("")
  const [templateDescription, setTemplateDescription] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [newPlaceholder, setNewPlaceholder] = useState("")
  const [placeholders, setPlaceholders] = useState<string[]>([])

  const addPlaceholder = () => {
    if (newPlaceholder && !placeholders.includes(newPlaceholder.toUpperCase())) {
      setPlaceholders([...placeholders, newPlaceholder.toUpperCase()])
      setNewPlaceholder("")
    }
  }

  const removePlaceholder = (placeholder: string) => {
    setPlaceholders(placeholders.filter((p) => p !== placeholder))
  }

  const insertPlaceholder = (placeholder: string) => {
    setMessageContent(messageContent + `{${placeholder}}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2">
          <Link href="/templates">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Create New Template</h2>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                placeholder="Enter template name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-description">Description</Label>
              <Textarea
                id="template-description"
                placeholder="Enter template description"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message-content">Message Content</Label>
              <Textarea
                id="message-content"
                placeholder="Enter your message content with {PLACEHOLDERS}"
                className="min-h-[200px]"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use placeholders like {"{NAME}"} that will be replaced with actual values when sending.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label>Placeholders</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add placeholder (e.g. NAME)"
                      value={newPlaceholder}
                      onChange={(e) => setNewPlaceholder(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addPlaceholder()
                        }
                      }}
                    />
                    <Button onClick={addPlaceholder}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label>Available Placeholders</Label>
                    {placeholders.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No placeholders added yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {placeholders.map((placeholder) => (
                          <div key={placeholder} className="flex items-center">
                            <Badge
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => insertPlaceholder(placeholder)}
                            >
                              {`{${placeholder}}`}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 ml-1"
                              onClick={() => removePlaceholder(placeholder)}
                            >
                              <Trash className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Label>Message Preview</Label>
                  <Card className="p-4 bg-muted/50">
                    <div className="text-sm whitespace-pre-wrap">
                      {messageContent || "Your message preview will appear here."}
                    </div>
                  </Card>
                  <p className="text-xs text-muted-foreground">This is how your message will look with placeholders.</p>
                </div>

                <div className="mt-6 space-y-2">
                  <Label>Character Count</Label>
                  <div className="text-sm">
                    <span className="font-medium">{messageContent.length}</span> characters
                    <span className="text-muted-foreground ml-2">({Math.ceil(messageContent.length / 160)} SMS)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

