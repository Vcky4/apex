import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem } from '@apex-providers/ui-components';
import { Dashboard } from '@apex-providers/ui-components';

// Placeholder pages
const HRDashboard = () => (
  <Dashboard
    stats={[
      { label: 'Total Staff', value: '142', change: '+5%', changeType: 'increase' },
      { label: 'On Shift', value: '48', change: 'Active', changeType: 'neutral' },
      { label: 'Training Compliance', value: '94%', change: '+2%', changeType: 'increase' },
      { label: 'Open Positions', value: '3', change: '-1', changeType: 'decrease' },
    ]}
    charts={
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
          Staffing Levels Chart Placeholder
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
          Department Breakdown Chart Placeholder
        </div>
      </div>
    }
    recentActivity={[
      { id: 1, user: 'Sarah Connor', action: 'Clocked in', time: '5 mins ago' },
      { id: 2, user: 'John Smith', action: 'Requested leave', time: '1 hour ago' },
    ]}
  />
);

const Scheduling = () => <div className="p-6 bg-white rounded-lg shadow">Scheduling & Roster Management Placeholder</div>;
const Training = () => <div className="p-6 bg-white rounded-lg shadow">Service Excellence Training Placeholder</div>;

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
      vertical="healthcare" // Using healthcare color (red) or maybe custom? The guide says "Warm Gold with Service Blue accents". 
      // I'll use a custom color class if possible, or stick to one of the presets. 
      // The Layout component accepts sidebarColor.
      sidebarColor="bg-yellow-600"
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

