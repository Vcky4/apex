import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
// @ts-ignore
import { AdminLayout } from '@apex-providers/ui-components';
import OperationsDashboard from './pages/OperationsDashboard';
import FacilitiesManagement from './pages/FacilitiesManagement';
import TransportAdministration from './pages/TransportAdministration';
import SupportStaffManagement from './pages/SupportStaffManagement';

interface OperationsPortalProps {
  user: any;
  onLogout: () => void;
}

export default function OperationsPortal({ user, onLogout }: OperationsPortalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    {
      label: 'Dashboard',
      href: '/admin/operations/dashboard',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    },
    {
      label: 'Operations Management',
      href: '#',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
      children: [
        { label: 'Facilities Management', href: '/admin/operations/facilities' },
        { label: 'Transport Administration', href: '/admin/operations/transport' },
        { label: 'Support Staff Management', href: '/admin/operations/staff' },
      ],
    },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-production-blue rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">O</span>
      </div>
      <div className="text-white">
        <div className="font-bold text-lg">Operations Manager</div>
        <div className="text-xs opacity-75">Operations Portal</div>
      </div>
    </div>
  );

  const userMenu = (
    <div className="relative">
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
      >
        <div className="hidden md:block text-right">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500">Operations Manager</div>
        </div>
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
      </button>
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <a 
              href="/profile" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </a>
            <a 
              href="/settings" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </a>
            <hr className="my-2" />
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onLogout();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <AdminLayout
      navigation={navigation}
      logo={logo}
      userMenu={userMenu}
      vertical="education"
    >
      <Routes>
        <Route path="dashboard" element={<OperationsDashboard />} />
        <Route path="facilities" element={<FacilitiesManagement />} />
        <Route path="transport" element={<TransportAdministration />} />
        <Route path="staff" element={<SupportStaffManagement />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

