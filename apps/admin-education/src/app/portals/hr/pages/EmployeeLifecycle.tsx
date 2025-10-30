import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface Contract {
  id: string;
  employeeName: string;
  position: string;
  contractType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  startDate: string;
  endDate: string;
  renewalDate: string;
  status: 'Active' | 'Expiring Soon' | 'Expired' | 'Renewed';
  daysUntilRenewal: number;
}

interface Promotion {
  id: string;
  employeeName: string;
  fromPosition: string;
  toPosition: string;
  effectiveDate: string;
  status: 'Pending' | 'Approved' | 'Completed';
}

interface Exit {
  id: string;
  employeeName: string;
  position: string;
  exitDate: string;
  exitType: 'Resignation' | 'Retirement' | 'Termination' | 'End of Contract';
  exitInterviewStatus: 'Pending' | 'Scheduled' | 'Completed' | 'Not Required';
}

export default function EmployeeLifecycle() {
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      employeeName: 'John Smith',
      position: 'Math Teacher',
      contractType: 'Full-time',
      startDate: '2022-09-01',
      endDate: '2024-08-31',
      renewalDate: '2024-07-15',
      status: 'Expiring Soon',
      daysUntilRenewal: 45
    },
    {
      id: '2',
      employeeName: 'Emily Davis',
      position: 'Science Teacher',
      contractType: 'Full-time',
      startDate: '2023-09-01',
      endDate: '2025-08-31',
      renewalDate: '2025-07-15',
      status: 'Active',
      daysUntilRenewal: 520
    }
  ]);

  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      employeeName: 'Robert Johnson',
      fromPosition: 'Teacher',
      toPosition: 'Department Head',
      effectiveDate: '2024-02-01',
      status: 'Pending'
    }
  ]);

  const [exits, setExits] = useState<Exit[]>([
    {
      id: '1',
      employeeName: 'Sarah Wilson',
      position: 'Administrative Assistant',
      exitDate: '2024-01-31',
      exitType: 'Resignation',
      exitInterviewStatus: 'Scheduled'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Renewed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Employee Lifecycle</h1>
        <p className="text-gray-600 mt-2">Contract management, promotions, transfers, and exits</p>
      </div>

      {/* Contract Management & Renewals */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Contract Management & Renewals</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">Add New Contract</Button>
            <Button size="sm" variant="outline">Set Reminders</Button>
          </div>
        </div>

        {/* Reminder Alert */}
        <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">
                {contracts.filter(c => c.status === 'Expiring Soon').length} contract(s) expiring in next 60 days
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renewal Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{contract.employeeName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contract.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contract.contractType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contract.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{contract.renewalDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                    {contract.status === 'Expiring Soon' && (
                      <div className="text-xs text-yellow-600 mt-1">{contract.daysUntilRenewal} days left</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Renew</button>
                      <button className="text-gray-600 hover:text-gray-900">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Promotion & Transfer Processing */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Promotion & Transfer Processing</h2>
          <Button size="sm" variant="secondary">New Promotion/Transfer</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {promotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{promo.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{promo.fromPosition}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{promo.toPosition}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{promo.effectiveDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      promo.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      promo.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Review</button>
                      <button className="text-green-600 hover:text-green-900">Approve</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Exit Interview Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Exit Interview Management</h2>
          <Button size="sm" variant="secondary">Schedule Exit Interview</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exit Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exit Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interview Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exits.map((exit) => (
                <tr key={exit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{exit.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exit.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exit.exitType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exit.exitDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      exit.exitInterviewStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                      exit.exitInterviewStatus === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {exit.exitInterviewStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Schedule</button>
                      <button className="text-green-600 hover:text-green-900">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Alumni Network Management */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Alumni Network Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">245</div>
            <div className="text-sm text-gray-600 mt-1">Total Alumni</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">48</div>
            <div className="text-sm text-gray-600 mt-1">Active Members</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600 mt-1">Events This Year</div>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="secondary" fullWidth>Manage Alumni Network</Button>
        </div>
      </Card>
    </div>
  );
}