import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import PrincipalPortal from './portals/principal/PrincipalPortal';
import HRPortal from './portals/hr/HRPortal';
import FinancePortal from './portals/finance/FinancePortal';
import OwnerPortal from './portals/owner/OwnerPortal';
import StudentAffairsPortal from './portals/vice-principal/VicePrincipalPortal';
import OperationsPortal from './portals/operations/OperationsPortal';
import StudentPortal from './portals/student/StudentPortal';
import TeacherPortal from './portals/teacher/TeacherPortal';
import ParentPortal from './portals/parent/ParentPortal';

// Helper function to get the correct route for a role
const getRouteForRole = (role: string): string => {
  switch (role) {
    case 'HR_EXECUTIVE':
      return '/admin/hr/dashboard';
    case 'FINANCE_EXECUTIVE':
      return '/admin/finance/dashboard';
    case 'OWNER':
      return '/admin/owner/dashboard';
    case 'ACADEMIC_EXECUTIVE':
      return '/principal/dashboard';
    case 'STUDENT_AFFAIRS_EXECUTIVE':
    case 'VICE_PRINCIPAL':
      return '/admin/student-affairs/dashboard';
    case 'OPERATIONS_EXECUTIVE':
    case 'OPERATIONS_MANAGER':
      return '/admin/operations/dashboard';
    case 'PRINCIPAL':
      return '/principal/dashboard';
    case 'STUDENT':
      return '/student/dashboard';
    case 'TEACHER':
      return '/teacher/dashboard';
    case 'PARENT':
      return '/parent/dashboard';
    default:
      return '/principal/dashboard';
  }
};

// Helper function to check if current path matches the role
// Hierarchy roles can access their downlines
const isPathForRole = (pathname: string, role: string): boolean => {
  switch (role) {
    case 'OWNER':
      // Owner can access all admin portals (all downlines) including Principal/Academic Executive portal
      return pathname.startsWith('/admin/owner') ||
             pathname.startsWith('/admin/finance') ||
             pathname.startsWith('/admin/hr') ||
             pathname.startsWith('/admin/student-affairs') ||
             pathname.startsWith('/admin/operations') ||
             pathname.startsWith('/principal');
    case 'HR_EXECUTIVE':
      return pathname.startsWith('/admin/hr');
    case 'FINANCE_EXECUTIVE':
      return pathname.startsWith('/admin/finance');
    case 'ACADEMIC_EXECUTIVE':
      return pathname.startsWith('/principal');
    case 'STUDENT_AFFAIRS_EXECUTIVE':
    case 'VICE_PRINCIPAL':
      return pathname.startsWith('/admin/student-affairs');
    case 'OPERATIONS_EXECUTIVE':
    case 'OPERATIONS_MANAGER':
      return pathname.startsWith('/admin/operations');
    case 'PRINCIPAL':
      return pathname.startsWith('/principal');
    case 'STUDENT':
      return pathname.startsWith('/student');
    case 'TEACHER':
      return pathname.startsWith('/teacher');
    case 'PARENT':
      return pathname.startsWith('/parent');
    default:
      return pathname.startsWith('/principal') || (pathname.startsWith('/admin') && !pathname.startsWith('/admin/hr') &&
             !pathname.startsWith('/admin/finance') && !pathname.startsWith('/admin/owner') &&
             !pathname.startsWith('/admin/student-affairs') && !pathname.startsWith('/admin/operations'));
  }
};

// Mock authentication - Replace with real auth
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  
  const login = (credentials: any) => {
    // Mock login - replace with API call
    const roleColors: { [key: string]: string } = {
      OWNER: 'D4AF37',
      VICE_PRINCIPAL: '10B981',
      OPERATIONS_MANAGER: '2563EB',
      PRINCIPAL: '6B46C1',
      ADMIN: '6B46C1',
    };
    
    const mockUser = {
      id: '1',
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: credentials.role || 'PRINCIPAL',
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
      
      {/* HR Administration Portal Routes */}
      <Route path="/admin/hr/*" element={<HRPortal user={user} onLogout={logout} />} />
      
      {/* Finance & Accounting Portal Routes */}
      <Route path="/admin/finance/*" element={<FinancePortal user={user} onLogout={logout} />} />
      
      {/* Operations & Facilities Portal Routes */}
      <Route path="/admin/operations/*" element={<OperationsPortal user={user} onLogout={logout} />} />
      
      {/* Student Affairs Administration Portal Routes */}
      <Route path="/admin/student-affairs/*" element={<StudentAffairsPortal user={user} onLogout={logout} />} />
      
      {/* Principal Portal Routes */}
      <Route path="/principal/*" element={<PrincipalPortal user={user} onLogout={logout} />} />
      
      {/* Student Portal Routes */}
      <Route path="/student/*" element={<StudentPortal user={user} onLogout={logout} />} />
      
      {/* Teacher Portal Routes */}
      <Route path="/teacher/*" element={<TeacherPortal user={user} onLogout={logout} />} />
      
      {/* Parent Portal Routes */}
      <Route path="/parent/*" element={<ParentPortal user={user} onLogout={logout} />} />
      
      {/* Auth Routes */}
      <Route path="/signup" element={<Navigate to="/signup" replace />} />
      
      {/* Default route based on role */}
      <Route
        path="/"
        element={
          <Navigate
            to={getRouteForRole(user?.role || 'PRINCIPAL')}
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
    const role = credentials.role || 'PRINCIPAL';
    const correctRoute = getRouteForRole(role);
    setTimeout(() => {
      navigate(correctRoute, { replace: true });
    }, 50);
  };

  // Handle navigation when user changes (e.g., on page refresh or role change)
  // Only redirect on initial load or if user is on root/login page
  // Don't redirect if user is already navigating within their allowed portal
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const correctRoute = getRouteForRole(user.role);
      const currentPath = location.pathname;
      
      // Only redirect if:
      // 1. User is on root path (/)
      // 2. User is on login path
      // 3. Current path is not valid for this role
      // Do NOT redirect if user is already on a valid path for their role (allows sub-route navigation)
      if (currentPath === '/' || currentPath === '/login') {
        navigate(correctRoute, { replace: true });
      } else if (!isPathForRole(currentPath, user.role)) {
        // Only redirect if path is completely invalid for this role
        navigate(correctRoute, { replace: true });
      }
      // If path is valid for role, do nothing - allow navigation
    }
  }, [isAuthenticated, user?.role, location.pathname, navigate]);

  // Handle signup route separately
  if (location.pathname === '/signup') {
    return <Signup onSignup={() => {
      // After signup, redirect to login
      navigate('/login');
    }} />;
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <AppRouter user={user} logout={logout} />;
}

export default App;
