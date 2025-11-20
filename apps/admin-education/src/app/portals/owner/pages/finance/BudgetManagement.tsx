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
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showCreateBudgetModal, setShowCreateBudgetModal] = useState(false);
  const [showRequisitionModal, setShowRequisitionModal] = useState(false);
  const [allocateFormData, setAllocateFormData] = useState({
    department: '',
    amount: '',
    fiscalYear: '',
    description: '',
  });
  const [createBudgetFormData, setCreateBudgetFormData] = useState({
    fiscalYear: '',
    totalBudget: '',
    description: '',
  });
  const [requisitionFormData, setRequisitionFormData] = useState({
    project: '',
    department: '',
    amount: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    description: '',
    justification: '',
  });

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

  const handleAllocateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget: Budget = {
      id: `budget-${Date.now()}`,
      department: allocateFormData.department,
      allocated: parseFloat(allocateFormData.amount),
      spent: 0,
      remaining: parseFloat(allocateFormData.amount),
      utilization: 0,
      status: 'On Track',
    };
    setBudgets([...budgets, newBudget]);
    setAllocateFormData({ department: '', amount: '', fiscalYear: '', description: '' });
    setShowAllocateModal(false);
    alert('Budget allocated successfully!');
  };

  const handleCreateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would create a new fiscal year budget
    alert(`Budget created for fiscal year ${createBudgetFormData.fiscalYear}!`);
    setCreateBudgetFormData({ fiscalYear: '', totalBudget: '', description: '' });
    setShowCreateBudgetModal(false);
  };

  const handleCreateRequisition = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequisition: CapitalExpenditure = {
      id: `req-${Date.now()}`,
      project: requisitionFormData.project,
      department: requisitionFormData.department,
      amount: parseFloat(requisitionFormData.amount),
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      priority: requisitionFormData.priority,
    };
    setCapitalExpenditures([newRequisition, ...capitalExpenditures]);
    setRequisitionFormData({
      project: '',
      department: '',
      amount: '',
      priority: 'Medium',
      description: '',
      justification: '',
    });
    setShowRequisitionModal(false);
    alert('Requisition created successfully!');
  };

  const handleRemoveRequisition = (id: string) => {
    if (confirm('Are you sure you want to remove this requisition?')) {
      setCapitalExpenditures(capitalExpenditures.filter(req => req.id !== id));
      alert('Requisition removed successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Budget Management</h1>
          <p className="text-gray-600 mt-2">Departmental budget allocation, tracking, and forecasting</p>
        </div>
        <Button onClick={() => setShowCreateBudgetModal(true)}>Create New Budget</Button>
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
          <Button size="sm" variant="secondary" onClick={() => setShowAllocateModal(true)}>Allocate Budget</Button>
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
          <Button size="sm" variant="secondary" onClick={() => setShowRequisitionModal(true)}>New Requisition</Button>
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
                          <button 
                            onClick={() => {
                              setCapitalExpenditures(capitalExpenditures.map(r => 
                                r.id === exp.id ? { ...r, status: 'Approved' as const } : r
                              ));
                              alert('Requisition approved!');
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => {
                              setCapitalExpenditures(capitalExpenditures.map(r => 
                                r.id === exp.id ? { ...r, status: 'Rejected' as const } : r
                              ));
                              alert('Requisition rejected!');
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleRemoveRequisition(exp.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Allocate Budget Modal */}
      {showAllocateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Allocate Budget</h2>
            </div>
            <form onSubmit={handleAllocateBudget} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                <select
                  value={allocateFormData.department}
                  onChange={(e) => setAllocateFormData({...allocateFormData, department: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Academic">Academic</option>
                  <option value="Operations">Operations</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($) *</label>
                <input
                  type="number"
                  value={allocateFormData.amount}
                  onChange={(e) => setAllocateFormData({...allocateFormData, amount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fiscal Year *</label>
                <input
                  type="text"
                  value={allocateFormData.fiscalYear}
                  onChange={(e) => setAllocateFormData({...allocateFormData, fiscalYear: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="2024-2025"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={allocateFormData.description}
                  onChange={(e) => setAllocateFormData({...allocateFormData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                  placeholder="Budget allocation description..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAllocateModal(false);
                    setAllocateFormData({ department: '', amount: '', fiscalYear: '', description: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Allocate Budget</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Budget Modal */}
      {showCreateBudgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Budget</h2>
            </div>
            <form onSubmit={handleCreateBudget} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fiscal Year *</label>
                <input
                  type="text"
                  value={createBudgetFormData.fiscalYear}
                  onChange={(e) => setCreateBudgetFormData({...createBudgetFormData, fiscalYear: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="2024-2025"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget ($) *</label>
                <input
                  type="number"
                  value={createBudgetFormData.totalBudget}
                  onChange={(e) => setCreateBudgetFormData({...createBudgetFormData, totalBudget: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="2000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={createBudgetFormData.description}
                  onChange={(e) => setCreateBudgetFormData({...createBudgetFormData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                  placeholder="Budget description and notes..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateBudgetModal(false);
                    setCreateBudgetFormData({ fiscalYear: '', totalBudget: '', description: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Create Budget</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Requisition Modal */}
      {showRequisitionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">New Capital Requisition</h2>
            </div>
            <form onSubmit={handleCreateRequisition} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                  <input
                    type="text"
                    value={requisitionFormData.project}
                    onChange={(e) => setRequisitionFormData({...requisitionFormData, project: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    placeholder="e.g., New Science Lab Equipment"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={requisitionFormData.department}
                    onChange={(e) => setRequisitionFormData({...requisitionFormData, department: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Science">Science</option>
                    <option value="IT">IT</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Operations">Operations</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($) *</label>
                  <input
                    type="number"
                    value={requisitionFormData.amount}
                    onChange={(e) => setRequisitionFormData({...requisitionFormData, amount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                    placeholder="45000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                  <select
                    value={requisitionFormData.priority}
                    onChange={(e) => setRequisitionFormData({...requisitionFormData, priority: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={requisitionFormData.description}
                  onChange={(e) => setRequisitionFormData({...requisitionFormData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                  required
                  placeholder="Describe the project and requirements..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Justification *</label>
                <textarea
                  value={requisitionFormData.justification}
                  onChange={(e) => setRequisitionFormData({...requisitionFormData, justification: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                  required
                  placeholder="Justify why this requisition is needed..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowRequisitionModal(false);
                    setRequisitionFormData({
                      project: '',
                      department: '',
                      amount: '',
                      priority: 'Medium',
                      description: '',
                      justification: '',
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Create Requisition</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}