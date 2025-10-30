import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Owner Dashboard</h1>
        <p className="text-gray-600 mt-2">Executive overview of institutional performance</p>
      </div>

      {/* Financial Overview */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Financial Overview</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Annual Revenue"
            value="$2.4M"
            color="gold"
            trend={{ value: 8.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Fee Collection"
            value="94.2%"
            color="green"
            trend={{ value: 2.1, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Outstanding Payments"
            value="$145K"
            color="orange"
            trend={{ value: -5.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Profit Margin"
            value="32.5%"
            color="blue"
            trend={{ value: 1.8, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Institutional Analytics */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Institutional Analytics</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Student Retention"
            value="96.8%"
            color="green"
            trend={{ value: 1.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <StatCard
            title="Staff Turnover"
            value="5.2%"
            color="orange"
            trend={{ value: -2.3, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Academic Performance"
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
            title="Parent Satisfaction"
            value="4.6/5"
            color="blue"
            trend={{ value: 0.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Compliance Status */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Compliance Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium text-charcoal-gray">Regulatory Requirements</div>
                <div className="text-sm text-gray-600">All requirements met</div>
              </div>
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-medium">100%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium text-charcoal-gray">Accreditation Status</div>
                <div className="text-sm text-gray-600">Fully accredited</div>
              </div>
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <div className="font-medium text-charcoal-gray">License Renewal</div>
                <div className="text-sm text-gray-600">Due in 45 days</div>
              </div>
              <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-medium">Pending</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Revenue vs Expenses (Term-wise)</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Term 1</span>
                <span className="text-sm font-medium">$850K / $720K</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-executive-gold h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Term 2</span>
                <span className="text-sm font-medium">$820K / $715K</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-executive-gold h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Term 3</span>
                <span className="text-sm font-medium">$730K / $710K</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-executive-gold h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Action Center */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Action Center</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-executive-gold text-white rounded-lg font-medium hover:bg-opacity-90 transition">
              Generate Report
            </button>
            <button className="px-4 py-2 bg-apex-deep-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition">
              Export Data
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-3">
              <div className="text-executive-gold text-3xl">💰</div>
              <button className="px-3 py-1 bg-executive-gold text-white rounded text-sm font-medium hover:bg-opacity-90">
                View
              </button>
            </div>
            <div className="font-semibold text-charcoal-gray mb-1">Budget Planning</div>
            <div className="text-sm text-gray-600">Manage annual budgets</div>
            <div className="mt-3 pt-3 border-t flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100">
                Approve Requests
              </button>
              <button className="flex-1 px-3 py-1.5 bg-green-50 text-green-700 rounded text-sm hover:bg-green-100">
                Create Budget
              </button>
            </div>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-3">
              <div className="text-executive-gold text-3xl">📊</div>
              <button className="px-3 py-1 bg-executive-gold text-white rounded text-sm font-medium hover:bg-opacity-90">
                View
              </button>
            </div>
            <div className="font-semibold text-charcoal-gray mb-1">Revenue Analytics</div>
            <div className="text-sm text-gray-600">Fee collection insights</div>
            <div className="mt-3 pt-3 border-t flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded text-sm hover:bg-purple-100">
                View Reports
              </button>
              <button className="flex-1 px-3 py-1.5 bg-orange-50 text-orange-700 rounded text-sm hover:bg-orange-100">
                Send Reminders
              </button>
            </div>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-3">
              <div className="text-executive-gold text-3xl">🏗️</div>
              <button className="px-3 py-1 bg-executive-gold text-white rounded text-sm font-medium hover:bg-opacity-90">
                View
              </button>
            </div>
            <div className="font-semibold text-charcoal-gray mb-1">Investment Tracking</div>
            <div className="text-sm text-gray-600">Infrastructure development</div>
            <div className="mt-3 pt-3 border-t flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-sm hover:bg-indigo-100">
                New Project
              </button>
              <button className="flex-1 px-3 py-1.5 bg-teal-50 text-teal-700 rounded text-sm hover:bg-teal-100">
                Track Progress
              </button>
            </div>
          </Card>
        </div>
      </section>

      {/* Pending Actions */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Pending Actions Requiring Your Attention</h2>
        <Card>
          <div className="space-y-3">
            {[
              { action: 'Approve Budget Request', dept: 'Academic Department', amount: '$45,000', priority: 'High', days: 2 },
              { action: 'Review Investment Proposal', dept: 'Infrastructure', amount: '$180,000', priority: 'Medium', days: 5 },
              { action: 'License Renewal Application', dept: 'Administration', amount: 'N/A', priority: 'High', days: 45 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="font-semibold text-charcoal-gray">{item.action}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.dept} • {item.amount !== 'N/A' ? `Amount: ${item.amount}` : 'Administrative'}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.days} days remaining</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.priority}
                  </span>
                  <button className="px-4 py-2 bg-executive-gold text-white rounded-lg font-medium hover:bg-opacity-90 transition">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

