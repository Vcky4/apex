import React from 'react'
import { Layout } from '../../../../libs/shared/ui/layout'
import { MetricsCard } from '../../../../libs/shared/ui/metrics-card'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../libs/design-system/card'
import { Badge } from '../../../../libs/design-system/badge'
import { educationNavigation } from '../../../../libs/shared/navigation/education'
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'

export default function SchoolOwnerDashboard() {
  const currentPath = '/admin/education/school-owner/dashboard'
  const userRole = 'school-owner'
  const vertical = 'education'

  const metrics = [
    {
      title: 'Total Students',
      value: '1,247',
      change: 5.2,
      changeType: 'increase' as const,
      subtitle: 'Active enrollment',
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Teaching Staff',
      value: '89',
      change: 2.1,
      changeType: 'increase' as const,
      subtitle: 'Full-time teachers',
      icon: <GraduationCap className="h-4 w-4" />
    },
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      change: 8.7,
      changeType: 'increase' as const,
      subtitle: 'Fee collection',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: 'Retention Rate',
      value: '94.2%',
      change: 1.3,
      changeType: 'increase' as const,
      subtitle: 'Student retention',
      icon: <TrendingUp className="h-4 w-4" />
    }
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Fee Collection Due',
      message: '15 students have overdue fees totaling $2,340',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'success',
      title: 'New Teacher Onboarded',
      message: 'Sarah Johnson joined the Mathematics department',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'Maintenance Scheduled',
      message: 'Library renovation starts next Monday',
      time: '1 day ago'
    }
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning-orange" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success-green" />
      case 'info':
        return <Clock className="h-4 w-4 text-quantum-teal" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case 'warning':
        return 'warning' as const
      case 'success':
        return 'success' as const
      case 'info':
        return 'secondary' as const
      default:
        return 'outline' as const
    }
  }

  return (
    <Layout
      navigation={educationNavigation}
      currentPath={currentPath}
      userRole={userRole}
      vertical={vertical}
      title="School Owner Dashboard"
      subtitle="Complete oversight of institutional operations and performance"
    >
      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              subtitle={metric.subtitle}
              icon={metric.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-apex-deep-blue" />
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Revenue vs Expenses</span>
                  <span className="text-sm font-medium text-success-green">+12.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-success-green h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-xs text-gray-500">This Month</p>
                    <p className="text-lg font-semibold">$45,230</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Month</p>
                    <p className="text-lg font-semibold">$40,180</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-apex-deep-blue" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-charcoal-gray">{alert.title}</p>
                        <Badge variant={getAlertBadgeVariant(alert.type)} className="text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <GraduationCap className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Add Student</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <Users className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Hire Teacher</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Process Payment</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">View Reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}