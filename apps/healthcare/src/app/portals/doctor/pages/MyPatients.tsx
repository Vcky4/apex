import { Card, Button } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast, ToastContainer } from '../../../shared/Toast';

export default function MyPatients() {
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();

  // Mock data for assigned patients
  const patients = [
    { id: '1', name: 'John Doe', dob: '1980-05-15', sex: 'M', mrn: 'MRN-001', lastVisit: '2025-01-18', condition: 'Hypertension', status: 'Stable' },
    { id: '2', name: 'Jane Smith', dob: '1975-08-22', sex: 'F', mrn: 'MRN-002', lastVisit: '2025-01-17', condition: 'Diabetes Type 2', status: 'Needs Review' },
    { id: '3', name: 'Bob Johnson', dob: '1985-03-10', sex: 'M', mrn: 'MRN-003', lastVisit: '2025-01-19', condition: 'Asthma', status: 'Stable' },
    { id: '4', name: 'Alice Brown', dob: '1990-11-05', sex: 'F', mrn: 'MRN-004', lastVisit: '2024-12-20', condition: 'Pregnancy', status: 'Stable' },
    { id: '5', name: 'Charlie Wilson', dob: '1968-02-14', sex: 'M', mrn: 'MRN-005', lastVisit: '2025-01-05', condition: 'Hyperlipidemia', status: 'Follow-up Required' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">My Patients</h1>
        <p className="text-gray-600 mt-2">View all assigned patients, check status, and manage care</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <Button onClick={() => showToast('Feature to add new patient coming soon', 'info')}>Add Patient</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 font-semibold text-gray-600">Patient Name</th>
                <th className="pb-3 font-semibold text-gray-600">MRN</th>
                <th className="pb-3 font-semibold text-gray-600">Age/Sex</th>
                <th className="pb-3 font-semibold text-gray-600">Condition</th>
                <th className="pb-3 font-semibold text-gray-600">Last Visit</th>
                <th className="pb-3 font-semibold text-gray-600">Status</th>
                <th className="pb-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 font-medium text-gray-900">{patient.name}</td>
                  <td className="py-4 text-gray-600">{patient.mrn}</td>
                  <td className="py-4 text-gray-600">
                    {new Date().getFullYear() - new Date(patient.dob).getFullYear()} / {patient.sex}
                  </td>
                  <td className="py-4 text-gray-600">{patient.condition}</td>
                  <td className="py-4 text-gray-600">{patient.lastVisit}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      patient.status === 'Stable' ? 'bg-green-100 text-green-800' :
                      patient.status === 'Needs Review' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/doctor/patients/ehr/${patient.id}`)}>
                        EHR
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate(`/doctor/patients/ehr/${patient.id}`)}>
                        Prescribe
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">No patients found matching your search.</div>
          )}
        </div>
      </Card>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

