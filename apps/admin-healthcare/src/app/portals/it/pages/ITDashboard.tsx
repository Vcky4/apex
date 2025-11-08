import { StatCard, DashboardGrid, Card, Button } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';

export default function ITDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Healthcare IT Dashboard</h1>
        <p className="text-gray-600 mt-2">Healthcare technology and systems management</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Systems Health</h2>
        <DashboardGrid columns={4}>
          <StatCard title="EHR Performance" value="98.5%" color="green" trend={{ value: 0.5, isPositive: true }} icon={<span className="text-2xl">💻</span>} />
          <StatCard title="Network Status" value="99.2%" color="blue" trend={{ value: 0.2, isPositive: true }} icon={<span className="text-2xl">🌐</span>} />
          <StatCard title="Data Security" value="100%" color="purple" trend={{ value: 0, isPositive: true }} icon={<span className="text-2xl">🔒</span>} />
          <StatCard title="Support Requests" value="24" color="orange" trend={{ value: -5, isPositive: true }} icon={<span className="text-2xl">🎫</span>} />
        </DashboardGrid>
      </section>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Technology Initiatives</h2>
        <DashboardGrid columns={4}>
          <StatCard title="Digital Health" value="85%" color="blue" trend={{ value: 5.2, isPositive: true }} />
          <StatCard title="Interoperability" value="78%" color="green" trend={{ value: 3.1, isPositive: true }} />
          <StatCard title="Device Integration" value="92%" color="purple" trend={{ value: 2.5, isPositive: true }} />
          <StatCard title="Innovation Pipeline" value="12" color="orange" trend={{ value: 2, isPositive: true }} />
        </DashboardGrid>
      </section>

      <DashboardGrid columns={2}>
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">EHR System Status</h3>
            <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/it/ehr')}>Manage EHR</Button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Uptime</span>
              <span className="font-semibold text-green-600">99.8%</span>
            </div>
            <div className="flex justify-between">
              <span>Active Users</span>
              <span className="font-semibold">1,245</span>
            </div>
            <div className="flex justify-between">
              <span>Response Time</span>
              <span className="font-semibold">0.8s</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Help Desk Performance</h3>
            <Button size="sm" variant="outline" onClick={() => alert('View tickets')}>View Tickets</Button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Open Tickets</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Resolution Time</span>
              <span className="font-semibold">2.4 hours</span>
            </div>
            <div className="flex justify-between">
              <span>Satisfaction Rate</span>
              <span className="font-semibold text-green-600">94%</span>
            </div>
          </div>
        </Card>
      </DashboardGrid>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
        <DashboardGrid columns={4}>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/it/ehr')}>
            <div className="text-center">
              <div className="text-3xl mb-2">💻</div>
              <h3 className="font-semibold mb-1">EHR Management</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/it/him')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold mb-1">Health Information</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/it/telehealth')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📹</div>
              <h3 className="font-semibold mb-1">Telehealth</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => alert('View reports')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Reports</h3>
            </div>
          </Card>
        </DashboardGrid>
      </section>
    </div>
  );
}

