import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function PharmacistDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Pharmacist Dashboard</h1>
        <p className="text-gray-600 mt-2">Pharmacy overview, pending prescriptions, ready for pickup, patient consultations scheduled, inventory alerts</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Pending Prescriptions" value="12" color="orange" icon={<span className="text-2xl">⏳</span>} />
        <StatCard title="Ready for Pickup" value="8" color="green" icon={<span className="text-2xl">✅</span>} />
        <StatCard title="Consultations" value="3" color="blue" icon={<span className="text-2xl">💬</span>} />
        <StatCard title="Inventory Alerts" value="5" color="red" icon={<span className="text-2xl">⚠️</span>} />
      </DashboardGrid>
    </div>
  );
}

