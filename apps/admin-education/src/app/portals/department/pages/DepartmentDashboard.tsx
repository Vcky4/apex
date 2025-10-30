import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

interface DepartmentDashboardProps {
  deptName: string;
}

export default function DepartmentDashboard({ deptName }: DepartmentDashboardProps) {
  const departmentData: { [key: string]: { name: string; students: number; teachers: number; avgGpa: number } } = {
    science: { name: 'Science Department', students: 342, teachers: 12, avgGpa: 3.82 },
    mathematics: { name: 'Mathematics Department', students: 398, teachers: 14, avgGpa: 3.75 },
    english: { name: 'English Department', students: 420, teachers: 15, avgGpa: 3.88 },
    social: { name: 'Social Studies Department', students: 365, teachers: 11, avgGpa: 3.68 },
  };

  const dept = departmentData[deptName] || departmentData.science;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">{dept.name} Dashboard</h1>
        <p className="text-gray-600 mt-2">Departmental leadership and management overview</p>
      </div>

      {/* Department Performance */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Department Performance</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Subject Performance"
            value={`${dept.avgGpa} GPA`}
            color="purple"
            trend={{ value: 0.12, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
          />
          <StatCard
            title="Resource Utilization"
            value="87.5%"
            color="blue"
            trend={{ value: 2.3, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <StatCard
            title="Teacher Collaboration"
            value="91.2%"
            color="green"
            trend={{ value: 4.1, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Curriculum Coverage"
            value="94.8%"
            color="orange"
            trend={{ value: 1.8, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Department Resources */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Department Resources</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Teaching Materials</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-charcoal-gray">Textbooks</div>
                <div className="text-sm text-gray-600">Inventory: 245 copies</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-charcoal-gray">Lab Equipment</div>
                <div className="text-sm text-gray-600">Status: Fully operational</div>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Budget Utilization</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Allocated</span>
                  <span className="text-sm font-medium">$180,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-executive-gold h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">Spent: $135,000 (75%)</div>
              <div className="text-sm text-green-600">Remaining: $45,000</div>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Space & Facilities</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Classrooms</span>
                <span className="text-sm font-medium">8 rooms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Laboratories</span>
                <span className="text-sm font-medium">2 labs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Utilization</span>
                <span className="text-sm font-medium">92%</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Department Planning */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Department Planning</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Staffing Requirements</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-charcoal-gray">Current Staff</div>
                    <div className="text-sm text-gray-600">{dept.teachers} teachers</div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Optimal</span>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-medium text-charcoal-gray">Next Term Hiring Needs</div>
                <div className="text-sm text-gray-600 mt-1">No immediate requirements</div>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Professional Development Needs</h3>
            <div className="space-y-2">
              <div className="p-2 bg-purple-50 rounded text-sm">Advanced teaching methodologies - Q2</div>
              <div className="p-2 bg-blue-50 rounded text-sm">Assessment strategies workshop - Q2</div>
              <div className="p-2 bg-green-50 rounded text-sm">Curriculum alignment training - Q3</div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

