import React, { useState } from 'react';
import { Card, Button, StatCard } from '@apex-providers/ui-components';

export default function LuxuryServiceCoordination() {
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const services = ['All Services', 'Concierge', 'Wellness', 'Dining', 'Transport'];
  const statuses = ['All Statuses', 'Active', 'Pending Approval', 'Suspended'];

  const serviceMenus = [
    {
      id: 1,
      name: 'Ultra-Luxury Concierge',
      category: 'Concierge',
      basePrice: 500,
      capacity: 10,
      utilization: 85,
      qualityScore: 4.9,
      status: 'Active',
      vendor: 'Internal',
      approvalDate: '2025-01-15'
    },
    {
      id: 2,
      name: 'Spa & Wellness Packages',
      category: 'Wellness',
      basePrice: 350,
      capacity: 8,
      utilization: 92,
      qualityScore: 4.8,
      status: 'Active',
      vendor: 'Spa Excellence Co.',
      approvalDate: '2025-02-01'
    },
    {
      id: 3,
      name: 'Private Chef Service',
      category: 'Dining',
      basePrice: 800,
      capacity: 5,
      utilization: 78,
      qualityScore: 4.7,
      status: 'Active',
      vendor: 'Culinary Masters',
      approvalDate: '2025-01-20'
    },
    {
      id: 4,
      name: 'VIP Transport Service',
      category: 'Transport',
      basePrice: 250,
      capacity: 12,
      utilization: 65,
      qualityScore: 4.6,
      status: 'Pending Approval',
      vendor: 'Luxury Transport LLC',
      approvalDate: null
    },
  ];

  const vendorServices = [
    {
      id: 1,
      vendor: 'Spa Excellence Co.',
      service: 'Spa & Wellness Packages',
      serviceLevel: 'Premium',
      qualityRating: 4.8,
      responseTime: '15 min',
      status: 'Active',
      contractExpiry: '2026-03-01'
    },
    {
      id: 2,
      vendor: 'Culinary Masters',
      service: 'Private Chef Service',
      serviceLevel: 'Ultra-Luxury',
      qualityRating: 4.9,
      responseTime: '30 min',
      status: 'Active',
      contractExpiry: '2026-05-15'
    },
    {
      id: 3,
      vendor: 'Luxury Transport LLC',
      service: 'VIP Transport Service',
      serviceLevel: 'Premium',
      qualityRating: 4.6,
      responseTime: '20 min',
      status: 'Pending',
      contractExpiry: null
    },
  ];

  const qualityStandards = [
    {
      service: 'Concierge',
      standard: 'Response time < 5 minutes',
      compliance: 98,
      status: 'Compliant'
    },
    {
      service: 'Wellness',
      standard: 'Appointment availability > 80%',
      compliance: 92,
      status: 'Compliant'
    },
    {
      service: 'Dining',
      standard: 'Service quality rating > 4.5',
      compliance: 95,
      status: 'Compliant'
    },
    {
      service: 'Transport',
      standard: 'On-time arrival > 95%',
      compliance: 88,
      status: 'Needs Improvement'
    },
  ];

  const stats = {
    totalServices: 12,
    activeServices: 10,
    pendingApproval: 2,
    avgQualityScore: 4.75,
    totalCapacity: 35
  };

  const filteredServices = selectedService === 'all'
    ? serviceMenus
    : serviceMenus.filter(s => s.category === selectedService);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (status: string) => {
    return status === 'Compliant' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Luxury Service Coordination</h1>
        <p className="text-gray-600 mt-2">Approve service menus and pricing, control concierge and wellness capacity, manage vendor service levels</p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Services"
          value={stats.totalServices.toString()}
          icon={<span className="text-xl">✨</span>}
          color="blue"
        />
        <StatCard
          title="Active Services"
          value={stats.activeServices.toString()}
          icon={<span className="text-xl">✅</span>}
          color="green"
        />
        <StatCard
          title="Pending Approval"
          value={stats.pendingApproval.toString()}
          icon={<span className="text-xl">⏳</span>}
          color="orange"
        />
        <StatCard
          title="Avg Quality Score"
          value={stats.avgQualityScore.toFixed(1)}
          icon={<span className="text-xl">⭐</span>}
          color="gold"
        />
        <StatCard
          title="Total Capacity"
          value={stats.totalCapacity.toString()}
          icon={<span className="text-xl">👥</span>}
          color="purple"
        />
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          {services.map(service => (
            <option key={service} value={service === 'All Services' ? 'all' : service}>{service}</option>
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
        <Button>Approve Service</Button>
        <Button variant="outline">Add New Service</Button>
      </div>

      {/* Service Menus & Pricing */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Service Menus & Pricing</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${service.basePrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            service.utilization >= 80 ? 'bg-green-500' :
                            service.utilization >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${service.utilization}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{service.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-gray-900">{service.qualityScore}</span>
                      <span className="ml-1 text-yellow-500">⭐</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    {service.status === 'Pending Approval' && (
                      <button className="text-green-600 hover:text-green-900">Approve</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Vendor Service Levels */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Vendor Service Levels</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendorServices.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {vendor.serviceLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-gray-900">{vendor.qualityRating}</span>
                      <span className="ml-1 text-yellow-500">⭐</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.responseTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vendor.contractExpiry || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vendor.status)}`}>
                      {vendor.status}
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

      {/* Service Quality Standards */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Service Quality Standards Compliance</h3>
        <div className="space-y-3">
          {qualityStandards.map((standard, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">{standard.service}</p>
                  <p className="text-xs text-gray-600 mt-1">{standard.standard}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getComplianceColor(standard.status)}`}>
                  {standard.status}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div
                    className={`h-2 rounded-full ${
                      standard.compliance >= 95 ? 'bg-green-500' :
                      standard.compliance >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${standard.compliance}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-900">{standard.compliance}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Admin Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Capacity Control</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Control concierge capacity</p>
              <p className="text-xs text-gray-500 mt-1">Manage available slots and bookings</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Wellness capacity management</p>
              <p className="text-xs text-gray-500 mt-1">Control spa and wellness service availability</p>
            </div>
            <Button variant="outline" className="w-full mt-4">Manage Capacity</Button>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Enforce Service Quality Standards</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Quality monitoring</p>
              <p className="text-xs text-gray-500 mt-1">Track and enforce service quality metrics</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">✓ Vendor performance tracking</p>
              <p className="text-xs text-gray-500 mt-1">Monitor vendor service levels and compliance</p>
            </div>
            <Button variant="outline" className="w-full mt-4">View Standards</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
