import { Card } from '@apex-providers/ui-components';

export default function StudentSupport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Student Support</h1>
        <p className="text-gray-600 mt-2">Learning support programs, counseling, and special needs accommodation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Active Support Programs</div>
          <div className="text-3xl font-bold text-blue-600">8</div>
          <div className="text-sm text-gray-600 mt-2">Programs running</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Counseling Sessions</div>
          <div className="text-3xl font-bold text-purple-600">145</div>
          <div className="text-sm text-gray-600 mt-2">This semester</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Special Needs</div>
          <div className="text-3xl font-bold text-green-600">32</div>
          <div className="text-sm text-gray-600 mt-2">Students supported</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Support Teachers</div>
          <div className="text-3xl font-bold text-orange-600">6</div>
          <div className="text-sm text-gray-600 mt-2">Active staff</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Learning Support Programs</h2>
        <div className="space-y-3">
          {[
            { program: 'Reading Support', students: 45, sessions: 120, status: 'Active' },
            { program: 'Math Tutoring', students: 38, sessions: 95, status: 'Active' },
            { program: 'Study Skills', students: 52, sessions: 85, status: 'Active' },
            { program: 'Language Development', students: 28, sessions: 75, status: 'Active' },
          ].map((item) => (
            <div key={item.program} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-charcoal-gray">{item.program}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.students} students enrolled</div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {item.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">{item.sessions} sessions completed this term</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Counseling Schedule</h2>
          <div className="space-y-3">
            {[
              { date: 'Mar 15, 2025', time: '9:00 AM', student: 'Meeting scheduled', type: 'Individual' },
              { date: 'Mar 15, 2025', time: '11:00 AM', student: 'Group session', type: 'Group' },
              { date: 'Mar 16, 2025', time: '2:00 PM', student: 'Parent consultation', type: 'Consultation' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 border rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.student}</div>
                <div className="text-sm text-gray-600 mt-1">{item.date} at {item.time}</div>
                <span className="mt-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Special Needs Accommodations</h2>
          <div className="space-y-3">
            {[
              { type: 'Learning Disabilities', count: 18, support: 'Fully accommodated' },
              { type: 'Physical Disabilities', count: 6, support: 'Accessible facilities' },
              { type: 'Emotional Support', count: 8, support: 'Counseling provided' },
            ].map((item) => (
              <div key={item.type} className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.type}</div>
                <div className="text-sm text-gray-600 mt-1">{item.count} students - {item.support}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

