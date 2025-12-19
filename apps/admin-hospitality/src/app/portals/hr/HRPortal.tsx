import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem, Dashboard, StatCard, Card, DashboardGrid } from '@apex-providers/ui-components';
import LuxuryStaffManagement from './pages/LuxuryStaffManagement';
import EventStaffCoordination from './pages/EventStaffCoordination';
import EstateStaffManagement from './pages/EstateStaffManagement';

// HR Executive Dashboard per design document
const HRDashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-charcoal-gray">HR Executive Dashboard</h1>
      <p className="text-gray-600 mt-2">Control staffing quality, availability, compliance and service excellence across all properties</p>
    </div>

    {/* What the admin sees */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Staff Overview</h2>
      <DashboardGrid columns={4}>
        <StatCard
          title="Staff Count by Property"
          value="156"
          icon={<span className="text-xl">👥</span>}
          color="blue"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Staff-to-Guest Ratio"
          value="1:4"
          icon={<span className="text-xl">📊</span>}
          color="green"
          trend={{ value: 0, isPositive: true }}
        />
        <StatCard
          title="Peak-Period Gaps"
          value="3"
          icon={<span className="text-xl">⚠️</span>}
          color="orange"
          trend={{ value: -2, isPositive: true }}
        />
        <StatCard
          title="Department Performance"
          value="4.7/5"
          icon={<span className="text-xl">⭐</span>}
          color="gold"
        />
      </DashboardGrid>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Staff by Property, Estate and Event */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Staff Distribution</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Grand Hotel Downtown</span>
                <span className="font-bold">45 Staff</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Seaside Resort</span>
                <span className="font-bold">38 Staff</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Mountain Estate</span>
                <span className="font-bold">32 Staff</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Event Staff (Active)</span>
                <span className="font-bold">41 Staff</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gold-500 h-2 rounded-full" style={{ width: '41%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Department Performance Trends */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Department Performance Trends</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Front Desk</span>
                <span className="font-bold text-green-600">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Concierge</span>
                <span className="font-bold text-green-600">4.9/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Security</span>
                <span className="font-bold text-blue-600">4.6/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Housekeeping</span>
                <span className="font-bold text-green-600">4.7/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Events</span>
                <span className="font-bold text-green-600">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
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
          <h3 className="font-bold text-gray-900 mb-2">Cross-Property Transfers</h3>
          <p className="text-sm text-gray-600 mb-4">Manage staff redeployment across properties</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage Transfers →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Service Thresholds</h3>
          <p className="text-sm text-gray-600 mb-4">Set minimum staffing levels per property type</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Configure →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Training Rules</h3>
          <p className="text-sm text-gray-600 mb-4">Mandatory luxury service training requirements</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Set Rules →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Brand Standards</h3>
          <p className="text-sm text-gray-600 mb-4">Uniform, grooming, and brand enforcement</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Enforce →</button>
        </Card>
      </div>
    </section>

    {/* Seasonal Staffing Gaps */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Peak-Period Staffing Gaps</h2>
      <Card>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div>
              <p className="font-medium text-gray-900">Thanksgiving Week</p>
              <p className="text-xs text-gray-600">Nov 24-30, 2025</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-orange-600">-8 Staff</p>
              <p className="text-xs text-gray-500">Gap identified</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div>
              <p className="font-medium text-gray-900">Holiday Season</p>
              <p className="text-xs text-gray-600">Dec 20-31, 2025</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-yellow-600">-5 Staff</p>
              <p className="text-xs text-gray-500">Gap identified</p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  </div>
);

interface HRPortalProps {
  user: any;
  onLogout: () => void;
}

export default function HRPortal({ user, onLogout }: HRPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/hospitality-estates/admin/hr/dashboard', icon: '📊' },
    { label: 'Luxury Staff Management', href: '/hospitality-estates/admin/hr/staff-management', icon: '💎' },
    { label: 'Event Staff Coordination', href: '/hospitality-estates/admin/hr/event-staff', icon: '🎉' },
    { label: 'Estate Staff Management', href: '/hospitality-estates/admin/hr/estate-management', icon: '🏛️' },
  ];

  return (
    <AdminLayout
      navigation={navigation}
      logo={<div className="font-bold text-xl">Hospitality HR</div>}
      userMenu={
        <button onClick={onLogout} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
          Logout
        </button>
      }
      vertical="healthcare" // Keeping fallback but overriding sidebarColor
      sidebarColor="bg-yellow-600" // Warm Gold
    >
      <Routes>
        <Route path="dashboard" element={<HRDashboard />} />
        <Route path="staff-management" element={<LuxuryStaffManagement />} />
        <Route path="event-staff" element={<EventStaffCoordination />} />
        <Route path="estate-management" element={<EstateStaffManagement />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
