import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem } from '@apex-providers/ui-components';
import GuestDashboard from './pages/GuestDashboard';
import VisitorManagement from './pages/VisitorManagement';
import PreArrival from './pages/PreArrival';
import Services from './pages/Services';
import CheckOut from './pages/CheckOut';

interface GuestPortalProps {
  user: any;
  onLogout: () => void;
}

export default function GuestPortal({ user, onLogout }: GuestPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/hospitality/guest/dashboard', icon: '🏠' },
    { label: 'Visitor Management', href: '/hospitality/guest/visitors', icon: '👥' },
    { label: 'Pre-Arrival', href: '/hospitality/guest/checkin', icon: '📋' },
    { label: 'Services', href: '/hospitality/guest/services', icon: '🛎️' },
    { label: 'Check-out', href: '/hospitality/guest/checkout', icon: '👋' },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
        <span className="text-white text-xl font-bold">🏨</span>
      </div>
      <div className="hidden md:block">
        <div className="text-white font-bold text-lg">Guest Portal</div>
        <div className="text-white/80 text-xs">Luxurious Navy & Gold</div>
      </div>
    </div>
  );

  const userMenu = (
    <div className="flex items-center space-x-3">
      <div className="hidden md:block text-right">
        <div className="text-sm font-medium text-gray-900">{user?.name || 'Guest'}</div>
        <div className="text-xs text-gray-600">Guest</div>
      </div>
      <button
        onClick={onLogout}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm rounded-lg transition-colors font-medium"
      >
        Logout
      </button>
    </div>
  );

  return (
    <AdminLayout
      navigation={navigation}
      logo={logo}
      userMenu={userMenu}
      sidebarColor="bg-navy-900"
    >
      <Routes>
        <Route path="dashboard" element={<GuestDashboard />} />
        <Route path="visitors" element={<VisitorManagement />} />
        <Route path="checkin" element={<PreArrival />} />
        <Route path="services" element={<Services />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

