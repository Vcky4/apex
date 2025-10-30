import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function FinanceDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Finance Executive Dashboard</h1>
        <p className="text-gray-600 mt-2">Complete financial management and oversight</p>
      </div>

      {/* Financial Health */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Financial Health</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Budget vs Actual"
            value="94.2%"
            color="green"
            trend={{ value: 2.1, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <StatCard
            title="Cash Flow"
            value="$1.2M"
            color="blue"
            trend={{ value: 8.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
          <StatCard
            title="Revenue Collection"
            value="96.8%"
            color="green"
            trend={{ value: 1.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Expense Management"
            value="$850K"
            color="orange"
            trend={{ value: -3.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Operational Finance */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Operational Finance</h2>
        <DashboardGrid columns={2}>
          <Card>
            <h3 className="text-lg font-semibold mb-3">Accounts Payable & Receivable</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Accounts Payable</span>
                <span className="font-semibold">$125K</span>
              </div>
              <div className="flex justify-between">
                <span>Accounts Receivable</span>
                <span className="font-semibold">$89K</span>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold mb-3">Grant & Funding Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active Grants</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span>Total Funding</span>
                <span className="font-semibold">$450K</span>
              </div>
            </div>
          </Card>
        </DashboardGrid>
      </section>
    </div>
  );
}
