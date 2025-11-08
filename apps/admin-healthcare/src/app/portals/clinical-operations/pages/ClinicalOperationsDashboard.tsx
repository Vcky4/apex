import { StatCard, DashboardGrid, Card, Button } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';

export default function ClinicalOperationsDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Clinical Operations Dashboard</h1>
        <p className="text-gray-600 mt-2">Clinical service line and operational management</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Service Line Performance</h2>
        <DashboardGrid columns={4}>
          <StatCard title="Patient Volume" value="2,456" color="blue" trend={{ value: 5.2, isPositive: true }} icon={<span className="text-2xl">👥</span>} />
          <StatCard title="Procedure Efficiency" value="92%" color="green" trend={{ value: 2.1, isPositive: true }} icon={<span className="text-2xl">⚡</span>} />
          <StatCard title="Quality Outcomes" value="96%" color="purple" trend={{ value: 1.5, isPositive: true }} icon={<span className="text-2xl">✅</span>} />
          <StatCard title="Patient Satisfaction" value="4.6/5" color="orange" trend={{ value: 0.2, isPositive: true }} icon={<span className="text-2xl">⭐</span>} />
        </DashboardGrid>
      </section>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Resource Utilization</h2>
        <DashboardGrid columns={4}>
          <StatCard title="OR Utilization" value="84%" color="blue" trend={{ value: 3.2, isPositive: true }} />
          <StatCard title="Bed Turnover" value="2.8/day" color="green" trend={{ value: 0.3, isPositive: true }} />
          <StatCard title="Equipment Usage" value="78%" color="purple" trend={{ value: 2.5, isPositive: true }} />
          <StatCard title="Staff Productivity" value="91%" color="orange" trend={{ value: 1.8, isPositive: true }} />
        </DashboardGrid>
      </section>

      <DashboardGrid columns={2}>
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Department-wise Patient Volume</h3>
            <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/clinical-operations/departments')}>View All</Button>
          </div>
          <div className="space-y-3">
            {['Cardiology: 245', 'Emergency: 1,245', 'Surgery: 456', 'Pediatrics: 678'].map((dept, i) => (
              <div key={i} className="flex justify-between p-2 bg-gray-50 rounded">
                <span>{dept.split(':')[0]}</span>
                <span className="font-semibold">{dept.split(':')[1]}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Patient Flow Metrics</h3>
            <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/clinical-operations/patient-flow')}>View Details</Button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Avg Length of Stay</span>
              <span className="font-semibold">3.2 days</span>
            </div>
            <div className="flex justify-between">
              <span>Wait Time (ED)</span>
              <span className="font-semibold">28 minutes</span>
            </div>
            <div className="flex justify-between">
              <span>Throughput Rate</span>
              <span className="font-semibold">94%</span>
            </div>
          </div>
        </Card>
      </DashboardGrid>

      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
        <DashboardGrid columns={4}>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/clinical-operations/departments')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Department Analytics</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/clinical-operations/patient-flow')}>
            <div className="text-center">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold mb-1">Patient Flow</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/clinical-operations/medical-staff')}>
            <div className="text-center">
              <div className="text-3xl mb-2">👨‍⚕️</div>
              <h3 className="font-semibold mb-1">Medical Staff</h3>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => alert('View reports')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold mb-1">Reports</h3>
            </div>
          </Card>
        </DashboardGrid>
      </section>
    </div>
  );
}

