import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem } from '@apex-providers/ui-components';
import OwnerDashboard from './pages/OwnerDashboard';
import VisitorManagement from './pages/VisitorManagement';

interface OwnerPortalProps {
  user: any;
  onLogout: () => void;
}

export default function OwnerPortal({ user, onLogout }: OwnerPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/hospitality-estates/owner/dashboard', icon: '📊' },
    { label: 'Visitor Management', href: '/hospitality-estates/owner/visitor-management', icon: '👥' },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
        <span className="text-white text-xl font-bold">👑</span>
      </div>
      <div className="hidden md:block">
        <div className="text-white font-bold text-lg">Property Owner</div>
        <div className="text-white/80 text-xs">Portfolio Management</div>
      </div>
    </div>
  );

  const userMenu = (
    <div className="flex items-center space-x-3">
      <div className="hidden md:block text-right">
        <div className="text-sm font-medium text-gray-900">{user?.name || 'Owner'}</div>
        <div className="text-xs text-gray-600">Property Owner</div>
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
      sidebarColor="bg-indigo-700"
    >
      <Routes>
        <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="visitor-management" element={<VisitorManagement />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

