import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './auth/Login';
import DoctorPortal from './portals/doctor/DoctorPortal';
import NursePortal from './portals/nurse/NursePortal';
import LabPortal from './portals/lab/LabPortal';
import PatientPortal from './portals/patient/PatientPortal';
import PharmacistPortal from './portals/pharmacist/PharmacistPortal';

// Helper function to get the correct route for a role
const getRouteForRole = (role: string): string => {
  switch (role) {
    case 'DOCTOR':
      return '/doctor/dashboard';
    case 'NURSE':
      return '/nurse/dashboard';
    case 'LAB_ASSISTANT':
      return '/lab/dashboard';
    case 'PATIENT':
      return '/patient/dashboard';
    case 'PHARMACIST':
      return '/pharmacist/dashboard';
    default:
      return '/doctor/dashboard';
  }
};

// Helper function to check if current path matches the role
const isPathForRole = (pathname: string, role: string): boolean => {
  switch (role) {
    case 'DOCTOR':
      return pathname.startsWith('/doctor');
    case 'NURSE':
      return pathname.startsWith('/nurse');
    case 'LAB_ASSISTANT':
      return pathname.startsWith('/lab');
    case 'PATIENT':
      return pathname.startsWith('/patient');
    case 'PHARMACIST':
      return pathname.startsWith('/pharmacist');
    default:
      return false;
  }
};

// Mock authentication - Replace with real auth
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  
  const login = (credentials: any) => {
    // Mock login - replace with API call
    const mockUser = {
      email: credentials.email,
      role: credentials.role,
      name: credentials.role === 'DOCTOR' ? 'Dr. Sarah Johnson' :
            credentials.role === 'NURSE' ? 'Nurse Patricia Brown' :
            credentials.role === 'LAB_ASSISTANT' ? 'Lab Tech John Smith' :
            credentials.role === 'PATIENT' ? 'John Doe' :
            'Pharmacist Mary Wilson',
    };
    setUser(mockUser);
    localStorage.setItem('healthcare_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcare_user');
  };

  useEffect(() => {
    const stored = localStorage.getItem('healthcare_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return { user, login, logout };
};

function AppRouter({ user, logout }: { user: any; logout: () => void }) {
  return (
    <Routes>
      {/* Doctor Portal Routes */}
      <Route path="/doctor/*" element={<DoctorPortal user={user} onLogout={logout} />} />
      
      {/* Nurse Portal Routes */}
      <Route path="/nurse/*" element={<NursePortal user={user} onLogout={logout} />} />
      
      {/* Lab Assistant Portal Routes */}
      <Route path="/lab/*" element={<LabPortal user={user} onLogout={logout} />} />
      
      {/* Patient Portal Routes */}
      <Route path="/patient/*" element={<PatientPortal user={user} onLogout={logout} />} />
      
      {/* Pharmacist Portal Routes */}
      <Route path="/pharmacist/*" element={<PharmacistPortal user={user} onLogout={logout} />} />
      
      {/* Default route based on role */}
      <Route
        path="/"
        element={
          <Navigate
            to={getRouteForRole(user?.role || 'DOCTOR')}
            replace
          />
        }
      />
    </Routes>
  );
}

export default function App() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && !isPathForRole(location.pathname, user.role)) {
      navigate(getRouteForRole(user.role), { replace: true });
    }
  }, [user, location.pathname, navigate]);

  if (!user) {
    return <Login onLogin={login} />;
  }

  return <AppRouter user={user} logout={logout} />;
}

