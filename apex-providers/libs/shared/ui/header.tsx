import * as React from "react"
import { cn } from "../utils/cn"
import { Button } from "../../design-system/button"
import { Badge } from "../../design-system/badge"
import { Search, Bell, Settings, User } from "lucide-react"

interface HeaderProps {
  title: string
  subtitle?: string
  className?: string
  showSearch?: boolean
  showNotifications?: boolean
  notificationCount?: number
}

export function Header({ 
  title, 
  subtitle, 
  className,
  showSearch = true,
  showNotifications = true,
  notificationCount = 0
}: HeaderProps) {
  return (
    <header className={cn("flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6", className)}>
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-semibold text-charcoal-gray">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-64 rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-apex-deep-blue focus:outline-none focus:ring-1 focus:ring-apex-deep-blue"
            />
          </div>
        )}
        
        {showNotifications && (
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>
        )}
        
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}