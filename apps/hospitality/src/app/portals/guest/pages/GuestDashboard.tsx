import { useState } from 'react';
import { Card, StatCard, DashboardGrid } from '@apex-providers/ui-components';
import { Link } from 'react-router-dom';

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3">
      <span>{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200">×</button>
    </div>
  );
};

export default function GuestDashboard() {
  const [toast, setToast] = useState<string | null>(null);

  // Mock data
  const stayData = {
    reservationId: 'RES-2024-001',
    room: '801',
    roomType: 'Executive Suite',
    checkIn: '2024-10-10',
    checkOut: '2024-10-12',
    status: 'Checked In',
  };

  const visitorStats = {
    totalInvited: 3,
    pending: 1,
    approved: 2,
    limit: 10,
    revenue: 150.00,
  };

  const events = [
    { id: 1, title: 'Wine Tasting', time: '18:00', location: 'Lobby Bar', type: 'Social' },
    { id: 2, title: 'Pool Maintenance', time: '22:00', location: 'Rooftop Pool', type: 'Notice' },
    { id: 3, title: 'Yoga Session', time: '07:00', location: 'Gym Studio', type: 'Activity' },
  ];

  const parcels = [
    { id: 101, sender: 'Amazon', status: 'Arrived', location: 'Front Desk' },
    { id: 102, sender: 'FedEx', status: 'En Route', eta: 'Tomorrow, 10am' },
  ];

  return (
    <div className="space-y-8 relative">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Welcome back</h1>
        <p className="text-gray-600 mt-2">Room {stayData.room} • {stayData.roomType} • {stayData.status}</p>
      </div>

      {/* Stay Overview */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Stay Overview</h2>
        <DashboardGrid columns={3}>
          <StatCard
            title="Current Bill"
            value="$1,250.00"
            icon={<span className="text-2xl">💳</span>}
            color="gold"
          />
          <StatCard
            title="Check-out"
            value="Oct 12"
            icon={<span className="text-2xl">📅</span>}
            color="blue"
          />
          <StatCard
            title="Visitors"
            value={`${visitorStats.approved}/${visitorStats.limit}`}
            icon={<span className="text-2xl">👥</span>}
            color="purple"
          />
        </DashboardGrid>
      </section>

      {/* Visitor Overview */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Visitor Management</h2>
          <Link
            to="/hospitality/guest/visitors"
            className="text-sm text-blue-600 font-medium hover:text-blue-700"
          >
            Manage Visitors →
          </Link>
        </div>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Invited</p>
              <p className="text-2xl font-bold text-charcoal-gray">{visitorStats.totalInvited}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Approval</p>
              <p className="text-2xl font-bold text-orange-600">{visitorStats.pending}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Revenue from Visitors</p>
              <p className="text-2xl font-bold text-green-600">${visitorStats.revenue.toFixed(2)}</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Events & Announcements */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-charcoal-gray">Events & Updates</h2>
          <span className="text-sm text-blue-600 font-medium cursor-pointer">View All</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map(event => (
            <div key={event.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <span className={`inline-block px-2 py-1 text-xs font-bold rounded mb-2 ${
                event.type === 'Notice' ? 'bg-orange-100 text-orange-800' : 
                event.type === 'Social' ? 'bg-purple-100 text-purple-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {event.type}
              </span>
              <h3 className="font-bold text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{event.time} • {event.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parcel Tracking */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Parcels & Deliveries</h2>
        <Card>
          {parcels.length > 0 ? (
            <div className="space-y-4">
              {parcels.map(parcel => (
                <div key={parcel.id} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg text-xl">📦</div>
                    <div>
                      <p className="font-bold text-gray-900">{parcel.sender}</p>
                      <p className="text-xs text-gray-500">{parcel.status} • {parcel.location || parcel.eta}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded ${
                    parcel.status === 'Arrived' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {parcel.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No active deliveries.</p>
          )}
        </Card>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            to="/hospitality/guest/visitors"
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left"
          >
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">👤</div>
            <div>
              <h3 className="font-bold text-gray-900">Invite Visitor</h3>
              <p className="text-xs text-gray-500">Create digital pass</p>
            </div>
          </Link>
          
          <Link
            to="/hospitality/guest/checkin"
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left"
          >
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">📶</div>
            <div>
              <h3 className="font-bold text-gray-900">Pre-Arrival</h3>
              <p className="text-xs text-gray-500">Complete check-in</p>
            </div>
          </Link>

          <Link
            to="/hospitality/guest/services"
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left"
          >
            <div className="p-3 bg-gold-50 text-gold-600 rounded-full">🛎️</div>
            <div>
              <h3 className="font-bold text-gray-900">Services</h3>
              <p className="text-xs text-gray-500">Book amenities</p>
            </div>
          </Link>

          <Link
            to="/hospitality/guest/checkout"
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow flex items-center space-x-4 text-left"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">👋</div>
            <div>
              <h3 className="font-bold text-gray-900">Check-out</h3>
              <p className="text-xs text-gray-500">Express checkout</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

