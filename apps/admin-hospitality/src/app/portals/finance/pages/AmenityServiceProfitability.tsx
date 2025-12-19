import React, { useState } from 'react';
import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function AmenityServiceProfitability() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['All Categories', 'Spa', 'Dining', 'Concierge', 'Transport'];

  const services = [
    {
      id: 1,
      name: 'Luxury Spa Treatments',
      category: 'Spa',
      revenue: 125000,
      cost: 45000,
      profit: 80000,
      roi: 178,
      utilization: 85,
      status: 'Performing'
    },
    {
      id: 2,
      name: 'Fine Dining Restaurant',
      category: 'Dining',
      revenue: 280000,
      cost: 150000,
      profit: 130000,
      roi: 87,
      utilization: 92,
      status: 'Performing'
    },
    {
      id: 3,
      name: 'VIP Concierge Service',
      category: 'Concierge',
      revenue: 95000,
      cost: 35000,
      profit: 60000,
      roi: 171,
      utilization: 78,
      status: 'Performing'
    },
    {
      id: 4,
      name: 'Private Transport',
      category: 'Transport',
      revenue: 45000,
      cost: 38000,
      profit: 7000,
      roi: 18,
      utilization: 45,
      status: 'Underperforming'
    },
    {
      id: 5,
      name: 'Poolside Bar',
      category: 'Dining',
      revenue: 120000,
      cost: 55000,
      profit: 65000,
      roi: 118,
      utilization: 68,
      status: 'Performing'
    },
    {
      id: 6,
      name: 'Personal Shopping Service',
      category: 'Concierge',
      revenue: 35000,
      cost: 28000,
      profit: 7000,
      roi: 25,
      utilization: 35,
      status: 'Underperforming'
    },
  ];

  const stats = {
    totalRevenue: 660000,
    totalCost: 351000,
    totalProfit: 309000,
    avgROI: 96,
    underperformingServices: 2
  };

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const getStatusColor = (status: string) => {
    return status === 'Performing' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getROIColor = (roi: number) => {
    if (roi >= 100) return 'text-green-600';
    if (roi >= 50) return 'text-blue-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Amenity & Service Profitability</h1>
        <p className="text-gray-600 mt-2">Analyze spa, dining, concierge, and transport ROI. Identify underperforming services and adjust pricing</p>
      </div>

      {/* Statistics Overview */}
      <DashboardGrid columns={5}>
        <StatCard
          title="Total Revenue"
          value={`$${(stats.totalRevenue / 1000).toFixed(0)}k`}
          icon={<span className="text-xl">💰</span>}
          color="green"
        />
        <StatCard
          title="Total Cost"
          value={`$${(stats.totalCost / 1000).toFixed(0)}k`}
          icon={<span className="text-xl">💸</span>}
          color="red"
        />
        <StatCard
          title="Total Profit"
          value={`$${(stats.totalProfit / 1000).toFixed(0)}k`}
          icon={<span className="text-xl">📈</span>}
          color="blue"
        />
        <StatCard
          title="Avg ROI"
          value={`${stats.avgROI}%`}
          icon={<span className="text-xl">📊</span>}
          color="purple"
        />
        <StatCard
          title="Underperforming"
          value={stats.underperformingServices.toString()}
          icon={<span className="text-xl">⚠️</span>}
          color="orange"
        />
      </DashboardGrid>

      {/* Filters */}
      <div className="flex space-x-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat === 'All Categories' ? 'all' : cat}>{cat}</option>
          ))}
        </select>
        <Button>Adjust Pricing</Button>
        <Button variant="outline">Generate Report</Button>
      </div>

      {/* Services List */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Service Profitability Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${service.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${service.cost.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${service.profit.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${getROIColor(service.roi)}`}>
                      {service.roi}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            service.utilization >= 70 ? 'bg-green-500' :
                            service.utilization >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${service.utilization}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{service.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Analyze</button>
                    <button className="text-gray-600 hover:text-gray-900">Adjust</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Underperforming Services */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Underperforming Services Requiring Attention</h3>
        <div className="space-y-4">
          {services
            .filter(s => s.status === 'Underperforming')
            .map((service) => (
              <div key={service.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{service.category}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    {service.status}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500">ROI</p>
                    <p className="text-sm font-bold text-red-600">{service.roi}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Utilization</p>
                    <p className="text-sm font-bold text-gray-900">{service.utilization}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Profit</p>
                    <p className="text-sm font-bold text-gray-900">${service.profit.toLocaleString()}</p>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">Adjust Pricing</Button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  <p><strong>Recommendation:</strong> Consider increasing pricing by 15-20% or reducing service availability to improve profitability.</p>
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.filter(cat => cat !== 'All Categories').map((category) => {
          const categoryServices = services.filter(s => s.category === category);
          const categoryRevenue = categoryServices.reduce((sum, s) => sum + s.revenue, 0);
          const categoryProfit = categoryServices.reduce((sum, s) => sum + s.profit, 0);
          const categoryROI = categoryRevenue > 0 ? Math.round((categoryProfit / (categoryRevenue - categoryProfit)) * 100) : 0;

          return (
            <Card key={category}>
              <h3 className="font-bold text-gray-900 mb-3">{category}</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-lg font-bold text-gray-900">${(categoryRevenue / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Profit</p>
                  <p className="text-lg font-bold text-green-600">${(categoryProfit / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ROI</p>
                  <p className={`text-lg font-bold ${getROIColor(categoryROI)}`}>{categoryROI}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Services</p>
                  <p className="text-sm font-medium text-gray-900">{categoryServices.length} active</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Pricing Adjustment Recommendations */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-4">Pricing Adjustment Recommendations</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">Private Transport Service</p>
                <p className="text-xs text-gray-600 mt-1">Current ROI: 18% | Recommended: Increase pricing by 25%</p>
              </div>
              <Button variant="outline">Apply</Button>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">Personal Shopping Service</p>
                <p className="text-xs text-gray-600 mt-1">Current ROI: 25% | Recommended: Increase pricing by 20% or reduce availability</p>
              </div>
              <Button variant="outline">Apply</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
