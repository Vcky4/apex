import React, { useState } from 'react';
import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function EventGuestAdministration() {
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const eventOptions = ['All Events', 'Grand Wedding - Johnson Family', 'Corporate Retreat - Tech Corp', 'Private Gala - Annual Fundraiser'];
  const statuses = ['All Statuses', 'Registered', 'Checked In', 'Checked Out', 'No Show'];

  const eventGuests = [
    {
      id: 1,
      name: 'John Smith',
      event: 'Grand Wedding - Johnson Family',
      accessType: 'VIP',
      qrCode: 'QR-2025-001',
      checkInTime: '2025-11-15 14:30',
      checkOutTime: null,
      creditEligible: true,
      creditBalance: 150,
      status: 'Checked In'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      event: 'Grand Wedding - Johnson Family',
      accessType: 'General',
      qrCode: 'QR-2025-002',
      checkInTime: null,
      checkOutTime: null,
      creditEligible: false,
      creditBalance: 0,
      status: 'Registered'
    },
    {
      id: 3,
      name: 'Mike Chen',
      event: 'Corporate Retreat - Tech Corp',
      accessType: 'VIP',
      qrCode: 'QR-2025-003',
      checkInTime: '2025-11-20 09:15',
      checkOutTime: '2025-11-20 18:45',
      creditEligible: true,
      creditBalance: 0,
      status: 'Checked Out'
    },
    {
      id: 4,
      name: 'Emily Davis',
      event: 'Private Gala - Annual Fundraiser',
      accessType: 'General',
      qrCode: 'QR-2025-004',
      checkInTime: null,
      checkOutTime: null,
      creditEligible: false,
      creditBalance: 0,
      status: 'Registered'
    },
  ];

  const events = [
    {
      id: 1,
      name: 'Grand Wedding - Johnson Family',
      date: '2025-11-15',
      capacity: 250,
      registered: 234,
      checkedIn: 198,
      capacityUsed: 79,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Corporate Retreat - Tech Corp',
      date: '2025-11-20',
      capacity: 180,
      registered: 165,
      checkedIn: 142,
      capacityUsed: 79,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Private Gala - Annual Fundraiser',
      date: '2025-11-10',
      capacity: 120,
      registered: 118,
      checkedIn: 95,
      capacityUsed: 79,
      status: 'Completed'
    },
  ];

  const stats = {
    totalEvents: 3,
    activeEvents: 2,
    totalGuests: 517,
    checkedIn: 435,
    capacityAlerts: 0
  };

  const filteredGuests = eventGuests.filter(guest => {
    if (selectedEvent !== 'all' && guest.event !== selectedEvent) return false;
    if (selectedStatus !== 'all' && guest.status !== selectedStatus) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Checked In': return 'bg-green-100 text-green-800';
      case 'Registered': return 'bg-blue-100 text-blue-800';
      case 'Checked Out': return 'bg-gray-100 text-gray-800';
      case 'No Show': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessTypeColor = (type: string) => {
    return type === 'VIP' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Event Guest Administration</h1>
        <p className="text-gray-600 mt-2">Import event guest lists, enforce capacity limits, enable QR/wristband systems, track attendance</p>
      </div>

      {/* Statistics Overview */}
      <DashboardGrid columns={5}>
        <StatCard
          title="Total Events"
          value={stats.totalEvents.toString()}
          icon={<span className="text-xl">🎉</span>}
          color="blue"
        />
        <StatCard
          title="Active Events"
          value={stats.activeEvents.toString()}
          icon={<span className="text-xl">✅</span>}
          color="green"
        />
        <StatCard
          title="Total Guests"
          value={stats.totalGuests.toString()}
          icon={<span className="text-xl">👥</span>}
          color="purple"
        />
        <StatCard
          title="Checked In"
          value={stats.checkedIn.toString()}
          icon={<span className="text-xl">✓</span>}
          color="green"
        />
        <StatCard
          title="Capacity Alerts"
          value={stats.capacityAlerts.toString()}
          icon={<span className="text-xl">⚠️</span>}
          color="orange"
        />
      </DashboardGrid>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          {eventOptions.map(event => (
            <option key={event} value={event === 'All Events' ? 'all' : event}>{event}</option>
          ))}
        </select>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status === 'All Statuses' ? 'all' : status}>{status}</option>
          ))}
        </select>
        <Button>Import Guest List</Button>
        <Button variant="outline">Generate QR Codes</Button>
        <Button variant="outline">Bulk Actions</Button>
      </div>

      {/* Events Overview */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Events & Capacity Management</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Checked In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.registered}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{event.checkedIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            event.capacityUsed >= 90 ? 'bg-red-500' :
                            event.capacityUsed >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${event.capacityUsed}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{event.capacityUsed}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      event.status === 'Active' ? 'bg-green-100 text-green-800' :
                      event.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Guest List */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Event Guest List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QR Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{guest.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getAccessTypeColor(guest.accessType)}`}>
                      {guest.accessType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{guest.qrCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.checkInTime || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guest.checkOutTime || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {guest.creditEligible ? (
                      <span className="text-sm font-medium text-green-600">${guest.creditBalance}</span>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(guest.status)}`}>
                      {guest.status}
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

      {/* Admin Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">VIP vs General Access Rules</h3>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm font-medium text-gray-900">VIP Access</p>
              <p className="text-xs text-gray-600 mt-1">Priority check-in, dedicated areas, enhanced credits</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-gray-900">General Access</p>
              <p className="text-xs text-gray-600 mt-1">Standard check-in, general areas, basic credits</p>
            </div>
            <Button variant="outline" className="w-full mt-4">Configure Access Rules</Button>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Credit Eligibility & Fraud Detection</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Credit Eligibility</p>
              <p className="text-xs text-gray-500 mt-1">Food, drinks, services credits per guest</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Fraud Detection</p>
              <p className="text-xs text-gray-500 mt-1">Monitor for duplicate QR codes and abuse</p>
            </div>
            <Button variant="outline" className="w-full mt-4">View Fraud Alerts</Button>
          </div>
        </Card>
      </div>

      {/* QR Code & Wristband Systems */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">QR Code & Wristband Systems</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">QR Code System</h4>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Auto-generated for all registered guests</p>
                <p className="text-sm font-medium text-gray-900 mt-1">✓ Enabled</p>
              </div>
              <Button variant="outline" className="w-full">Generate QR Codes</Button>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Wristband System</h4>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Physical wristbands for event access</p>
                <p className="text-sm font-medium text-gray-900 mt-1">✓ Available</p>
              </div>
              <Button variant="outline" className="w-full">Manage Wristbands</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
