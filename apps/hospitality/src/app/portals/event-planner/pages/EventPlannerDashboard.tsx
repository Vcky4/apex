import { Card, StatCard, DashboardGrid } from '@apex-providers/ui-components';
import { Link } from 'react-router-dom';

export default function EventPlannerDashboard() {
  const eventStats = {
    totalEvents: 3,
    upcomingEvents: 2,
    totalGuests: 245,
    attendanceRate: 87,
  };

  const events = [
    {
      id: '1',
      title: 'Wedding Reception',
      date: '2024-10-18',
      time: '18:00',
      guests: 120,
      status: 'confirmed',
      budget: 15000,
      paid: 12000,
    },
    {
      id: '2',
      title: 'Corporate Meeting',
      date: '2024-10-16',
      time: '10:00',
      guests: 25,
      status: 'confirmed',
      budget: 5000,
      paid: 5000,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Event Planner Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your events and guest coordination</p>
      </div>

      {/* Key Metrics */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Events"
          value={eventStats.totalEvents.toString()}
          icon={<span className="text-2xl">📅</span>}
          color="blue"
        />
        <StatCard
          title="Upcoming Events"
          value={eventStats.upcomingEvents.toString()}
          icon={<span className="text-2xl">🎉</span>}
          color="purple"
        />
        <StatCard
          title="Total Guests"
          value={eventStats.totalGuests.toString()}
          icon={<span className="text-2xl">👥</span>}
          color="green"
        />
        <StatCard
          title="Attendance Rate"
          value={`${eventStats.attendanceRate}%`}
          icon={<span className="text-2xl">📊</span>}
          color="orange"
        />
      </DashboardGrid>

      {/* Events List */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Events</h2>
          <Link
            to="/hospitality-estates/event-planner/guest-invites"
            className="text-sm text-blue-600 font-medium hover:text-blue-700"
          >
            Manage Guests →
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
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded ${
                      event.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {event.status.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Guests</span>
                    <span className="font-medium">{event.guests}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">${event.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paid</span>
                    <span className="font-medium text-green-600">
                      ${event.paid.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/hospitality-estates/event-planner/guest-invites?event=${event.id}`}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg text-center"
                  >
                    Manage Guests
                  </Link>
                  <Link
                    to={`/hospitality-estates/event-planner/monitoring?event=${event.id}`}
                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg text-center"
                  >
                    Live Monitoring
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

