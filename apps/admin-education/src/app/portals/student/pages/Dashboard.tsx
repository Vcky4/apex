import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Welcome Back, Alex!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your classes today</p>
      </div>

      {/* Student Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Current GPA"
          value="3.8"
          color="green"
          trend={{ value: 0.2, isPositive: true }}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
        />
        <StatCard
          title="Attendance Rate"
          value="96%"
          color="blue"
          trend={{ value: 2, isPositive: true }}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Pending Assignments"
          value="3"
          color="orange"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
        <StatCard
          title="Active Courses"
          value="6"
          color="purple"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
        />
      </DashboardGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {[
              { time: '8:00 - 9:00 AM', subject: 'Mathematics', room: 'Room 201', teacher: 'Mr. Smith' },
              { time: '9:15 - 10:15 AM', subject: 'English Literature', room: 'Room 105', teacher: 'Mrs. Johnson' },
              { time: '10:30 - 11:30 AM', subject: 'Physics', room: 'Lab 3', teacher: 'Dr. Brown' },
              { time: '12:45 - 1:45 PM', subject: 'History', room: 'Room 302', teacher: 'Mr. Davis' },
            ].map((cls, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-charcoal-gray">{cls.subject}</div>
                  <div className="text-sm text-gray-600">{cls.teacher} • {cls.room}</div>
                </div>
                <div className="text-sm text-gray-600">{cls.time}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Assignments */}
        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Upcoming Assignments</h3>
          <div className="space-y-3">
            {[
              { title: 'Math Quiz - Chapter 5', due: 'Tomorrow', status: 'pending', color: 'red' },
              { title: 'English Essay - Shakespeare', due: 'Mar 15', status: 'in-progress', color: 'yellow' },
              { title: 'Physics Lab Report', due: 'Mar 18', status: 'pending', color: 'gray' },
              { title: 'History Presentation', due: 'Mar 20', status: 'pending', color: 'gray' },
            ].map((assignment, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-charcoal-gray">{assignment.title}</div>
                  <div className="text-sm text-gray-600">Due: {assignment.due}</div>
                </div>
                <span className={`px-3 py-1 bg-${assignment.color}-100 text-${assignment.color}-800 rounded-full text-xs`}>
                  {assignment.status === 'pending' ? 'Not Started' : 'In Progress'}
                </span>
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
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Course</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Assignment</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { course: 'Mathematics', assignment: 'Midterm Exam', date: 'Mar 1', grade: 'A-', score: 92 },
                { course: 'English', assignment: 'Poetry Analysis', date: 'Feb 28', grade: 'A', score: 95 },
                { course: 'Physics', assignment: 'Lab Report #3', date: 'Feb 25', grade: 'B+', score: 88 },
                { course: 'History', assignment: 'WWII Essay', date: 'Feb 22', grade: 'A', score: 94 },
              ].map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 text-sm text-charcoal-gray font-medium">{item.course}</td>
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
