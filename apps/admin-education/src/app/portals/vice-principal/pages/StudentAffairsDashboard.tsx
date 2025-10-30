import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function StudentAffairsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Student Affairs Dashboard</h1>
        <p className="text-gray-600 mt-2">Comprehensive student life and support services management</p>
      </div>

      {/* Student Wellness */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Student Wellness</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Attendance Rate"
            value="94.5%"
            color="green"
            trend={{ value: 2.1, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
          <StatCard
            title="Behavioral Incidents"
            value="12"
            color="orange"
            trend={{ value: -15, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
          <StatCard
            title="Counseling Utilization"
            value="68%"
            color="blue"
            trend={{ value: 5.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Extracurricular Participation"
            value="82%"
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

      {/* Support Services */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Support Services</h2>
        <DashboardGrid columns={2}>
          <Card>
            <h3 className="text-lg font-semibold mb-3">Special Education Programs</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active IEPs</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between">
                <span>Support Services</span>
                <span className="font-semibold">12 Programs</span>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-3">Health Services</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Health Visits</span>
                <span className="font-semibold">234</span>
              </div>
              <div className="flex justify-between">
                <span>This Month</span>
                <span className="font-semibold">+12%</span>
              </div>
            </div>
          </Card>
        </DashboardGrid>
      </section>
    </div>
  );
}
