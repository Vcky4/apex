import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function LabDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Lab Assistant Dashboard</h1>
        <p className="text-gray-600 mt-2">Lab work overview, pending test requests, in-progress tests, critical result alerts, equipment status</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Pending Tests" value="15" color="orange" icon={<span className="text-2xl">⏳</span>} />
        <StatCard title="In Progress" value="8" color="blue" icon={<span className="text-2xl">🔬</span>} />
        <StatCard title="Critical Results" value="2" color="red" icon={<span className="text-2xl">⚠️</span>} />
        <StatCard title="QC Due" value="3" color="purple" icon={<span className="text-2xl">✅</span>} />
      </DashboardGrid>
    </div>
  );
}

