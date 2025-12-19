import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem, Dashboard, StatCard, Card, DashboardGrid } from '@apex-providers/ui-components';
import RevenueManagement from './pages/RevenueManagement';
import EstateEventAccounting from './pages/EstateEventAccounting';
import AmenityServiceProfitability from './pages/AmenityServiceProfitability';

// Finance Executive Dashboard per design document
const FinanceDashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-charcoal-gray">Finance Executive Dashboard</h1>
      <p className="text-gray-600 mt-2">Full financial visibility and control across properties, estates, and events</p>
    </div>

    {/* What the admin sees */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Financial Overview</h2>
      <DashboardGrid columns={4}>
        <StatCard
          title="Revenue per Property"
          value="$2.98M"
          icon={<span className="text-xl">💰</span>}
          color="green"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Occupancy"
          value="78%"
          icon={<span className="text-xl">🏨</span>}
          color="blue"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="ADR"
          value="$182"
          icon={<span className="text-xl">💵</span>}
          color="purple"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="RevPAR"
          value="$142"
          icon={<span className="text-xl">📈</span>}
          color="gold"
          trend={{ value: 8, isPositive: true }}
        />
      </DashboardGrid>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Revenue by Property, Estate and Event */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Revenue Breakdown</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Property Revenue</span>
                <span className="font-bold">$2.4M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Estate Revenue</span>
                <span className="font-bold">$450k</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Event Contribution</span>
                <span className="font-bold">$130k</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '4%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Visitor-Paid Revenue</span>
                <span className="font-bold">$58k</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gold-500 h-2 rounded-full" style={{ width: '2%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Event Contribution to Total Revenue */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Event Contribution Trends</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Wedding Events</span>
                <span className="font-bold">$85k</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Corporate Events</span>
                <span className="font-bold">$35k</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '27%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Private Events</span>
                <span className="font-bold">$10k</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>

    {/* What the admin controls */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Admin Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Pricing Rules</h3>
          <p className="text-sm text-gray-600 mb-4">Set dynamic pricing and revenue targets</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Configure →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Platform Fees</h3>
          <p className="text-sm text-gray-600 mb-4">Manage fees on visitor payments</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Set Fees →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Event Commissions</h3>
          <p className="text-sm text-gray-600 mb-4">Define commission structures</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Revenue Targets</h3>
          <p className="text-sm text-gray-600 mb-4">Set and track revenue goals</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Set Targets →</button>
        </Card>
      </div>
    </section>
  </div>
);

interface FinancePortalProps {
  user: any;
  onLogout: () => void;
}

export default function FinancePortal({ user, onLogout }: FinancePortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/hospitality-estates/admin/finance/dashboard', icon: '📊' },
    { label: 'Revenue Management', href: '/hospitality-estates/admin/finance/revenue', icon: '💰' },
    { label: 'Estate & Event Accounting', href: '/hospitality-estates/admin/finance/estate-accounting', icon: '📋' },
    { label: 'Amenity & Service Profitability', href: '/hospitality-estates/admin/finance/amenities', icon: '✨' },
  ];

  return (
    <AdminLayout
      navigation={navigation}
      logo={<div className="font-bold text-xl">Hospitality Finance</div>}
      userMenu={
        <button onClick={onLogout} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
          Logout
        </button>
      }
      sidebarColor="bg-green-700" // Financial Green
    >
      <Routes>
        <Route path="dashboard" element={<FinanceDashboard />} />
        <Route path="revenue" element={<RevenueManagement />} />
        <Route path="estate-accounting" element={<EstateEventAccounting />} />
        <Route path="amenities" element={<AmenityServiceProfitability />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
