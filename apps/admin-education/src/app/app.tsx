import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import AdminPortal from './portals/admin/AdminPortal';
import OwnerPortal from './portals/owner/OwnerPortal';
import PrincipalPortal from './portals/principal/PrincipalPortal';
import DepartmentPortal from './portals/department/DepartmentPortal';
import VicePrincipalPortal from './portals/vice-principal/VicePrincipalPortal';
import OperationsPortal from './portals/operations/OperationsPortal';
import StudentPortal from './portals/student/StudentPortal';
import TeacherPortal from './portals/teacher/TeacherPortal';
import ParentPortal from './portals/parent/ParentPortal';

// Helper function to get the correct route for a role
const getRouteForRole = (role: string): string => {
  switch (role) {
    case 'OWNER':
      return '/admin/owner/dashboard';
    case 'PRINCIPAL':
      return '/admin/principal/dashboard';
    case 'DEPARTMENT_HEAD':
      return '/admin/department/science/dashboard';
    case 'VICE_PRINCIPAL':
      return '/admin/vice-principal/student-affairs/dashboard';
    case 'OPERATIONS_MANAGER':
      return '/admin/operations/dashboard';
    case 'STUDENT':
      return '/student/dashboard';
    case 'TEACHER':
      return '/teacher/dashboard';
    case 'PARENT':
      return '/parent/dashboard';
    default:
      return '/admin/dashboard';
  }
};

// Helper function to check if current path matches the role
const isPathForRole = (pathname: string, role: string): boolean => {
  switch (role) {
    case 'OWNER':
      return pathname.startsWith('/admin/owner');
    case 'PRINCIPAL':
      return pathname.startsWith('/admin/principal');
    case 'DEPARTMENT_HEAD':
      return pathname.startsWith('/admin/department');
    case 'VICE_PRINCIPAL':
      return pathname.startsWith('/admin/vice-principal');
    case 'OPERATIONS_MANAGER':
      return pathname.startsWith('/admin/operations');
    case 'STUDENT':
      return pathname.startsWith('/student');
    case 'TEACHER':
      return pathname.startsWith('/teacher');
    case 'PARENT':
      return pathname.startsWith('/parent');
    default:
      return pathname.startsWith('/admin') && !pathname.startsWith('/admin/owner') && 
             !pathname.startsWith('/admin/principal') && !pathname.startsWith('/admin/department') &&
             !pathname.startsWith('/admin/vice-principal') && !pathname.startsWith('/admin/operations');
  }
};

// Mock authentication - Replace with real auth
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  
  const login = (credentials: any) => {
    // Mock login - replace with API call
    const roleColors: { [key: string]: string } = {
      OWNER: 'D4AF37',
      PRINCIPAL: '6B46C1',
      DEPARTMENT_HEAD: '6B46C1',
      VICE_PRINCIPAL: '10B981',
      OPERATIONS_MANAGER: '2563EB',
      ADMIN: '6B46C1',
    };
    
    const mockUser = {
      id: '1',
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: credentials.role || 'ADMIN',
      avatar: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}&background=${roleColors[credentials.role] || '6B46C1'}&color=fff`,
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return { user, login, logout, isAuthenticated: !!user };
};

function AppRouter({ user, logout }: { user: any; logout: () => void }) {
  return (
    <Routes>
      {/* Owner Portal Routes */}
      <Route path="/admin/owner/*" element={<OwnerPortal user={user} onLogout={logout} />} />
      
      {/* Principal Portal Routes */}
      <Route path="/admin/principal/*" element={<PrincipalPortal user={user} onLogout={logout} />} />
      
      {/* Department Head Portal Routes */}
      <Route path="/admin/department/:deptName/*" element={<DepartmentPortal user={user} onLogout={logout} />} />
      
      {/* Vice Principal Portal Routes */}
      <Route path="/admin/vice-principal/*" element={<VicePrincipalPortal user={user} onLogout={logout} />} />
      
      {/* Operations Manager Portal Routes */}
      <Route path="/admin/operations/*" element={<OperationsPortal user={user} onLogout={logout} />} />
      
      {/* General Admin Portal Routes */}
      <Route path="/admin/*" element={<AdminPortal user={user} onLogout={logout} />} />
      
      {/* Student Portal Routes */}
      <Route path="/student/*" element={<StudentPortal user={user} onLogout={logout} />} />
      
      {/* Teacher Portal Routes */}
      <Route path="/teacher/*" element={<TeacherPortal user={user} onLogout={logout} />} />
      
      {/* Parent Portal Routes */}
      <Route path="/parent/*" element={<ParentPortal user={user} onLogout={logout} />} />
      
      {/* Default route based on role */}
      <Route
        path="/"
        element={
          <Navigate
            to={getRouteForRole(user?.role || 'ADMIN')}
            replace
          />
        }
      />
    </Routes>
  );
}

export function App() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Create a wrapper login function that handles navigation
  const handleLogin = (credentials: any) => {
    login(credentials);
    // Navigate immediately after setting user
    // Use a small delay to ensure state is updated
    const role = credentials.role || 'ADMIN';
    const correctRoute = getRouteForRole(role);
    setTimeout(() => {
      navigate(correctRoute, { replace: true });
    }, 50);
  };

  // Handle navigation when user changes (e.g., on page refresh or role change)
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const correctRoute = getRouteForRole(user.role);
      const currentPath = location.pathname;
      
      // Only navigate if current path doesn't match role
      if (!isPathForRole(currentPath, user.role) && currentPath !== correctRoute) {
        navigate(correctRoute, { replace: true });
      }
    }
  }, [isAuthenticated, user?.role, location.pathname, navigate]);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <AppRouter user={user} logout={logout} />;
}

export default App;
