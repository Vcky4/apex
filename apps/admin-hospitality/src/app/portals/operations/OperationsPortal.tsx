import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem, Dashboard, StatCard, Card, DashboardGrid } from '@apex-providers/ui-components';

// Placeholder pages
const OperationsDashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-charcoal-gray">Operations Dashboard</h1>
      <p className="text-gray-600 mt-2">Guest Services & Facilities</p>
    </div>

    {/* Guest Experience Metrics */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Guest Experience</h2>
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
          trend={{ value: 2, isPositive: true }} // Reduced time is positive
        />
        <StatCard
          title="Check-in Wait"
          value="4m"
          icon={<span className="text-xl">⏳</span>}
          color="green"
        />
        <StatCard
          title="NPS"
          value="+65"
          icon={<span className="text-xl">🗣️</span>}
          color="purple"
        />
      </DashboardGrid>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Facilities Management */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Facilities Status</h2>
        <Card>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">85</p>
              <p className="text-sm text-gray-600">Rooms Vacant</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">112</p>
              <p className="text-sm text-gray-600">Rooms Occupied</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">15</p>
              <p className="text-sm text-gray-600">Dirty / Cleaning</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className="text-sm text-gray-600">Out of Order</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Maintenance & Concierge */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Active Requests</h2>
        <div className="space-y-4">
          <Card>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-900">Maintenance Orders</h3>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">5 Active</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>HVAC Issue (Rm 304)</span>
                <span className="text-red-500">Urgent</span>
              </li>
              <li className="flex justify-between">
                <span>Pool Filter Check</span>
                <span className="text-orange-500">Scheduled</span>
              </li>
            </ul>
          </Card>
          
          <Card>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-900">Concierge Requests</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">8 Pending</span>
            </div>
            <p className="text-sm text-gray-500">Mostly dinner reservations and transport.</p>
          </Card>
        </div>
      </section>
    </div>
  </div>
);

const Housekeeping = () => <div className="p-6 bg-white rounded-lg shadow">Housekeeping Management Placeholder</div>;
const Maintenance = () => <div className="p-6 bg-white rounded-lg shadow">Maintenance & Work Orders Placeholder</div>;

interface OperationsPortalProps {
  user: any;
  onLogout: () => void;
}

export default function OperationsPortal({ user, onLogout }: OperationsPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/admin/operations/dashboard', icon: '📊' },
    { label: 'Housekeeping', href: '/admin/operations/housekeeping', icon: '🧹' },
    { label: 'Maintenance', href: '/admin/operations/maintenance', icon: '🔧' },
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
        <Route path="housekeeping" element={<Housekeeping />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
