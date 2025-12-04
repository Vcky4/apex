import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem } from '@apex-providers/ui-components';
import { Dashboard } from '@apex-providers/ui-components';

// Placeholder pages
const OperationsDashboard = () => (
  <Dashboard
    stats={[
      { label: 'Guest Satisfaction', value: '4.8/5', change: 'Top 10%', changeType: 'increase' },
      { label: 'Avg Response Time', value: '12m', change: '-2m', changeType: 'decrease' }, // decrease in time is good, but usually green if "increase" in performance? Assuming decrease in time is good.
      { label: 'Rooms Cleaned', value: '85/120', change: '70%', changeType: 'neutral' },
      { label: 'Active Work Orders', value: '5', change: 'Low', changeType: 'neutral' },
    ]}
    charts={
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
          Service Requests Chart Placeholder
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
          Housekeeping Status Chart Placeholder
        </div>
      </div>
    }
    recentActivity={[
      { id: 1, user: 'Housekeeping', action: 'Room 304 marked Clean', time: '10 mins ago' },
      { id: 2, user: 'Concierge', action: 'Spa booking for Room 501', time: '15 mins ago' },
    ]}
  />
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

