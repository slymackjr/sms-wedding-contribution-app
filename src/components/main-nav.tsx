"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Calendar, Home, MessageSquare, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-xl flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            <span>WeddingSMS</span>
          </Link>
        </div>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <div className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </div>
          </Link>
          <Link
            href="/templates"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/templates" || pathname.startsWith("/templates/")
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            <div className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Templates</span>
            </div>
          </Link>
          <Link
            href="/contacts"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/contacts" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Contacts</span>
            </div>
          </Link>
          <Link
            href="/messages"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/messages" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Scheduling</span>
            </div>
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/settings"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/settings" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
          <button className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

