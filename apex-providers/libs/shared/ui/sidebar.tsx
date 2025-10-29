import * as React from "react"
import { cn } from "../utils/cn"
import { NavigationItem } from "../types"
import { Button } from "../../design-system/button"
import { Badge } from "../../design-system/badge"
import { ChevronRight, ChevronDown } from "lucide-react"

interface SidebarProps {
  navigation: NavigationItem[]
  currentPath: string
  userRole: string
  vertical: string
  className?: string
}

export function Sidebar({ 
  navigation, 
  currentPath, 
  userRole, 
  vertical, 
  className 
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isItemVisible = (item: NavigationItem) => {
    if (item.roles && !item.roles.includes(userRole as any)) return false
    if (item.verticals && !item.verticals.includes(vertical as any)) return false
    return true
  }

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    if (!isItemVisible(item)) return null

    const isActive = currentPath === item.href
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)

    return (
      <div key={item.id}>
        <div className="flex items-center">
          {hasChildren ? (
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                level > 0 && "ml-4",
                isActive && "bg-apex-deep-blue/10 text-apex-deep-blue"
              )}
              onClick={() => toggleExpanded(item.id)}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
              {isExpanded ? (
                <ChevronDown className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </Button>
          ) : (
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                level > 0 && "ml-4",
                isActive && "bg-apex-deep-blue/10 text-apex-deep-blue"
              )}
              onClick={() => window.location.href = item.href}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </Button>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex h-full w-64 flex-col bg-white border-r border-gray-200", className)}>
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-apex-deep-blue flex items-center justify-center">
            <span className="text-white font-bold text-sm">AP</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-apex-deep-blue">Apex Providers</h1>
            <p className="text-xs text-gray-500 capitalize">{vertical} Admin</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map(item => renderNavigationItem(item))}
      </nav>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-quantum-teal flex items-center justify-center">
            <span className="text-white text-xs font-medium">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-charcoal-gray truncate">User Name</p>
            <p className="text-xs text-gray-500 truncate">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}