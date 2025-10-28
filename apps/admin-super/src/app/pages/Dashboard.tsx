import { StatCard, DashboardGrid } from '@apex-providers/ui-components';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Platform Executive Dashboard</h1>
        <p className="text-gray-600 mt-2">Complete platform oversight and performance metrics</p>
      </div>

      {/* Platform Health Overview */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Platform Health Overview</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="System Uptime"
            value="99.98%"
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Active Organizations"
            value="1,247"
            color="blue"
            trend={{ value: 3.8, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
          <StatCard
            title="Total Users"
            value="45,892"
            color="purple"
            trend={{ value: 5.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <StatCard
            title="API Response Time"
            value="128ms"
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Revenue Analytics */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Revenue Analytics</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="MRR"
            value="$187,450"
            color="green"
            trend={{ value: 12.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="ARR"
            value="$2.25M"
            color="blue"
            trend={{ value: 15.3, isPositive: true }}
          />
          <StatCard
            title="Churn Rate"
            value="2.3%"
            color="red"
            trend={{ value: 0.5, isPositive: false }}
          />
          <StatCard
            title="LTV"
            value="$18,750"
            color="purple"
            trend={{ value: 8.2, isPositive: true }}
          />
        </DashboardGrid>
      </section>

      {/* Organization Growth Metrics */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Organization Growth Metrics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Vertical Distribution</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Education</span>
                  <span className="text-sm font-medium text-authority-purple">58% (723)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-authority-purple h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Healthcare</span>
                  <span className="text-sm font-medium text-healthcare-red">27% (337)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-healthcare-red h-2 rounded-full" style={{ width: '27%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Manufacturing</span>
                  <span className="text-sm font-medium text-industrial-gray">15% (187)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-industrial-gray h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Recent Growth</h3>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-charcoal-gray">47</div>
                <div className="text-sm text-gray-600">New Organizations (30 days)</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">3.8%</div>
                <div className="text-sm text-gray-600">Growth Rate</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 bg-apex-deep-blue text-white rounded-lg hover:bg-opacity-90 transition-colors">
                Onboard New Organization
              </button>
              <button className="w-full text-left px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-between">
                <span>View System Alerts</span>
                <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">15</span>
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                Financial Reports
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
