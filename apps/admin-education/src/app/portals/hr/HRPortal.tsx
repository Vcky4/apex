import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminLayout } from '@apex-providers/ui-components';
import HRDashboard from './pages/HRDashboard';
import Recruitment from './pages/Recruitment';
import EmployeeLifecycle from './pages/EmployeeLifecycle';
import PerformanceManagement from './pages/PerformanceManagement';
import CompensationBenefits from './pages/CompensationBenefits';
import HRCompliance from './pages/HRCompliance';
import UserManagementPage from './pages/UserManagementPage';

interface HRPortalProps {
  user: any;
  onLogout: () => void;
}

export default function HRPortal({ user, onLogout }: HRPortalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    {
      label: 'Dashboard',
      href: '/admin/hr/dashboard',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    },
    {
      label: 'User Management',
      href: '/admin/hr/users',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    },
    {
      label: 'HR Management',
      href: '#',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      children: [
        { label: 'Recruitment & Staffing', href: '/admin/hr/recruitment' },
        { label: 'Employee Lifecycle', href: '/admin/hr/employee-lifecycle' },
        { label: 'Performance Management', href: '/admin/hr/performance' },
        { label: 'Compensation & Benefits', href: '/admin/hr/compensation' },
        { label: 'HR Compliance', href: '/admin/hr/compliance' },
      ],
    },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">HR</span>
      </div>
      <div className="text-white">
        <div className="font-bold text-lg">HR Executive</div>
        <div className="text-xs opacity-75">Human Resources</div>
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
          <div className="text-xs text-gray-500">HR Executive</div>
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
      sidebarColor="bg-blue-600"
    >
      <Routes>
        <Route path="dashboard" element={<HRDashboard />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="recruitment" element={<Recruitment />} />
        <Route path="employee-lifecycle" element={<EmployeeLifecycle />} />
        <Route path="performance" element={<PerformanceManagement />} />
        <Route path="compensation" element={<CompensationBenefits />} />
        <Route path="compliance" element={<HRCompliance />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
