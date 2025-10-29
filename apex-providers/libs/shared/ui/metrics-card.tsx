import * as React from "react"
import { cn } from "../utils/cn"
import { Card, CardContent, CardHeader, CardTitle } from "../../design-system/card"
import { Badge } from "../../design-system/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricsCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  subtitle?: string
  icon?: React.ReactNode
  className?: string
}

export function MetricsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  subtitle,
  icon,
  className
}: MetricsCardProps) {
  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-success-green" />
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-error-red" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-success-green'
      case 'decrease':
        return 'text-error-red'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-charcoal-gray">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">
            {subtitle}
          </p>
        )}
        {change !== undefined && (
          <div className="flex items-center mt-2">
            {getChangeIcon()}
            <span className={cn("text-xs font-medium ml-1", getChangeColor())}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}