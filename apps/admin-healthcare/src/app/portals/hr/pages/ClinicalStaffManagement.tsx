import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';
import { useState } from 'react';

export default function ClinicalStaffManagement() {
  const [selectedTab, setSelectedTab] = useState<'physicians' | 'nurses' | 'credentials'>('physicians');

  const physicians = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', status: 'Active', credentialExpiry: '2025-12-31', privileges: 'Full' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Emergency Medicine', status: 'Active', credentialExpiry: '2025-11-15', privileges: 'Full' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', status: 'Pending', credentialExpiry: '2025-10-20', privileges: 'Limited' },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Surgery', status: 'Active', credentialExpiry: '2026-01-10', privileges: 'Full' },
  ];

  const nurses = [
    { id: 1, name: 'Nurse Patricia Brown', unit: 'ICU', status: 'Active', certification: 'ACLS, BLS', expiry: '2025-12-31' },
    { id: 2, name: 'Nurse Robert Taylor', unit: 'Emergency', status: 'Active', certification: 'ACLS, PALS', expiry: '2025-11-20' },
    { id: 3, name: 'Nurse Lisa Anderson', unit: 'Pediatrics', status: 'Active', certification: 'BLS, PALS', expiry: '2025-10-15' },
  ];

  const pendingCredentials = [
    { id: 1, name: 'Dr. Emily Rodriguez', type: 'Medical License', submitted: '2025-01-15', status: 'Under Review' },
    { id: 2, name: 'Dr. David Martinez', type: 'Board Certification', submitted: '2025-01-10', status: 'Pending Verification' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Clinical Staff Management</h1>
        <p className="text-gray-600 mt-2">Physician credentialing workflow, nursing staff allocation, specialty privilege management</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('physicians')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'physicians'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Physicians ({physicians.length})
          </button>
          <button
            onClick={() => setSelectedTab('nurses')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'nurses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Nursing Staff ({nurses.length})
          </button>
          <button
            onClick={() => setSelectedTab('credentials')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'credentials'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Credentials ({pendingCredentials.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      {selectedTab === 'physicians' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Physician Credentialing</h2>
            <Button onClick={() => alert('Add new physician')}>Add Physician</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credential Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Privileges</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {physicians.map((physician) => (
                  <tr key={physician.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{physician.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{physician.specialty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        physician.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {physician.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{physician.credentialExpiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{physician.privileges}</td>
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

      {selectedTab === 'nurses' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Nursing Staff Allocation</h2>
            <Button onClick={() => alert('Add new nurse')}>Add Nurse</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certifications</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {nurses.map((nurse) => (
                  <tr key={nurse.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{nurse.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{nurse.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {nurse.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nurse.certification}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nurse.expiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Assign</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {selectedTab === 'credentials' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Pending Credentialing</h2>
            <Button onClick={() => alert('Process credentials')}>Process All</Button>
          </div>
          <div className="space-y-4">
            {pendingCredentials.map((cred) => (
              <div key={cred.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cred.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{cred.type}</p>
                    <p className="text-xs text-gray-500 mt-1">Submitted: {cred.submitted}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {cred.status}
                    </span>
                    <Button size="sm" variant="outline">Review</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

