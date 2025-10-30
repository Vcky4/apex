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

      {/* Action Center */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Quick Actions</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-student-green text-white rounded-lg font-medium hover:bg-opacity-90 transition">
              Schedule Meeting
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-opacity-90 transition">
              Generate Report
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening discipline management...')}
              className="w-full text-left"
            >
              <div className="text-orange-600 text-2xl mb-2">⚖️</div>
              <div className="font-semibold text-charcoal-gray">Manage Discipline</div>
              <div className="text-sm text-gray-600 mt-1">8 incidents pending</div>
            </button>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening student support...')}
              className="w-full text-left"
            >
              <div className="text-blue-600 text-2xl mb-2">🤝</div>
              <div className="font-semibold text-charcoal-gray">Student Support</div>
              <div className="text-sm text-gray-600 mt-1">145 sessions active</div>
            </button>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening activities...')}
              className="w-full text-left"
            >
              <div className="text-purple-600 text-2xl mb-2">🎯</div>
              <div className="font-semibold text-charcoal-gray">Activities</div>
              <div className="text-sm text-gray-600 mt-1">15 events scheduled</div>
            </button>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening parent communications...')}
              className="w-full text-left"
            >
              <div className="text-green-600 text-2xl mb-2">📞</div>
              <div className="font-semibold text-charcoal-gray">Parent Communications</div>
              <div className="text-sm text-gray-600 mt-1">View engagement</div>
            </button>
          </Card>
        </div>
      </section>

      {/* Parent Engagement */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Parent Engagement</h2>
          <button className="px-4 py-2 bg-student-green text-white rounded-lg font-medium hover:bg-opacity-90 transition">
            Send Communication
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-charcoal-gray">Parent-Teacher Meetings</h3>
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                Schedule
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-charcoal-gray">Last Session Attendance</div>
                    <div className="text-sm text-gray-600 mt-1">82% attendance rate</div>
                  </div>
                  <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                    View Details
                  </button>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-charcoal-gray">Upcoming Session</div>
                    <div className="text-sm text-gray-600 mt-1">April 5, 2025 - 150 parents registered</div>
                  </div>
                  <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-charcoal-gray">Communication Responsiveness</h3>
              <button className="px-3 py-1 text-sm bg-purple-50 text-purple-700 rounded hover:bg-purple-100">
                Send Message
              </button>
            </div>
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
              <button className="mt-2 px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                View Communication Log
              </button>
            </div>
          </Card>
        </div>
      </section>

      {/* School Culture */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">School Culture & Events</h2>
          <button className="px-4 py-2 bg-student-green text-white rounded-lg font-medium hover:bg-opacity-90 transition">
            Create Event
          </button>
        </div>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition cursor-pointer">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600 mt-1">Student Clubs</div>
              <button className="mt-2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200">
                Manage
              </button>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600 mt-1">Sports Teams</div>
              <button className="mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                Manage
              </button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition cursor-pointer">
              <div className="text-2xl font-bold text-green-600">245</div>
              <div className="text-sm text-gray-600 mt-1">Community Service Hours</div>
              <button className="mt-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                Track
              </button>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition cursor-pointer">
              <div className="text-2xl font-bold text-orange-600">15</div>
              <div className="text-sm text-gray-600 mt-1">Upcoming Events</div>
              <button className="mt-2 px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200">
                View All
              </button>
            </div>
          </div>
        </Card>
      </section>

      {/* Pending Actions */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Requires Your Attention</h2>
        <Card>
          <div className="space-y-3">
            {[
              { item: 'Disciplinary Case Review', student: 'Student A', type: 'Behavior', priority: 'High', days: 1 },
              { item: 'Parent Meeting Request', student: 'Student B', type: 'Academic', priority: 'Medium', days: 2 },
              { item: 'Support Service Follow-up', student: 'Student C', type: 'Counseling', priority: 'High', days: 3 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="font-semibold text-charcoal-gray">{item.item}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.student} • {item.type}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.days} day(s) pending</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.priority}
                  </span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100">
                      View
                    </button>
                    <button className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm hover:bg-green-100">
                      Resolve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

