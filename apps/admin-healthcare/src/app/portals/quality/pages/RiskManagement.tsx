import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';

export default function RiskManagement() {
  const incidents = [
    { id: 1, type: 'Patient Fall', severity: 'Moderate', date: '2025-01-18', status: 'Under Investigation', assigned: 'Risk Team A' },
    { id: 2, type: 'Medication Error', severity: 'Low', date: '2025-01-17', status: 'Resolved', assigned: 'Risk Team B' },
    { id: 3, type: 'Equipment Malfunction', severity: 'High', date: '2025-01-16', status: 'Under Investigation', assigned: 'Risk Team A' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Risk Management</h1>
        <p className="text-gray-600 mt-2">Incident reporting, patient safety event management, malpractice claim tracking</p>
      </div>

      <DashboardGrid columns={4}>
        <Card className="text-center p-4 bg-red-50">
          <div className="text-3xl font-bold text-red-600">12</div>
          <p className="text-sm text-gray-600 mt-1">Open Incidents</p>
        </Card>
        <Card className="text-center p-4 bg-yellow-50">
          <div className="text-3xl font-bold text-yellow-600">5</div>
          <p className="text-sm text-gray-600 mt-1">Under Investigation</p>
        </Card>
        <Card className="text-center p-4 bg-green-50">
          <div className="text-3xl font-bold text-green-600">28</div>
          <p className="text-sm text-gray-600 mt-1">Resolved This Month</p>
        </Card>
        <Card className="text-center p-4 bg-blue-50">
          <div className="text-3xl font-bold text-blue-600">2</div>
          <p className="text-sm text-gray-600 mt-1">Active Claims</p>
        </Card>
      </DashboardGrid>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Incident Reporting & Analysis</h2>
          <Button onClick={() => alert('Report incident')}>Report Incident</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{incident.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      incident.severity === 'High' ? 'bg-red-100 text-red-800' :
                      incident.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{incident.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      incident.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{incident.assigned}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
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

