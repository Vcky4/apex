import { Card } from '@apex-providers/ui-components';

export default function ITAdministration() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">IT Administration</h1>
        <p className="text-gray-600 mt-2">Network infrastructure, device management, and software licensing</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Network Infrastructure Management</h2>
          <p className="text-gray-600">Manage network infrastructure and connectivity</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Device Inventory & Management</h2>
          <p className="text-gray-600">Track and manage IT devices and equipment</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Software License Tracking</h2>
          <p className="text-gray-600">Track software licenses and renewals</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Help Desk & Support Management</h2>
          <p className="text-gray-600">Manage IT support requests and tickets</p>
        </Card>
      </div>
    </div>
  );
}
