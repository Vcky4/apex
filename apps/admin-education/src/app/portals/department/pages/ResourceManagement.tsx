import { Card } from '@apex-providers/ui-components';

interface ResourceManagementProps {
  deptName: string;
}

export default function ResourceManagement({ deptName }: ResourceManagementProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Resource Management</h1>
        <p className="text-gray-600 mt-2">Teaching materials, equipment, and budget tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Teaching Materials</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium">Textbooks</div>
              <div className="text-sm text-gray-600">245 copies available</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium">Workbooks</div>
              <div className="text-sm text-gray-600">180 copies available</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium">Reference Materials</div>
              <div className="text-sm text-gray-600">45 items</div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Equipment Status</h3>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-medium text-charcoal-gray">Lab Equipment</div>
              <div className="text-sm text-green-600 mt-1">✓ Fully operational</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-medium text-charcoal-gray">Technology Tools</div>
              <div className="text-sm text-green-600 mt-1">✓ All systems active</div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Budget Spending</h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Allocated</span>
                <span className="text-sm font-medium">$180,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-executive-gold h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">Spent: $135,000</div>
            <div className="text-sm text-green-600">Remaining: $45,000</div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Purchase Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Item</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Quantity</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Estimated Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { item: 'Laboratory Equipment Set', qty: 2, cost: 45000, status: 'Pending Approval' },
                { item: 'Textbook Series', qty: 50, cost: 8500, status: 'Approved' },
                { item: 'Digital Tools', qty: 10, cost: 12000, status: 'Pending Approval' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{row.item}</td>
                  <td className="py-3 px-4">{row.qty}</td>
                  <td className="py-3 px-4">${row.cost.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      row.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

