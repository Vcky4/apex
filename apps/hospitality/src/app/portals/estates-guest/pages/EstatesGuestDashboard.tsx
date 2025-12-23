import { Card, StatCard, DashboardGrid } from '@apex-providers/ui-components';
import { Link } from 'react-router-dom';

export default function EstatesGuestDashboard() {
  const stayData = {
    reservationId: 'EST-2024-001',
    estate: 'Grand Estate Villa',
    checkIn: '2024-10-15',
    checkOut: '2024-10-20',
    status: 'Confirmed',
  };

  const visitorStats = {
    totalHosted: 8,
    paidConsultations: 3,
    earnings: 450.00,
  };

  const events = [
    { id: 1, title: 'Wedding Reception', date: '2024-10-18', time: '18:00', guests: 120 },
    { id: 2, title: 'Corporate Meeting', date: '2024-10-16', time: '10:00', guests: 25 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Welcome to {stayData.estate}</h1>
        <p className="text-gray-600 mt-2">Reservation: {stayData.reservationId} • {stayData.status}</p>
      </div>

      {/* Stay Overview */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Check-in"
          value={stayData.checkIn}
          icon={<span className="text-2xl">📥</span>}
          color="blue"
        />
        <StatCard
          title="Check-out"
          value={stayData.checkOut}
          icon={<span className="text-2xl">📤</span>}
          color="orange"
        />
        <StatCard
          title="Visitors Hosted"
          value={visitorStats.totalHosted.toString()}
          icon={<span className="text-2xl">👥</span>}
          color="purple"
        />
        <StatCard
          title="Earnings"
          value={`$${visitorStats.earnings.toFixed(2)}`}
          icon={<span className="text-2xl">💰</span>}
          color="green"
        />
      </DashboardGrid>

      {/* Events Overview */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Upcoming Events</h2>
          <Link
            to="/hospitality-estates/guest/visitor-management"
            className="text-sm text-blue-600 font-medium hover:text-blue-700"
          >
            Manage Events →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <Card key={event.id}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-charcoal-gray">{event.title}</h3>
                    <p className="text-gray-600 mt-1">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded">
                    {event.guests} guests
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg">
                    Manage Visitors
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Visitor & Earnings Summary */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Visitor & Earnings Summary</h2>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Visitors Hosted</p>
              <p className="text-2xl font-bold text-charcoal-gray">{visitorStats.totalHosted}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Paid Consultations</p>
              <p className="text-2xl font-bold text-blue-600">{visitorStats.paidConsultations}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600">${visitorStats.earnings.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="px-6 py-2 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg">
              Download Earnings Statement
            </button>
          </div>
        </Card>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/hospitality-estates/guest/pre-arrival"
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">📋</div>
            <div>
              <h3 className="font-bold text-gray-900">Pre-Arrival</h3>
              <p className="text-xs text-gray-500">Complete check-in</p>
            </div>
          </Link>

          <Link
            to="/hospitality-estates/guest/visitor-management"
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left"
          >
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">👥</div>
            <div>
              <h3 className="font-bold text-gray-900">Visitor Management</h3>
              <p className="text-xs text-gray-500">Bulk invites & tracking</p>
            </div>
          </Link>

          <Link
            to="/hospitality-estates/guest/services"
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left"
          >
            <div className="p-3 bg-gold-50 text-gold-600 rounded-full">🛎️</div>
            <div>
              <h3 className="font-bold text-gray-900">Services</h3>
              <p className="text-xs text-gray-500">Book amenities</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

