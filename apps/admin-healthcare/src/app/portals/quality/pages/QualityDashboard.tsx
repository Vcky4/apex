import { StatCard, DashboardGrid, Card, Button } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';

export default function QualityDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Quality & Compliance Dashboard</h1>
        <p className="text-gray-600 mt-2">Complete quality and regulatory compliance management</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quality Metrics</h2>
        <DashboardGrid columns={4}>
          <StatCard title="Patient Safety" value="98.5%" color="green" trend={{ value: 1.2, isPositive: true }} icon={<span className="text-2xl">🛡️</span>} />
          <StatCard title="Clinical Outcomes" value="96.2%" color="blue" trend={{ value: 2.1, isPositive: true }} icon={<span className="text-2xl">📊</span>} />
          <StatCard title="Infection Control" value="99.1%" color="purple" trend={{ value: 0.5, isPositive: true }} icon={<span className="text-2xl">🦠</span>} />
          <StatCard title="Patient Experience" value="4.6/5" color="orange" trend={{ value: 0.2, isPositive: true }} icon={<span className="text-2xl">⭐</span>} />
        </DashboardGrid>
      </section>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Compliance Status</h2>
        <DashboardGrid columns={4}>
          <StatCard title="Regulatory Tracking" value="94%" color="green" trend={{ value: 2.3, isPositive: true }} />
          <StatCard title="Accreditation Ready" value="92%" color="blue" trend={{ value: 1.8, isPositive: true }} />
          <StatCard title="Audit Findings" value="8" color="orange" trend={{ value: -3, isPositive: true }} />
          <StatCard title="Policy Compliance" value="96%" color="purple" trend={{ value: 1.5, isPositive: true }} />
        </DashboardGrid>
      </section>

      <DashboardGrid columns={2}>
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Recent Quality Initiatives</h3>
            <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/quality/improvement')}>View All</Button>
          </div>
          <div className="space-y-3">
            {['Reduce Hospital-Acquired Infections', 'Improve ED Wait Times', 'Enhance Patient Communication'].map((initiative, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">{initiative}</div>
                <div className="text-sm text-gray-600 mt-1">In Progress</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Risk Management</h3>
            <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/quality/risk-management')}>View All</Button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="font-medium text-red-900">Open Incidents</div>
              <div className="text-2xl font-bold text-red-600 mt-1">12</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-900">Under Investigation</div>
              <div className="text-2xl font-bold text-yellow-600 mt-1">5</div>
            </div>
          </div>
        </Card>
      </DashboardGrid>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
        <DashboardGrid columns={4}>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/quality/improvement')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold mb-1">Quality Improvement</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/quality/risk-management')}>
            <div className="text-center">
              <div className="text-3xl mb-2">⚠️</div>
              <h3 className="font-semibold mb-1">Risk Management</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/quality/compliance')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold mb-1">Regulatory Compliance</h3>
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

