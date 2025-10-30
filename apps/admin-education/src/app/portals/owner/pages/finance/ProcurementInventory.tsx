import { Card } from '@apex-providers/ui-components';

export default function ProcurementInventory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Procurement & Inventory</h1>
        <p className="text-gray-600 mt-2">Purchase requisitions, vendor management, and asset tracking</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Purchase Requisition Workflow</h2>
          <p className="text-gray-600">Manage purchase requisitions and approvals</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Vendor Management & Performance</h2>
          <p className="text-gray-600">Manage vendor relationships and performance</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Inventory Tracking & Valuation</h2>
          <p className="text-gray-600">Track inventory levels and valuations</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Asset Management & Depreciation</h2>
          <p className="text-gray-600">Manage assets and track depreciation</p>
        </Card>
      </div>
    </div>
  );
}
