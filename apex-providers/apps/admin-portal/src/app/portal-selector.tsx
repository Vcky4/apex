import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../libs/design-system/card'
import { Badge } from '../../libs/design-system/badge'
import { 
  GraduationCap, 
  Stethoscope, 
  Factory, 
  ArrowRight 
} from 'lucide-react'

const portals = [
  {
    id: 'education',
    title: 'Education Administration',
    description: 'School management, academic oversight, and student administration',
    icon: <GraduationCap className="h-12 w-12 text-education-gold" />,
    color: 'education-gold',
    dashboards: [
      { name: 'School Owner', path: '/admin/education/school-owner/dashboard', role: 'school-owner' },
      { name: 'Principal', path: '/admin/education/principal/dashboard', role: 'principal' },
      { name: 'Department Head', path: '/admin/education/department/dashboard', role: 'department-head' },
      { name: 'Vice Principal', path: '/admin/education/vice-principal/dashboard', role: 'vice-principal' },
      { name: 'Operations Manager', path: '/admin/education/operations/dashboard', role: 'operations-manager' }
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare Administration',
    description: 'Hospital management, clinical operations, and patient care administration',
    icon: <Stethoscope className="h-12 w-12 text-healthcare-red" />,
    color: 'healthcare-red',
    dashboards: [
      { name: 'Hospital CEO', path: '/admin/healthcare/hospital-ceo/dashboard', role: 'hospital-ceo' },
      { name: 'Medical Director', path: '/admin/healthcare/medical-director/dashboard', role: 'medical-director' },
      { name: 'Department Chief', path: '/admin/healthcare/department/dashboard', role: 'department-chief' },
      { name: 'Nursing Supervisor', path: '/admin/healthcare/nursing/dashboard', role: 'nursing-supervisor' },
      { name: 'Patient Care Admin', path: '/admin/healthcare/patient-services/dashboard', role: 'patient-care-admin' }
    ]
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing Administration',
    description: 'Plant management, production operations, and quality control administration',
    icon: <Factory className="h-12 w-12 text-manufacturing-gray" />,
    color: 'manufacturing-gray',
    dashboards: [
      { name: 'Plant Manager', path: '/admin/manufacturing/plant-manager/dashboard', role: 'plant-manager' },
      { name: 'Production Manager', path: '/admin/manufacturing/production/dashboard', role: 'production-manager' },
      { name: 'Quality Manager', path: '/admin/manufacturing/quality/dashboard', role: 'quality-manager' },
      { name: 'Maintenance Manager', path: '/admin/manufacturing/maintenance/dashboard', role: 'maintenance-manager' },
      { name: 'Shift Supervisor', path: '/admin/manufacturing/shift/dashboard', role: 'shift-supervisor' }
    ]
  }
]

export default function PortalSelector() {
  const handlePortalClick = (path: string) => {
    window.location.href = path
  }

  return (
    <div className="min-h-screen bg-light-gray p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 w-16 rounded bg-apex-deep-blue flex items-center justify-center">
              <span className="text-white font-bold text-2xl">AP</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-apex-deep-blue mb-4">Apex Providers Platform</h1>
          <p className="text-xl text-charcoal-gray mb-2">Version 4.0 - Multi-Tier Administrative Architecture</p>
          <p className="text-gray-600">Select your administrative portal to access role-specific dashboards and management tools</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {portals.map((portal) => (
            <Card key={portal.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {portal.icon}
                </div>
                <CardTitle className="text-2xl text-charcoal-gray group-hover:text-apex-deep-blue transition-colors">
                  {portal.title}
                </CardTitle>
                <p className="text-gray-600 mt-2">{portal.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-charcoal-gray mb-3">Available Dashboards:</h4>
                  {portal.dashboards.map((dashboard, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => handlePortalClick(dashboard.path)}
                    >
                      <div className="flex items-center space-x-3">
                        <Badge variant={portal.color as any} className="text-xs">
                          {dashboard.role}
                        </Badge>
                        <span className="text-sm font-medium text-charcoal-gray">
                          {dashboard.name}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-apex-deep-blue transition-colors" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-charcoal-gray mb-2">Platform Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-apex-deep-blue rounded-full"></div>
                <span>Role-based Access Control</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-quantum-teal rounded-full"></div>
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-success-green rounded-full"></div>
                <span>Multi-tenant Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}