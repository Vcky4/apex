import { Route, Routes, Navigate } from 'react-router-dom';
import PortalSelector from './portal-selector';
import SchoolOwnerDashboard from './education/school-owner/dashboard';
import PrincipalDashboard from './education/principal/dashboard';
import HospitalCEODashboard from './healthcare/hospital-ceo/dashboard';
import PlantManagerDashboard from './manufacturing/plant-manager/dashboard';
import './app.css';

export function App() {
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<PortalSelector />} />
        <Route path="/admin/education/school-owner/dashboard" element={<SchoolOwnerDashboard />} />
        <Route path="/admin/education/principal/dashboard" element={<PrincipalDashboard />} />
        <Route path="/admin/healthcare/hospital-ceo/dashboard" element={<HospitalCEODashboard />} />
        <Route path="/admin/manufacturing/plant-manager/dashboard" element={<PlantManagerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
