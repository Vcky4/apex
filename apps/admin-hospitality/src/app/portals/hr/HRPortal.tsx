import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem, Dashboard, StatCard, Card, DashboardGrid } from '@apex-providers/ui-components';
import Scheduling from './pages/Scheduling';
import Training from './pages/Training';

// Placeholder pages
const HRDashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-charcoal-gray">Hospitality HR Dashboard</h1>
      <p className="text-gray-600 mt-2">Staff Management & Analytics</p>
    </div>

    {/* Staffing Analytics */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Staffing Analytics</h2>
      <DashboardGrid columns={4}>
        <StatCard
          title="Staff-to-Guest Ratio"
          value="1:4"
          icon={<span className="text-xl">👥</span>}
          color="blue"
          trend={{ value: 0, isPositive: true }}
        />
        <StatCard
          title="Turnover Rate"
          value="5%"
          icon={<span className="text-xl">📉</span>}
          color="red" // Red because turnover is bad usually, or maybe neutral
          trend={{ value: 1.2, isPositive: false }} // Increased turnover
        />
        <StatCard
          title="Seasonal Staff"
          value="24"
          icon={<span className="text-xl">🏖️</span>}
          color="gold"
        />
        <StatCard
          title="Labor Cost"
          value="$45k"
          icon={<span className="text-xl">💰</span>}
          color="green"
          trend={{ value: 2.5, isPositive: true }} // Cost up? context dependent.
        />
      </DashboardGrid>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* HR Operations */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">HR Operations</h2>
        <div className="space-y-4">
          <Card>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-900">Recruitment</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">3 Open Roles</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Concierge</span>
                <span className="text-orange-500">Interviewing</span>
              </li>
              <li className="flex justify-between">
                <span>Sous Chef</span>
                <span className="text-green-500">Offer Sent</span>
              </li>
              <li className="flex justify-between">
                <span>Housekeeping Mgr</span>
                <span className="text-gray-500">Posting</span>
              </li>
            </ul>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-900">Staff Satisfaction</h3>
              <span className="text-2xl font-bold text-green-600">4.2/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '84%' }}></div>
            </div>
            <p className="text-xs text-gray-500">Based on latest pulse survey</p>
          </Card>
        </div>
      </section>

      {/* Compliance & Grooming */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Compliance & Standards</h2>
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Training Compliance</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Safety Certification</span>
                  <span className="font-bold">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Hospitality Standards</span>
                  <span className="font-bold">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gold-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="font-bold text-gray-900 mb-2">Uniform Standards</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="text-green-500">●</span>
              <span>Last inspection passed (Yesterday)</span>
            </div>
          </Card>
        </div>
      </section>
    </div>
  </div>
);

interface HRPortalProps {
  user: any;
  onLogout: () => void;
}

export default function HRPortal({ user, onLogout }: HRPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/admin/hr/dashboard', icon: '📊' },
    { label: 'Scheduling', href: '/admin/hr/scheduling', icon: '📅' },
    { label: 'Training', href: '/admin/hr/training', icon: '🎓' },
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
        <Route path="scheduling" element={<Scheduling />} />
        <Route path="training" element={<Training />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
