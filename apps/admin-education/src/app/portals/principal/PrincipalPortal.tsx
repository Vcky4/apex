import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AdminLayout } from '@apex-providers/ui-components';
import AcademicDashboard from './pages/AcademicDashboard';
import CurriculumDevelopment from './pages/academics/CurriculumDevelopment';
import StudentAssessment from './pages/academics/StudentAssessment';
import ProgramAccreditation from './pages/academics/ProgramAccreditation';
import UserManagementPage from './pages/UserManagementPage';

interface PrincipalPortalProps {
  user: any;
  onLogout: () => void;
}

export default function PrincipalPortal({ user, onLogout }: PrincipalPortalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    {
      label: 'Dashboard',
      href: '/admin/academics/dashboard',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    },
    {
      label: 'User Management',
      href: '/admin/academics/users',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    },
    {
      label: 'Academic Management',
      href: '#',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
      children: [
        { label: 'Curriculum Development', href: '/admin/academics/curriculum' },
        { label: 'Student Assessment', href: '/admin/academics/assessment' },
        { label: 'Program Accreditation', href: '/admin/academics/accreditation' },
      ],
    },
    {
      label: 'Access Downlines',
      href: '#',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
      children: [
        { label: 'Department Heads', href: '/admin/department/science/dashboard' },
        { label: 'Student Affairs Portal', href: '/admin/student-affairs/dashboard' },
      ],
    },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
        <span className="text-blue-600 font-bold text-xl">A</span>
      </div>
      <div className="text-white">
        <div className="font-bold text-lg">Academic Executive</div>
        <div className="text-xs opacity-75">Academic Administration</div>
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
          <div className="text-xs text-gray-500">Academic Executive</div>
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
      sidebarColor="bg-yellow-500"
    >
      <Routes>
        <Route path="dashboard" element={<AcademicDashboard />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="curriculum" element={<CurriculumDevelopment />} />
        <Route path="assessment" element={<StudentAssessment />} />
        <Route path="accreditation" element={<ProgramAccreditation />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}

