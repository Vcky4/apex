import { Card } from '@apex-providers/ui-components';

export default function DisciplineManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Discipline Management</h1>
        <p className="text-gray-600 mt-2">Behavioral incident tracking and code of conduct enforcement</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Total Incidents</div>
          <div className="text-3xl font-bold text-orange-600">8</div>
          <div className="text-sm text-green-600 mt-2">↓ 15% decrease</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Resolved</div>
          <div className="text-3xl font-bold text-green-600">6</div>
          <div className="text-sm text-gray-600 mt-2">75% resolution rate</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Pending</div>
          <div className="text-3xl font-bold text-yellow-600">2</div>
          <div className="text-sm text-gray-600 mt-2">Under review</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Code Compliance</div>
          <div className="text-3xl font-bold text-blue-600">96.8%</div>
          <div className="text-sm text-gray-600 mt-2">Overall compliance</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Recent Incidents</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Severity</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Mar 10, 2025', student: 'John Doe', type: 'Disruption', severity: 'Low', status: 'Resolved' },
                { date: 'Mar 8, 2025', student: 'Jane Smith', type: 'Tardiness', severity: 'Low', status: 'Resolved' },
                { date: 'Mar 5, 2025', student: 'Mike Johnson', type: 'Behavior', severity: 'Medium', status: 'Pending' },
                { date: 'Mar 3, 2025', student: 'Sarah Williams', type: 'Disruption', severity: 'Low', status: 'Resolved' },
              ].map((incident, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{incident.date}</td>
                  <td className="py-3 px-4 font-medium">{incident.student}</td>
                  <td className="py-3 px-4">{incident.type}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      incident.severity === 'Low' ? 'bg-green-100 text-green-800' :
                      incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      incident.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {incident.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Code of Conduct Enforcement</h2>
          <div className="space-y-3">
            {[
              { rule: 'Attendance Policy', compliance: 94.5, trend: '+1.5' },
              { rule: 'Dress Code', compliance: 98.2, trend: '+0.8' },
              { rule: 'Respect Policy', compliance: 96.8, trend: '+2.1' },
              { rule: 'Academic Integrity', compliance: 99.1, trend: '+0.5' },
            ].map((item) => (
              <div key={item.rule} className="p-3 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-charcoal-gray">{item.rule}</span>
                  <span className="text-sm text-green-600">{item.trend}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-student-green h-2 rounded-full" style={{ width: `${item.compliance}%` }}></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">{item.compliance}% compliance</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Restorative Practices</h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-charcoal-gray">Mediation Sessions</div>
              <div className="text-sm text-gray-600 mt-1">12 sessions conducted this term</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-charcoal-gray">Resolution Rate</div>
              <div className="text-sm text-gray-600 mt-1">85% successful resolutions</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium text-charcoal-gray">Upcoming Training</div>
              <div className="text-sm text-gray-600 mt-1">Restorative Practice Workshop - March 25</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

