import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface Visitor {
  id: string;
  visitorName: string;
  hostName: string;
  hostType: 'Teacher' | 'Staff' | 'Student';
  purpose: 'Meeting' | 'Pick-up' | 'Event' | 'Volunteer' | 'Contractor';
  checkInTime: string;
  checkOutTime?: string;
  status: 'Checked In' | 'Checked Out' | 'Overdue';
  studentName?: string;
  backgroundCheckStatus?: 'Required' | 'Completed' | 'Not Required';
}

export default function VisitorManagement() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: '1',
      visitorName: 'Jane Doe',
      hostName: 'Sarah Johnson',
      hostType: 'Teacher',
      purpose: 'Pick-up',
      checkInTime: '2024-01-25 14:30',
      status: 'Checked In',
      studentName: 'Emily Doe'
    },
    {
      id: '2',
      visitorName: 'Robert Smith',
      hostName: 'John Smith',
      hostType: 'Student',
      purpose: 'Parent-Teacher Meeting',
      checkInTime: '2024-01-25 10:00',
      checkOutTime: '2024-01-25 11:30',
      status: 'Checked Out'
    },
    {
      id: '3',
      visitorName: 'Mary Williams',
      hostName: 'Admin Office',
      hostType: 'Staff',
      purpose: 'Volunteer',
      checkInTime: '2024-01-25 09:00',
      status: 'Checked In',
      backgroundCheckStatus: 'Completed'
    }
  ]);

  const currentTime = new Date('2024-01-25 16:00');
  const overdueVisitors = visitors.filter(v => {
    if (v.status !== 'Checked In') return false;
    const checkIn = new Date(v.checkInTime);
    const hoursSinceCheckIn = (currentTime.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
    return hoursSinceCheckIn > 3; // Overdue if checked in more than 3 hours ago
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Checked In': return 'bg-green-100 text-green-800';
      case 'Checked Out': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case 'Pick-up': return 'bg-blue-100 text-blue-800';
      case 'Meeting': return 'bg-purple-100 text-purple-800';
      case 'Event': return 'bg-orange-100 text-orange-800';
      case 'Volunteer': return 'bg-yellow-100 text-yellow-800';
      case 'Contractor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Visitor Management</h1>
          <p className="text-gray-600 mt-2">Visitor registration, check-in/out, and security monitoring</p>
        </div>
        <Button>New Visitor Registration</Button>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Checked In Now" value={visitors.filter(v => v.status === 'Checked In').length} color="green" />
        <StatCard title="Today's Visitors" value={visitors.length} color="blue" />
        <StatCard title="Overdue Check-outs" value={overdueVisitors.length} color="red" />
        <StatCard title="This Week" value="145" color="purple" />
      </DashboardGrid>

      {/* Overdue Alert */}
      {overdueVisitors.length > 0 && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800">
                {overdueVisitors.length} visitor(s) on campus after check-out time or outside school hours
              </p>
              <p className="text-xs text-red-600 mt-1">Security alert - immediate action required</p>
            </div>
          </div>
        </div>
      )}

      {/* Current Visitors */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Current Visitors on Campus</h2>
          <div className="flex gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Purposes</option>
              <option>Pick-up</option>
              <option>Meeting</option>
              <option>Event</option>
            </select>
            <Button size="sm" variant="secondary">Bulk Check-out</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Background Check</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{visitor.visitorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{visitor.hostName}</div>
                    <div className="text-xs text-gray-500">{visitor.hostType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPurposeColor(visitor.purpose)}`}>
                      {visitor.purpose}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {visitor.studentName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{visitor.checkInTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {visitor.backgroundCheckStatus ? (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        visitor.backgroundCheckStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                        visitor.backgroundCheckStatus === 'Required' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {visitor.backgroundCheckStatus}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(visitor.status)}`}>
                      {visitor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {visitor.status === 'Checked In' && (
                        <button className="text-green-600 hover:text-green-900">Check Out</button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Visitor Registration Portal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Visitor Registration Portal</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Registration Flow</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>1. Host pre-registers visitor via portal</div>
                <div>2. Visitor receives QR code invitation</div>
                <div>3. Visitor checks in at kiosk/reception</div>
                <div>4. System tracks visitor status</div>
                <div>5. Automatic check-out or manual</div>
              </div>
            </div>
            <Button variant="secondary" fullWidth>Access Registration Portal</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Check-in/Check-out Kiosk</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Kiosk Features</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• QR code scanning</div>
                <div>• Digital signature capture</div>
                <div>• Badge printing</div>
                <div>• Quick check-out</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" fullWidth>Configure Kiosk</Button>
              <Button variant="secondary" fullWidth>View Status</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Early Dismissal Integration */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Early Dismissal Integration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Integration Status</div>
            <div className="flex items-center text-green-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">Active</span>
            </div>
            <div className="text-xs text-gray-600 mt-2">Linked to student records</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Today's Early Pickups</div>
            <div className="text-2xl font-bold text-blue-600 mb-2">8</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Automatic Logging</div>
            <div className="flex items-center text-green-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">Enabled</span>
            </div>
            <div className="text-xs text-gray-600 mt-2">All pickups logged</div>
          </div>
        </div>
      </Card>

      {/* Security Flagging & Alerts */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Security Flagging & Alerts</h2>
        <div className="space-y-3">
          <div className="p-3 border-l-4 border-yellow-400 bg-yellow-50 rounded">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-900">Visitor on Campus After Hours</div>
                <div className="text-sm text-gray-600 mt-1">Jane Doe - Checked in at 14:30, still on campus at 16:00</div>
              </div>
              <Button size="sm" variant="danger">Flag</Button>
            </div>
          </div>
          <div className="p-3 border-l-4 border-red-400 bg-red-50 rounded">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-900">Background Check Pending</div>
                <div className="text-sm text-gray-600 mt-1">Contractor requires background check before access</div>
              </div>
              <Button size="sm" variant="danger">Review</Button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" fullWidth>View All Security Alerts</Button>
        </div>
      </Card>
    </div>
  );
}