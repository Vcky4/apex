import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Good Morning, Mr. Smith!</h1>
        <p className="text-gray-600 mt-2">Here's your teaching schedule for today</p>
      </div>

      {/* Teacher Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Students"
          value="156"
          color="blue"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
        />
        <StatCard
          title="Classes Today"
          value="5"
          color="purple"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        />
        <StatCard
          title="Pending Grades"
          value="24"
          color="orange"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
        <StatCard
          title="Avg Class Performance"
          value="87%"
          color="green"
          trend={{ value: 3, isPositive: true }}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        />
      </DashboardGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Today's Classes</h3>
          <div className="space-y-3">
            {[
              { time: '8:00 - 9:00 AM', class: 'Math 101 - Grade 9', room: 'Room 201', students: 28 },
              { time: '9:15 - 10:15 AM', class: 'Algebra II - Grade 10', room: 'Room 201', students: 32 },
              { time: '10:30 - 11:30 AM', class: 'Geometry - Grade 10', room: 'Room 201', students: 30 },
              { time: '1:00 - 2:00 PM', class: 'Pre-Calculus - Grade 11', room: 'Room 201', students: 35 },
              { time: '2:15 - 3:15 PM', class: 'Calculus - Grade 12', room: 'Room 201', students: 31 },
            ].map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-light-gray rounded-lg hover:bg-gray-100 cursor-pointer">
                <div className="flex-1">
                  <div className="font-medium text-charcoal-gray">{cls.class}</div>
                  <div className="text-sm text-gray-600">{cls.room} • {cls.students} students</div>
                </div>
                <div className="text-sm font-medium text-gray-600">{cls.time}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            {[
              { task: 'Grade Math Quiz - Grade 9', count: '8 submissions', priority: 'high' },
              { task: 'Upload Homework Assignment', count: 'Algebra II', priority: 'medium' },
              { task: 'Prepare Midterm Exam', count: 'Due in 2 weeks', priority: 'low' },
              { task: 'Review Lesson Plans', count: 'Next week', priority: 'low' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-charcoal-gray">{item.task}</div>
                  <div className="text-sm text-gray-600">{item.count}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.priority === 'high' ? 'bg-red-100 text-red-800' :
                  item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Student Performance */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-charcoal-gray">Recent Assignment Scores</h3>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Classes</option>
            <option>Math 101</option>
            <option>Algebra II</option>
            <option>Geometry</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light-gray">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Student</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Class</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Assignment</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Score</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { student: 'Alex Johnson', class: 'Math 101', assignment: 'Quiz #5', score: 92, graded: true },
                { student: 'Emma Davis', class: 'Algebra II', assignment: 'Homework #12', score: 88, graded: true },
                { student: 'Michael Brown', class: 'Geometry', assignment: 'Test #3', score: 0, graded: false },
                { student: 'Sarah Wilson', class: 'Pre-Calculus', assignment: 'Project', score: 95, graded: true },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-charcoal-gray">{item.student}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.class}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.assignment}</td>
                  <td className="px-4 py-3">
                    {item.graded ? (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.score >= 90 ? 'bg-green-100 text-green-800' :
                        item.score >= 80 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.score}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">Not Graded</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {item.graded ? (
                      <span className="text-sm text-green-600">✓ Graded</span>
                    ) : (
                      <button className="text-sm text-blue-600 hover:underline">Grade Now</button>
                    )}
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
