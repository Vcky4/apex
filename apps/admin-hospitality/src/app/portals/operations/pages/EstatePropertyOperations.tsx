import React, { useState } from 'react';
import { Card, Button, StatCard } from '@apex-providers/ui-components';

export default function EstatePropertyOperations() {
  const [selectedEstate, setSelectedEstate] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const estates = ['All Estates', 'Mountain Estate', 'Seaside Estate', 'Urban Estate'];
  const statuses = ['All Statuses', 'Healthy', 'Maintenance Due', 'Renovation Scheduled', 'Inspection Required'];

  const estatesData = [
    {
      id: 1,
      name: 'Mountain Estate',
      health: 95,
      utilization: 78,
      maintenance: 'Up to Date',
      lastInspection: '2025-10-15',
      nextInspection: '2026-01-15',
      status: 'Healthy',
      assets: 45,
      issues: 0
    },
    {
      id: 2,
      name: 'Seaside Estate',
      health: 88,
      utilization: 82,
      maintenance: 'Scheduled',
      lastInspection: '2025-10-10',
      nextInspection: '2026-01-10',
      status: 'Healthy',
      assets: 38,
      issues: 2
    },
    {
      id: 3,
      name: 'Urban Estate',
      health: 92,
      utilization: 65,
      maintenance: 'Up to Date',
      lastInspection: '2025-09-28',
      nextInspection: '2025-12-28',
      status: 'Maintenance Due',
      assets: 52,
      issues: 1
    },
  ];

  const maintenanceItems = [
    {
      id: 1,
      estate: 'Mountain Estate',
      asset: 'HVAC System - Main Building',
      type: 'Preventive',
      scheduledDate: '2025-11-20',
      priority: 'Medium',
      status: 'Scheduled'
    },
    {
      id: 2,
      estate: 'Seaside Estate',
      asset: 'Pool Filtration System',
      type: 'Repair',
      scheduledDate: '2025-11-05',
      priority: 'High',
      status: 'In Progress'
    },
    {
      id: 3,
      estate: 'Urban Estate',
      asset: 'Security System Upgrade',
      type: 'Upgrade',
      scheduledDate: '2025-12-01',
      priority: 'Low',
      status: 'Planned'
    },
  ];

  const inspections = [
    {
      id: 1,
      estate: 'Mountain Estate',
      type: 'Annual Safety Inspection',
      scheduledDate: '2026-01-15',
      inspector: 'Safety Compliance Team',
      status: 'Scheduled'
    },
    {
      id: 2,
      estate: 'Seaside Estate',
      type: 'Fire Safety Inspection',
      scheduledDate: '2025-11-25',
      inspector: 'Fire Department',
      status: 'Pending'
    },
    {
      id: 3,
      estate: 'Urban Estate',
      type: 'Building Code Compliance',
      scheduledDate: '2025-12-10',
      inspector: 'City Building Inspector',
      status: 'Scheduled'
    },
  ];

  const stats = {
    totalEstates: 3,
    healthyEstates: 2,
    maintenanceDue: 1,
    avgHealth: 92,
    totalAssets: 135
  };

  const filteredEstates = selectedEstate === 'all'
    ? estatesData
    : estatesData.filter(e => e.name === selectedEstate);

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Maintenance Due': return 'bg-yellow-100 text-yellow-800';
      case 'Renovation Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Inspection Required': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Estate & Property Operations</h1>
        <p className="text-gray-600 mt-2">Monitor estate maintenance health, schedule inspections and renovations, enforce access policies</p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Estates"
          value={stats.totalEstates.toString()}
          icon={<span className="text-xl">🏛️</span>}
          color="blue"
        />
        <StatCard
          title="Healthy Estates"
          value={stats.healthyEstates.toString()}
          icon={<span className="text-xl">✅</span>}
          color="green"
        />
        <StatCard
          title="Maintenance Due"
          value={stats.maintenanceDue.toString()}
          icon={<span className="text-xl">⚠️</span>}
          color="orange"
        />
        <StatCard
          title="Avg Health"
          value={`${stats.avgHealth}%`}
          icon={<span className="text-xl">💚</span>}
          color="green"
        />
        <StatCard
          title="Total Assets"
          value={stats.totalAssets.toString()}
          icon={<span className="text-xl">🏗️</span>}
          color="purple"
        />
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedEstate}
          onChange={(e) => setSelectedEstate(e.target.value)}
        >
          {estates.map(estate => (
            <option key={estate} value={estate === 'All Estates' ? 'all' : estate}>{estate}</option>
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
        <Button>Schedule Inspection</Button>
        <Button variant="outline">Plan Renovation</Button>
      </div>

      {/* Estate Health Overview */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Estate Maintenance Health</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issues</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Inspection</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEstates.map((estate) => (
                <tr key={estate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{estate.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            estate.health >= 90 ? 'bg-green-500' :
                            estate.health >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${estate.health}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold ${getHealthColor(estate.health)}`}>
                        {estate.health}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estate.utilization}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estate.assets}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${estate.issues === 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {estate.issues}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estate.lastInspection}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(estate.status)}`}>
                      {estate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Maintenance Schedule */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Maintenance Schedule</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenanceItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.estate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.asset}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.scheduledDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      item.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
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

      {/* Inspections & Renovations */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Scheduled Inspections</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspection Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inspection.estate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inspection.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inspection.scheduledDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inspection.inspector}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      inspection.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inspection.status}
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

      {/* Admin Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Access & Security Policies</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Enforce access policies</p>
              <p className="text-xs text-gray-500 mt-1">Control visitor and staff access to estates</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Security personnel rotation</p>
              <p className="text-xs text-gray-500 mt-1">Manage security team schedules</p>
            </div>
            <Button variant="outline" className="w-full mt-4">Manage Policies</Button>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Asset Lifecycle Tracking</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Track asset lifecycle</p>
              <p className="text-xs text-gray-500 mt-1">Monitor asset health and replacement schedules</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Renovation planning</p>
              <p className="text-xs text-gray-500 mt-1">Schedule and track property improvements</p>
            </div>
            <Button variant="outline" className="w-full mt-4">View Assets</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
