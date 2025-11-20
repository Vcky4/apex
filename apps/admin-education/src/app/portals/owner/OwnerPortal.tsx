import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminLayout } from '@apex-providers/ui-components';
import OwnerDashboard from './pages/OwnerDashboard';
import UserManagementPage from './pages/UserManagementPage';
import BudgetManagement from './pages/finance/BudgetManagement';
import FeeManagement from './pages/finance/FeeManagement';
import AccountsManagement from './pages/finance/AccountsManagement';
import GrantFunding from './pages/finance/GrantFunding';
import ProcurementInventory from './pages/finance/ProcurementInventory';

interface OwnerPortalProps {
  user: any;
  onLogout: () => void;
}

export default function OwnerPortal({ user, onLogout }: OwnerPortalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    {
      label: 'Dashboard',
      href: '/admin/owner/dashboard',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    },
    {
      label: 'User Management',
      href: '/admin/owner/users',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    },
    {
      label: 'Finance Management',
      href: '#',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      children: [
        { label: 'Budget Management', href: '/admin/owner/budget' },
        { label: 'Fee Management', href: '/admin/owner/fees' },
        { label: 'Accounts Management', href: '/admin/owner/accounts' },
        { label: 'Grant & Funding Management', href: '/admin/owner/grants' },
        { label: 'Procurement & Inventory', href: '/admin/owner/procurement' },
      ],
    },
    {
      label: 'Access Downlines',
      href: '#',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      children: [
        { label: 'Finance Executive Portal', href: '/admin/finance/dashboard' },
        { label: 'HR Executive Portal', href: '/admin/hr/dashboard' },
        { label: 'Academic Executive Portal', href: '/principal/dashboard' },
        { label: 'Student Affairs Portal', href: '/admin/student-affairs/dashboard' },
        { label: 'Operations Portal', href: '/admin/operations/dashboard' },
      ],
    },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">O</span>
      </div>
      <div className="text-white">
        <div className="font-bold text-lg">School Owner</div>
        <div className="text-xs opacity-75">Executive Overview</div>
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
          <div className="text-xs text-gray-500">School Owner</div>
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
      sidebarColor="bg-yellow-600"
    >
      <Routes>
        <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="budget" element={<BudgetManagement />} />
        <Route path="fees" element={<FeeManagement />} />
        <Route path="accounts" element={<AccountsManagement />} />
        <Route path="grants" element={<GrantFunding />} />
        <Route path="procurement" element={<ProcurementInventory />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
