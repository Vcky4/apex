import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const appointments = [
    { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Follow-up', status: 'Upcoming' },
    { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Consultation', status: 'Upcoming' },
    { id: 3, patient: 'Bob Johnson', time: '02:00 PM', type: 'Check-up', status: 'Upcoming' },
  ];

  const pendingTasks = [
    { id: 1, type: 'Test Results', patient: 'Alice Brown', priority: 'High', time: '2 hours ago' },
    { id: 2, type: 'Prescription Renewal', patient: 'Charlie Wilson', priority: 'Medium', time: '5 hours ago' },
    { id: 3, type: 'Referral', patient: 'Diana Martinez', priority: 'Low', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Doctor Dashboard</h1>
        <p className="text-gray-600 mt-2">Clinical overview, today's appointments, pending consultations, critical patient alerts</p>
      </div>

      {/* Clinical Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Today's Appointments"
          value="12"
          color="blue"
          trend={{ value: 2, isPositive: true }}
          icon={<span className="text-2xl">📅</span>}
        />
        <StatCard
          title="Pending Consultations"
          value="5"
          color="orange"
          trend={{ value: -1, isPositive: true }}
          icon={<span className="text-2xl">⏳</span>}
        />
        <StatCard
          title="Critical Alerts"
          value="2"
          color="red"
          trend={{ value: 0, isPositive: false }}
          icon={<span className="text-2xl">⚠️</span>}
        />
        <StatCard
          title="Test Results Pending"
          value="8"
          color="purple"
          trend={{ value: 3, isPositive: false }}
          icon={<span className="text-2xl">🔬</span>}
        />
      </DashboardGrid>

      <DashboardGrid columns={2}>
        {/* Today's Schedule */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Today's Appointment Schedule</h2>
            <Button size="sm" onClick={() => navigate('/doctor/schedule')}>View All</Button>
          </div>
          <div className="space-y-3">
            {appointments.map((apt) => (
              <div key={apt.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/doctor/patients/ehr')}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-900">{apt.patient}</div>
                    <div className="text-sm text-gray-600 mt-1">{apt.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{apt.time}</div>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{apt.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tasks & Follow-up List</h2>
            <Button size="sm" variant="outline">View All</Button>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-900">{task.type}</div>
                    <div className="text-sm text-gray-600 mt-1">{task.patient}</div>
                    <div className="text-xs text-gray-500 mt-1">{task.time}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </DashboardGrid>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={() => navigate('/doctor/patients/ehr')} className="h-20 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">👥</span>
            <span>Start Consultation</span>
          </Button>
          <Button onClick={() => navigate('/doctor/diagnostics')} variant="secondary" className="h-20 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">🔬</span>
            <span>Review Test Results</span>
          </Button>
          <Button onClick={() => navigate('/doctor/clinical-support')} variant="outline" className="h-20 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">💊</span>
            <span>Write Prescription</span>
          </Button>
          <Button onClick={() => navigate('/doctor/clinical-support')} variant="outline" className="h-20 flex flex-col items-center justify-center">
            <span className="text-2xl mb-2">🏥</span>
            <span>Refer to Specialist</span>
          </Button>
        </div>
      </Card>

      {/* Patient Management Overview */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Patient Management</h2>
        <DashboardGrid columns={3}>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">45</div>
            <p className="text-sm text-gray-600 mt-1">Active Patient Caseload</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">8</div>
            <p className="text-sm text-gray-600 mt-1">Test Results Pending Review</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">12</div>
            <p className="text-sm text-gray-600 mt-1">Prescription Renewal Requests</p>
          </div>
        </DashboardGrid>
      </Card>
    </div>
  );
}

