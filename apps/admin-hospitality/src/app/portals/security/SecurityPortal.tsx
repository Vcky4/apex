import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem, Dashboard, StatCard, Card, DashboardGrid } from '@apex-providers/ui-components';
import VisitorInvitationControl from './pages/VisitorInvitationControl';
import EventGuestAdministration from './pages/EventGuestAdministration';

// Security Executive Dashboard per design document
const SecurityDashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-charcoal-gray">Security Executive Dashboard</h1>
      <p className="text-gray-600 mt-2">Full visibility and control of all visitor movement and access</p>
    </div>

    {/* What the admin sees */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Security Overview</h2>
      <DashboardGrid columns={4}>
        <StatCard
          title="Visitors Today"
          value="156"
          icon={<span className="text-xl">👥</span>}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Events"
          value="3"
          icon={<span className="text-xl">🎉</span>}
          color="purple"
        />
        <StatCard
          title="Access Violations"
          value="2"
          icon={<span className="text-xl">⚠️</span>}
          color="orange"
          trend={{ value: -1, isPositive: true }}
        />
        <StatCard
          title="Security Incidents"
          value="0"
          icon={<span className="text-xl">🛡️</span>}
          color="green"
        />
      </DashboardGrid>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Visitors by Property and Event */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Visitor Distribution</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Grand Hotel Downtown</span>
                <span className="font-bold">68 Visitors</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '44%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Seaside Resort</span>
                <span className="font-bold">45 Visitors</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '29%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Event Visitors</span>
                <span className="font-bold">43 Visitors</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Access Violations and Anomalies */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Access Violations & Anomalies</h2>
        <Card>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">Unauthorized Access Attempt</p>
                  <p className="text-xs text-gray-600 mt-1">Grand Hotel Downtown - 14:32</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                  Resolved
                </span>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">Expired QR Code Used</p>
                  <p className="text-xs text-gray-600 mt-1">Seaside Resort - 16:15</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>

    {/* Security Incidents and Response Times */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Security Incidents & Response Times</h2>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Incidents (30 days)</p>
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-xs text-gray-500 mt-1">All clear</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Avg Response Time</p>
            <p className="text-2xl font-bold text-blue-600">3 min</p>
            <p className="text-xs text-gray-500 mt-1">Excellent</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">Attendance Patterns</p>
            <p className="text-2xl font-bold text-purple-600">Normal</p>
            <p className="text-xs text-gray-500 mt-1">No anomalies</p>
          </div>
        </div>
      </Card>
    </section>

    {/* What the admin controls */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Admin Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Global Visitor Rules</h3>
          <p className="text-sm text-gray-600 mb-4">Set visitor limits and access policies</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Configure →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Visitor Limits</h3>
          <p className="text-sm text-gray-600 mb-4">Control visitors per guest, tenant, or event</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Set Limits →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Visit Policies</h3>
          <p className="text-sm text-gray-600 mb-4">Define paid vs free visit policies</p>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage →</button>
        </Card>
        <Card>
          <h3 className="font-bold text-gray-900 mb-2">Emergency Controls</h3>
          <p className="text-sm text-gray-600 mb-4">Lockdown and access revocation</p>
          <button className="text-red-600 hover:text-red-800 text-sm font-medium">Emergency →</button>
        </Card>
      </div>
    </section>
  </div>
);

interface SecurityPortalProps {
  user: any;
  onLogout: () => void;
}

export default function SecurityPortal({ user, onLogout }: SecurityPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/hospitality-estates/admin/security/dashboard', icon: '📊' },
    { label: 'Visitor Invitation Control', href: '/hospitality-estates/admin/security/visitor-invite', icon: '👥' },
    { label: 'Event Guest Administration', href: '/hospitality-estates/admin/security/event-guests', icon: '🎉' },
  ];

  return (
    <AdminLayout
      navigation={navigation}
      logo={<div className="font-bold text-xl">Security & Visitor Management</div>}
      userMenu={
        <button onClick={onLogout} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
          Logout
        </button>
      }
      sidebarColor="bg-red-700" // Security Red
    >
      <Routes>
        <Route path="dashboard" element={<SecurityDashboard />} />
        <Route path="visitor-invite" element={<VisitorInvitationControl />} />
        <Route path="event-guests" element={<EventGuestAdministration />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
