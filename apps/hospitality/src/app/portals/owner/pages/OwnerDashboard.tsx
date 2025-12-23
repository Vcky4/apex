import { Card, StatCard, DashboardGrid } from '@apex-providers/ui-components';
import { Link } from 'react-router-dom';

export default function OwnerDashboard() {
  const portfolioStats = {
    totalProperties: 5,
    occupancyRate: 78,
    totalRevenue: 125000,
    guestSatisfaction: 4.8,
  };

  const properties = [
    {
      id: '1',
      name: 'Grand Estate Villa',
      occupancy: 85,
      revenue: 45000,
      satisfaction: 4.9,
      status: 'active',
    },
    {
      id: '2',
      name: 'Luxury Beach Resort',
      occupancy: 72,
      revenue: 38000,
      satisfaction: 4.7,
      status: 'active',
    },
    {
      id: '3',
      name: 'Mountain Retreat',
      occupancy: 65,
      revenue: 22000,
      satisfaction: 4.6,
      status: 'active',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Property Owner Dashboard</h1>
        <p className="text-gray-600 mt-2">Portfolio performance and management overview</p>
      </div>

      {/* Portfolio Metrics */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Properties"
          value={portfolioStats.totalProperties.toString()}
          icon={<span className="text-2xl">🏢</span>}
          color="blue"
        />
        <StatCard
          title="Occupancy Rate"
          value={`${portfolioStats.occupancyRate}%`}
          icon={<span className="text-2xl">📊</span>}
          color="green"
        />
        <StatCard
          title="Total Revenue"
          value={`$${(portfolioStats.totalRevenue / 1000).toFixed(0)}k`}
          icon={<span className="text-2xl">💰</span>}
          color="gold"
        />
        <StatCard
          title="Guest Satisfaction"
          value={portfolioStats.guestSatisfaction.toFixed(1)}
          icon={<span className="text-2xl">⭐</span>}
          color="purple"
        />
      </DashboardGrid>

      {/* Properties List */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <Card key={property.id}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-gray">{property.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Property ID: {property.id}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded ${
                      property.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {property.status.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Occupancy</span>
                    <span className="font-medium">{property.occupancy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revenue</span>
                    <span className="font-medium">${property.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Satisfaction</span>
                    <span className="font-medium">⭐ {property.satisfaction}</span>
                  </div>
                </div>
                <Link
                  to={`/hospitality-estates/owner/visitor-management?property=${property.id}`}
                  className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
                >
                  Manage Property
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

