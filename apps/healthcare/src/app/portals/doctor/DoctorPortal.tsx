import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { AdminLayout } from '@apex-providers/ui-components';
import DoctorDashboard from './pages/DoctorDashboard';
import EHR from './pages/EHR';
import ClinicalDecisionSupport from './pages/ClinicalDecisionSupport';
import Telemedicine from './pages/Telemedicine';
import AppointmentManagement from './pages/AppointmentManagement';
import DiagnosticReview from './pages/DiagnosticReview';

interface DoctorPortalProps {
  user: any;
  onLogout: () => void;
}

export default function DoctorPortal({ user, onLogout }: DoctorPortalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { label: 'Dashboard', href: '/doctor/dashboard', icon: '🏠' },
    {
      label: 'Patient Care',
      href: '/doctor/patients',
      icon: '👥',
      children: [
        { label: 'Electronic Health Records', href: '/doctor/patients/ehr' },
        { label: 'Clinical Decision Support', href: '/doctor/clinical-support' },
        { label: 'Telemedicine Portal', href: '/doctor/telemedicine' },
      ],
    },
    {
      label: 'Medical Operations',
      href: '/doctor/operations',
      icon: '⚕️',
      children: [
        { label: 'Appointment Management', href: '/doctor/schedule' },
        { label: 'Diagnostic Review', href: '/doctor/diagnostics' },
      ],
    },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
        <span className="text-doctor-blue text-xl font-bold">⚕</span>
      </div>
      <div className="hidden md:block">
        <div className="text-white font-bold text-lg">Doctor Portal</div>
        <div className="text-white/80 text-xs">Clinical White & Doctor Blue</div>
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
          <div className="text-sm font-medium text-white">{user?.name || 'Dr. User'}</div>
          <div className="text-xs text-white/80">Physician</div>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span className="text-doctor-blue font-bold">👨‍⚕️</span>
        </div>
      </button>
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                // Navigate to profile (placeholder)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                // Navigate to settings (placeholder)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </button>
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
    <AdminLayout navigation={navigation} logo={logo} userMenu={userMenu} vertical="healthcare" sidebarColor="bg-doctor-blue">
      <Routes>
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="patients/ehr/:patientId?" element={<EHR />} />
        <Route path="clinical-support" element={<ClinicalDecisionSupport />} />
        <Route path="telemedicine" element={<Telemedicine />} />
        <Route path="schedule" element={<AppointmentManagement />} />
        <Route path="diagnostics" element={<DiagnosticReview />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

