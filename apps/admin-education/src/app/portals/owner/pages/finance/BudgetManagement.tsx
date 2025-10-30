import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Budget {
  id: string;
  department: string;
  allocated: number;
  spent: number;
  remaining: number;
  utilization: number;
  status: 'On Track' | 'Over Budget' | 'Under Budget';
}

interface CapitalExpenditure {
  id: string;
  project: string;
  department: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'In Progress';
  requestDate: string;
  priority: 'High' | 'Medium' | 'Low';
}

export default function BudgetManagement() {
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      department: 'Academic',
      allocated: 250000,
      spent: 185000,
      remaining: 65000,
      utilization: 74,
      status: 'On Track'
    },
    {
      id: '2',
      department: 'Operations',
      allocated: 180000,
      spent: 165000,
      remaining: 15000,
      utilization: 92,
      status: 'On Track'
    },
    {
      id: '3',
      department: 'HR',
      allocated: 150000,
      spent: 145000,
      remaining: 5000,
      utilization: 97,
      status: 'Over Budget'
    }
  ]);

  const [capitalExpenditures, setCapitalExpenditures] = useState<CapitalExpenditure[]>([
    {
      id: '1',
      project: 'New Science Lab Equipment',
      department: 'Science',
      amount: 45000,
      status: 'Pending',
      requestDate: '2024-01-15',
      priority: 'High'
    },
    {
      id: '2',
      project: 'IT Infrastructure Upgrade',
      department: 'IT',
      amount: 85000,
      status: 'Approved',
      requestDate: '2024-01-10',
      priority: 'High'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'Over Budget': return 'bg-red-100 text-red-800';
      case 'Under Budget': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 95) return 'text-red-600';
    if (utilization >= 85) return 'text-yellow-600';
    return 'text-green-600';
  };

  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Budget Management</h1>
          <p className="text-gray-600 mt-2">Departmental budget allocation, tracking, and forecasting</p>
        </div>
        <Button>Create New Budget</Button>
      </div>

      {/* Budget Overview */}
      <DashboardGrid columns={3}>
        <StatCard
          title="Total Allocated"
          value={`$${(totalAllocated / 1000).toFixed(0)}K`}
          color="blue"
        />
        <StatCard
          title="Total Spent"
          value={`$${(totalSpent / 1000).toFixed(0)}K`}
          color="orange"
        />
        <StatCard
          title="Remaining Budget"
          value={`$${(totalRemaining / 1000).toFixed(0)}K`}
          color="green"
        />
      </DashboardGrid>

      {/* Departmental Budget Allocation */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Departmental Budget Allocation</h2>
          <Button size="sm" variant="secondary">Allocate Budget</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgets.map((budget) => (
                <tr key={budget.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{budget.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${budget.allocated.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${budget.spent.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${budget.remaining.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            budget.utilization >= 95 ? 'bg-red-600' :
                            budget.utilization >= 85 ? 'bg-yellow-600' :
                            'bg-green-600'
                          }`}
                          style={{ width: `${budget.utilization}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-semibold ${getUtilizationColor(budget.utilization)}`}>
                        {budget.utilization}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(budget.status)}`}>
                      {budget.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View Details</button>
                      <button className="text-green-600 hover:text-green-900">Adjust</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Budget vs Expenditure Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Budget vs Expenditure - Current Month</h2>
          <div className="space-y-4">
            {budgets.map((budget) => (
              <div key={budget.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{budget.department}</span>
                  <span className="font-semibold">{budget.utilization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      budget.utilization >= 95 ? 'bg-red-600' :
                      budget.utilization >= 85 ? 'bg-yellow-600' :
                      'bg-green-600'
                    }`}
                    style={{ width: `${budget.utilization}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>${budget.spent.toLocaleString()}</span>
                  <span>${budget.allocated.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Forecasting & Scenario Planning</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Current Forecast</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">$495K</div>
              <div className="text-sm text-gray-600">Projected spending by end of year</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Optimistic Scenario</div>
              <div className="text-2xl font-bold text-green-600 mb-1">$465K</div>
              <div className="text-sm text-gray-600">With cost-saving measures</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Pessimistic Scenario</div>
              <div className="text-2xl font-bold text-red-600 mb-1">$520K</div>
              <div className="text-sm text-gray-600">Without adjustments</div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" fullWidth>Run Forecast Analysis</Button>
          </div>
        </Card>
      </div>

      {/* Capital Expenditure Approval Workflow */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Capital Expenditure Approval Workflow</h2>
          <Button size="sm" variant="secondary">New Capital Request</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {capitalExpenditures.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{exp.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{exp.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${exp.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      exp.priority === 'High' ? 'bg-red-100 text-red-800' :
                      exp.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {exp.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      exp.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      exp.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      exp.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {exp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">Review</button>
                      {exp.status === 'Pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900">Approve</button>
                          <button className="text-red-600 hover:text-red-900">Reject</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}