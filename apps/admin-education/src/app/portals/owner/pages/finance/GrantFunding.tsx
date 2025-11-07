import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Grant {
  id: string;
  grantName: string;
  grantor: string;
  amount: number;
  applicationDate: string;
  approvalDate: string | null;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Active';
  category: string;
  complianceDeadline: string | null;
}

interface FundAllocation {
  id: string;
  grantId: string;
  grantName: string;
  allocatedTo: string;
  amount: number;
  utilization: number;
  utilizationPercentage: number;
  status: 'Planned' | 'In Use' | 'Fully Utilized';
}

interface Donor {
  id: string;
  name: string;
  type: 'Individual' | 'Foundation' | 'Corporate' | 'Government';
  totalContributed: number;
  lastContribution: string;
  contributionCount: number;
  status: 'Active' | 'Inactive';
}

interface ComplianceReport {
  id: string;
  grantName: string;
  reportType: string;
  dueDate: string;
  submittedDate: string | null;
  status: 'Due' | 'Submitted' | 'Overdue' | 'Approved';
}

export default function GrantFunding() {
  const [grants, setGrants] = useState<Grant[]>([
    {
      id: '1',
      grantName: 'STEM Education Enhancement Grant',
      grantor: 'National Education Foundation',
      amount: 150000,
      applicationDate: '2023-11-15',
      approvalDate: '2024-01-10',
      status: 'Active',
      category: 'Academic',
      complianceDeadline: '2024-06-30'
    },
    {
      id: '2',
      grantName: 'Infrastructure Development Fund',
      grantor: 'State Education Department',
      amount: 250000,
      applicationDate: '2023-12-01',
      approvalDate: null,
      status: 'Under Review',
      category: 'Infrastructure',
      complianceDeadline: null
    },
    {
      id: '3',
      grantName: 'Student Support Program',
      grantor: 'Community Foundation',
      amount: 75000,
      applicationDate: '2024-01-05',
      approvalDate: '2024-01-20',
      status: 'Active',
      category: 'Student Support',
      complianceDeadline: '2024-12-31'
    }
  ]);

  const [fundAllocations, setFundAllocations] = useState<FundAllocation[]>([
    {
      id: '1',
      grantId: '1',
      grantName: 'STEM Education Enhancement Grant',
      allocatedTo: 'Science Lab Equipment',
      amount: 80000,
      utilization: 45000,
      utilizationPercentage: 56,
      status: 'In Use'
    },
    {
      id: '2',
      grantId: '1',
      grantName: 'STEM Education Enhancement Grant',
      allocatedTo: 'Teacher Training',
      amount: 40000,
      utilization: 40000,
      utilizationPercentage: 100,
      status: 'Fully Utilized'
    },
    {
      id: '3',
      grantId: '3',
      grantName: 'Student Support Program',
      allocatedTo: 'Scholarship Fund',
      amount: 50000,
      utilization: 25000,
      utilizationPercentage: 50,
      status: 'In Use'
    }
  ]);

  const [donors, setDonors] = useState<Donor[]>([
    {
      id: '1',
      name: 'ABC Corporation',
      type: 'Corporate',
      totalContributed: 125000,
      lastContribution: '2024-01-15',
      contributionCount: 5,
      status: 'Active'
    },
    {
      id: '2',
      name: 'Smith Family Foundation',
      type: 'Foundation',
      totalContributed: 85000,
      lastContribution: '2023-12-20',
      contributionCount: 3,
      status: 'Active'
    },
    {
      id: '3',
      name: 'John & Jane Doe',
      type: 'Individual',
      totalContributed: 25000,
      lastContribution: '2024-01-10',
      contributionCount: 8,
      status: 'Active'
    }
  ]);

  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>([
    {
      id: '1',
      grantName: 'STEM Education Enhancement Grant',
      reportType: 'Quarterly Progress Report',
      dueDate: '2024-03-31',
      submittedDate: null,
      status: 'Due'
    },
    {
      id: '2',
      grantName: 'Student Support Program',
      reportType: 'Annual Report',
      dueDate: '2024-12-31',
      submittedDate: null,
      status: 'Due'
    },
    {
      id: '3',
      grantName: 'STEM Education Enhancement Grant',
      reportType: 'Financial Statement',
      dueDate: '2024-01-31',
      submittedDate: '2024-01-28',
      status: 'Approved'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Fully Utilized': return 'bg-green-100 text-green-800';
      case 'In Use': return 'bg-blue-100 text-blue-800';
      case 'Planned': return 'bg-yellow-100 text-yellow-800';
      case 'Due': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalGrants = grants.filter(g => g.status === 'Active').reduce((sum, g) => sum + g.amount, 0);
  const totalAllocated = fundAllocations.reduce((sum, fa) => sum + fa.amount, 0);
  const totalUtilized = fundAllocations.reduce((sum, fa) => sum + fa.utilization, 0);
  const pendingGrants = grants.filter(g => g.status === 'Under Review' || g.status === 'Submitted').length;
  const overdueReports = complianceReports.filter(cr => cr.status === 'Overdue').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Grant & Funding Management</h1>
          <p className="text-gray-600 mt-2">Grant application tracking, allocation, and compliance reporting</p>
        </div>
        <Button>New Grant Application</Button>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Active Grants"
          value={`$${(totalGrants / 1000).toFixed(0)}K`}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
        />
        <StatCard
          title="Total Allocated"
          value={`$${(totalAllocated / 1000).toFixed(0)}K`}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <StatCard
          title="Utilization Rate"
          value={`${((totalUtilized / totalAllocated) * 100).toFixed(0)}%`}
          color="orange"
          trend={{ value: 5.2, isPositive: true }}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <StatCard
          title="Pending Applications"
          value={pendingGrants.toString()}
          color="yellow"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </DashboardGrid>

      {/* Grant Application Tracking */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Grant Application Tracking</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Under Review</option>
              <option>Draft</option>
            </select>
            <Button size="sm" variant="secondary">New Application</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grant Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grantor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grants.map((grant) => (
                <tr key={grant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{grant.grantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{grant.grantor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">${grant.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{grant.applicationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{grant.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(grant.status)}`}>
                      {grant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {grant.status === 'Draft' && (
                        <button className="text-purple-600 hover:text-purple-900">Edit</button>
                      )}
                      {grant.status === 'Active' && (
                        <button className="text-green-600 hover:text-green-900">Manage</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Fund Allocation & Utilization */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Fund Allocation & Utilization</h2>
          <Button size="sm" variant="secondary">Allocate Funds</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilized</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fundAllocations.map((allocation) => (
                <tr key={allocation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{allocation.grantName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{allocation.allocatedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${allocation.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${allocation.utilization.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            allocation.utilizationPercentage >= 90 ? 'bg-green-600' :
                            allocation.utilizationPercentage >= 50 ? 'bg-blue-600' :
                            'bg-yellow-600'
                          }`}
                          style={{ width: `${allocation.utilizationPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {allocation.utilizationPercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(allocation.status)}`}>
                      {allocation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Update</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Compliance Reporting for Grants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Compliance Reporting</h2>
            <Button size="sm" variant="secondary">Submit Report</Button>
          </div>

          {overdueReports > 0 && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-red-800">
                    {overdueReports} overdue compliance report(s)
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {complianceReports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{report.grantName}</div>
                    <div className="text-sm text-gray-600">{report.reportType}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Due: {report.dueDate}</span>
                  {report.submittedDate && (
                    <span className="text-gray-600">Submitted: {report.submittedDate}</span>
                  )}
                </div>
                <div className="mt-3">
                  <Button size="sm" variant="outline" fullWidth>View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Donor Management</h2>
            <Button size="sm" variant="secondary">Add Donor</Button>
          </div>

          <div className="space-y-4">
            {donors.map((donor) => (
              <div key={donor.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{donor.name}</div>
                    <div className="text-sm text-gray-600">{donor.type}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    donor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {donor.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Total Contributed</div>
                    <div className="text-lg font-semibold text-green-600">${donor.totalContributed.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Contributions</div>
                    <div className="text-lg font-semibold text-gray-900">{donor.contributionCount}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-3">Last Contribution: {donor.lastContribution}</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" fullWidth>View History</Button>
                  <Button size="sm" variant="outline" fullWidth>Contact</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Total Donations</div>
            <div className="text-2xl font-bold text-green-600">
              ${donors.reduce((sum, d) => sum + d.totalContributed, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">From {donors.length} active donors</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
