import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem, Dashboard, StatCard, Card, DashboardGrid } from '@apex-providers/ui-components';
import EstatePropertyOperations from './pages/EstatePropertyOperations';
import LuxuryServiceCoordination from './pages/LuxuryServiceCoordination';
import EventVenueManagement from './pages/EventVenueManagement';

// Operations Executive Dashboard per design document
const OperationsDashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-charcoal-gray">Operations Executive Dashboard</h1>
      <p className="text-gray-600 mt-2">Ensure guest experience consistency and asset health</p>
    </div>

    {/* What the admin sees */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Operations Overview</h2>
      <DashboardGrid columns={4}>
        <StatCard
          title="Guest Satisfaction"
          value="4.8/5"
          icon={<span className="text-xl">⭐</span>}
          color="gold"
          trend={{ value: 0.2, isPositive: true }}
        />
        <StatCard
          title="Response Time"
          value="12m"
          icon={<span className="text-xl">⏱️</span>}
          color="blue"
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Estate Utilization"
          value="78%"
          icon={<span className="text-xl">🏛️</span>}
          color="green"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Event Quality Score"
          value="4.7/5"
          icon={<span className="text-xl">🎉</span>}
          color="purple"
        />
      </DashboardGrid>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Service Request Resolution Times */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Service Request Resolution</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Average Resolution Time</span>
                <span className="font-bold text-green-600">12 minutes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Urgent Requests</span>
                <span className="font-bold text-red-600">5 min avg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Standard Requests</span>
                <span className="font-bold text-blue-600">15 min avg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Estate Utilization Rates */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Estate Utilization Rates</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Mountain Estate</span>
                <span className="font-bold">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Seaside Estate</span>
                <span className="font-bold">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Urban Estate</span>
                <span className="font-bold">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>

    {/* Event Execution Quality Scores */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Event Execution Quality Scores</h2>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Wedding Events</p>
            <p className="text-2xl font-bold text-green-600">4.9/5</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Corporate Events</p>
            <p className="text-2xl font-bold text-blue-600">4.6/5</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Private Events</p>
            <p className="text-2xl font-bold text-purple-600">4.7/5</p>
          </div>
        </div>
      </Card>
    </section>

    {/* What the admin controls */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Admin Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Service-Level Standards</h3>
          <p className="text-sm text-gray-600 mb-4">Set SLAs for response times and service quality</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Configure SLAs →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Maintenance Response</h3>
          <p className="text-sm text-gray-600 mb-4">Define maintenance response timelines</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Set Timelines →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Event Setup Rules</h3>
          <p className="text-sm text-gray-600 mb-4">Control event setup and teardown procedures</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage Rules →</button>
        </Card>
      </div>
    </section>
  </div>
);

interface OperationsPortalProps {
  user: any;
  onLogout: () => void;
}

export default function OperationsPortal({ user, onLogout }: OperationsPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/hospitality-estates/admin/operations/dashboard', icon: '📊' },
    { label: 'Estate & Property Operations', href: '/hospitality-estates/admin/operations/estates', icon: '🏛️' },
    { label: 'Luxury Service Coordination', href: '/hospitality-estates/admin/operations/services', icon: '✨' },
    { label: 'Event Venue Management', href: '/hospitality-estates/admin/operations/venues', icon: '🎉' },
  ];

  return (
    <AdminLayout
      navigation={navigation}
      logo={<div className="font-bold text-xl">Guest Services</div>}
      userMenu={
        <button onClick={onLogout} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
          Logout
        </button>
      }
      sidebarColor="bg-blue-700" // Operational Blue
    >
      <Routes>
        <Route path="dashboard" element={<OperationsDashboard />} />
        <Route path="estates" element={<EstatePropertyOperations />} />
        <Route path="services" element={<LuxuryServiceCoordination />} />
        <Route path="venues" element={<EventVenueManagement />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
