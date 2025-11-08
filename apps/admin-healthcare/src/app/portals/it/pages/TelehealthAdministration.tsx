import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function TelehealthAdministration() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Telehealth Administration</h1>
        <p className="text-gray-600 mt-2">Virtual care platform management, telemedicine program coordination, remote patient monitoring</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Virtual Consultations" value="1,245" color="blue" trend={{ value: 12.5, isPositive: true }} />
        <StatCard title="Platform Uptime" value="99.5%" color="green" trend={{ value: 0.3, isPositive: true }} />
        <StatCard title="Patient Satisfaction" value="4.7/5" color="purple" trend={{ value: 0.2, isPositive: true }} />
        <StatCard title="Active Providers" value="142" color="orange" trend={{ value: 8, isPositive: true }} />
      </DashboardGrid>

      <DashboardGrid columns={2}>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Telemedicine Programs</h3>
          <div className="space-y-3">
            {['Primary Care Telehealth', 'Mental Health Services', 'Specialist Consultations'].map((program, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">{program}</div>
                <div className="text-sm text-gray-600 mt-1">Active</div>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full" onClick={() => alert('Manage programs')}>Manage Programs</Button>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Remote Patient Monitoring</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium">Active Monitors</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">328</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium">Alerts This Week</div>
              <div className="text-2xl font-bold text-green-600 mt-1">45</div>
            </div>
          </div>
          <Button className="mt-4 w-full" onClick={() => alert('View monitoring')}>View Monitoring</Button>
        </Card>
      </DashboardGrid>
    </div>
  );
}

