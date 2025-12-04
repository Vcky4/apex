import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem } from '@apex-providers/ui-components';
import { Dashboard } from '@apex-providers/ui-components';

// Placeholder pages
const FinanceDashboard = () => (
  <Dashboard
    stats={[
      { label: 'RevPAR', value: '$142.50', change: '+12%', changeType: 'increase' },
      { label: 'Occupancy', value: '78%', change: '+5%', changeType: 'increase' },
      { label: 'ADR', value: '$182.00', change: '+3%', changeType: 'increase' },
      { label: 'F&B Revenue', value: '$12,450', change: 'Today', changeType: 'neutral' },
    ]}
    charts={
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
          Revenue Trends Chart Placeholder
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
          Channel Performance Chart Placeholder
        </div>
      </div>
    }
    recentActivity={[
      { id: 1, user: 'System', action: 'Night Audit Completed', time: '4 hours ago' },
      { id: 2, user: 'Reservation', action: 'Group Booking #442 Confirmed', time: '2 hours ago' },
    ]}
  />
);

const Rates = () => <div className="p-6 bg-white rounded-lg shadow">Rate & Inventory Management Placeholder</div>;
const Accounts = () => <div className="p-6 bg-white rounded-lg shadow">Accounts & Billing Placeholder</div>;

interface FinancePortalProps {
  user: any;
  onLogout: () => void;
}

export default function FinancePortal({ user, onLogout }: FinancePortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/admin/finance/dashboard', icon: '📊' },
    { label: 'Rates & Inventory', href: '/admin/finance/rates', icon: '🏷️' },
    { label: 'Accounts & Billing', href: '/admin/finance/accounts', icon: '💳' },
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
        <Route path="rates" element={<Rates />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

