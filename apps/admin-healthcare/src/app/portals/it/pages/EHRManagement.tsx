import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';

export default function EHRManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">EHR Management</h1>
        <p className="text-gray-600 mt-2">System configuration, user access & security, clinical workflow design</p>
      </div>

      <DashboardGrid columns={3}>
        <Card>
          <h3 className="text-lg font-semibold mb-3">System Configuration</h3>
          <p className="text-sm text-gray-600 mb-4">Configure EHR settings and preferences</p>
          <Button onClick={() => alert('Configure system')}>Configure</Button>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-3">User Access Management</h3>
          <p className="text-sm text-gray-600 mb-4">Manage user roles and permissions</p>
          <Button onClick={() => alert('Manage users')}>Manage Users</Button>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Workflow Design</h3>
          <p className="text-sm text-gray-600 mb-4">Design and optimize clinical workflows</p>
          <Button onClick={() => alert('Design workflow')}>Design Workflow</Button>
        </Card>
      </DashboardGrid>

      <Card>
        <h2 className="text-xl font-semibold mb-4">EHR System Metrics</h2>
        <DashboardGrid columns={4}>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">99.8%</div>
            <p className="text-sm text-gray-600 mt-1">Uptime</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">1,245</div>
            <p className="text-sm text-gray-600 mt-1">Active Users</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">0.8s</div>
            <p className="text-sm text-gray-600 mt-1">Avg Response</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-sm text-gray-600 mt-1">Pending Upgrades</p>
          </div>
        </DashboardGrid>
      </Card>
    </div>
  );
}

