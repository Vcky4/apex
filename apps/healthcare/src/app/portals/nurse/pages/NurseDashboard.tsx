import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';

export default function NurseDashboard() {
  const navigate = useNavigate();

  const patients = [
    { id: 1, name: 'John Doe', room: '201', acuity: 'High', status: 'Active' },
    { id: 2, name: 'Jane Smith', room: '205', acuity: 'Medium', status: 'Active' },
    { id: 3, name: 'Bob Johnson', room: '210', acuity: 'Low', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Nurse Dashboard</h1>
        <p className="text-gray-600 mt-2">Shift overview, current patient assignment, medication administration schedule, vital signs monitoring, care plan tasks</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Current Patients" value={patients.length.toString()} color="purple" icon={<span className="text-2xl">👥</span>} />
        <StatCard title="Medications Due" value="8" color="orange" icon={<span className="text-2xl">💊</span>} />
        <StatCard title="Vitals Due" value="5" color="blue" icon={<span className="text-2xl">📊</span>} />
        <StatCard title="Care Tasks" value="12" color="green" icon={<span className="text-2xl">✅</span>} />
      </DashboardGrid>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Current Patient Assignment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <div key={patient.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/nurse/patients/care-plan')}>
              <div className="font-semibold text-gray-900">{patient.name}</div>
              <div className="text-sm text-gray-600 mt-1">Room {patient.room}</div>
              <span className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${
                patient.acuity === 'High' ? 'bg-red-100 text-red-800' :
                patient.acuity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {patient.acuity} Acuity
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Medication Schedule</h3>
          <div className="space-y-2">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="font-medium text-red-900">Due Now</div>
              <div className="text-sm text-red-800">Lisinopril - John Doe (Room 201)</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-900">Due in 30 min</div>
              <div className="text-sm text-yellow-800">Metformin - Jane Smith (Room 205)</div>
            </div>
          </div>
          <Button size="sm" className="mt-4" onClick={() => navigate('/nurse/medications')}>View All Medications</Button>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Vital Signs Due</h3>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900">Next Reading</div>
              <div className="text-sm text-blue-800">Bob Johnson - Room 210 (2:00 PM)</div>
            </div>
          </div>
          <Button size="sm" className="mt-4" onClick={() => navigate('/nurse/vitals')}>Record Vitals</Button>
        </Card>
      </div>
    </div>
  );
}

