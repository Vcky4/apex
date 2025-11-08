import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import HRPortal from './portals/hr/HRPortal';
import FinancePortal from './portals/finance/FinancePortal';
import ClinicalOperationsPortal from './portals/clinical-operations/ClinicalOperationsPortal';
import QualityPortal from './portals/quality/QualityPortal';
import ITPortal from './portals/it/ITPortal';

// Helper function to get the correct route for a role
const getRouteForRole = (role: string): string => {
  switch (role) {
    case 'HEALTHCARE_HR_EXECUTIVE':
      return '/healthcare/admin/hr/dashboard';
    case 'HEALTHCARE_FINANCE_EXECUTIVE':
      return '/healthcare/admin/finance/dashboard';
    case 'CLINICAL_OPERATIONS_EXECUTIVE':
      return '/healthcare/admin/clinical-operations/dashboard';
    case 'QUALITY_COMPLIANCE_EXECUTIVE':
      return '/healthcare/admin/quality/dashboard';
    case 'HEALTHCARE_IT_EXECUTIVE':
      return '/healthcare/admin/it/dashboard';
    default:
      return '/healthcare/admin/hr/dashboard';
  }
};

// Helper function to check if current path matches the role
const isPathForRole = (pathname: string, role: string): boolean => {
  switch (role) {
    case 'HEALTHCARE_HR_EXECUTIVE':
      return pathname.startsWith('/healthcare/admin/hr');
    case 'HEALTHCARE_FINANCE_EXECUTIVE':
      return pathname.startsWith('/healthcare/admin/finance');
    case 'CLINICAL_OPERATIONS_EXECUTIVE':
      return pathname.startsWith('/healthcare/admin/clinical-operations');
    case 'QUALITY_COMPLIANCE_EXECUTIVE':
      return pathname.startsWith('/healthcare/admin/quality');
    case 'HEALTHCARE_IT_EXECUTIVE':
      return pathname.startsWith('/healthcare/admin/it');
    default:
      return pathname.startsWith('/healthcare/admin');
  }
};

// Mock authentication - Replace with real auth
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  
  const login = (credentials: any) => {
    const roleColors: { [key: string]: string } = {
      HEALTHCARE_HR_EXECUTIVE: '2563EB',
      HEALTHCARE_FINANCE_EXECUTIVE: '10B981',
      CLINICAL_OPERATIONS_EXECUTIVE: '2563EB',
      QUALITY_COMPLIANCE_EXECUTIVE: '10B981',
      HEALTHCARE_IT_EXECUTIVE: '2563EB',
    };
    
    const mockUser = {
      id: '1',
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: credentials.role || 'HEALTHCARE_HR_EXECUTIVE',
      avatar: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}&background=${roleColors[credentials.role] || '2563EB'}&color=fff`,
    };
    setUser(mockUser);
    localStorage.setItem('healthcare_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcare_user');
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('healthcare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return { user, login, logout, isAuthenticated: !!user };
};

function AppRouter({ user, logout }: { user: any; logout: () => void }) {
  return (
    <Routes>
      {/* HR Administration Portal Routes */}
      <Route path="/healthcare/admin/hr/*" element={<HRPortal user={user} onLogout={logout} />} />
      
      {/* Finance Administration Portal Routes */}
      <Route path="/healthcare/admin/finance/*" element={<FinancePortal user={user} onLogout={logout} />} />
      
      {/* Clinical Operations Administration Portal Routes */}
      <Route path="/healthcare/admin/clinical-operations/*" element={<ClinicalOperationsPortal user={user} onLogout={logout} />} />
      
      {/* Quality & Compliance Administration Portal Routes */}
      <Route path="/healthcare/admin/quality/*" element={<QualityPortal user={user} onLogout={logout} />} />
      
      {/* Healthcare IT Administration Portal Routes */}
      <Route path="/healthcare/admin/it/*" element={<ITPortal user={user} onLogout={logout} />} />
      
      {/* Default route based on role */}
      <Route
        path="/"
        element={
          <Navigate
            to={getRouteForRole(user?.role || 'HEALTHCARE_HR_EXECUTIVE')}
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
    const role = credentials.role || 'HEALTHCARE_HR_EXECUTIVE';
    const correctRoute = getRouteForRole(role);
    setTimeout(() => {
      navigate(correctRoute, { replace: true });
    }, 50);
  };

  // Handle navigation when user changes
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const correctRoute = getRouteForRole(user.role);
      const currentPath = location.pathname;
      
      if (currentPath === '/' || currentPath === '/login') {
        navigate(correctRoute, { replace: true });
      } else if (!isPathForRole(currentPath, user.role)) {
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
