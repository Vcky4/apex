import { StatCard, DashboardGrid, Card, Button } from '@apex-providers/ui-components';
import { useNavigate } from 'react-router-dom';

export default function FinanceDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Healthcare Finance Dashboard</h1>
        <p className="text-gray-600 mt-2">Complete healthcare financial management</p>
      </div>

      {/* Revenue Cycle Management */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Revenue Cycle Management</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Claims Submission Rate"
            value="98.5%"
            color="green"
            trend={{ value: 2.1, isPositive: true }}
            icon={<span className="text-2xl">📤</span>}
          />
          <StatCard
            title="Denial Rate"
            value="3.2%"
            color="red"
            trend={{ value: -0.8, isPositive: true }}
            icon={<span className="text-2xl">❌</span>}
          />
          <StatCard
            title="AR Aging (Days)"
            value="42"
            color="orange"
            trend={{ value: -5, isPositive: true }}
            icon={<span className="text-2xl">⏱️</span>}
          />
          <StatCard
            title="Collection Rate"
            value="94.8%"
            color="blue"
            trend={{ value: 1.5, isPositive: true }}
            icon={<span className="text-2xl">💰</span>}
          />
        </DashboardGrid>
      </section>

      {/* Cost Management */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Cost Management</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Cost per Case"
            value="$8,245"
            color="blue"
            trend={{ value: -2.3, isPositive: true }}
            icon={<span className="text-2xl">📊</span>}
          />
          <StatCard
            title="Supply Chain Expense"
            value="$2.4M"
            color="purple"
            trend={{ value: -1.2, isPositive: true }}
            icon={<span className="text-2xl">📦</span>}
          />
          <StatCard
            title="Labor Cost"
            value="$5.8M"
            color="orange"
            trend={{ value: 0.5, isPositive: false }}
            icon={<span className="text-2xl">👥</span>}
          />
          <StatCard
            title="Equipment ROI"
            value="18.5%"
            color="green"
            trend={{ value: 2.1, isPositive: true }}
            icon={<span className="text-2xl">⚙️</span>}
          />
        </DashboardGrid>
      </section>

      {/* Financial Operations */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Financial Operations</h2>
        <DashboardGrid columns={2}>
          <Card>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Payer Mix & Reimbursement</h3>
              <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/finance/rcm')}>
                View Details
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <span className="font-medium">Medicare</span>
                  <p className="text-sm text-gray-600">42% of revenue</p>
                </div>
                <span className="text-lg font-bold text-blue-600">$12.4M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <span className="font-medium">Medicaid</span>
                  <p className="text-sm text-gray-600">28% of revenue</p>
                </div>
                <span className="text-lg font-bold text-green-600">$8.2M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div>
                  <span className="font-medium">Commercial Insurance</span>
                  <p className="text-sm text-gray-600">30% of revenue</p>
                </div>
                <span className="text-lg font-bold text-purple-600">$8.9M</span>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Accounts Receivable Status</h3>
              <Button size="sm" variant="outline" onClick={() => navigate('/healthcare/admin/finance/rcm')}>
                View AR
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>0-30 days</span>
                <span className="font-semibold">$4.2M (45%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span>31-60 days</span>
                <span className="font-semibold">$2.8M (30%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span>61-90 days</span>
                <span className="font-semibold">$1.5M (16%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '16%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span>90+ days</span>
                <span className="font-semibold">$0.9M (9%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '9%' }}></div>
              </div>
            </div>
          </Card>
        </DashboardGrid>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
        <DashboardGrid columns={4}>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/finance/rcm')}>
            <div className="text-center">
              <div className="text-3xl mb-2">💳</div>
              <h3 className="font-semibold mb-1">Revenue Cycle</h3>
              <p className="text-sm text-gray-600">Claims & billing</p>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/finance/cost-accounting')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-1">Cost Accounting</h3>
              <p className="text-sm text-gray-600">Cost analysis</p>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/finance/contracts')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-semibold mb-1">Contracts</h3>
              <p className="text-sm text-gray-600">Payer agreements</p>
            </div>
          </Card>
          <Card hover className="cursor-pointer" onClick={() => navigate('/healthcare/admin/finance/rcm')}>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold mb-1">Financial Reports</h3>
              <p className="text-sm text-gray-600">Analytics & insights</p>
            </div>
          </Card>
        </DashboardGrid>
      </section>
    </div>
  );
}

