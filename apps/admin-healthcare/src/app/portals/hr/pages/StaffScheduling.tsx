import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';
import { useState } from 'react';

export default function StaffScheduling() {
  const [selectedView, setSelectedView] = useState<'calendar' | 'shifts' | 'requests'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const shifts = [
    { id: 1, staff: 'Dr. Sarah Johnson', role: 'Physician', shift: 'Day (7am-7pm)', date: '2025-01-20', status: 'Scheduled' },
    { id: 2, staff: 'Nurse Patricia Brown', role: 'RN', shift: 'Night (7pm-7am)', date: '2025-01-20', status: 'Scheduled' },
    { id: 3, staff: 'Dr. Michael Chen', role: 'Physician', shift: 'On-Call', date: '2025-01-20', status: 'On-Call' },
    { id: 4, staff: 'Nurse Robert Taylor', role: 'RN', shift: 'Day (7am-7pm)', date: '2025-01-21', status: 'Pending' },
  ];

  const leaveRequests = [
    { id: 1, staff: 'Dr. Emily Rodriguez', type: 'Vacation', start: '2025-02-01', end: '2025-02-05', status: 'Pending' },
    { id: 2, staff: 'Nurse Lisa Anderson', type: 'Sick Leave', start: '2025-01-22', end: '2025-01-23', status: 'Approved' },
  ];

  const staffingGaps = [
    { unit: 'ICU', date: '2025-01-22', shift: 'Night', needed: 2, current: 1, gap: 1 },
    { unit: 'Emergency', date: '2025-01-23', shift: 'Day', needed: 3, current: 2, gap: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Staff Scheduling & Rotation</h1>
        <p className="text-gray-600 mt-2">Shift pattern optimization, on-call schedule management, vacation coordination</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedView('calendar')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'calendar'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Schedule Calendar
          </button>
          <button
            onClick={() => setSelectedView('shifts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'shifts'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Shift Assignments
          </button>
          <button
            onClick={() => setSelectedView('requests')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'requests'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Leave Requests ({leaveRequests.filter(r => r.status === 'Pending').length})
          </button>
        </nav>
      </div>

      {/* Staffing Gaps Alert */}
      {staffingGaps.length > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-orange-900">⚠️ Staffing Gaps Detected</h3>
              <p className="text-sm text-orange-700 mt-1">{staffingGaps.length} shift(s) need coverage</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => alert('View gaps')}>View Gaps</Button>
          </div>
        </Card>
      )}

      {/* Content */}
      {selectedView === 'calendar' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Schedule Calendar</h2>
            <div className="flex space-x-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <Button onClick={() => alert('Generate schedule')}>Generate Schedule</Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-700 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-2 min-h-[100px] hover:bg-gray-50 cursor-pointer">
                <div className="text-sm font-medium text-gray-700">{i + 1}</div>
                {i % 7 === 0 && (
                  <div className="mt-2 text-xs text-blue-600">2 Day</div>
                )}
                {i % 7 === 1 && (
                  <div className="mt-2 text-xs text-green-600">3 Night</div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedView === 'shifts' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shift Assignments</h2>
            <Button onClick={() => alert('Assign shift')}>Assign Shift</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shifts.map((shift) => (
                  <tr key={shift.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{shift.staff}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shift.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shift.shift}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shift.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        shift.status === 'Scheduled' ? 'bg-green-100 text-green-800' :
                        shift.status === 'On-Call' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {shift.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {selectedView === 'requests' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Leave & Vacation Requests</h2>
            <Button onClick={() => alert('View all requests')}>View All</Button>
          </div>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.staff}</h3>
                    <p className="text-sm text-gray-600 mt-1">{request.type}</p>
                    <p className="text-xs text-gray-500 mt-1">{request.start} to {request.end}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                    {request.status === 'Pending' && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => alert('Approve request')}>Approve</Button>
                        <Button size="sm" variant="danger" onClick={() => alert('Deny request')}>Deny</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Overtime Analysis */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Overtime & Staffing Gap Analysis</h2>
        <DashboardGrid columns={3}>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">142 hrs</div>
            <p className="text-sm text-gray-600 mt-1">This Week</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">8</div>
            <p className="text-sm text-gray-600 mt-1">Open Shifts</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">96%</div>
            <p className="text-sm text-gray-600 mt-1">Coverage Rate</p>
          </div>
        </DashboardGrid>
      </Card>
    </div>
  );
}

