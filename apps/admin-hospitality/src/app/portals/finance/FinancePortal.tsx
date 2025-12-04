import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem, Dashboard, StatCard, Card, DashboardGrid } from '@apex-providers/ui-components';
import RatesAndInventory from './pages/RatesAndInventory';
import AccountsAndBilling from './pages/AccountsAndBilling';

// Placeholder pages
const FinanceDashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-charcoal-gray">Financial Overview</h1>
      <p className="text-gray-600 mt-2">Revenue Management & P&L</p>
    </div>

    {/* Revenue Management */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Revenue Metrics</h2>
      <DashboardGrid columns={4}>
        <StatCard
          title="RevPAR"
          value="$142.50"
          icon={<span className="text-xl">📈</span>}
          color="green"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="ADR"
          value="$182.00"
          icon={<span className="text-xl">💵</span>}
          color="blue"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Occupancy"
          value="78%"
          icon={<span className="text-xl">🏨</span>}
          color="purple"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Total Rev (YTD)"
          value="$2.4M"
          icon={<span className="text-xl">💰</span>}
          color="gold"
        />
      </DashboardGrid>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Channel Performance */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Channel Performance</h2>
        <Card>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Direct Bookings</span>
                <span className="font-bold">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>OTA (Expedia, Booking)</span>
                <span className="font-bold">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Corporate / Group</span>
                <span className="font-bold">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Cost Control */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Cost Control</h2>
        <DashboardGrid columns={2}>
          <StatCard
            title="Payroll %"
            value="28%"
            color="orange"
            trend={{ value: 1, isPositive: false }} // slight increase
          />
          <StatCard
            title="F&B Cost"
            value="32%"
            color="red"
            trend={{ value: 2, isPositive: false }} // Over budget
          />
        </DashboardGrid>
      </section>
    </div>
  </div>
);

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
        <Route path="rates" element={<RatesAndInventory />} />
        <Route path="accounts" element={<AccountsAndBilling />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
