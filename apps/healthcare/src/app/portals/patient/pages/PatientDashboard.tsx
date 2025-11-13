import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Patient Dashboard</h1>
        <p className="text-gray-600 mt-2">Health overview, upcoming appointments, recent test results, current medications, care team contacts</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Upcoming Appointments" value="2" color="blue" icon={<span className="text-2xl">📅</span>} />
        <StatCard title="Recent Test Results" value="3" color="green" icon={<span className="text-2xl">🔬</span>} />
        <StatCard title="Current Medications" value="2" color="purple" icon={<span className="text-2xl">💊</span>} />
        <StatCard title="Care Team" value="4" color="orange" icon={<span className="text-2xl">👥</span>} />
      </DashboardGrid>
    </div>
  );
}

