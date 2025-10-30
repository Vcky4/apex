import { Card } from '@apex-providers/ui-components';

interface StaffCoordinationProps {
  deptName: string;
}

export default function StaffCoordination({ deptName }: StaffCoordinationProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Staff Coordination</h1>
        <p className="text-gray-600 mt-2">Teacher assignment, scheduling, and department meetings</p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Teacher Assignment & Schedules</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Teacher</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Classes</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Hours/Week</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">Teacher {idx + 1}</td>
                  <td className="py-3 px-4">Grade {9 + (idx % 4)} - {['A', 'B', 'C'][idx % 3]}</td>
                  <td className="py-3 px-4">{16 + (idx % 4)} hours</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Department Meetings</h2>
          <div className="space-y-3">
            {[
              { date: 'Mar 15, 2025', topic: 'Curriculum Review', attendees: 12, status: 'Scheduled' },
              { date: 'Mar 22, 2025', topic: 'Assessment Planning', attendees: 12, status: 'Scheduled' },
              { date: 'Mar 8, 2025', topic: 'Resource Allocation', attendees: 11, status: 'Completed' },
            ].map((item) => (
              <div key={item.date} className="p-3 border rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.topic}</div>
                <div className="text-sm text-gray-600 mt-1">{item.date} - {item.attendees} attendees</div>
                <span className={`mt-2 inline-block px-2 py-1 rounded text-xs ${
                  item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Collaborative Planning</h2>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium text-charcoal-gray">Joint Project Plans</div>
              <div className="text-sm text-gray-600 mt-1">3 active collaborative projects</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-charcoal-gray">Resource Sharing</div>
              <div className="text-sm text-gray-600 mt-1">15 shared teaching materials</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

