import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem } from '@apex-providers/ui-components';
import EstatesGuestDashboard from './pages/EstatesGuestDashboard';
import VisitorManagement from './pages/VisitorManagement';
import PreArrival from './pages/PreArrival';

interface EstatesGuestPortalProps {
  user: any;
  onLogout: () => void;
}

export default function EstatesGuestPortal({ user, onLogout }: EstatesGuestPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/hospitality-estates/guest/dashboard', icon: '🏠' },
    { label: 'Visitor Management', href: '/hospitality-estates/guest/visitor-management', icon: '👥' },
    { label: 'Pre-Arrival', href: '/hospitality-estates/guest/pre-arrival', icon: '📋' },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white text-xl font-bold">🏛️</span>
      </div>
      <div className="hidden md:block">
        <div className="text-white font-bold text-lg">Estates Guest</div>
        <div className="text-white/80 text-xs">Luxury Estate Portal</div>
      </div>
    </div>
  );

  const userMenu = (
    <div className="flex items-center space-x-3">
      <div className="hidden md:block text-right">
        <div className="text-sm font-medium text-gray-900">{user?.name || 'Guest'}</div>
        <div className="text-xs text-gray-600">Estates Guest</div>
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
      sidebarColor="bg-purple-700"
    >
      <Routes>
        <Route path="dashboard" element={<EstatesGuestDashboard />} />
        <Route path="visitor-management" element={<VisitorManagement />} />
        <Route path="pre-arrival" element={<PreArrival />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

