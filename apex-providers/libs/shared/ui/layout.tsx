import * as React from "react"
import { cn } from "../utils/cn"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { NavigationItem } from "../types"

interface LayoutProps {
  children: React.ReactNode
  navigation: NavigationItem[]
  currentPath: string
  userRole: string
  vertical: string
  title: string
  subtitle?: string
  className?: string
}

export function Layout({
  children,
  navigation,
  currentPath,
  userRole,
  vertical,
  title,
  subtitle,
  className
}: LayoutProps) {
  return (
    <div className="flex h-screen bg-light-gray">
      <Sidebar
        navigation={navigation}
        currentPath={currentPath}
        userRole={userRole}
        vertical={vertical}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={title}
          subtitle={subtitle}
        />
        
        <main className={cn("flex-1 overflow-auto p-6", className)}>
          {children}
        </main>
      </div>
    </div>
  )
}