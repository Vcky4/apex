import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

export default function DepartmentPerformance() {
  const departments = [
    { name: 'Cardiology', volume: 245, efficiency: '94%', outcomes: '98%', satisfaction: '4.7/5' },
    { name: 'Emergency', volume: 1245, efficiency: '89%', outcomes: '95%', satisfaction: '4.5/5' },
    { name: 'Surgery', volume: 456, efficiency: '96%', outcomes: '97%', satisfaction: '4.8/5' },
    { name: 'Pediatrics', volume: 678, efficiency: '92%', outcomes: '96%', satisfaction: '4.6/5' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Department Performance</h1>
        <p className="text-gray-600 mt-2">Service line analytics, resource allocation optimization, performance benchmarking</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Total Departments" value="12" color="blue" />
        <StatCard title="Avg Efficiency" value="92%" color="green" trend={{ value: 2.1, isPositive: true }} />
        <StatCard title="Avg Outcomes" value="96%" color="purple" trend={{ value: 1.5, isPositive: true }} />
        <StatCard title="Avg Satisfaction" value="4.6/5" color="orange" trend={{ value: 0.2, isPositive: true }} />
      </DashboardGrid>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Service Line Analytics</h2>
          <Button onClick={() => alert('Generate report')}>Generate Report</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Outcomes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Satisfaction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((dept) => (
                <tr key={dept.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{dept.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.volume}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.efficiency}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.outcomes}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{dept.satisfaction}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Analyze</button>
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

