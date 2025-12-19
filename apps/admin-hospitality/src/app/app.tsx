import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import HRPortal from './portals/hr/HRPortal';
import FinancePortal from './portals/finance/FinancePortal';
import OperationsPortal from './portals/operations/OperationsPortal';
import SecurityPortal from './portals/security/SecurityPortal';
import GuestPortal from './portals/guest/GuestPortal';
import StaffPortal from './portals/staff/StaffPortal';

// Helper function to get the correct route for a role
const getRouteForRole = (role: string): string => {
  switch (role) {
    case 'HR_ADMIN':
      return '/hospitality-estates/admin/hr/dashboard';
    case 'FINANCE_ADMIN':
      return '/hospitality-estates/admin/finance/dashboard';
    case 'OPERATIONS_ADMIN':
      return '/hospitality-estates/admin/operations/dashboard';
    case 'SECURITY_ADMIN':
      return '/hospitality-estates/admin/security/dashboard';
    case 'GUEST':
      return '/hospitality/guest/dashboard';
    case 'STAFF':
      return '/hospitality/staff/dashboard';
    default:
      return '/hospitality-estates/admin/operations/dashboard';
  }
};

// Helper function to check if current path matches the role
const isPathForRole = (pathname: string, role: string): boolean => {
  switch (role) {
    case 'HR_ADMIN':
      return pathname.startsWith('/hospitality-estates/admin/hr');
    case 'FINANCE_ADMIN':
      return pathname.startsWith('/hospitality-estates/admin/finance');
    case 'OPERATIONS_ADMIN':
      return pathname.startsWith('/hospitality-estates/admin/operations');
    case 'SECURITY_ADMIN':
      return pathname.startsWith('/hospitality-estates/admin/security');
    case 'GUEST':
      return pathname.startsWith('/hospitality/guest');
    case 'STAFF':
      return pathname.startsWith('/hospitality/staff');
    default:
      return true; 
  }
};

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  
  const login = (credentials: any) => {
    // Mock login
    const mockUser = {
      id: '1',
      email: credentials.email,
      role: credentials.role || 'OPERATIONS_ADMIN',
      name: credentials.email.split('@')[0],
    };
    setUser(mockUser);
    localStorage.setItem('hospitality_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospitality_user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('hospitality_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return { user, login, logout, isAuthenticated: !!user };
};

function AppRouter({ user, logout }: { user: any; logout: () => void }) {
  return (
    <Routes>
      {/* HR Portal Routes */}
      <Route path="/hospitality-estates/admin/hr/*" element={<HRPortal user={user} onLogout={logout} />} />
      
      {/* Finance Portal Routes */}
      <Route path="/hospitality-estates/admin/finance/*" element={<FinancePortal user={user} onLogout={logout} />} />
      
      {/* Operations Portal Routes */}
      <Route path="/hospitality-estates/admin/operations/*" element={<OperationsPortal user={user} onLogout={logout} />} />
      
      {/* Security Portal Routes */}
      <Route path="/hospitality-estates/admin/security/*" element={<SecurityPortal user={user} onLogout={logout} />} />
      
      {/* Guest Portal Routes */}
      <Route path="/hospitality/guest/*" element={<GuestPortal user={user} onLogout={logout} />} />
      
      {/* Staff Portal Routes */}
      <Route path="/hospitality/staff/*" element={<StaffPortal user={user} onLogout={logout} />} />
      
      {/* Default redirect */}
      <Route
        path="/"
        element={
          <Navigate
            to={getRouteForRole(user?.role || 'OPERATIONS_ADMIN')}
            replace
          />
        }
      />
      {/* Catch all - redirect to role default */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function App() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (credentials: any) => {
    login(credentials);
    const role = credentials.role || 'OPERATIONS_ADMIN';
    const correctRoute = getRouteForRole(role);
    setTimeout(() => {
      navigate(correctRoute, { replace: true });
    }, 50);
  };

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const currentPath = location.pathname;
      // Basic route protection
      if (currentPath === '/' || currentPath === '/login') {
        navigate(getRouteForRole(user.role), { replace: true });
      }
    }
  }, [isAuthenticated, user, location.pathname, navigate]);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <AppRouter user={user} logout={logout} />;
}

export default App;
