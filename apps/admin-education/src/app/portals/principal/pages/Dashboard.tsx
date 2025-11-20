import { StatCard, DashboardGrid } from '@apex-providers/ui-components';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">School Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Principal Johnson</p>
      </div>

      {/* Key Metrics */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">School Overview</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Total Students"
            value="1,245"
            color="purple"
            trend={{ value: 3.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <StatCard
            title="Teaching Staff"
            value="87"
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Average Attendance"
            value="94.5%"
            color="green"
            trend={{ value: 1.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Academic Performance"
            value="3.7 GPA"
            color="orange"
            trend={{ value: 0.3, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <div className="font-medium text-charcoal-gray">Staff Meeting</div>
                <div className="text-sm text-gray-600">8:00 AM - 9:00 AM</div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Upcoming</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <div className="font-medium text-charcoal-gray">Parent-Teacher Conferences</div>
                <div className="text-sm text-gray-600">2:00 PM - 5:00 PM</div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Scheduled</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-charcoal-gray">Grade Review Meeting</div>
                <div className="text-sm text-gray-600">3:30 PM - 4:30 PM</div>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Scheduled</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Recent Announcements</h3>
          <div className="space-y-3">
            <div className="py-2 border-b">
              <div className="font-medium text-charcoal-gray">Upcoming School Event</div>
              <div className="text-sm text-gray-600 mt-1">Science Fair scheduled for next Friday, March 15th</div>
            </div>
            <div className="py-2 border-b">
              <div className="font-medium text-charcoal-gray">Professional Development Day</div>
              <div className="text-sm text-gray-600 mt-1">No classes on Tuesday, March 12th - Teacher training day</div>
            </div>
            <div className="py-2">
              <div className="font-medium text-charcoal-gray">Spring Break Reminder</div>
              <div className="text-sm text-gray-600 mt-1">School closed March 25th - April 1st</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Distribution */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Student Performance by Grade Level</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'All'].map((grade, idx) => (
            <div key={grade} className="text-center">
              <div className="text-2xl font-bold text-charcoal-gray">
                {[89, 91, 87, 93, 90][idx]}%
              </div>
              <div className="text-sm text-gray-600 mt-1">{grade}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
