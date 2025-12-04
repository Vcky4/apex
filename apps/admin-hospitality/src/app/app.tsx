import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import HRPortal from './portals/hr/HRPortal';
import FinancePortal from './portals/finance/FinancePortal';
import OperationsPortal from './portals/operations/OperationsPortal';

// Helper function to get the correct route for a role
const getRouteForRole = (role: string): string => {
  switch (role) {
    case 'HR_ADMIN':
      return '/admin/hr/dashboard';
    case 'FINANCE_ADMIN':
      return '/admin/finance/dashboard';
    case 'OPERATIONS_ADMIN':
      return '/admin/operations/dashboard';
    default:
      return '/admin/operations/dashboard';
  }
};

// Helper function to check if current path matches the role
const isPathForRole = (pathname: string, role: string): boolean => {
  switch (role) {
    case 'HR_ADMIN':
      return pathname.startsWith('/admin/hr');
    case 'FINANCE_ADMIN':
      return pathname.startsWith('/admin/finance');
    case 'OPERATIONS_ADMIN':
      return pathname.startsWith('/admin/operations');
    default:
      // Super admin or unknown role fallback - maybe allow everything for dev
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
      <Route path="/admin/hr/*" element={<HRPortal user={user} onLogout={logout} />} />
      
      {/* Finance Portal Routes */}
      <Route path="/admin/finance/*" element={<FinancePortal user={user} onLogout={logout} />} />
      
      {/* Operations Portal Routes */}
      <Route path="/admin/operations/*" element={<OperationsPortal user={user} onLogout={logout} />} />
      
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
