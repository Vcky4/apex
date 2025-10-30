import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function VicePrincipalDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Vice Principal Dashboard</h1>
        <p className="text-gray-600 mt-2">Student life and welfare management overview</p>
      </div>

      {/* Student Wellness */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Student Wellness</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Attendance Rate"
            value="94.5%"
            color="green"
            trend={{ value: 1.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
          />
          <StatCard
            title="Behavioral Incidents"
            value="8"
            color="orange"
            trend={{ value: -15, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
          <StatCard
            title="Counseling Sessions"
            value="145"
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
          />
          <StatCard
            title="Extracurricular Participation"
            value="78.2%"
            color="purple"
            trend={{ value: 5.3, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Parent Engagement */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Parent Engagement</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Parent-Teacher Meetings</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-charcoal-gray">Last Session Attendance</div>
                <div className="text-sm text-gray-600 mt-1">82% attendance rate</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-charcoal-gray">Upcoming Session</div>
                <div className="text-sm text-gray-600 mt-1">April 5, 2025 - 150 parents registered</div>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Communication Responsiveness</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Average Response Time</span>
                  <span className="text-sm font-medium">2.5 hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-student-green h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-3">94% of messages responded within 4 hours</div>
            </div>
          </Card>
        </div>
      </section>

      {/* School Culture */}
      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">School Culture & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600 mt-1">Student Clubs</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600 mt-1">Sports Teams</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">245</div>
            <div className="text-sm text-gray-600 mt-1">Community Service Hours</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">15</div>
            <div className="text-sm text-gray-600 mt-1">Upcoming Events</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

