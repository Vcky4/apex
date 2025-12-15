import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem, Dashboard, StatCard, Card, DashboardGrid } from '@apex-providers/ui-components';
import FrontDesk from './pages/FrontDesk';
import Tasks from './pages/Tasks';
import Kitchen from './pages/Kitchen';

const StaffDashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-3xl font-bold text-charcoal-gray">Staff Dashboard</h1>
      <p className="text-gray-600 mt-2">Morning Shift • Front Desk</p>
    </div>

    {/* Shift Overview */}
    <section>
      <h2 className="text-xl font-bold text-charcoal-gray mb-4">Shift Overview</h2>
      <DashboardGrid columns={4}>
        <StatCard
          title="Arrivals"
          value="12"
          icon={<span className="text-xl">🛬</span>}
          color="blue"
        />
        <StatCard
          title="Departures"
          value="8"
          icon={<span className="text-xl">🛫</span>}
          color="orange"
        />
        <StatCard
          title="In-House"
          value="142"
          icon={<span className="text-xl">🏠</span>}
          color="green"
        />
        <StatCard
          title="VIPs"
          value="3"
          icon={<span className="text-xl">⭐</span>}
          color="gold"
        />
      </DashboardGrid>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Task List */}
      <div className="lg:col-span-2">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-charcoal-gray">Assigned Tasks</h2>
            <span className="text-sm text-gray-500">5 Pending</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Guest Complaint - Room 302</p>
                  <p className="text-sm text-gray-600">AC not working, maintenance notified</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-white text-red-600 text-sm font-medium rounded border border-red-200">Resolve</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">VIP Arrival Check - Room 801</p>
                  <p className="text-sm text-gray-600">Verify welcome amenity placement</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-white text-yellow-600 text-sm font-medium rounded border border-yellow-200">Update</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Folio Review - Room 405</p>
                  <p className="text-sm text-gray-600">Prepare for express checkout</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-white text-gray-600 text-sm font-medium rounded border border-gray-200">Done</button>
            </div>
          </div>
        </Card>
      </div>

      {/* Team Comm & Quick Actions */}
      <div className="space-y-6">
        <Card>
          <h3 className="font-bold text-charcoal-gray mb-3">Team Feed</h3>
          <div className="space-y-4">
            <div className="text-sm">
              <p className="font-semibold text-blue-600">Sarah (Manager)</p>
              <p className="text-gray-600">Staff meeting at 2 PM in the break room.</p>
              <p className="text-xs text-gray-400 mt-1">10 mins ago</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-green-600">Mike (Maintenance)</p>
              <p className="text-gray-600">Pool heater is back online.</p>
              <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
            </div>
          </div>
        </Card>

        <section>
          <h3 className="font-bold text-charcoal-gray mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 text-center">
              Update Room
            </button>
            <button className="p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 text-center">
              Log Request
            </button>
            <button className="p-3 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 text-center">
              Guest Profile
            </button>
            <button className="p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 text-center">
              Call Security
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
);

interface StaffPortalProps {
  user: any;
  onLogout: () => void;
}

export default function StaffPortal({ user, onLogout }: StaffPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/hospitality/staff/dashboard', icon: '📊' },
    { label: 'Front Desk', href: '/hospitality/staff/frontdesk', icon: '🖥️' },
    { label: 'Kitchen', href: '/hospitality/staff/kitchen', icon: '👨‍🍳' },
    { label: 'Tasks', href: '/hospitality/staff/tasks', icon: '✅' },
  ];

  return (
    <AdminLayout
      navigation={navigation}
      logo={<div className="font-bold text-xl">Apex Staff</div>}
      userMenu={
        <button onClick={onLogout} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
          Logout
        </button>
      }
      sidebarColor="bg-gray-600" // Efficient Gray
    >
      <Routes>
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="frontdesk" element={<FrontDesk />} />
        <Route path="kitchen" element={<Kitchen />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
