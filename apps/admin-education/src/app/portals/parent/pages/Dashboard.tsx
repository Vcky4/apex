import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Welcome, Mrs. Johnson!</h1>
        <p className="text-gray-600 mt-2">Stay updated on your children's academic progress</p>
      </div>

      {/* Children Overview */}
      <DashboardGrid columns={2}>
        <Card padding="md" className="border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-charcoal-gray">Alex Johnson</h3>
              <p className="text-sm text-gray-600">Grade 10 • Student ID: 10245</p>
            </div>
            <img
              src="https://ui-avatars.com/api/?name=Alex+Johnson&background=3B82F6&color=fff"
              alt="Alex"
              className="w-16 h-16 rounded-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-charcoal-gray">3.8</div>
              <div className="text-xs text-gray-600">GPA</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">96%</div>
              <div className="text-xs text-gray-600">Attendance</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>
        </Card>

        <Card padding="md" className="border-l-4 border-pink-500">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-charcoal-gray">Emma Johnson</h3>
              <p className="text-sm text-gray-600">Grade 8 • Student ID: 08312</p>
            </div>
            <img
              src="https://ui-avatars.com/api/?name=Emma+Johnson&background=EC4899&color=fff"
              alt="Emma"
              className="w-16 h-16 rounded-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-charcoal-gray">3.9</div>
              <div className="text-xs text-gray-600">GPA</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-xs text-gray-600">Attendance</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">1</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
          </div>
        </Card>
      </DashboardGrid>

      {/* Quick Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Assignments"
          value="8"
          color="blue"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
        <StatCard
          title="Upcoming Events"
          value="3"
          color="purple"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        />
        <StatCard
          title="Unread Messages"
          value="5"
          color="orange"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        />
        <StatCard
          title="Pending Payments"
          value="$0"
          color="green"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </DashboardGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { child: 'Alex', activity: 'New grade posted - Math Quiz', time: '2 hours ago', type: 'grade' },
              { child: 'Emma', activity: 'Assignment submitted - English Essay', time: '5 hours ago', type: 'assignment' },
              { child: 'Alex', activity: 'Marked present - Today', time: '1 day ago', type: 'attendance' },
              { child: 'Emma', activity: 'Message from teacher', time: '2 days ago', type: 'message' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-light-gray rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.type === 'grade' ? 'bg-green-500' :
                  item.type === 'assignment' ? 'bg-blue-500' :
                  item.type === 'attendance' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <div className="font-medium text-charcoal-gray">{item.child}: {item.activity}</div>
                  <div className="text-sm text-gray-600">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {[
              { event: 'Parent-Teacher Conference', date: 'Tomorrow, 3:00 PM', location: 'Room 201' },
              { event: 'Science Fair', date: 'March 15, 2025', location: 'School Auditorium' },
              { event: 'Spring Break', date: 'March 25 - April 1', location: 'School Closed' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-light-gray rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.event}</div>
                <div className="text-sm text-gray-600 mt-1">{item.date}</div>
                <div className="text-sm text-gray-500">{item.location}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Grades */}
      <Card>
        <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Recent Grades</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light-gray">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Student</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Assignment</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { student: 'Alex', subject: 'Mathematics', assignment: 'Quiz #5', date: 'Mar 8', grade: 'A-', score: 92 },
                { student: 'Emma', subject: 'English', assignment: 'Essay', date: 'Mar 7', grade: 'A', score: 95 },
                { student: 'Alex', subject: 'Physics', assignment: 'Lab Report', date: 'Mar 5', grade: 'B+', score: 88 },
                { student: 'Emma', subject: 'History', assignment: 'Presentation', date: 'Mar 4', grade: 'A', score: 96 },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-charcoal-gray">{item.student}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.subject}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.assignment}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.score >= 90 ? 'bg-green-100 text-green-800' :
                      item.score >= 80 ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.grade} ({item.score}%)
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
