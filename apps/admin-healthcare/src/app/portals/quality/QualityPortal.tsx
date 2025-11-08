import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminLayout } from '@apex-providers/ui-components';
import QualityDashboard from './pages/QualityDashboard';
import QualityImprovement from './pages/QualityImprovement';
import RiskManagement from './pages/RiskManagement';
import RegulatoryCompliance from './pages/RegulatoryCompliance';

interface QualityPortalProps {
  user: any;
  onLogout: () => void;
}

export default function QualityPortal({ user, onLogout }: QualityPortalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    {
      label: 'Dashboard',
      href: '/healthcare/admin/quality/dashboard',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    },
    {
      label: 'Quality & Compliance',
      href: '#',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      children: [
        { label: 'Quality Improvement', href: '/healthcare/admin/quality/improvement' },
        { label: 'Risk Management', href: '/healthcare/admin/quality/risk-management' },
        { label: 'Regulatory Compliance', href: '/healthcare/admin/quality/compliance' },
      ],
    },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">✓</span>
      </div>
      <div className="text-white">
        <div className="font-bold text-lg">Quality & Compliance</div>
        <div className="text-xs opacity-75">Quality Management</div>
      </div>
    </div>
  );

  const userMenu = (
    <div className="relative">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
        <div className="hidden md:block text-right">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500">Quality Executive</div>
        </div>
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
      </button>
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Profile</a>
            <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Settings</a>
            <hr className="my-2" />
            <button onClick={() => { setIsMenuOpen(false); onLogout(); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign Out</button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <AdminLayout navigation={navigation} logo={logo} userMenu={userMenu} vertical="healthcare" sidebarColor="bg-green-600">
      <Routes>
        <Route path="dashboard" element={<QualityDashboard />} />
        <Route path="improvement" element={<QualityImprovement />} />
        <Route path="risk-management" element={<RiskManagement />} />
        <Route path="compliance" element={<RegulatoryCompliance />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

