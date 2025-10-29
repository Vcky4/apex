import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './auth/Login';
import AdminPortal from './portals/admin/AdminPortal';
import StudentPortal from './portals/student/StudentPortal';
import TeacherPortal from './portals/teacher/TeacherPortal';
import ParentPortal from './portals/parent/ParentPortal';

// Mock authentication - Replace with real auth
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  
  const login = (credentials: any) => {
    // Mock login - replace with API call
    const mockUser = {
      id: '1',
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: credentials.role || 'ADMIN', // ADMIN, STUDENT, TEACHER, PARENT
      avatar: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}&background=6B46C1&color=fff`,
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user is logged in on mount
  useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  return { user, login, logout, isAuthenticated: !!user };
};

export function App() {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  // Route based on user role
  const getPortalByRole = (role: string) => {
    switch (role) {
      case 'ADMIN':
      case 'PRINCIPAL':
      case 'DEPARTMENT_HEAD':
        return <AdminPortal user={user} onLogout={logout} />;
      case 'STUDENT':
        return <StudentPortal user={user} onLogout={logout} />;
      case 'TEACHER':
        return <TeacherPortal user={user} onLogout={logout} />;
      case 'PARENT':
        return <ParentPortal user={user} onLogout={logout} />;
      default:
        return <AdminPortal user={user} onLogout={logout} />;
    }
  };

  return (
    <Router>
      {getPortalByRole(user.role)}
    </Router>
  );
}

export default App;
