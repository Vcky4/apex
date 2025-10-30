import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function PrincipalDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Principal Dashboard</h1>
        <p className="text-gray-600 mt-2">Academic and operational leadership overview</p>
      </div>

      {/* Academic Leadership */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Academic Leadership</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="School-wide Performance"
            value="3.75 GPA"
            color="purple"
            trend={{ value: 0.15, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
          />
          <StatCard
            title="Teacher Effectiveness"
            value="92.5%"
            color="blue"
            trend={{ value: 3.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Standardized Tests"
            value="87.3%"
            color="green"
            trend={{ value: 2.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
          />
          <StatCard
            title="Curriculum Implementation"
            value="96.8%"
            color="orange"
            trend={{ value: 1.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Student Welfare */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Student Welfare</h2>
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
            title="Support Services"
            value="145"
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
          />
          <StatCard
            title="Parent Engagement"
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

      {/* Action Center */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Quick Actions</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-authority-purple text-white rounded-lg font-medium hover:bg-opacity-90 transition">
              Schedule Meeting
            </button>
            <button className="px-4 py-2 bg-executive-gold text-apex-deep-blue rounded-lg font-medium hover:bg-opacity-90 transition">
              Generate Report
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening curriculum oversight...')}
              className="w-full text-left"
            >
              <div className="text-authority-purple text-2xl mb-2">📚</div>
              <div className="font-semibold text-charcoal-gray">Review Curriculum</div>
              <div className="text-sm text-gray-600 mt-1">3 approvals pending</div>
            </button>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening teacher evaluations...')}
              className="w-full text-left"
            >
              <div className="text-executive-gold text-2xl mb-2">👨‍🏫</div>
              <div className="font-semibold text-charcoal-gray">Evaluate Teachers</div>
              <div className="text-sm text-gray-600 mt-1">12 reviews due</div>
            </button>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening academic calendar...')}
              className="w-full text-left"
            >
              <div className="text-blue-600 text-2xl mb-2">📅</div>
              <div className="font-semibold text-charcoal-gray">Update Calendar</div>
              <div className="text-sm text-gray-600 mt-1">5 events scheduled</div>
            </button>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening department reports...')}
              className="w-full text-left"
            >
              <div className="text-green-600 text-2xl mb-2">📊</div>
              <div className="font-semibold text-charcoal-gray">View Reports</div>
              <div className="text-sm text-gray-600 mt-1">All departments</div>
            </button>
          </Card>
        </div>
      </section>

      {/* Staff Management */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Staff Management</h2>
          <button className="px-4 py-2 bg-authority-purple text-white rounded-lg font-medium hover:bg-opacity-90 transition">
            Schedule Review Meeting
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-charcoal-gray">Teacher Workload Distribution</h3>
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                Adjust
              </button>
            </div>
            <div className="space-y-3">
              {[
                { teacher: 'Math Department', avgHours: 18, status: 'Optimal' },
                { teacher: 'Science Department', avgHours: 20, status: 'High' },
                { teacher: 'English Department', avgHours: 16, status: 'Optimal' },
                { teacher: 'Social Studies', avgHours: 15, status: 'Optimal' },
              ].map((item) => (
                <div key={item.teacher} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <div className="font-medium text-charcoal-gray">{item.teacher}</div>
                    <div className="text-sm text-gray-600">Avg {item.avgHours} hours/week</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      item.status === 'Optimal' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.status}
                    </span>
                    {item.status === 'High' && (
                      <button className="px-2 py-1 text-xs bg-orange-50 text-orange-700 rounded hover:bg-orange-100">
                        Rebalance
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-charcoal-gray">Professional Development Progress</h3>
              <button className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100">
                Schedule PD
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Training Completed</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-authority-purple h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Pending Certifications</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">Next session: March 15, 2025</div>
                <button className="mt-2 px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                  Send Reminders
                </button>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-charcoal-gray">Upcoming Events</div>
                  <button className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded hover:bg-purple-100">
                    Add Event
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-blue-50 rounded text-sm flex justify-between items-center">
                    <span>Curriculum Workshop - March 20</span>
                    <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      Edit
                    </button>
                  </div>
                  <div className="p-2 bg-green-50 rounded text-sm flex justify-between items-center">
                    <span>Assessment Training - March 25</span>
                    <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Pending Approvals */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Pending Approvals</h2>
        <Card>
          <div className="space-y-3">
            {[
              { item: 'Textbook Request', dept: 'Science', type: 'Resource', priority: 'Medium', days: 3 },
              { item: 'Curriculum Change', dept: 'Mathematics', type: 'Academic', priority: 'High', days: 5 },
              { item: 'Teacher Assignment', dept: 'English', type: 'Staffing', priority: 'Medium', days: 2 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="font-semibold text-charcoal-gray">{item.item}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.dept} Department • {item.type}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.days} days pending</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.priority}
                  </span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm hover:bg-green-100">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100">
                      Review
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

