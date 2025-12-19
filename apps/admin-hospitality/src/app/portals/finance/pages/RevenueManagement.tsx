import React, { useState } from 'react';
import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function RevenueManagement() {
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');

  const properties = ['All Properties', 'Grand Hotel Downtown', 'Seaside Resort', 'Mountain Estate'];
  const periods = ['Week', 'Month', 'Quarter', 'Year'];

  const revenueData = [
    {
      property: 'Grand Hotel Downtown',
      revenue: 1250000,
      occupancy: 78,
      adr: 182,
      revpar: 142,
      trend: 12
    },
    {
      property: 'Seaside Resort',
      revenue: 980000,
      occupancy: 82,
      adr: 195,
      revpar: 160,
      trend: 8
    },
    {
      property: 'Mountain Estate',
      revenue: 750000,
      occupancy: 65,
      adr: 220,
      revpar: 143,
      trend: 15
    },
  ];

  const pricingRules = [
    {
      id: 1,
      property: 'Grand Hotel Downtown',
      rule: 'Dynamic Pricing - Peak Season',
      threshold: 'Occupancy > 85%',
      adjustment: '+15%',
      status: 'Active'
    },
    {
      id: 2,
      property: 'Seaside Resort',
      rule: 'Group Booking Discount',
      threshold: 'Groups > 10 rooms',
      adjustment: '-10%',
      status: 'Active'
    },
    {
      id: 3,
      property: 'Mountain Estate',
      rule: 'Corporate Rate',
      threshold: 'Corporate bookings',
      adjustment: '-20%',
      status: 'Active'
    },
  ];

  const forecasts = [
    { month: 'Nov 2025', revenue: 3200000, occupancy: 85 },
    { month: 'Dec 2025', revenue: 3800000, occupancy: 92 },
    { month: 'Jan 2026', revenue: 2800000, occupancy: 72 },
    { month: 'Feb 2026', revenue: 2600000, occupancy: 68 },
  ];

  const filteredData = selectedProperty === 'all' 
    ? revenueData 
    : revenueData.filter(d => d.property === selectedProperty);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Multi-Property Revenue Management</h1>
        <p className="text-gray-600 mt-2">Set dynamic pricing rules, define event package profitability, and optimize booking rates</p>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
        >
          {properties.map(prop => (
            <option key={prop} value={prop === 'All Properties' ? 'all' : prop}>{prop}</option>
          ))}
        </select>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          {periods.map(period => (
            <option key={period} value={period.toLowerCase()}>{period}</option>
          ))}
        </select>
        <Button>Create Pricing Rule</Button>
        <Button variant="outline">Generate Forecast</Button>
      </div>

      {/* Revenue Metrics */}
      <DashboardGrid columns={4}>
        {filteredData.map((data, idx) => (
          <div key={idx} className="col-span-1">
            <Card>
              <h3 className="text-sm font-medium text-gray-500 mb-2">{data.property}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Revenue</span>
                  <span className="text-sm font-bold text-gray-900">${(data.revenue / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Occupancy</span>
                  <span className="text-sm font-bold text-green-600">{data.occupancy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">ADR</span>
                  <span className="text-sm font-bold text-blue-600">${data.adr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">RevPAR</span>
                  <span className="text-sm font-bold text-purple-600">${data.revpar}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-xs text-gray-600">Trend</span>
                  <span className={`text-xs font-bold ${data.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.trend > 0 ? '+' : ''}{data.trend}%
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </DashboardGrid>

      {/* Pricing Rules */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Dynamic Pricing Rules</h3>
          <Button>Add New Rule</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threshold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Adjustment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pricingRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.property}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.rule}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rule.threshold}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${
                      rule.adjustment.startsWith('+') ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {rule.adjustment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Event Package Profitability */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Event Package Profitability Thresholds</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-gray-900">Wedding Packages</p>
            <p className="text-2xl font-bold text-green-600 mt-2">$15,000</p>
            <p className="text-xs text-gray-600 mt-1">Minimum profitable threshold</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-gray-900">Corporate Events</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">$8,000</p>
            <p className="text-xs text-gray-600 mt-1">Minimum profitable threshold</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm font-medium text-gray-900">Private Events</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">$12,000</p>
            <p className="text-xs text-gray-600 mt-1">Minimum profitable threshold</p>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline">Configure Thresholds</Button>
        </div>
      </Card>

      {/* Revenue Forecast */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Revenue Forecast Across Seasons</h3>
        <div className="space-y-3">
          {forecasts.map((forecast, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-900">{forecast.month}</span>
                <span className="font-bold text-gray-900">${(forecast.revenue / 1000).toFixed(0)}k</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    forecast.occupancy > 85 ? 'bg-green-500' :
                    forecast.occupancy > 70 ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${forecast.occupancy}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Occupancy: {forecast.occupancy}%</span>
                <span>Est. Revenue: ${(forecast.revenue / 1000).toFixed(0)}k</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Group & Corporate Booking Rates */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Group & Corporate Booking Rate Optimization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Group Booking Rates</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>10-20 rooms</span>
                <span className="font-bold text-gray-900">-10%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>21-50 rooms</span>
                <span className="font-bold text-gray-900">-15%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>51+ rooms</span>
                <span className="font-bold text-gray-900">-20%</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Corporate Booking Rates</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Standard Corporate</span>
                <span className="font-bold text-gray-900">-15%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Preferred Corporate</span>
                <span className="font-bold text-gray-900">-20%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Elite Corporate</span>
                <span className="font-bold text-gray-900">-25%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline">Optimize Rates</Button>
        </div>
      </Card>
    </div>
  );
}
