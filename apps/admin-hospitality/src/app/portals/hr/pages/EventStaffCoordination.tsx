import React, { useState } from 'react';
import { Card, Button, StatCard } from '@apex-providers/ui-components';

export default function EventStaffCoordination() {
  const [selectedEventType, setSelectedEventType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const eventTypes = ['All Events', 'Wedding', 'Corporate', 'Private'];
  const statuses = ['All Statuses', 'Scheduled', 'In Progress', 'Completed'];

  const events = [
    {
      id: 1,
      name: 'Grand Wedding - Johnson Family',
      type: 'Wedding',
      date: '2025-11-15',
      guestCount: 250,
      staffAssigned: 15,
      staffToGuestRatio: '1:17',
      status: 'Scheduled',
      certifications: ['Food Safety', 'Event Management'],
      workload: 'Normal'
    },
    {
      id: 2,
      name: 'Corporate Retreat - Tech Corp',
      type: 'Corporate',
      date: '2025-11-20',
      guestCount: 120,
      staffAssigned: 8,
      staffToGuestRatio: '1:15',
      status: 'Scheduled',
      certifications: ['Corporate Service'],
      workload: 'Normal'
    },
    {
      id: 3,
      name: 'Private Gala - Annual Fundraiser',
      type: 'Private',
      date: '2025-11-10',
      guestCount: 180,
      staffAssigned: 12,
      staffToGuestRatio: '1:15',
      status: 'In Progress',
      certifications: ['VIP Service', 'Event Management'],
      workload: 'High'
    },
  ];

  const staffAssignments = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      event: 'Grand Wedding - Johnson Family',
      role: 'Event Coordinator',
      certifications: ['Event Management', 'Food Safety'],
      maxWorkload: 2,
      currentWorkload: 1,
      status: 'Assigned'
    },
    {
      id: 2,
      name: 'James Chen',
      event: 'Corporate Retreat - Tech Corp',
      role: 'Service Lead',
      certifications: ['Corporate Service'],
      maxWorkload: 3,
      currentWorkload: 2,
      status: 'Assigned'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      event: 'Private Gala - Annual Fundraiser',
      role: 'VIP Concierge',
      certifications: ['VIP Service', 'Event Management'],
      maxWorkload: 2,
      currentWorkload: 2,
      status: 'At Capacity'
    },
  ];

  const stats = {
    totalEvents: 12,
    scheduled: 8,
    inProgress: 2,
    completed: 2,
    avgStaffRatio: '1:16'
  };

  const filteredEvents = events.filter(event => {
    if (selectedEventType !== 'all' && event.type !== selectedEventType) return false;
    if (selectedStatus !== 'all' && event.status !== selectedStatus) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'At Capacity': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'High': return 'text-red-600';
      case 'Normal': return 'text-green-600';
      case 'Low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Event Staff Coordination</h1>
        <p className="text-gray-600 mt-2">Deploy staff per event type, assign specialized training, and monitor staff-to-guest ratios</p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Events"
          value={stats.totalEvents.toString()}
          icon={<span className="text-xl">📅</span>}
          color="blue"
        />
        <StatCard
          title="Scheduled"
          value={stats.scheduled.toString()}
          icon={<span className="text-xl">⏰</span>}
          color="blue"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress.toString()}
          icon={<span className="text-xl">🔄</span>}
          color="green"
        />
        <StatCard
          title="Completed"
          value={stats.completed.toString()}
          icon={<span className="text-xl">✅</span>}
          color="gray"
        />
        <StatCard
          title="Avg Staff Ratio"
          value={stats.avgStaffRatio}
          icon={<span className="text-xl">👥</span>}
          color="purple"
        />
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedEventType}
          onChange={(e) => setSelectedEventType(e.target.value)}
        >
          {eventTypes.map(type => (
            <option key={type} value={type === 'All Events' ? 'all' : type}>{type}</option>
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
        <Button>Assign Staff to Event</Button>
        <Button variant="outline">Bulk Assignment</Button>
      </div>

      {/* Events List */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Upcoming & Active Events</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ratio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workload</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{event.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {event.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.guestCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.staffAssigned}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.staffToGuestRatio}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getWorkloadColor(event.workload)}`}>
                      {event.workload}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
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

      {/* Staff Assignments */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Staff Assignments & Workload</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certifications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workload</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{assignment.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {assignment.certifications.map((cert, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {assignment.currentWorkload} / {assignment.maxWorkload}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          assignment.currentWorkload >= assignment.maxWorkload
                            ? 'bg-red-500'
                            : assignment.currentWorkload >= assignment.maxWorkload * 0.8
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${(assignment.currentWorkload / assignment.maxWorkload) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Reassign</button>
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
          <h3 className="font-bold text-gray-900 mb-4">Admin Controls</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Event Workload per Staff Member
              </label>
              <input
                type="number"
                defaultValue={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Maximum number of concurrent events per staff member</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mandatory Certifications Before Event Assignment
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Food Safety Certification</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm">Event Management Certification</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">VIP Service Certification</span>
                </label>
              </div>
            </div>
            <Button>Save Settings</Button>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Training Requirements</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Wedding Events</p>
              <p className="text-xs text-gray-600 mt-1">Requires: Event Management, Food Safety, VIP Service</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Corporate Events</p>
              <p className="text-xs text-gray-600 mt-1">Requires: Corporate Service, Event Management</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Private Events</p>
              <p className="text-xs text-gray-600 mt-1">Requires: VIP Service, Event Management</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
