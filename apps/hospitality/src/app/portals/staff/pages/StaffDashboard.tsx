import { useState } from 'react';
import { Card, StatCard, DashboardGrid } from '@apex-providers/ui-components';
import { Link } from 'react-router-dom';

export default function StaffDashboard() {
  const todayStats = {
    arrivals: 12,
    departures: 8,
    inHouse: 45,
    pendingVisitors: 5,
    visitorPayments: 3,
  };

  const recentAlerts = [
    { id: 1, type: 'visitor', message: 'New visitor check-in pending approval', priority: 'high' },
    { id: 2, type: 'payment', message: 'Visitor payment exception - Room 801', priority: 'medium' },
    { id: 3, type: 'task', message: 'Housekeeping request - Room 305', priority: 'normal' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Operations Dashboard</h1>
        <p className="text-gray-600 mt-2">Today's overview and quick actions</p>
      </div>

      {/* Key Metrics */}
      <DashboardGrid columns={5}>
        <StatCard
          title="Today's Arrivals"
          value={todayStats.arrivals.toString()}
          icon={<span className="text-2xl">📥</span>}
          color="blue"
        />
        <StatCard
          title="Departures"
          value={todayStats.departures.toString()}
          icon={<span className="text-2xl">📤</span>}
          color="orange"
        />
        <StatCard
          title="In-House Guests"
          value={todayStats.inHouse.toString()}
          icon={<span className="text-2xl">🏨</span>}
          color="green"
        />
        <StatCard
          title="Pending Visitors"
          value={todayStats.pendingVisitors.toString()}
          icon={<span className="text-2xl">👥</span>}
          color="purple"
        />
        <StatCard
          title="Payment Exceptions"
          value={todayStats.visitorPayments.toString()}
          icon={<span className="text-2xl">💳</span>}
          color="red"
        />
      </DashboardGrid>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/hospitality/staff/visitors"
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left"
          >
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">👤</div>
            <div>
              <h3 className="font-bold text-gray-900">Register Visitor</h3>
              <p className="text-xs text-gray-500">Manual registration</p>
            </div>
          </Link>
          
          <Link
            to="/hospitality/staff/visitors"
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">📱</div>
            <div>
              <h3 className="font-bold text-gray-900">Scan QR Code</h3>
              <p className="text-xs text-gray-500">Check-in visitor</p>
            </div>
          </Link>

          <Link
            to="/hospitality/staff/frontdesk"
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left"
          >
            <div className="p-3 bg-gold-50 text-gold-600 rounded-full">🏢</div>
            <div>
              <h3 className="font-bold text-gray-900">Front Desk</h3>
              <p className="text-xs text-gray-500">Guest management</p>
            </div>
          </Link>

          <button className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left">
            <div className="p-3 bg-red-50 text-red-600 rounded-full">🚨</div>
            <div>
              <h3 className="font-bold text-gray-900">Call Security</h3>
              <p className="text-xs text-gray-500">Emergency</p>
            </div>
          </button>
        </div>
      </section>

      {/* Alerts & Priority Flags */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Alerts & Priority Flags</h2>
        <Card>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.priority === 'high'
                    ? 'bg-red-50 border-red-500'
                    : alert.priority === 'medium'
                    ? 'bg-orange-50 border-orange-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600 mt-1">Type: {alert.type}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded ${
                      alert.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : alert.priority === 'medium'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {alert.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

