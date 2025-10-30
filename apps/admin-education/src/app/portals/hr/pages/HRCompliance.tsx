import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Certification {
  id: string;
  employeeName: string;
  position: string;
  certificationType: string;
  issueDate: string;
  expiryDate: string;
  daysUntilExpiry: number;
  status: 'Valid' | 'Expiring Soon' | 'Expired';
  renewalRequired: boolean;
}

interface BackgroundCheck {
  id: string;
  employeeName: string;
  position: string;
  checkType: 'Criminal' | 'Education' | 'Employment' | 'Full';
  status: 'Pending' | 'In Progress' | 'Cleared' | 'Failed';
  initiatedDate: string;
  completedDate?: string;
}

interface ComplianceTraining {
  id: string;
  trainingName: string;
  type: 'Mandatory' | 'Optional' | 'Recertification';
  dueDate: string;
  completedCount: number;
  totalEmployees: number;
  completionRate: number;
}

interface AuditItem {
  id: string;
  category: string;
  requirement: string;
  status: 'Compliant' | 'Non-Compliant' | 'Pending Review';
  lastReviewed: string;
  nextReview: string;
}

export default function HRCompliance() {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: '1',
      employeeName: 'John Smith',
      position: 'Math Teacher',
      certificationType: 'Teaching License',
      issueDate: '2022-09-01',
      expiryDate: '2024-02-15',
      daysUntilExpiry: 30,
      status: 'Expiring Soon',
      renewalRequired: true
    },
    {
      id: '2',
      employeeName: 'Sarah Johnson',
      position: 'Science Teacher',
      certificationType: 'Teaching License',
      issueDate: '2021-08-15',
      expiryDate: '2025-08-15',
      daysUntilExpiry: 560,
      status: 'Valid',
      renewalRequired: false
    }
  ]);

  const [backgroundChecks, setBackgroundChecks] = useState<BackgroundCheck[]>([
    {
      id: '1',
      employeeName: 'Michael Chen',
      position: 'New Hire - IT Support',
      checkType: 'Full',
      status: 'In Progress',
      initiatedDate: '2024-01-15'
    },
    {
      id: '2',
      employeeName: 'Emily Davis',
      position: 'Volunteer Coordinator',
      checkType: 'Criminal',
      status: 'Cleared',
      initiatedDate: '2024-01-10',
      completedDate: '2024-01-18'
    }
  ]);

  const [trainings, setTrainings] = useState<ComplianceTraining[]>([
    {
      id: '1',
      trainingName: 'Safety & Emergency Procedures',
      type: 'Mandatory',
      dueDate: '2024-02-01',
      completedCount: 225,
      totalEmployees: 245,
      completionRate: 92
    },
    {
      id: '2',
      trainingName: 'Child Protection Training',
      type: 'Mandatory',
      dueDate: '2024-03-15',
      completedCount: 190,
      totalEmployees: 245,
      completionRate: 78
    }
  ]);

  const [auditItems, setAuditItems] = useState<AuditItem[]>([
    {
      id: '1',
      category: 'Labor Law',
      requirement: 'Minimum Wage Compliance',
      status: 'Compliant',
      lastReviewed: '2024-01-01',
      nextReview: '2024-07-01'
    },
    {
      id: '2',
      category: 'Union Agreement',
      requirement: 'Collective Bargaining Terms',
      status: 'Compliant',
      lastReviewed: '2023-12-15',
      nextReview: '2024-06-15'
    }
  ]);

  const getCertStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCheckStatusColor = (status: string) => {
    switch (status) {
      case 'Cleared': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAuditStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Non-Compliant': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">HR Compliance</h1>
        <p className="text-gray-600 mt-2">Certification tracking, background checks, and labor law compliance</p>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Certifications Expiring"
          value="12"
          color="orange"
          trend={{ value: -2, isPositive: true }}
        />
        <StatCard
          title="Background Checks"
          value="98%"
          color="green"
          trend={{ value: 1, isPositive: true }}
        />
        <StatCard
          title="Training Compliance"
          value="92%"
          color="blue"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Audit Readiness"
          value="95%"
          color="green"
          trend={{ value: 0, isPositive: true }}
        />
      </DashboardGrid>

      {/* Certification & License Tracking */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Certification & License Tracking</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">Add Certification</Button>
            <Button size="sm" variant="outline">Set Reminders</Button>
          </div>
        </div>

        {/* Expiring Soon Alert */}
        <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <div className="flex">
            <svg className="h-5 w-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-yellow-800">
                {certifications.filter(c => c.status === 'Expiring Soon').length} certification(s) expiring in next 60 days
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Until Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certifications.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{cert.employeeName}</div>
                    <div className="text-sm text-gray-500">{cert.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cert.certificationType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cert.issueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{cert.expiryDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-semibold ${
                      cert.daysUntilExpiry < 60 ? 'text-yellow-600' : 'text-gray-900'
                    }`}>
                      {cert.daysUntilExpiry} days
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCertStatusColor(cert.status)}`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {cert.renewalRequired && (
                        <button className="text-orange-600 hover:text-orange-900">Renew</button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Background Check Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Background Check Management</h2>
          <Button size="sm" variant="secondary">Initiate New Check</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initiated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backgroundChecks.map((check) => (
                <tr key={check.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{check.employeeName}</div>
                    <div className="text-sm text-gray-500">{check.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{check.checkType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{check.initiatedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{check.completedDate || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCheckStatusColor(check.status)}`}>
                      {check.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Compliance Training */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Compliance Training</h2>
        <div className="space-y-4">
          {trainings.map((training) => (
            <div key={training.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-gray-900">{training.trainingName}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {training.type} • Due: {training.dueDate}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  training.type === 'Mandatory' ? 'bg-red-100 text-red-800' :
                  training.type === 'Recertification' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {training.type}
                </span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Completion Rate</span>
                  <span className="font-semibold">{training.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      training.completionRate >= 90 ? 'bg-green-600' :
                      training.completionRate >= 70 ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${training.completionRate}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {training.completedCount} of {training.totalEmployees} employees completed
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">View Participants</Button>
                <Button size="sm" variant="secondary">Send Reminders</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Labor Law Compliance Monitoring */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Labor Law Compliance Monitoring</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Reviewed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.requirement}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getAuditStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.lastReviewed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nextReview}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Audit Preparation & Documentation */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Audit Preparation & Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Documentation Status</div>
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-sm text-gray-600">Complete and ready</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Last Audit</div>
            <div className="text-sm text-gray-600 mb-2">Dec 2023</div>
            <div className="text-xs text-green-600 font-medium">✓ Passed</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Next Audit</div>
            <div className="text-sm text-gray-600 mb-2">Jun 2024</div>
            <div className="text-xs text-gray-600">150 days away</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary">Generate Audit Report</Button>
          <Button variant="outline">View Documentation</Button>
          <Button variant="outline">Schedule Audit Prep</Button>
        </div>
      </Card>
    </div>
  );
}