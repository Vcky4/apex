import { Card } from '@apex-providers/ui-components';

export default function BudgetPlanning() {
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
            {[
              { dept: 'Academic Department', budget: 850000, spent: 720000, percentage: 85 },
              { dept: 'Operations', budget: 420000, spent: 380000, percentage: 90 },
              { dept: 'Administration', budget: 320000, spent: 295000, percentage: 92 },
              { dept: 'Maintenance', budget: 180000, spent: 165000, percentage: 92 },
              { dept: 'IT Services', budget: 150000, spent: 132000, percentage: 88 },
              { dept: 'Sports & Activities', budget: 120000, spent: 98000, percentage: 82 },
            ].map((item) => (
              <div key={item.dept} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-charcoal-gray">{item.dept}</span>
                  <div className="text-right">
                    <span className="text-sm text-gray-600 block">${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}</span>
                    <button className="mt-1 px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
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
                onClick={() => alert('Create Budget Request form would open here')}
                className="w-full px-4 py-2 bg-executive-gold text-white rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Create Budget Request
              </button>
              <button 
                onClick={() => alert('Opening pending approvals...')}
                className="w-full px-4 py-2 bg-apex-deep-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Approve Pending (3)
              </button>
              <button 
                onClick={() => alert('Budget report will be generated...')}
                className="w-full px-4 py-2 border border-gray-300 text-charcoal-gray rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Export Report
              </button>
              <button 
                onClick={() => alert('Opening department budget allocation form...')}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
              >
                Allocate Budget
              </button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Pending Approvals</h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="font-medium text-sm">Academic Dept</div>
                <div className="text-xs text-gray-600">$45,000 - Lab Equipment</div>
                <div className="text-xs text-gray-500 mt-1">2 days ago</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="font-medium text-sm">Operations</div>
                <div className="text-xs text-gray-600">$12,000 - Transport Fuel</div>
                <div className="text-xs text-gray-500 mt-1">5 days ago</div>
              </div>
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
              {[
                { project: 'Science Lab Upgrade', allocated: 250000, status: 'In Progress', timeline: 'Q2 2025' },
                { project: 'Library Expansion', allocated: 180000, status: 'Planned', timeline: 'Q3 2025' },
                { project: 'Sports Facility', allocated: 320000, status: 'Planning', timeline: 'Q4 2025' },
                { project: 'IT Infrastructure', allocated: 150000, status: 'Completed', timeline: 'Q1 2025' },
              ].map((item) => (
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
                      <button className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                        Edit
                      </button>
                      <button className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100">
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
    </div>
  );
}

