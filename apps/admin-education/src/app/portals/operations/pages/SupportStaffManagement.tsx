import { Card } from '@apex-providers/ui-components';

export default function SupportStaffManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Support Staff Management</h1>
        <p className="text-gray-600 mt-2">Non-teaching staff scheduling, performance, and development</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Total Staff</div>
          <div className="text-3xl font-bold text-blue-600">32</div>
          <div className="text-sm text-gray-600 mt-2">Non-teaching staff</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Active Shifts</div>
          <div className="text-3xl font-bold text-green-600">28</div>
          <div className="text-sm text-gray-600 mt-2">Currently scheduled</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Performance Avg</div>
          <div className="text-3xl font-bold text-purple-600">4.2/5</div>
          <div className="text-sm text-gray-600 mt-2">Overall rating</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Training Pending</div>
          <div className="text-3xl font-bold text-orange-600">5</div>
          <div className="text-sm text-gray-600 mt-2">Staff members</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Staff Directory</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Performance</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'John Maintenance', role: 'Maintenance', dept: 'Facilities', performance: 4.8, status: 'Active' },
                { name: 'Sarah Cleaner', role: 'Housekeeping', dept: 'Operations', performance: 4.7, status: 'Active' },
                { name: 'Mike Security', role: 'Security', dept: 'Safety', performance: 4.9, status: 'Active' },
                { name: 'Lisa Librarian', role: 'Librarian', dept: 'Library', performance: 4.6, status: 'Active' },
              ].map((staff, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{staff.name}</td>
                  <td className="py-3 px-4">{staff.role}</td>
                  <td className="py-3 px-4">{staff.dept}</td>
                  <td className="py-3 px-4">{staff.performance}/5</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {staff.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Performance Evaluation Schedule</h2>
          <div className="space-y-3">
            {[
              { period: 'Q1 2025', completed: 28, pending: 4, status: 'In Progress' },
              { period: 'Annual Review', completed: 0, pending: 32, status: 'Scheduled' },
            ].map((item) => (
              <div key={item.period} className="p-3 border rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.period}</div>
                <div className="text-sm text-gray-600 mt-1">{item.completed} completed, {item.pending} pending</div>
                <span className={`mt-2 inline-block px-2 py-1 rounded text-xs ${
                  item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Training & Development</h2>
          <div className="space-y-3">
            {[
              { program: 'Safety Training', attendees: 28, date: 'Mar 20, 2025', status: 'Scheduled' },
              { program: 'Customer Service', attendees: 25, date: 'Mar 25, 2025', status: 'Scheduled' },
              { program: 'Equipment Operation', attendees: 18, date: 'Mar 15, 2025', status: 'Completed' },
            ].map((item) => (
              <div key={item.program} className="p-3 border rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.program}</div>
                <div className="text-sm text-gray-600 mt-1">{item.attendees} staff - {item.date}</div>
                <span className={`mt-2 inline-block px-2 py-1 rounded text-xs ${
                  item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

