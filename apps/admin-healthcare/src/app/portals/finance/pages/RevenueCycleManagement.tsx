import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';
import { useState } from 'react';

export default function RevenueCycleManagement() {
  const [selectedTab, setSelectedTab] = useState<'claims' | 'denials' | 'payments' | 'eligibility'>('claims');

  const claims = [
    { id: 1, patient: 'John Doe', claimId: 'CLM-2025-001', amount: '$2,450', submitted: '2025-01-15', status: 'Paid', payer: 'Medicare' },
    { id: 2, patient: 'Jane Smith', claimId: 'CLM-2025-002', amount: '$1,850', submitted: '2025-01-16', status: 'Pending', payer: 'Medicaid' },
    { id: 3, patient: 'Bob Johnson', claimId: 'CLM-2025-003', amount: '$3,200', submitted: '2025-01-14', status: 'Denied', payer: 'Commercial' },
  ];

  const denials = [
    { id: 1, claimId: 'CLM-2025-003', reason: 'Missing documentation', amount: '$3,200', date: '2025-01-17', status: 'Appeal Filed' },
    { id: 2, claimId: 'CLM-2025-015', reason: 'Prior authorization required', amount: '$1,500', date: '2025-01-18', status: 'Under Review' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Revenue Cycle Management</h1>
        <p className="text-gray-600 mt-2">Patient registration, claims processing, denial management, payment posting</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('claims')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'claims' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Claims Processing ({claims.length})
          </button>
          <button
            onClick={() => setSelectedTab('denials')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'denials' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Denial Management ({denials.length})
          </button>
          <button
            onClick={() => setSelectedTab('payments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'payments' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Payment Posting
          </button>
          <button
            onClick={() => setSelectedTab('eligibility')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'eligibility' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Eligibility Verification
          </button>
        </nav>
      </div>

      {selectedTab === 'claims' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Claims Processing & Submission</h2>
            <Button onClick={() => alert('Submit new claim')}>Submit Claim</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claim ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {claims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{claim.claimId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{claim.patient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{claim.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{claim.payer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{claim.submitted}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        claim.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {selectedTab === 'denials' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Denial Management & Appeals</h2>
            <Button onClick={() => alert('File appeal')}>File Appeal</Button>
          </div>
          <div className="space-y-4">
            {denials.map((denial) => (
              <div key={denial.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{denial.claimId}</h3>
                    <p className="text-sm text-gray-600 mt-1">{denial.reason}</p>
                    <p className="text-xs text-gray-500 mt-1">Amount: {denial.amount} | Date: {denial.date}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      denial.status === 'Appeal Filed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {denial.status}
                    </span>
                    <Button size="sm" variant="outline">Appeal</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedTab === 'payments' && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Payment Posting & Reconciliation</h2>
          <DashboardGrid columns={3}>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">$2.4M</div>
              <p className="text-sm text-gray-600 mt-1">Posted This Month</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">$0.8M</div>
              <p className="text-sm text-gray-600 mt-1">Pending Posting</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">98.5%</div>
              <p className="text-sm text-gray-600 mt-1">Reconciliation Rate</p>
            </div>
          </DashboardGrid>
        </Card>
      )}

      {selectedTab === 'eligibility' && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Patient Eligibility Verification</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Real-time Eligibility Check</h3>
                  <p className="text-sm text-gray-600 mt-1">Verify patient insurance coverage before service</p>
                </div>
                <Button onClick={() => alert('Check eligibility')}>Verify Eligibility</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">94%</div>
                <p className="text-sm text-gray-600 mt-1">Verified</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">4%</div>
                <p className="text-sm text-gray-600 mt-1">Pending</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">2%</div>
                <p className="text-sm text-gray-600 mt-1">Ineligible</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

