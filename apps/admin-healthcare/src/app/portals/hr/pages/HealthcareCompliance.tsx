import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';
import { useState } from 'react';

export default function HealthcareCompliance() {
  const [selectedTab, setSelectedTab] = useState<'licenses' | 'certifications' | 'training' | 'audits'>('licenses');

  const expiringLicenses = [
    { id: 1, name: 'Dr. Sarah Johnson', license: 'Medical License', expiry: '2025-02-15', daysRemaining: 26, status: 'Expiring Soon' },
    { id: 2, name: 'Dr. Michael Chen', license: 'DEA Registration', expiry: '2025-02-28', daysRemaining: 39, status: 'Expiring Soon' },
    { id: 3, name: 'Nurse Patricia Brown', license: 'RN License', expiry: '2025-03-10', daysRemaining: 50, status: 'Active' },
  ];

  const certifications = [
    { id: 1, name: 'Dr. Emily Rodriguez', cert: 'ACLS', expiry: '2025-01-30', daysRemaining: 10, status: 'Expiring Soon' },
    { id: 2, name: 'Nurse Robert Taylor', cert: 'BLS', expiry: '2025-02-05', daysRemaining: 16, status: 'Expiring Soon' },
    { id: 3, name: 'Dr. James Wilson', cert: 'PALS', expiry: '2025-12-31', daysRemaining: 346, status: 'Active' },
  ];

  const trainingCompliance = [
    { course: 'HIPAA Privacy Training', completed: 428, total: 470, percentage: 91 },
    { course: 'Infection Control', completed: 445, total: 470, percentage: 95 },
    { course: 'Patient Safety', completed: 412, total: 470, percentage: 88 },
    { course: 'Emergency Preparedness', completed: 398, total: 470, percentage: 85 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Healthcare Compliance</h1>
        <p className="text-gray-600 mt-2">Medical license verification, certification tracking, mandatory training compliance</p>
      </div>

      {/* Compliance Overview */}
      <DashboardGrid columns={4}>
        <StatCard
          title="License Compliance"
          value="98%"
          color="green"
          trend={{ value: 1.2, isPositive: true }}
          icon={<span className="text-2xl">📜</span>}
        />
        <StatCard
          title="Certifications Active"
          value="94%"
          color="blue"
          trend={{ value: 0.5, isPositive: true }}
          icon={<span className="text-2xl">✅</span>}
        />
        <StatCard
          title="Training Compliance"
          value="89%"
          color="purple"
          trend={{ value: 2.3, isPositive: true }}
          icon={<span className="text-2xl">📚</span>}
        />
        <StatCard
          title="Expiring Soon"
          value="12"
          color="orange"
          trend={{ value: -3, isPositive: true }}
          icon={<span className="text-2xl">⚠️</span>}
        />
      </DashboardGrid>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('licenses')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'licenses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Medical Licenses ({expiringLicenses.filter(l => l.status === 'Expiring Soon').length} expiring)
          </button>
          <button
            onClick={() => setSelectedTab('certifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'certifications'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Certifications ({certifications.filter(c => c.status === 'Expiring Soon').length} expiring)
          </button>
          <button
            onClick={() => setSelectedTab('training')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'training'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mandatory Training
          </button>
          <button
            onClick={() => setSelectedTab('audits')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'audits'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Audit Preparation
          </button>
        </nav>
      </div>

      {/* Content */}
      {selectedTab === 'licenses' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Medical License Verification</h2>
            <Button onClick={() => alert('Verify all licenses')}>Verify All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Remaining</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expiringLicenses.map((license) => (
                  <tr key={license.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{license.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{license.license}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{license.expiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{license.daysRemaining} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        license.status === 'Expiring Soon' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {license.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Verify</button>
                      <button className="text-green-600 hover:text-green-900">Renew</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {selectedTab === 'certifications' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Certification Tracking (ACLS, BLS, PALS)</h2>
            <Button onClick={() => alert('Track all certifications')}>Track All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Remaining</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {certifications.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cert.cert}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.expiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{cert.daysRemaining} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cert.status === 'Expiring Soon' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Renew</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {selectedTab === 'training' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Mandatory Training Compliance</h2>
            <Button onClick={() => alert('Assign training')}>Assign Training</Button>
          </div>
          <div className="space-y-4">
            {trainingCompliance.map((training) => (
              <div key={training.course} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-900">{training.course}</h3>
                  <span className="text-sm font-medium text-gray-700">{training.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full ${
                      training.percentage >= 90 ? 'bg-green-600' :
                      training.percentage >= 75 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${training.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{training.completed} of {training.total} staff completed</span>
                  <Button size="sm" variant="outline" onClick={() => alert(`View ${training.course} details`)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedTab === 'audits' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Audit Preparation & Documentation</h2>
            <Button onClick={() => alert('Prepare audit')}>Prepare Audit</Button>
          </div>
          <DashboardGrid columns={2}>
            <Card>
              <h3 className="font-semibold mb-3">Upcoming Audits</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium">Joint Commission Survey</div>
                  <div className="text-sm text-gray-600">Scheduled: March 15, 2025</div>
                  <div className="text-xs text-gray-500 mt-1">45 days remaining</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium">State Licensing Review</div>
                  <div className="text-sm text-gray-600">Scheduled: April 1, 2025</div>
                  <div className="text-xs text-gray-500 mt-1">62 days remaining</div>
                </div>
              </div>
            </Card>
            <Card>
              <h3 className="font-semibold mb-3">Audit Readiness</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Documentation Complete</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="flex justify-between mt-4">
                  <span>Staff Training</span>
                  <span className="font-semibold">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <div className="flex justify-between mt-4">
                  <span>Policy Compliance</span>
                  <span className="font-semibold">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </Card>
          </DashboardGrid>
        </Card>
      )}
    </div>
  );
}

