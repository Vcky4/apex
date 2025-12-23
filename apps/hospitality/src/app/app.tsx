import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import GuestPortal from './portals/guest/GuestPortal';
import StaffPortal from './portals/staff/StaffPortal';
import EstatesGuestPortal from './portals/estates-guest/EstatesGuestPortal';
import EventPlannerPortal from './portals/event-planner/EventPlannerPortal';
import OwnerPortal from './portals/owner/OwnerPortal';

// Helper function to get the correct route for a role
const getRouteForRole = (role: string): string => {
  switch (role) {
    case 'GUEST':
      return '/hospitality/guest/dashboard';
    case 'STAFF':
      return '/hospitality/staff/dashboard';
    case 'ESTATES_GUEST':
      return '/hospitality-estates/guest/dashboard';
    case 'EVENT_PLANNER':
      return '/hospitality-estates/event-planner/dashboard';
    case 'OWNER':
      return '/hospitality-estates/owner/dashboard';
    default:
      return '/hospitality/guest/dashboard';
  }
};

// Helper function to check if current path matches the role
const isPathForRole = (pathname: string, role: string): boolean => {
  switch (role) {
    case 'GUEST':
      return pathname.startsWith('/hospitality/guest');
    case 'STAFF':
      return pathname.startsWith('/hospitality/staff');
    case 'ESTATES_GUEST':
      return pathname.startsWith('/hospitality-estates/guest');
    case 'EVENT_PLANNER':
      return pathname.startsWith('/hospitality-estates/event-planner');
    case 'OWNER':
      return pathname.startsWith('/hospitality-estates/owner');
    default:
      return false;
  }
};

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  
  const login = (credentials: any) => {
    const mockUser = {
      id: '1',
      email: credentials.email,
      role: credentials.role || 'GUEST',
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
      {/* Guest Portal Routes */}
      <Route path="/hospitality/guest/*" element={<GuestPortal user={user} onLogout={logout} />} />
      
      {/* Staff Portal Routes */}
      <Route path="/hospitality/staff/*" element={<StaffPortal user={user} onLogout={logout} />} />
      
      {/* Estates Guest Portal Routes */}
      <Route path="/hospitality-estates/guest/*" element={<EstatesGuestPortal user={user} onLogout={logout} />} />
      
      {/* Event Planner Portal Routes */}
      <Route path="/hospitality-estates/event-planner/*" element={<EventPlannerPortal user={user} onLogout={logout} />} />
      
      {/* Owner Portal Routes */}
      <Route path="/hospitality-estates/owner/*" element={<OwnerPortal user={user} onLogout={logout} />} />
      
      {/* Default redirect */}
      <Route
        path="/"
        element={
          <Navigate
            to={getRouteForRole(user?.role || 'GUEST')}
            replace
          />
        }
      />
      {/* Catch all - redirect to role default */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (credentials: any) => {
    login(credentials);
    const role = credentials.role || 'GUEST';
    const correctRoute = getRouteForRole(role);
    setTimeout(() => {
      navigate(correctRoute, { replace: true });
    }, 50);
  };

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const currentPath = location.pathname;
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

