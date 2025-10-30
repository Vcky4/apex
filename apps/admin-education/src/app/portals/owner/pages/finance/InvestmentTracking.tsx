import { Card } from '@apex-providers/ui-components';

export default function InvestmentTracking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Investment Tracking</h1>
        <p className="text-gray-600 mt-2">Infrastructure development and asset management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Total Investment Value</div>
          <div className="text-3xl font-bold text-executive-gold">$1.8M</div>
          <div className="text-sm text-gray-600 mt-2">Active Projects</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Completed Investments</div>
          <div className="text-3xl font-bold text-green-600">$1.2M</div>
          <div className="text-sm text-gray-600 mt-2">67% of total</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Expected ROI</div>
          <div className="text-3xl font-bold text-blue-600">18.5%</div>
          <div className="text-sm text-gray-600 mt-2">5-year projection</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Infrastructure Development Projects</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Project</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Investment</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Completion</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Expected Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                { project: 'New Science Laboratory', investment: 350000, status: 'In Progress', completion: '75%', expected: 420000 },
                { project: 'Library Modernization', investment: 280000, status: 'Completed', completion: '100%', expected: 320000 },
                { project: 'Sports Complex', investment: 450000, status: 'Planning', completion: '0%', expected: 550000 },
                { project: 'IT Infrastructure Upgrade', investment: 220000, status: 'Completed', completion: '100%', expected: 240000 },
                { project: 'Classroom Expansion', investment: 380000, status: 'In Progress', completion: '45%', expected: 420000 },
                { project: 'Cafeteria Renovation', investment: 150000, status: 'Completed', completion: '100%', expected: 165000 },
              ].map((item) => (
                <tr key={item.project} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{item.project}</td>
                  <td className="py-3 px-4">${item.investment.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{item.completion}</td>
                  <td className="py-3 px-4">${item.expected.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Asset Depreciation Schedule</h2>
          <div className="space-y-3">
            {[
              { asset: 'Buildings', value: 4500000, depreciation: 2.5, years: 40 },
              { asset: 'Laboratory Equipment', value: 850000, depreciation: 10, years: 10 },
              { asset: 'IT Equipment', value: 320000, depreciation: 20, years: 5 },
              { asset: 'Vehicles', value: 180000, depreciation: 20, years: 5 },
              { asset: 'Furniture & Fixtures', value: 250000, depreciation: 10, years: 10 },
            ].map((item) => (
              <div key={item.asset} className="p-3 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-charcoal-gray">{item.asset}</span>
                  <span className="text-sm text-gray-600">${item.value.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Depreciation: {item.depreciation}% annually ({item.years} years)
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">ROI Analysis</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600">Average ROI (5-Year)</div>
              <div className="text-3xl font-bold text-green-600 mt-2">18.5%</div>
              <div className="text-sm text-gray-600 mt-1">Above industry average (12%)</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-gray-600">Best Performing</div>
                <div className="font-semibold text-charcoal-gray mt-1">IT Infrastructure</div>
                <div className="text-sm text-green-600">32% ROI</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-xs text-gray-600">Latest Investment</div>
                <div className="font-semibold text-charcoal-gray mt-1">Science Lab</div>
                <div className="text-sm text-blue-600">Projected 22%</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

