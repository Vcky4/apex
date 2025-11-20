import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminLayout } from '@apex-providers/ui-components';
import PharmacistDashboard from './pages/PharmacistDashboard';
import PrescriptionManagement from './pages/PrescriptionManagement';
import MedicationSafety from './pages/MedicationSafety';
import InventoryControl from './pages/InventoryControl';

interface PharmacistPortalProps {
  user: any;
  onLogout: () => void;
}

export default function PharmacistPortal({ user, onLogout }: PharmacistPortalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { label: 'Dashboard', href: '/pharmacist/dashboard', icon: '🏠' },
    { label: 'Prescription Management', href: '/pharmacist/prescriptions', icon: '💊' },
    { label: 'Medication Safety', href: '/pharmacist/safety', icon: '⚠️' },
    { label: 'Inventory Control', href: '/pharmacist/inventory', icon: '📦' },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
        <span className="text-teal-600 text-xl font-bold">💊</span>
      </div>
      <div className="hidden md:block">
        <div className="text-white font-bold text-lg">Pharmacist Portal</div>
        <div className="text-white/80 text-xs">Pharmaceutical Blue & Safety Green</div>
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
          <div className="text-sm font-medium text-gray-900">{user?.name || 'Pharmacist User'}</div>
          <div className="text-xs text-gray-600">Pharmacist</div>
        </div>
        <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">💊</span>
        </div>
      </button>
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
              Profile
            </a>
            <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
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
    <AdminLayout navigation={navigation} logo={logo} userMenu={userMenu} vertical="healthcare" sidebarColor="bg-teal-600">
      <Routes>
        <Route path="dashboard" element={<PharmacistDashboard />} />
        <Route path="prescriptions" element={<PrescriptionManagement />} />
        <Route path="safety" element={<MedicationSafety />} />
        <Route path="inventory" element={<InventoryControl />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

