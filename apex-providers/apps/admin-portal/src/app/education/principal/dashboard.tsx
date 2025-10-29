import React from 'react'
import { Layout } from '../../../../libs/shared/ui/layout'
import { MetricsCard } from '../../../../libs/shared/ui/metrics-card'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../libs/design-system/card'
import { Badge } from '../../../../libs/design-system/badge'
import { educationNavigation } from '../../../../libs/shared/navigation/education'
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  GraduationCap
} from 'lucide-react'

export default function PrincipalDashboard() {
  const currentPath = '/admin/education/principal/dashboard'
  const userRole = 'principal'
  const vertical = 'education'

  const metrics = [
    {
      title: 'Academic Performance',
      value: '87.3%',
      change: 3.2,
      changeType: 'increase' as const,
      subtitle: 'Average grade across all subjects',
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      title: 'Teacher Effectiveness',
      value: '92.1%',
      change: 1.8,
      changeType: 'increase' as const,
      subtitle: 'Performance rating',
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Student Attendance',
      value: '94.7%',
      change: 0.5,
      changeType: 'increase' as const,
      subtitle: 'Monthly average',
      icon: <Award className="h-4 w-4" />
    },
    {
      title: 'Curriculum Coverage',
      value: '78.5%',
      change: 5.1,
      changeType: 'increase' as const,
      subtitle: 'Annual progress',
      icon: <TrendingUp className="h-4 w-4" />
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'success',
      title: 'Teacher Evaluation Complete',
      message: 'Mathematics department evaluation completed for Q3',
      time: '1 hour ago',
      department: 'Mathematics'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Attendance Alert',
      message: 'Grade 10B attendance below 85% this week',
      time: '3 hours ago',
      department: 'Grade 10'
    },
    {
      id: 3,
      type: 'info',
      title: 'Curriculum Update',
      message: 'New science curriculum approved for next semester',
      time: '1 day ago',
      department: 'Science'
    }
  ]

  const departmentPerformance = [
    { name: 'Mathematics', performance: 89.2, students: 245, teachers: 8 },
    { name: 'Science', performance: 85.7, students: 198, teachers: 6 },
    { name: 'English', performance: 91.3, students: 312, teachers: 10 },
    { name: 'Social Studies', performance: 83.9, students: 187, teachers: 5 },
    { name: 'Languages', performance: 88.1, students: 156, teachers: 4 }
  ]

  const getActivityIcon = (type: string) => {
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

  const getActivityBadgeVariant = (type: string) => {
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
      title="Principal Dashboard"
      subtitle="Academic leadership and institutional oversight"
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
                <GraduationCap className="h-5 w-5 mr-2 text-apex-deep-blue" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentPerformance.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-charcoal-gray">{dept.name}</p>
                        <span className="text-sm font-semibold text-apex-deep-blue">{dept.performance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-apex-deep-blue h-2 rounded-full" 
                          style={{ width: `${dept.performance}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{dept.students} students</span>
                        <span>{dept.teachers} teachers</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-apex-deep-blue" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-charcoal-gray">{activity.title}</p>
                        <Badge variant={getActivityBadgeVariant(activity.type)} className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{activity.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-400">{activity.time}</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.department}
                        </Badge>
                      </div>
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
            <CardTitle>Academic Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Curriculum Review</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <Users className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Teacher Evaluation</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <Award className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Student Awards</p>
              </button>
              <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-apex-deep-blue hover:bg-apex-deep-blue/5 transition-colors">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-apex-deep-blue" />
                <p className="text-sm font-medium">Performance Report</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}