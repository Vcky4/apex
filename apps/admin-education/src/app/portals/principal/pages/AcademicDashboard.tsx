import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function AcademicDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Academic Executive Dashboard</h1>
        <p className="text-gray-600 mt-2">Curriculum and academic program management</p>
      </div>

      {/* Academic Performance */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Academic Performance</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="School-wide GPA"
            value="3.75"
            color="gold"
            trend={{ value: 0.15, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Test Performance"
            value="87%"
            color="blue"
            trend={{ value: 3.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <StatCard
            title="Curriculum Progress"
            value="92%"
            color="green"
            trend={{ value: 2.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
          <StatCard
            title="Learning Outcomes"
            value="88%"
            color="purple"
            trend={{ value: 1.8, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Program Management */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Program Management</h2>
        <DashboardGrid columns={2}>
          <Card>
            <h3 className="text-lg font-semibold mb-3">Course Enrollment</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Enrollments</span>
                <span className="font-semibold">2,450</span>
              </div>
              <div className="flex justify-between">
                <span>Capacity Utilization</span>
                <span className="font-semibold">94%</span>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-3">Teacher Workload</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Average Class Size</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex justify-between">
                <span>Workload Distribution</span>
                <span className="font-semibold">Balanced</span>
              </div>
            </div>
          </Card>
        </DashboardGrid>
      </section>
    </div>
  );
}
