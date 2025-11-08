import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function CostAccounting() {
  const departments = [
    { name: 'Cardiology', costPerCase: '$12,450', cases: 245, totalCost: '$3.05M', profitability: '18%' },
    { name: 'Emergency', costPerCase: '$3,850', cases: 1245, totalCost: '$4.79M', profitability: '12%' },
    { name: 'Surgery', costPerCase: '$18,200', cases: 456, totalCost: '$8.30M', profitability: '22%' },
    { name: 'Pediatrics', costPerCase: '$4,200', cases: 678, totalCost: '$2.85M', profitability: '15%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Cost Accounting</h1>
        <p className="text-gray-600 mt-2">Procedure cost analysis, departmental profitability, resource utilization optimization</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Avg Cost per Case" value="$8,245" color="blue" trend={{ value: -2.3, isPositive: true }} />
        <StatCard title="Department Profitability" value="16.8%" color="green" trend={{ value: 1.2, isPositive: true }} />
        <StatCard title="Resource Utilization" value="84%" color="purple" trend={{ value: 3.1, isPositive: true }} />
        <StatCard title="Service Line Performance" value="92%" color="orange" trend={{ value: 0.8, isPositive: true }} />
      </DashboardGrid>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Departmental Profitability Analysis</h2>
          <Button onClick={() => alert('Generate report')}>Generate Report</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost per Case</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cases</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profitability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((dept) => (
                <tr key={dept.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{dept.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.costPerCase}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.cases}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold">{dept.totalCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      parseFloat(dept.profitability) > 15 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {dept.profitability}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Analyze</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <DashboardGrid columns={2}>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Cost Variance Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Labor Costs</span>
              <span className="font-semibold">-2.1% vs budget</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>
            <div className="flex justify-between mt-3">
              <span>Supply Costs</span>
              <span className="font-semibold">+1.5% vs budget</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '101.5%' }}></div>
            </div>
            <div className="flex justify-between mt-3">
              <span>Equipment Costs</span>
              <span className="font-semibold">-0.8% vs budget</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.2%' }}></div>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Service Line Performance</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Cardiac Services</span>
                <span className="font-semibold text-green-600">+18% ROI</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Emergency Services</span>
                <span className="font-semibold text-blue-600">+12% ROI</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Surgical Services</span>
                <span className="font-semibold text-purple-600">+22% ROI</span>
              </div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex justify-between">
                <span className="font-medium">Pediatric Services</span>
                <span className="font-semibold text-orange-600">+15% ROI</span>
              </div>
            </div>
          </div>
        </Card>
      </DashboardGrid>
    </div>
  );
}

