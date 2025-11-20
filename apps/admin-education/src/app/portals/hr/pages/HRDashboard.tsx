import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function HRDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">HR Executive Dashboard</h1>
        <p className="text-gray-600 mt-2">Complete staff management and HR operations</p>
      </div>

      {/* Workforce Analytics */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Workforce Analytics</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Staff Headcount"
            value="245"
            color="blue"
            trend={{ value: 5.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Turnover Rate"
            value="8.5%"
            color="green"
            trend={{ value: -2.1, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
          <StatCard
            title="Teacher-Student Ratio"
            value="1:18"
            color="orange"
            trend={{ value: 0, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <StatCard
            title="Diversity Index"
            value="78%"
            color="purple"
            trend={{ value: 3.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* HR Operations */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">HR Operations</h2>
        <DashboardGrid columns={2}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Job Requests from Principal</h3>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">2 New</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded border-l-4 border-l-blue-500">
                <div>
                  <span className="font-medium">Mathematics Teacher</span>
                  <span className="ml-2 text-xs text-red-600">Urgent</span>
                </div>
                <span className="text-xs text-gray-500">From Principal</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded border-l-4 border-l-blue-500">
                <div>
                  <span className="font-medium">Science Lab Assistant</span>
                  <span className="ml-2 text-xs text-orange-600">High</span>
                </div>
                <span className="text-xs text-gray-500">From Principal</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t">
              <a href="/admin/hr/recruitment" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All Requests →
              </a>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-3">Performance Review Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Completed</span>
                <span className="font-semibold">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="text-sm text-gray-600 mt-2">42 of 50 reviews completed</div>
            </div>
          </Card>
        </DashboardGrid>
      </section>

      {/* Compliance Monitoring */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Compliance Monitoring</h2>
        <DashboardGrid columns={3}>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Certification Expiry</h3>
            <div className="text-2xl font-bold text-orange-600 mb-2">12</div>
            <p className="text-sm text-gray-600">Expiring in next 30 days</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Background Checks</h3>
            <div className="text-2xl font-bold text-blue-600 mb-2">98%</div>
            <p className="text-sm text-gray-600">Current status complete</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Compliance Training</h3>
            <div className="text-2xl font-bold text-green-600 mb-2">92%</div>
            <p className="text-sm text-gray-600">Staff compliance rate</p>
          </Card>
        </DashboardGrid>
      </section>
    </div>
  );
}
