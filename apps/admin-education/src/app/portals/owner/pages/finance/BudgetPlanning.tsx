import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

export default function BudgetPlanning() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [adjustingDept, setAdjustingDept] = useState<string | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const pendingApprovals = [
    { id: 1, dept: 'Academic Dept', amount: 45000, description: 'Lab Equipment', days: 2 },
    { id: 2, dept: 'Operations', amount: 12000, description: 'Transport Fuel', days: 5 },
    { id: 3, dept: 'IT Services', amount: 8500, description: 'Software Licenses', days: 1 },
  ];

  const [budgets, setBudgets] = useState([
    { dept: 'Academic Department', budget: 850000, spent: 720000, percentage: 85 },
    { dept: 'Operations', budget: 420000, spent: 380000, percentage: 90 },
    { dept: 'Administration', budget: 320000, spent: 295000, percentage: 92 },
    { dept: 'Maintenance', budget: 180000, spent: 165000, percentage: 92 },
    { dept: 'IT Services', budget: 150000, spent: 132000, percentage: 88 },
    { dept: 'Sports & Activities', budget: 120000, spent: 98000, percentage: 82 },
  ]);

  const [projects, setProjects] = useState([
    { project: 'Science Lab Upgrade', allocated: 250000, status: 'In Progress', timeline: 'Q2 2025' },
    { project: 'Library Expansion', allocated: 180000, status: 'Planned', timeline: 'Q3 2025' },
    { project: 'Sports Facility', allocated: 320000, status: 'Planning', timeline: 'Q4 2025' },
    { project: 'IT Infrastructure', allocated: 150000, status: 'Completed', timeline: 'Q1 2025' },
  ]);

  const handleApprove = (id: number) => {
    // In real app, this would make an API call
    alert(`Budget request ${id} has been approved.`);
    setShowApproveModal(false);
  };

  const handleReject = (id: number) => {
    // In real app, this would make an API call
    alert(`Budget request ${id} has been rejected.`);
    setShowApproveModal(false);
  };

  const handleAdjustBudget = (dept: string, newAmount: number) => {
    setBudgets(budgets.map(b => 
      b.dept === dept 
        ? { ...b, budget: newAmount, percentage: Math.round((b.spent / newAmount) * 100) }
        : b
    ));
    setShowAdjustModal(false);
    setAdjustingDept(null);
    alert(`Budget for ${dept} updated to $${newAmount.toLocaleString()}`);
  };

  const handleExportReport = () => {
    // Create a simple CSV-like report
    const report = `Budget Planning Report\n\nTotal Budget: $2,140,000\n\nDepartment Allocations:\n${budgets.map(b => `${b.dept}: $${b.budget.toLocaleString()} (${b.percentage}% utilized)`).join('\n')}\n\nGenerated: ${new Date().toLocaleString()}`;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budget-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Budget report exported successfully!');
  };

  const handleSaveProject = (projectData: any) => {
    if (isEditing && selectedProject) {
      setProjects(projects.map(p => 
        p.project === selectedProject.project ? { ...p, ...projectData } : p
      ));
      alert('Project updated successfully!');
    } else {
      setProjects([...projects, { ...projectData, status: 'Planning' }]);
      alert('New project added successfully!');
    }
    setShowProjectModal(false);
    setSelectedProject(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Budget Planning</h1>
        <p className="text-gray-600 mt-2">Annual budget allocation per department</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Department Budget Allocation</h2>
          <div className="space-y-4">
            {budgets.map((item) => (
              <div key={item.dept} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-charcoal-gray">{item.dept}</span>
                  <div className="text-right">
                    <span className="text-sm text-gray-600 block">${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}</span>
                    <button 
                      onClick={() => {
                        setAdjustingDept(item.dept);
                        setShowAdjustModal(true);
                      }}
                      className="mt-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                    >
                      Adjust
                    </button>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-executive-gold h-2 rounded-full transition-all" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Utilized: {item.percentage}%</span>
                  <span className="text-gray-600">Remaining: ${(item.budget - item.spent).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Total Annual Budget</h3>
            <div className="text-3xl font-bold text-executive-gold mb-2">$2.14M</div>
            <div className="text-sm text-gray-600">2024-2025 Academic Year</div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  setIsEditing(false);
                  setShowCreateModal(true);
                }}
                className="w-full px-4 py-2 bg-executive-gold text-white rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Create Budget Request
              </button>
              <button 
                onClick={() => setShowApproveModal(true)}
                className="w-full px-4 py-2 bg-apex-deep-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Approve Pending ({pendingApprovals.length})
              </button>
              <button 
                onClick={handleExportReport}
                className="w-full px-4 py-2 border border-gray-300 text-charcoal-gray rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Export Report
              </button>
              <button 
                onClick={() => setShowAllocateModal(true)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Allocate Budget
              </button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Pending Approvals</h3>
            <div className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition cursor-pointer">
                  <div className="font-medium text-sm">{approval.dept}</div>
                  <div className="text-xs text-gray-600">${approval.amount.toLocaleString()} - {approval.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{approval.days} day{approval.days > 1 ? 's' : ''} ago</div>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(approval.id);
                      }}
                      className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(approval.id);
                      }}
                      className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Capital Expenditure Planning</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Project</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Allocated</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Timeline</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item) => (
                <tr key={item.project} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{item.project}</td>
                  <td className="py-3 px-4">${item.allocated.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.timeline}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedProject(item);
                          setIsEditing(true);
                          setShowProjectModal(true);
                        }}
                        className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedProject(item);
                          setIsEditing(false);
                          setShowProjectModal(true);
                        }}
                        className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Budget Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">Create Budget Request</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const data = Object.fromEntries(formData);
              alert(`Budget request created: $${parseInt(data.amount as string).toLocaleString()} for ${data.department}`);
              setShowCreateModal(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select name="department" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold">
                    <option value="">Select Department</option>
                    <option value="Academic">Academic Department</option>
                    <option value="Operations">Operations</option>
                    <option value="Administration">Administration</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Sports & Activities">Sports & Activities</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                  <input type="number" name="amount" required min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea name="description" required rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select name="priority" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 px-4 py-2 bg-executive-gold text-white rounded-lg font-medium hover:bg-opacity-90">
                    Submit Request
                  </button>
                  <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-charcoal-gray rounded-lg font-medium hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Approve Pending Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">Pending Budget Approvals</h3>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-charcoal-gray">{approval.dept}</div>
                      <div className="text-sm text-gray-600">{approval.description}</div>
                      <div className="text-lg font-bold text-executive-gold mt-1">${approval.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 mt-1">{approval.days} day{approval.days > 1 ? 's' : ''} ago</div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApprove(approval.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(approval.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowApproveModal(false)}
              className="mt-4 w-full px-4 py-2 border border-gray-300 text-charcoal-gray rounded-lg font-medium hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Allocate Budget Modal */}
      {showAllocateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">Allocate Budget to Department</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const dept = formData.get('department') as string;
              const amount = parseInt(formData.get('amount') as string);
              handleAdjustBudget(dept, amount);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select name="department" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold">
                    <option value="">Select Department</option>
                    {budgets.map(b => (
                      <option key={b.dept} value={b.dept}>{b.dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allocation Amount ($)</label>
                  <input type="number" name="amount" required min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fiscal Year</label>
                  <input type="text" name="year" defaultValue="2024-2025" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold" />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                    Allocate
                  </button>
                  <button type="button" onClick={() => setShowAllocateModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-charcoal-gray rounded-lg font-medium hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Adjust Budget Modal */}
      {showAdjustModal && adjustingDept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">Adjust Budget - {adjustingDept}</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const newAmount = parseInt(formData.get('amount') as string);
              handleAdjustBudget(adjustingDept, newAmount);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Budget</label>
                  <input 
                    type="text" 
                    value={`$${budgets.find(b => b.dept === adjustingDept)?.budget.toLocaleString() || 0}`}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Budget Amount ($)</label>
                  <input 
                    type="number" 
                    name="amount" 
                    required 
                    min="1"
                    defaultValue={budgets.find(b => b.dept === adjustingDept)?.budget}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Adjustment</label>
                  <textarea name="reason" required rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold"></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 px-4 py-2 bg-executive-gold text-white rounded-lg font-medium hover:bg-opacity-90">
                    Update Budget
                  </button>
                  <button type="button" onClick={() => {
                    setShowAdjustModal(false);
                    setAdjustingDept(null);
                  }} className="flex-1 px-4 py-2 border border-gray-300 text-charcoal-gray rounded-lg font-medium hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project View/Edit Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">
              {isEditing ? 'Edit Project' : 'Project Details'}
            </h3>
            {isEditing ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleSaveProject({
                  project: formData.get('project'),
                  allocated: parseInt(formData.get('allocated') as string),
                  timeline: formData.get('timeline'),
                  status: formData.get('status'),
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                    <input type="text" name="project" defaultValue={selectedProject.project} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allocated Amount ($)</label>
                    <input type="number" name="allocated" defaultValue={selectedProject.allocated} required min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="status" defaultValue={selectedProject.status} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold">
                      <option value="Planning">Planning</option>
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                    <input type="text" name="timeline" defaultValue={selectedProject.timeline} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-executive-gold" />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="submit" className="flex-1 px-4 py-2 bg-executive-gold text-white rounded-lg font-medium hover:bg-opacity-90">
                      Save Changes
                    </button>
                    <button type="button" onClick={() => {
                      setShowProjectModal(false);
                      setSelectedProject(null);
                      setIsEditing(false);
                    }} className="flex-1 px-4 py-2 border border-gray-300 text-charcoal-gray rounded-lg font-medium hover:bg-gray-50">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">{selectedProject.project}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allocated Amount</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">${selectedProject.allocated.toLocaleString()}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">{selectedProject.status}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg">{selectedProject.timeline}</div>
                </div>
                <button 
                  onClick={() => {
                    setIsEditing(true);
                  }}
                  className="w-full px-4 py-2 bg-executive-gold text-white rounded-lg font-medium hover:bg-opacity-90"
                >
                  Edit Project
                </button>
                <button 
                  onClick={() => {
                    setShowProjectModal(false);
                    setSelectedProject(null);
                    setIsEditing(false);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 text-charcoal-gray rounded-lg font-medium hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

