import React, { useState } from 'react';
import { Card, Button, StatCard } from '@apex-providers/ui-components';

export default function LuxuryStaffManagement() {
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const properties = ['All Properties', 'Grand Hotel Downtown', 'Seaside Resort', 'Mountain Estate'];
  const tiers = ['All Tiers', 'Standard', 'VIP', 'Ultra-Luxury'];

  const staffMembers = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      tier: 'Ultra-Luxury',
      properties: ['Grand Hotel Downtown', 'Mountain Estate'],
      satisfactionScore: 4.9,
      guestCount: 127,
      revenueGenerated: '$45,200',
      status: 'Active'
    },
    {
      id: 2,
      name: 'James Chen',
      tier: 'VIP',
      properties: ['Seaside Resort'],
      satisfactionScore: 4.7,
      guestCount: 89,
      revenueGenerated: '$28,500',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      tier: 'Standard',
      properties: ['Grand Hotel Downtown'],
      satisfactionScore: 4.5,
      guestCount: 156,
      revenueGenerated: '$12,300',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Michael Thompson',
      tier: 'Ultra-Luxury',
      properties: ['Mountain Estate'],
      satisfactionScore: 4.8,
      guestCount: 94,
      revenueGenerated: '$38,900',
      status: 'Active'
    },
  ];

  const stats = {
    totalStaff: 24,
    ultraLuxury: 5,
    vip: 8,
    standard: 11,
    avgSatisfaction: 4.7
  };

  const filteredStaff = staffMembers.filter(staff => {
    if (selectedProperty !== 'all' && !staff.properties.includes(selectedProperty)) return false;
    if (selectedTier !== 'all' && staff.tier !== selectedTier) return false;
    return true;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Ultra-Luxury': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'VIP': return 'bg-gold-100 text-gold-800 border-gold-200';
      case 'Standard': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Luxury Staff Management</h1>
        <p className="text-gray-600 mt-2">Assign concierge and butler tiers, allocate staff across properties, and track service quality</p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Staff"
          value={stats.totalStaff.toString()}
          icon={<span className="text-xl">👥</span>}
          color="blue"
        />
        <StatCard
          title="Ultra-Luxury"
          value={stats.ultraLuxury.toString()}
          icon={<span className="text-xl">💎</span>}
          color="purple"
        />
        <StatCard
          title="VIP Tier"
          value={stats.vip.toString()}
          icon={<span className="text-xl">⭐</span>}
          color="gold"
        />
        <StatCard
          title="Standard"
          value={stats.standard.toString()}
          icon={<span className="text-xl">✨</span>}
          color="green"
        />
        <StatCard
          title="Avg Satisfaction"
          value={stats.avgSatisfaction.toFixed(1)}
          icon={<span className="text-xl">😊</span>}
          color="green"
        />
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
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value)}
        >
          {tiers.map(tier => (
            <option key={tier} value={tier === 'All Tiers' ? 'all' : tier}>{tier}</option>
          ))}
        </select>
        <Button>Assign Staff</Button>
      </div>

      {/* Staff List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Properties</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests Served</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                    <div className="text-sm text-gray-500">{staff.status}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getTierColor(staff.tier)}`}>
                      {staff.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {staff.properties.map((prop, idx) => (
                        <span key={idx} className="block">{prop}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{staff.satisfactionScore}</span>
                      <span className="ml-1 text-yellow-500">⭐</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.guestCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{staff.revenueGenerated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-3">
            {staffMembers
              .sort((a, b) => b.satisfactionScore - a.satisfactionScore)
              .slice(0, 3)
              .map((staff) => (
                <div key={staff.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{staff.name}</p>
                    <p className="text-xs text-gray-500">{staff.tier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{staff.satisfactionScore} ⭐</p>
                    <p className="text-xs text-gray-500">{staff.revenueGenerated}</p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-4">Service Quality Insights</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Direct link between service quality and revenue</span>
                <span className="font-bold text-green-600">✓ Verified</span>
              </div>
              <p className="text-xs text-gray-500">Ultra-Luxury tier generates 3.5x more revenue per guest</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Top performers identified</span>
                <span className="font-bold text-blue-600">5 Staff</span>
              </div>
              <p className="text-xs text-gray-500">Staff with 4.8+ satisfaction scores</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Service risks detected</span>
                <span className="font-bold text-orange-600">2 Staff</span>
              </div>
              <p className="text-xs text-gray-500">Satisfaction scores below 4.5 require attention</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
