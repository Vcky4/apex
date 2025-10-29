import React from 'react'
import { Layout } from '../../../../libs/shared/ui/layout'
import { MetricsCard } from '../../../../libs/shared/ui/metrics-card'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../libs/design-system/card'
import { Badge } from '../../../../libs/design-system/badge'
import { manufacturingNavigation } from '../../../../libs/shared/navigation/manufacturing'
import { 
  Factory, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  Shield,
  Users,
  BarChart3
} from 'lucide-react'

export default function PlantManagerDashboard() {
  const currentPath = '/admin/manufacturing/plant-manager/dashboard'
  const userRole = 'plant-manager'
  const vertical = 'manufacturing'

  const metrics = [
    {
      title: 'Overall Equipment Effectiveness',
      value: '87.3%',
      change: 2.1,
      changeType: 'increase' as const,
      subtitle: 'OEE across all lines',
      icon: <Factory className="h-4 w-4" />
    },
    {
      title: 'Production Volume',
      value: '12,450',
      change: 5.7,
      changeType: 'increase' as const,
      subtitle: 'Units produced this month',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: 'Cost per Unit',
      value: '$24.50',
      change: -3.2,
      changeType: 'increase' as const,
      subtitle: 'Average production cost',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: 'Safety Score',
      value: '94.8%',
      change: 1.5,
      changeType: 'increase' as const,
      subtitle: 'Safety performance rating',
      icon: <Shield className="h-4 w-4" />
    }
  ]

  const productionLines = [
    { name: 'Line A', efficiency: 89.2, output: 3240, quality: 98.1, status: 'running' },
    { name: 'Line B', efficiency: 85.7, output: 2980, quality: 97.3, status: 'running' },
    { name: 'Line C', efficiency: 91.3, output: 3120, quality: 98.7, status: 'maintenance' },
    { name: 'Line D', efficiency: 87.9, output: 3010, quality: 96.8, status: 'running' }
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Equipment Maintenance Due',
      message: 'Line C requires scheduled maintenance',
      time: '2 hours ago',
      priority: 'High'
    },
    {
      id: 2,
      type: 'success',
      title: 'Quality Target Achieved',
      message: 'Defect rate below 2% for 3 consecutive days',
      time: '4 hours ago',
      priority: 'Medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Batch Started',
      message: 'Production batch #2024-015 initiated',
      time: '6 hours ago',
      priority: 'Low'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-success-green'
      case 'maintenance':
        return 'bg-warning-orange'
      case 'stopped':
        return 'bg-error-red'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <Layout
      navigation={manufacturingNavigation}
      currentPath={currentPath}
      userRole={userRole}
      vertical={vertical}
      title="Plant Manager Dashboard"
      subtitle="Production operations and plant performance oversight"
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
          {/* Production Lines Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Factory className="h-5 w-5 mr-2 text-apex-deep-blue" />
                Production Lines Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productionLines.map((line, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-charcoal-gray">{line.name}</h4>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(line.status)}`}></div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {line.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Efficiency</p>
                        <p className="font-semibold text-apex-deep-blue">{line.efficiency}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Output</p>
                        <p className="font-semibold text-apex-deep-blue">{line.output.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Quality</p>
                        <p className="font-semibold text-apex-deep-blue">{line.quality}%</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Efficiency</span>
                        <span>{line.efficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-apex-deep-blue h-2 rounded-full" 
                          style={{ width: `${line.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Production Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-apex-deep-blue" />
                Production Alerts
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
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-400">{alert.time}</p>
                        <Badge variant="outline" className="text-xs">
                          {alert.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Performance Indicators */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-apex-deep-blue" />
              Key Performance Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-success-green/10 border border-success-green/20">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success-green" />
                <h4 className="font-medium text-charcoal-gray">Quality Rate</h4>
                <p className="text-2xl font-bold text-success-green">97.7%</p>
                <p className="text-sm text-gray-600">Above target (95%)</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-warning-orange/10 border border-warning-orange/20">
                <Wrench className="h-8 w-8 mx-auto mb-2 text-warning-orange" />
                <h4 className="font-medium text-charcoal-gray">Maintenance</h4>
                <p className="text-2xl font-bold text-warning-orange">3</p>
                <p className="text-sm text-gray-600">Pending work orders</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-quantum-teal/10 border border-quantum-teal/20">
                <Users className="h-8 w-8 mx-auto mb-2 text-quantum-teal" />
                <h4 className="font-medium text-charcoal-gray">Workforce</h4>
                <p className="text-2xl font-bold text-quantum-teal">156</p>
                <p className="text-sm text-gray-600">Active employees</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-apex-deep-blue/10 border border-apex-deep-blue/20">
                <Shield className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <h4 className="font-medium text-charcoal-gray">Safety</h4>
                <p className="text-2xl font-bold text-apex-deep-blue">0</p>
                <p className="text-sm text-gray-600">Incidents this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Plant Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <Factory className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Production Planning</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <Wrench className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Maintenance</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <Users className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Workforce</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Analytics</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}