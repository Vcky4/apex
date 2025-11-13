import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminLayout } from '@apex-providers/ui-components';
import NurseDashboard from './pages/NurseDashboard';
import PatientCarePlans from './pages/PatientCarePlans';
import MedicationAdministration from './pages/MedicationAdministration';
import VitalSigns from './pages/VitalSigns';
import ShiftManagement from './pages/ShiftManagement';
import ClinicalDocumentation from './pages/ClinicalDocumentation';

interface NursePortalProps {
  user: any;
  onLogout: () => void;
}

export default function NursePortal({ user, onLogout }: NursePortalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { label: 'Dashboard', href: '/nurse/dashboard', icon: '🏠' },
    {
      label: 'Nursing Care',
      href: '/nurse/patients',
      icon: '👥',
      children: [
        { label: 'Patient Care Plans', href: '/nurse/patients/care-plan' },
        { label: 'Medication Administration', href: '/nurse/medications' },
        { label: 'Vital Signs & Monitoring', href: '/nurse/vitals' },
      ],
    },
    {
      label: 'Clinical Operations',
      href: '/nurse/operations',
      icon: '📋',
      children: [
        { label: 'Shift Management', href: '/nurse/shift' },
        { label: 'Clinical Documentation', href: '/nurse/documentation' },
      ],
    },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
        <span className="text-purple-600 text-xl font-bold">👩‍⚕️</span>
      </div>
      <div className="hidden md:block">
        <div className="text-white font-bold text-lg">Nurse Portal</div>
        <div className="text-white/80 text-xs">Caring Lavender & White</div>
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
          <div className="text-sm font-medium text-white">{user?.name || 'Nurse User'}</div>
          <div className="text-xs text-white/80">Registered Nurse</div>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span className="text-purple-600 font-bold">👩‍⚕️</span>
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
    <AdminLayout navigation={navigation} logo={logo} userMenu={userMenu} vertical="healthcare" sidebarColor="bg-purple-600">
      <Routes>
        <Route path="dashboard" element={<NurseDashboard />} />
        <Route path="patients/care-plan/:patientId?" element={<PatientCarePlans />} />
        <Route path="medications" element={<MedicationAdministration />} />
        <Route path="vitals" element={<VitalSigns />} />
        <Route path="shift" element={<ShiftManagement />} />
        <Route path="documentation" element={<ClinicalDocumentation />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

