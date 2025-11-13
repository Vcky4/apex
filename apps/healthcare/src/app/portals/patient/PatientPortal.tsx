import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminLayout } from '@apex-providers/ui-components';
import PatientDashboard from './pages/PatientDashboard';
import MedicalRecords from './pages/MedicalRecords';
import AppointmentManagement from './pages/AppointmentManagement';
import MedicationTracking from './pages/MedicationTracking';
import BillingInsurance from './pages/BillingInsurance';
import CommunicationCenter from './pages/CommunicationCenter';

interface PatientPortalProps {
  user: any;
  onLogout: () => void;
}

export default function PatientPortal({ user, onLogout }: PatientPortalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { label: 'Dashboard', href: '/patient/dashboard', icon: '🏠' },
    {
      label: 'Health Management',
      href: '/patient/health',
      icon: '💚',
      children: [
        { label: 'Medical Records', href: '/patient/health/records' },
        { label: 'Appointment Management', href: '/patient/appointments' },
        { label: 'Medication Tracking', href: '/patient/medications' },
      ],
    },
    {
      label: 'Patient Services',
      href: '/patient/services',
      icon: '🛎️',
      children: [
        { label: 'Billing & Insurance', href: '/patient/billing' },
        { label: 'Communication Center', href: '/patient/communication' },
      ],
    },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
        <span className="text-green-600 text-xl font-bold">👤</span>
      </div>
      <div className="hidden md:block">
        <div className="text-white font-bold text-lg">Patient Portal</div>
        <div className="text-white/80 text-xs">Patient Green & Comforting Blue</div>
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
          <div className="text-sm font-medium text-white">{user?.name || 'Patient User'}</div>
          <div className="text-xs text-white/80">Patient</div>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span className="text-green-600 font-bold">👤</span>
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
    <AdminLayout navigation={navigation} logo={logo} userMenu={userMenu} vertical="healthcare" sidebarColor="bg-green-600">
      <Routes>
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="health/records" element={<MedicalRecords />} />
        <Route path="appointments" element={<AppointmentManagement />} />
        <Route path="medications" element={<MedicationTracking />} />
        <Route path="billing" element={<BillingInsurance />} />
        <Route path="communication" element={<CommunicationCenter />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

