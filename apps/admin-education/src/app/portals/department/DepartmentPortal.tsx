import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { AdminLayout } from '@apex-providers/ui-components';
import DepartmentDashboard from './pages/DepartmentDashboard';
import StaffCoordination from './pages/StaffCoordination';
import ResourceManagement from './pages/ResourceManagement';
import AcademicQuality from './pages/AcademicQuality';

interface DepartmentPortalProps {
  user: any;
  onLogout: () => void;
}

function DepartmentRoutes({ user, onLogout }: DepartmentPortalProps) {
  const { deptName } = useParams<{ deptName: string }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const departmentNames: { [key: string]: { full: string; color: string } } = {
    science: { full: 'Science Department', color: 'blue' },
    mathematics: { full: 'Mathematics Department', color: 'green' },
    english: { full: 'English Department', color: 'purple' },
    social: { full: 'Social Studies Department', color: 'orange' },
  };

  const dept = departmentNames[deptName || 'science'] || { full: 'Department', color: 'gray' };

  const navigation = [
    {
      label: 'Dashboard',
      href: `/admin/department/${deptName}/dashboard`,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    },
    {
      label: 'Department Management',
      href: '#',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
      children: [
        { label: 'Staff Coordination', href: `/admin/department/${deptName}/staff` },
        { label: 'Resource Management', href: `/admin/department/${deptName}/resources` },
        { label: 'Academic Quality', href: `/admin/department/${deptName}/quality` },
      ],
    },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 bg-authority-purple rounded-lg flex items-center justify-center`}>
        <span className="text-white font-bold text-xl">{dept.full[0]}</span>
      </div>
      <div className="text-white">
        <div className="font-bold text-lg">{dept.full}</div>
        <div className="text-xs opacity-75">Department Head</div>
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
          <div className="text-xs text-gray-500">Department Head</div>
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
        <Route path="dashboard" element={<DepartmentDashboard deptName={deptName || 'science'} />} />
        <Route path="staff" element={<StaffCoordination deptName={deptName || 'science'} />} />
        <Route path="resources" element={<ResourceManagement deptName={deptName || 'science'} />} />
        <Route path="quality" element={<AcademicQuality deptName={deptName || 'science'} />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

export default function DepartmentPortal({ user, onLogout }: DepartmentPortalProps) {
  return <DepartmentRoutes user={user} onLogout={onLogout} />;
}

