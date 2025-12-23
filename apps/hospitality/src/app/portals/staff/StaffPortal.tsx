import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem } from '@apex-providers/ui-components';
import StaffDashboard from './pages/StaffDashboard';
import VisitorRegistry from './pages/VisitorRegistry';
import FrontDesk from './pages/FrontDesk';

interface StaffPortalProps {
  user: any;
  onLogout: () => void;
}

export default function StaffPortal({ user, onLogout }: StaffPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/hospitality/staff/dashboard', icon: '📊' },
    { label: 'Visitor Registry', href: '/hospitality/staff/visitors', icon: '👥' },
    { label: 'Front Desk', href: '/hospitality/staff/frontdesk', icon: '🏢' },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
        <span className="text-white text-xl font-bold">👔</span>
      </div>
      <div className="hidden md:block">
        <div className="text-white font-bold text-lg">Staff Portal</div>
        <div className="text-white/80 text-xs">Efficient Gray & Teal</div>
      </div>
    </div>
  );

  const userMenu = (
    <div className="flex items-center space-x-3">
      <div className="hidden md:block text-right">
        <div className="text-sm font-medium text-gray-900">{user?.name || 'Staff'}</div>
        <div className="text-xs text-gray-600">Staff</div>
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
      sidebarColor="bg-gray-700"
    >
      <Routes>
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="visitors" element={<VisitorRegistry />} />
        <Route path="frontdesk" element={<FrontDesk />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

