import { StatCard, DashboardGrid, Card, Button } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';

export default function HRDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Healthcare HR Executive Dashboard</h1>
        <p className="text-gray-600 mt-2">Complete healthcare staff management</p>
      </div>

      {/* Clinical Staff Analytics */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Clinical Staff Analytics</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Physician Staffing"
            value="142"
            color="blue"
            trend={{ value: 3.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
          <StatCard
            title="Nurse Staffing"
            value="328"
            color="green"
            trend={{ value: 5.1, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Staff-Patient Ratio"
            value="1:4.2"
            color="orange"
            trend={{ value: -0.3, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <StatCard
            title="Clinical Competency"
            value="94%"
            color="purple"
            trend={{ value: 2.1, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Credentialing & Privileging Status</h3>
              <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/hr/clinical-staff')}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <span className="font-medium">Pending Credentialing</span>
                  <p className="text-sm text-gray-600">12 physicians awaiting review</p>
                </div>
                <span className="text-lg font-bold text-blue-600">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <span className="font-medium">Active Credentials</span>
                  <p className="text-sm text-gray-600">98% compliance rate</p>
                </div>
                <span className="text-lg font-bold text-green-600">98%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <span className="font-medium">Expiring Soon</span>
                  <p className="text-sm text-gray-600">8 licenses expiring in 30 days</p>
                </div>
                <span className="text-lg font-bold text-orange-600">8</span>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Continuing Education Compliance</h3>
              <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/hr/compliance')}>
                View Details
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Completed Training</span>
                <span className="font-semibold">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '87%' }}></div>
              </div>
              <div className="text-sm text-gray-600 mt-2">408 of 470 staff completed</div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ACLS Certification</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">BLS Certification</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">PALS Certification</span>
                  <span className="font-medium">78%</span>
                </div>
              </div>
            </div>
          </Card>
        </DashboardGrid>
      </section>

      {/* Shift Scheduling Efficiency */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Shift Scheduling Efficiency</h2>
        <DashboardGrid columns={3}>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Schedule Coverage</h3>
            <div className="text-2xl font-bold text-green-600 mb-2">96%</div>
            <p className="text-sm text-gray-600">All shifts covered</p>
            <Button size="sm" variant="outline" className="mt-4 w-full" onClick={() => navigate('/healthcare/admin/hr/scheduling')}>
              Manage Schedules
            </Button>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Overtime Hours</h3>
            <div className="text-2xl font-bold text-orange-600 mb-2">142 hrs</div>
            <p className="text-sm text-gray-600">This week</p>
            <Button size="sm" variant="outline" className="mt-4 w-full" onClick={() => navigate('/healthcare/admin/hr/scheduling')}>
              View Schedule
            </Button>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-2">Staff Satisfaction</h3>
            <div className="text-2xl font-bold text-blue-600 mb-2">4.2/5</div>
            <p className="text-sm text-gray-600">Based on 328 responses</p>
            <Button size="sm" variant="outline" className="mt-4 w-full" onClick={() => navigate('/healthcare/admin/hr/scheduling')}>
              View Feedback
            </Button>
          </Card>
        </DashboardGrid>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
        <DashboardGrid columns={4}>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/hr/clinical-staff')}>
            <div className="text-center">
              <div className="text-3xl mb-2">👨‍⚕️</div>
              <h3 className="font-semibold mb-1">Manage Clinical Staff</h3>
              <p className="text-sm text-gray-600">Credentialing & privileges</p>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/hr/scheduling')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📅</div>
              <h3 className="font-semibold mb-1">Staff Scheduling</h3>
              <p className="text-sm text-gray-600">Shift management</p>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/hr/compliance')}>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold mb-1">Compliance Tracking</h3>
              <p className="text-sm text-gray-600">Licenses & certifications</p>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/hr/clinical-staff')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Performance Reviews</h3>
              <p className="text-sm text-gray-600">Staff assessments</p>
            </div>
          </Card>
        </DashboardGrid>
      </section>
    </div>
  );
}

