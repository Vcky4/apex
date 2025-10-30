import { Card } from '@apex-providers/ui-components';

export default function FacilitiesManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Facilities Management</h1>
        <p className="text-gray-600 mt-2">Maintenance requests, space allocation, and safety compliance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Active Requests</div>
          <div className="text-3xl font-bold text-orange-600">8</div>
          <div className="text-sm text-gray-600 mt-2">Pending maintenance</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Space Utilization</div>
          <div className="text-3xl font-bold text-blue-600">87.3%</div>
          <div className="text-sm text-gray-600 mt-2">Classroom usage</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Safety Inspections</div>
          <div className="text-3xl font-bold text-green-600">100%</div>
          <div className="text-sm text-gray-600 mt-2">Compliant</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Completed Tasks</div>
          <div className="text-3xl font-bold text-purple-600">24</div>
          <div className="text-sm text-gray-600 mt-2">This month</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Maintenance Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Request ID</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Issue</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Priority</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'REQ-001', location: 'Building A - Room 205', issue: 'AC Unit not working', priority: 'High', status: 'In Progress' },
                { id: 'REQ-002', location: 'Gymnasium', issue: 'Light fixture replacement', priority: 'Medium', status: 'Scheduled' },
                { id: 'REQ-003', location: 'Library', issue: 'Door repair', priority: 'Low', status: 'Pending' },
              ].map((req) => (
                <tr key={req.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{req.id}</td>
                  <td className="py-3 px-4">{req.location}</td>
                  <td className="py-3 px-4">{req.issue}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      req.priority === 'High' ? 'bg-red-100 text-red-800' :
                      req.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      req.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      req.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      req.status === 'Scheduled' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
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
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Space Allocation & Scheduling</h2>
          <div className="space-y-3">
            {[
              { space: 'Main Auditorium', booked: 12, available: 18, utilization: 67 },
              { space: 'Gymnasium', booked: 20, available: 24, utilization: 83 },
              { space: 'Conference Room', booked: 15, available: 22, utilization: 68 },
            ].map((item) => (
              <div key={item.space} className="p-3 border rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.space}</div>
                <div className="text-sm text-gray-600 mt-1">{item.booked} bookings / {item.available} slots</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-production-blue h-2 rounded-full" style={{ width: `${item.utilization}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Safety Inspection Compliance</h2>
          <div className="space-y-3">
            {[
              { area: 'Fire Safety Systems', status: 'Compliant', lastInspection: 'Mar 1, 2025' },
              { area: 'Electrical Systems', status: 'Compliant', lastInspection: 'Feb 28, 2025' },
              { area: 'Structural Integrity', status: 'Compliant', lastInspection: 'Feb 15, 2025' },
            ].map((item) => (
              <div key={item.area} className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.area}</div>
                <div className="text-sm text-green-700 mt-1">✓ {item.status}</div>
                <div className="text-xs text-gray-600 mt-1">Last inspection: {item.lastInspection}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

