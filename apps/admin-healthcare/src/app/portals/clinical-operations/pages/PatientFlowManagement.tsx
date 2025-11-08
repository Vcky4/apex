import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function PatientFlowManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Patient Flow Management</h1>
        <p className="text-gray-600 mt-2">Admission-discharge-transfer coordination, bed management optimization, wait time reduction</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Avg Length of Stay" value="3.2 days" color="blue" trend={{ value: -0.3, isPositive: true }} />
        <StatCard title="Bed Turnover Rate" value="2.8/day" color="green" trend={{ value: 0.2, isPositive: true }} />
        <StatCard title="ED Wait Time" value="28 min" color="orange" trend={{ value: -5, isPositive: true }} />
        <StatCard title="Throughput Rate" value="94%" color="purple" trend={{ value: 2.1, isPositive: true }} />
      </DashboardGrid>

      <DashboardGrid columns={2}>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Bed Management</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Occupied Beds</span>
              <span className="font-semibold">245 / 280</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: '87.5%' }}></div>
            </div>
            <div className="flex justify-between mt-3">
              <span>Available Beds</span>
              <span className="font-semibold text-green-600">35</span>
            </div>
            <Button className="mt-4 w-full" onClick={() => alert('Manage beds')}>Manage Bed Allocation</Button>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Admission-Discharge-Transfer</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium">Pending Admissions</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">12</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium">Scheduled Discharges</div>
              <div className="text-2xl font-bold text-green-600 mt-1">18</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium">Transfers Today</div>
              <div className="text-2xl font-bold text-purple-600 mt-1">8</div>
            </div>
          </div>
        </Card>
      </DashboardGrid>
    </div>
  );
}

