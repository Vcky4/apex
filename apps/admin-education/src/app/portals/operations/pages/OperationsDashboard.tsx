import { StatCard, DashboardGrid, Card } from '@apex-providers/ui-components';

export default function OperationsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Operations Dashboard</h1>
        <p className="text-gray-600 mt-2">Non-academic operations management overview</p>
      </div>

      {/* Facilities Management */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Facilities Management</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Building Maintenance"
            value="92.5%"
            color="blue"
            trend={{ value: 2.3, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
          <StatCard
            title="Classroom Utilization"
            value="87.3%"
            color="green"
            trend={{ value: 1.5, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
          <StatCard
            title="Safety Compliance"
            value="98.5%"
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
          <StatCard
            title="Cleaning Standards"
            value="95.2%"
            color="orange"
            trend={{ value: 0.8, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Transport Management */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Transport Management</h2>
        <DashboardGrid columns={4}>
          <StatCard
            title="Fleet Status"
            value="12/12"
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
          />
          <StatCard
            title="Route Efficiency"
            value="91.8%"
            color="blue"
            trend={{ value: 3.2, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            }
          />
          <StatCard
            title="Driver Performance"
            value="94.5%"
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7v-2a3 3 0 015.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M17 20v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Fuel Efficiency"
            value="88.2%"
            color="orange"
            trend={{ value: 2.1, isPositive: true }}
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </DashboardGrid>
      </section>

      {/* Action Center */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Quick Actions</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-operations-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition">
              Create Work Order
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-opacity-90 transition">
              Generate Report
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening facilities management...')}
              className="w-full text-left"
            >
              <div className="text-blue-600 text-2xl mb-2">🏢</div>
              <div className="font-semibold text-charcoal-gray">Facilities</div>
              <div className="text-sm text-gray-600 mt-1">8 requests pending</div>
            </button>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening transport management...')}
              className="w-full text-left"
            >
              <div className="text-green-600 text-2xl mb-2">🚌</div>
              <div className="font-semibold text-charcoal-gray">Transport</div>
              <div className="text-sm text-gray-600 mt-1">12 vehicles active</div>
            </button>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening support staff...')}
              className="w-full text-left"
            >
              <div className="text-purple-600 text-2xl mb-2">👥</div>
              <div className="font-semibold text-charcoal-gray">Support Staff</div>
              <div className="text-sm text-gray-600 mt-1">24 staff members</div>
            </button>
          </Card>
          <Card className="cursor-pointer hover:shadow-lg transition">
            <button 
              onClick={() => alert('Opening maintenance schedule...')}
              className="w-full text-left"
            >
              <div className="text-orange-600 text-2xl mb-2">🔧</div>
              <div className="font-semibold text-charcoal-gray">Maintenance</div>
              <div className="text-sm text-gray-600 mt-1">5 scheduled tasks</div>
            </button>
          </Card>
        </div>
      </section>

      {/* Support Services */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Support Services</h2>
          <button className="px-4 py-2 bg-operations-blue text-white rounded-lg font-medium hover:bg-opacity-90 transition">
            Manage Services
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-charcoal-gray">Library Management</h3>
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                View
              </button>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">12,450</div>
              <div className="text-sm text-gray-600">Total books in collection</div>
              <div className="text-sm text-green-600 mt-2">↑ 320 new additions this term</div>
              <button className="mt-3 w-full px-3 py-2 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100">
                Manage Inventory
              </button>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-charcoal-gray">IT Infrastructure</h3>
              <button className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100">
                Monitor
              </button>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-gray-600">System uptime</div>
              <div className="text-sm text-gray-600 mt-2">All systems operational</div>
              <button className="mt-3 w-full px-3 py-2 bg-green-50 text-green-700 rounded text-sm hover:bg-green-100">
                View System Status
              </button>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-charcoal-gray">Canteen Operations</h3>
              <button className="px-3 py-1 text-sm bg-orange-50 text-orange-700 rounded hover:bg-orange-100">
                Review
              </button>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-orange-600">4.2/5</div>
              <div className="text-sm text-gray-600">Satisfaction rating</div>
              <div className="text-sm text-green-600 mt-2">↑ 0.3 improvement</div>
              <button className="mt-3 w-full px-3 py-2 bg-orange-50 text-orange-700 rounded text-sm hover:bg-orange-100">
                View Feedback
              </button>
            </div>
          </Card>
        </div>
      </section>

      {/* Pending Tasks */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Pending Tasks</h2>
        <Card>
          <div className="space-y-3">
            {[
              { task: 'Classroom Maintenance Request', facility: 'Room 201', type: 'Facilities', priority: 'High', days: 2 },
              { task: 'Vehicle Inspection Due', facility: 'Bus #3', type: 'Transport', priority: 'Medium', days: 5 },
              { task: 'IT System Update', facility: 'Server Room', type: 'IT', priority: 'Low', days: 7 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="font-semibold text-charcoal-gray">{item.task}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.facility} • {item.type}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.days} day(s) remaining</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'High' ? 'bg-red-100 text-red-800' : 
                    item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.priority}
                  </span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm hover:bg-blue-100">
                      View
                    </button>
                    <button className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm hover:bg-green-100">
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

