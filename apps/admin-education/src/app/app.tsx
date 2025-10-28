import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '@apex-providers/ui-components';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Attendance from './pages/Attendance';
import Grades from './pages/Grades';

const navigation = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
  {
    label: 'Students',
    href: '/students',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  },
  {
    label: 'Teachers',
    href: '/teachers',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  {
    label: 'Classes & Courses',
    href: '/classes',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  },
  {
    label: 'Attendance',
    href: '/attendance',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
  },
  {
    label: 'Grades & Reports',
    href: '/grades',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  },
];

const logo = (
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
      <span className="text-authority-purple font-bold text-xl">E</span>
    </div>
    <div className="text-white">
      <div className="font-bold text-lg">Springfield Elementary</div>
      <div className="text-xs opacity-75">Education Portal</div>
    </div>
  </div>
);

const userMenu = (
  <div className="flex items-center space-x-3">
    <div className="hidden md:block text-right">
      <div className="text-sm font-medium text-gray-900">Principal Johnson</div>
      <div className="text-xs text-gray-500">principal@school.edu</div>
    </div>
    <img
      src="https://ui-avatars.com/api/?name=Principal+Johnson&background=6B46C1&color=fff"
      alt="Principal"
      className="w-10 h-10 rounded-full"
    />
  </div>
);

export function App() {
  return (
    <Router>
      <AdminLayout
        navigation={navigation}
        logo={logo}
        userMenu={userMenu}
        vertical="education"
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/grades" element={<Grades />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;
