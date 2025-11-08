import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';
import { useState } from 'react';

export default function ContractManagement() {
  const [selectedTab, setSelectedTab] = useState<'payers' | 'providers' | 'services' | 'renewals'>('payers');

  const payerContracts = [
    { id: 1, payer: 'Medicare', type: 'Government', rate: 'DRG-based', expiry: '2025-12-31', status: 'Active' },
    { id: 2, payer: 'Medicaid', type: 'Government', rate: 'Fee Schedule', expiry: '2025-11-30', status: 'Active' },
    { id: 3, payer: 'Blue Cross Blue Shield', type: 'Commercial', rate: 'Negotiated', expiry: '2025-10-15', status: 'Active' },
  ];

  const expiringContracts = [
    { id: 1, contract: 'Blue Cross Blue Shield', expiry: '2025-10-15', daysRemaining: 268, action: 'Renewal Required' },
    { id: 2, contract: 'Aetna Health', expiry: '2025-09-30', daysRemaining: 253, action: 'Rate Review' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Healthcare Contract Management</h1>
        <p className="text-gray-600 mt-2">Payer contract administration, provider agreement management, contract compliance monitoring</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('payers')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'payers' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Payer Contracts ({payerContracts.length})
          </button>
          <button
            onClick={() => setSelectedTab('providers')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'providers' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Provider Agreements
          </button>
          <button
            onClick={() => setSelectedTab('services')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'services' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Service Contracts
          </button>
          <button
            onClick={() => setSelectedTab('renewals')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'renewals' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Upcoming Renewals ({expiringContracts.length})
          </button>
        </nav>
      </div>

      {selectedTab === 'payers' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Payer Contract Administration</h2>
            <Button onClick={() => alert('Add contract')}>Add Contract</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate Structure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payerContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{contract.payer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contract.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contract.rate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contract.expiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {selectedTab === 'renewals' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Contract Renewals & Amendments</h2>
            <Button onClick={() => alert('Process renewals')}>Process Renewals</Button>
          </div>
          <div className="space-y-4">
            {expiringContracts.map((contract) => (
              <div key={contract.id} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{contract.contract}</h3>
                    <p className="text-sm text-gray-600 mt-1">Expires: {contract.expiry}</p>
                    <p className="text-xs text-gray-500 mt-1">{contract.daysRemaining} days remaining</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                      {contract.action}
                    </span>
                    <Button size="sm" variant="outline">Review</Button>
                    <Button size="sm">Renew</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedTab === 'providers' && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Provider Agreement Management</h2>
          <p className="text-gray-600">Manage agreements with referring physicians and specialists</p>
          <Button className="mt-4" onClick={() => alert('Add provider agreement')}>Add Provider Agreement</Button>
        </Card>
      )}

      {selectedTab === 'services' && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Service Contract Tracking</h2>
          <p className="text-gray-600">Track contracts for medical equipment, supplies, and services</p>
          <Button className="mt-4" onClick={() => alert('Add service contract')}>Add Service Contract</Button>
        </Card>
      )}
    </div>
  );
}

