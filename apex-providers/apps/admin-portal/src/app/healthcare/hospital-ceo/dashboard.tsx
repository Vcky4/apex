import React from 'react'
import { Layout } from '../../../../libs/shared/ui/layout'
import { MetricsCard } from '../../../../libs/shared/ui/metrics-card'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../libs/design-system/card'
import { Badge } from '../../../../libs/design-system/badge'
import { healthcareNavigation } from '../../../../libs/shared/navigation/healthcare'
import { 
  Activity, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Shield,
  Stethoscope
} from 'lucide-react'

export default function HospitalCEODashboard() {
  const currentPath = '/admin/healthcare/hospital-ceo/dashboard'
  const userRole = 'hospital-ceo'
  const vertical = 'healthcare'

  const metrics = [
    {
      title: 'Bed Occupancy',
      value: '87.3%',
      change: 2.1,
      changeType: 'increase' as const,
      subtitle: 'Current occupancy rate',
      icon: <Activity className="h-4 w-4" />
    },
    {
      title: 'Patient Satisfaction',
      value: '94.2%',
      change: 1.8,
      changeType: 'increase' as const,
      subtitle: 'Overall satisfaction score',
      icon: <Heart className="h-4 w-4" />
    },
    {
      title: 'Monthly Revenue',
      value: '$2.4M',
      change: 5.7,
      changeType: 'increase' as const,
      subtitle: 'Total revenue',
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: 'Staff Efficiency',
      value: '91.5%',
      change: 3.2,
      changeType: 'increase' as const,
      subtitle: 'Operational efficiency',
      icon: <TrendingUp className="h-4 w-4" />
    }
  ]

  const departmentMetrics = [
    { name: 'Emergency', patients: 45, occupancy: 95, satisfaction: 89.2 },
    { name: 'Cardiology', patients: 32, occupancy: 78, satisfaction: 94.1 },
    { name: 'Orthopedics', patients: 28, occupancy: 82, satisfaction: 91.7 },
    { name: 'Pediatrics', patients: 38, occupancy: 88, satisfaction: 96.3 },
    { name: 'ICU', patients: 15, occupancy: 92, satisfaction: 88.9 }
  ]

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High Occupancy Alert',
      message: 'Emergency department at 95% capacity',
      time: '30 minutes ago',
      department: 'Emergency'
    },
    {
      id: 2,
      type: 'success',
      title: 'Accreditation Renewed',
      message: 'Joint Commission accreditation renewed for 3 years',
      time: '2 hours ago',
      department: 'Compliance'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Equipment Installed',
      message: 'MRI machine installation completed in Radiology',
      time: '4 hours ago',
      department: 'Radiology'
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
      navigation={healthcareNavigation}
      currentPath={currentPath}
      userRole={userRole}
      vertical={vertical}
      title="Hospital CEO Dashboard"
      subtitle="Strategic oversight and operational excellence"
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
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-apex-deep-blue" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentMetrics.map((dept, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-charcoal-gray">{dept.name}</h4>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {dept.patients} patients
                        </Badge>
                        <Badge variant={dept.occupancy > 90 ? 'warning' : 'success'} className="text-xs">
                          {dept.occupancy}% occupied
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Occupancy</span>
                        <span className="font-medium">{dept.occupancy}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${dept.occupancy > 90 ? 'bg-warning-orange' : 'bg-success-green'}`}
                          style={{ width: `${dept.occupancy}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Satisfaction</span>
                        <span className="font-medium">{dept.satisfaction}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-apex-deep-blue" />
                System Alerts
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
                          {alert.department}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-apex-deep-blue" />
              Compliance & Safety Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-success-green/10 border border-success-green/20">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success-green" />
                <h4 className="font-medium text-charcoal-gray">HIPAA Compliance</h4>
                <p className="text-sm text-gray-600">100% Compliant</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-warning-orange/10 border border-warning-orange/20">
                <Clock className="h-8 w-8 mx-auto mb-2 text-warning-orange" />
                <h4 className="font-medium text-charcoal-gray">Joint Commission</h4>
                <p className="text-sm text-gray-600">Renewal in 6 months</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-success-green/10 border border-success-green/20">
                <Shield className="h-8 w-8 mx-auto mb-2 text-success-green" />
                <h4 className="font-medium text-charcoal-gray">Safety Score</h4>
                <p className="text-sm text-gray-600">94.2/100</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Executive Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <Users className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Staff Management</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Financial Reports</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <Shield className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Compliance Review</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Strategic Planning</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}