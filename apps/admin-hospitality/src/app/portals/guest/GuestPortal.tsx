import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem, Dashboard, StatCard, Card, DashboardGrid } from '@apex-providers/ui-components';
import Services from './pages/Services';
import CheckOut from './pages/CheckOut';

// Toast Component
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 z-50">
      {message}
    </div>
  );
};

const GuestDashboard = () => {
  const [toast, setToast] = useState<string | null>(null);

  const handleQuickAction = (action: string) => {
    // Simulate action
    let message = '';
    switch(action) {
      case 'concierge':
        message = 'Concierge request sent. We will contact you shortly.';
        break;
      case 'room-service':
        message = 'Redirecting to In-Room Dining menu...';
        // In a real app, this would navigate
        break;
      case 'cleaning':
        message = 'Housekeeping requested for your room.';
        break;
      case 'checkout':
        message = 'Redirecting to Express Check-out...';
        break;
      case 'key':
        message = 'Room 801 Unlocked!';
        break;
      default:
        message = 'Action completed';
    }
    setToast(message);
  };

  return (
    <div className="space-y-8 relative">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Welcome back, Mr. Wick</h1>
        <p className="text-gray-600 mt-2">Room 801 • Executive Suite • Checked In</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stay Overview - Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Your Stay Overview</h2>
            <DashboardGrid columns={2}>
              <StatCard
                title="Current Bill"
                value="$1,250.00"
                icon={<span className="text-2xl">💳</span>}
                color="gold"
                trend={{ value: 0, isPositive: true }}
              />
              <StatCard
                title="Check-out"
                value="Oct 12"
                icon={<span className="text-2xl">📅</span>}
                color="blue"
              />
            </DashboardGrid>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Today's Itinerary</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              <div className="p-4 flex items-start space-x-4">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg font-bold">18:00</div>
                <div>
                  <h3 className="font-bold text-gray-900">Dinner Reservation</h3>
                  <p className="text-gray-600">The Continental Restaurant • Table 4</p>
                </div>
              </div>
              <div className="p-4 flex items-start space-x-4">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-lg font-bold">20:30</div>
                <div>
                  <h3 className="font-bold text-gray-900">Spa Treatment</h3>
                  <p className="text-gray-600">Deep Tissue Massage • Spa Level 2</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Quick Actions - Right Column */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => handleQuickAction('concierge')}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left w-full"
              >
                <div className="p-3 bg-gold-50 text-gold-600 rounded-full">🛎️</div>
                <div>
                  <h3 className="font-bold text-gray-900">Contact Concierge</h3>
                  <p className="text-xs text-gray-500">Request services or transport</p>
                </div>
              </button>
              <button 
                onClick={() => { handleQuickAction('room-service'); window.location.href = '/hospitality/guest/services'; }}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left w-full"
              >
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">🍽️</div>
                <div>
                  <h3 className="font-bold text-gray-900">Room Service</h3>
                  <p className="text-xs text-gray-500">Order food & drinks</p>
                </div>
              </button>
              <button 
                onClick={() => handleQuickAction('cleaning')}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left w-full"
              >
                <div className="p-3 bg-green-50 text-green-600 rounded-full">🧹</div>
                <div>
                  <h3 className="font-bold text-gray-900">Request Cleaning</h3>
                  <p className="text-xs text-gray-500">Schedule housekeeping</p>
                </div>
              </button>
              <button 
                onClick={() => { handleQuickAction('checkout'); window.location.href = '/hospitality/guest/checkout'; }}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left w-full"
              >
                <div className="p-3 bg-red-50 text-red-600 rounded-full">🚪</div>
                <div>
                  <h3 className="font-bold text-gray-900">Late Check-out</h3>
                  <p className="text-xs text-gray-500">Request extra time</p>
                </div>
              </button>
            </div>
          </section>
          
          <Card>
            <h3 className="font-bold text-gray-900 mb-2">Digital Key</h3>
            <div 
              onClick={() => handleQuickAction('key')}
              className="bg-navy-900 text-white p-6 rounded-lg text-center cursor-pointer hover:opacity-90 transition-opacity active:scale-95 transform duration-100"
            >
              <div className="text-4xl mb-2">🔑</div>
              <p className="font-medium">Tap to Unlock Room 801</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface GuestPortalProps {
  user: any;
  onLogout: () => void;
}

export default function GuestPortal({ user, onLogout }: GuestPortalProps) {
  const navigation: NavItem[] = [
    { label: 'My Stay', href: '/hospitality/guest/dashboard', icon: '🏠' },
    { label: 'Services', href: '/hospitality/guest/services', icon: '🛎️' },
    { label: 'Check-out', href: '/hospitality/guest/checkout', icon: '👋' },
  ];

  return (
    <AdminLayout
      navigation={navigation}
      logo={<div className="font-bold text-xl text-gold-500">Apex Hotel</div>}
      userMenu={
        <button onClick={onLogout} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">
          Logout
        </button>
      }
      sidebarColor="bg-navy-900" // Luxurious Navy
    >
      <Routes>
        <Route path="dashboard" element={<GuestDashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
