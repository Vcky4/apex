import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, NavItem } from '@apex-providers/ui-components';
import EventPlannerDashboard from './pages/EventPlannerDashboard';
import GuestInvites from './pages/GuestInvites';
import EventMonitoring from './pages/EventMonitoring';

interface EventPlannerPortalProps {
  user: any;
  onLogout: () => void;
}

export default function EventPlannerPortal({ user, onLogout }: EventPlannerPortalProps) {
  const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/hospitality-estates/event-planner/dashboard', icon: '📊' },
    { label: 'Guest Invites', href: '/hospitality-estates/event-planner/guest-invites', icon: '👥' },
    { label: 'Live Monitoring', href: '/hospitality-estates/event-planner/monitoring', icon: '📡' },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
        <span className="text-white text-xl font-bold">🎉</span>
      </div>
      <div className="hidden md:block">
        <div className="text-white font-bold text-lg">Event Planner</div>
        <div className="text-white/80 text-xs">Event Management Portal</div>
      </div>
    </div>
  );

  const userMenu = (
    <div className="flex items-center space-x-3">
      <div className="hidden md:block text-right">
        <div className="text-sm font-medium text-gray-900">{user?.name || 'Event Planner'}</div>
        <div className="text-xs text-gray-600">Event Planner</div>
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
      sidebarColor="bg-orange-700"
    >
      <Routes>
        <Route path="dashboard" element={<EventPlannerDashboard />} />
        <Route path="guest-invites" element={<GuestInvites />} />
        <Route path="monitoring" element={<EventMonitoring />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

