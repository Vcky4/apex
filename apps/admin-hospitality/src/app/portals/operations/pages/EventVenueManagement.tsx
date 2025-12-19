import React, { useState } from 'react';
import { Card, Button, StatCard } from '@apex-providers/ui-components';

export default function EventVenueManagement() {
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const venues = ['All Venues', 'Grand Ballroom', 'Garden Pavilion', 'Beachfront Terrace', 'Mountain View Hall'];
  const statuses = ['All Statuses', 'Available', 'Booked', 'Maintenance', 'Setup'];

  const venueData = [
    {
      id: 1,
      name: 'Grand Ballroom',
      capacity: 300,
      currentBooking: 250,
      utilization: 83,
      status: 'Booked',
      nextEvent: 'Grand Wedding - Johnson Family',
      eventDate: '2025-11-15',
      setupRequired: true,
      safetyCompliant: true
    },
    {
      id: 2,
      name: 'Garden Pavilion',
      capacity: 150,
      currentBooking: 0,
      utilization: 0,
      status: 'Available',
      nextEvent: null,
      eventDate: null,
      setupRequired: false,
      safetyCompliant: true
    },
    {
      id: 3,
      name: 'Beachfront Terrace',
      capacity: 200,
      currentBooking: 180,
      utilization: 90,
      status: 'Setup',
      nextEvent: 'Corporate Retreat - Tech Corp',
      eventDate: '2025-11-20',
      setupRequired: true,
      safetyCompliant: true
    },
    {
      id: 4,
      name: 'Mountain View Hall',
      capacity: 100,
      currentBooking: 0,
      utilization: 0,
      status: 'Maintenance',
      nextEvent: null,
      eventDate: null,
      setupRequired: false,
      safetyCompliant: false
    },
  ];

  const eventLayouts = [
    {
      id: 1,
      event: 'Grand Wedding - Johnson Family',
      venue: 'Grand Ballroom',
      layout: 'Reception Style',
      capacity: 250,
      approved: true,
      approvalDate: '2025-10-20',
      setupDate: '2025-11-14'
    },
    {
      id: 2,
      event: 'Corporate Retreat - Tech Corp',
      venue: 'Beachfront Terrace',
      layout: 'Conference Style',
      capacity: 180,
      approved: true,
      approvalDate: '2025-10-25',
      setupDate: '2025-11-19'
    },
    {
      id: 3,
      event: 'Private Gala - Annual Fundraiser',
      venue: 'Garden Pavilion',
      layout: 'Cocktail Style',
      capacity: 120,
      approved: false,
      approvalDate: null,
      setupDate: '2025-11-10'
    },
  ];

  const vendorAccess = [
    {
      id: 1,
      vendor: 'Catering Excellence Co.',
      event: 'Grand Wedding - Johnson Family',
      venue: 'Grand Ballroom',
      accessType: 'Full Access',
      accessStart: '2025-11-14 08:00',
      accessEnd: '2025-11-15 23:00',
      status: 'Approved'
    },
    {
      id: 2,
      vendor: 'Floral Designs Ltd.',
      event: 'Grand Wedding - Johnson Family',
      venue: 'Grand Ballroom',
      accessType: 'Setup Only',
      accessStart: '2025-11-14 10:00',
      accessEnd: '2025-11-14 18:00',
      status: 'Approved'
    },
    {
      id: 3,
      vendor: 'Audio Visual Pro',
      event: 'Corporate Retreat - Tech Corp',
      venue: 'Beachfront Terrace',
      accessType: 'Full Access',
      accessStart: '2025-11-19 09:00',
      accessEnd: '2025-11-20 20:00',
      status: 'Pending'
    },
  ];

  const safetyRegulations = [
    {
      venue: 'Grand Ballroom',
      maxCapacity: 300,
      currentOccupancy: 250,
      fireExits: 4,
      compliance: 'Compliant',
      lastInspection: '2025-10-01'
    },
    {
      venue: 'Garden Pavilion',
      maxCapacity: 150,
      currentOccupancy: 0,
      fireExits: 2,
      compliance: 'Compliant',
      lastInspection: '2025-09-15'
    },
    {
      venue: 'Beachfront Terrace',
      maxCapacity: 200,
      currentOccupancy: 180,
      fireExits: 3,
      compliance: 'Compliant',
      lastInspection: '2025-10-10'
    },
    {
      venue: 'Mountain View Hall',
      maxCapacity: 100,
      currentOccupancy: 0,
      fireExits: 2,
      compliance: 'Non-Compliant',
      lastInspection: '2025-08-20'
    },
  ];

  const stats = {
    totalVenues: 4,
    availableVenues: 1,
    bookedVenues: 2,
    totalCapacity: 750,
    avgUtilization: 43
  };

  const filteredVenues = selectedVenue === 'all'
    ? venueData
    : venueData.filter(v => v.name === selectedVenue);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Booked': return 'bg-blue-100 text-blue-800';
      case 'Setup': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (compliance: string) => {
    return compliance === 'Compliant'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Event Venue Management</h1>
        <p className="text-gray-600 mt-2">Define venue capacity limits, approve event layouts, control vendor access, enforce safety regulations</p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Venues"
          value={stats.totalVenues.toString()}
          icon={<span className="text-xl">🏛️</span>}
          color="blue"
        />
        <StatCard
          title="Available"
          value={stats.availableVenues.toString()}
          icon={<span className="text-xl">✅</span>}
          color="green"
        />
        <StatCard
          title="Booked"
          value={stats.bookedVenues.toString()}
          icon={<span className="text-xl">📅</span>}
          color="purple"
        />
        <StatCard
          title="Total Capacity"
          value={stats.totalCapacity.toString()}
          icon={<span className="text-xl">👥</span>}
          color="gold"
        />
        <StatCard
          title="Avg Utilization"
          value={`${stats.avgUtilization}%`}
          icon={<span className="text-xl">📊</span>}
          color="orange"
        />
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
        >
          {venues.map(venue => (
            <option key={venue} value={venue === 'All Venues' ? 'all' : venue}>{venue}</option>
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
        <Button>Define Capacity</Button>
        <Button variant="outline">Approve Layout</Button>
      </div>

      {/* Venue Capacity Limits */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Venue Capacity & Status</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Booking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVenues.map((venue) => (
                <tr key={venue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{venue.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{venue.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venue.currentBooking}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            venue.utilization >= 80 ? 'bg-red-500' :
                            venue.utilization >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${venue.utilization}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{venue.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {venue.nextEvent ? (
                        <>
                          <div>{venue.nextEvent}</div>
                          <div className="text-xs">{venue.eventDate}</div>
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(venue.status)}`}>
                      {venue.status}
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

      {/* Event Layouts */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Approved Event Layouts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Layout</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setup Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eventLayouts.map((layout) => (
                <tr key={layout.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{layout.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{layout.venue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{layout.layout}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{layout.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {layout.approved ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Approved
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{layout.setupDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {!layout.approved && (
                      <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                    )}
                    <button className="text-blue-600 hover:text-blue-900">View Layout</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Vendor Access Rules */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Vendor Access Control</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access Window</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendorAccess.map((access) => (
                <tr key={access.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{access.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{access.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{access.venue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {access.accessType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{access.accessStart}</div>
                    <div className="text-xs">to {access.accessEnd}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      access.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {access.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {access.status === 'Pending' && (
                      <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                    )}
                    <button className="text-blue-600 hover:text-blue-900">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Safety & Crowd Regulations */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Safety & Crowd Regulations Compliance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Occupancy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fire Exits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Inspection</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {safetyRegulations.map((regulation, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{regulation.venue}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{regulation.maxCapacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{regulation.currentOccupancy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{regulation.fireExits}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getComplianceColor(regulation.compliance)}`}>
                      {regulation.compliance}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{regulation.lastInspection}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
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
