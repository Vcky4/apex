import { Card } from '@apex-providers/ui-components';

export default function RevenueAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Revenue Analytics</h1>
        <p className="text-gray-600 mt-2">Fee collection rates and revenue stream analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Total Revenue (Annual)</div>
          <div className="text-3xl font-bold text-executive-gold">$2.4M</div>
          <div className="text-sm text-green-600 mt-2">↑ 8.5% vs last year</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Fee Collection Rate</div>
          <div className="text-3xl font-bold text-green-600">94.2%</div>
          <div className="text-sm text-green-600 mt-2">↑ 2.1% improvement</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Outstanding Payments</div>
          <div className="text-3xl font-bold text-orange-600">$145K</div>
          <div className="text-sm text-green-600 mt-2">↓ 5.2% reduction</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Additional Revenue</div>
          <div className="text-3xl font-bold text-blue-600">$320K</div>
          <div className="text-sm text-green-600 mt-2">↑ 12.3% growth</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Fee Collection by Class</h2>
          <div className="space-y-3">
            {[
              { class: 'Grade 12', collected: 95.8, target: 100 },
              { class: 'Grade 11', collected: 94.2, target: 100 },
              { class: 'Grade 10', collected: 93.5, target: 100 },
              { class: 'Grade 9', collected: 92.8, target: 100 },
            ].map((item) => (
              <div key={item.class}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-charcoal-gray">{item.class}</span>
                  <span className="text-sm text-gray-600">{item.collected}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-executive-gold h-2 rounded-full" 
                    style={{ width: `${item.collected}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Revenue Streams</h2>
          <div className="space-y-4">
            {[
              { stream: 'Tuition Fees', amount: 2080000, percentage: 86.7, color: 'executive-gold' },
              { stream: 'Transport', amount: 180000, percentage: 7.5, color: 'blue' },
              { stream: 'Hostel', amount: 95000, percentage: 4.0, color: 'green' },
              { stream: 'Activities & Sports', amount: 85000, percentage: 3.5, color: 'orange' },
              { stream: 'Other Services', amount: 40000, percentage: 1.7, color: 'purple' },
            ].map((item) => (
              <div key={item.stream} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-charcoal-gray">{item.stream}</span>
                    <span className="text-sm text-gray-600">${item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${item.color} h-2 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.percentage}% of total</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Scholarship & Discount Impact Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-gray-600">Total Scholarships Granted</div>
            <div className="text-2xl font-bold text-charcoal-gray mt-2">45</div>
            <div className="text-sm text-gray-600 mt-1">Value: $180K</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-600">Fee Discounts</div>
            <div className="text-2xl font-bold text-charcoal-gray mt-2">$95K</div>
            <div className="text-sm text-gray-600 mt-1">3.9% of revenue</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-gray-600">Payment Plans</div>
            <div className="text-2xl font-bold text-charcoal-gray mt-2">128</div>
            <div className="text-sm text-gray-600 mt-1">Active plans</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

