import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

export default function FrontDesk() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<any>(null);

  const guests = [
    {
      id: '1',
      name: 'John Wick',
      room: '801',
      checkIn: '2024-10-10',
      checkOut: '2024-10-12',
      status: 'Checked In',
      folio: 1250.0,
    },
    {
      id: '2',
      name: 'Sarah Connor',
      room: '502',
      checkIn: '2024-10-11',
      checkOut: '2024-10-13',
      status: 'Checked In',
      folio: 980.0,
    },
  ];

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.room.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Front Desk Console</h1>
        <p className="text-gray-600 mt-2">Guest profile management and operations</p>
      </div>

      {/* Search */}
      <Card>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by guest name or room number..."
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </Card>

      {/* Guest List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-lg font-bold text-charcoal-gray mb-4">Guests</h2>
            <div className="space-y-2">
              {filteredGuests.map((guest) => (
                <div
                  key={guest.id}
                  onClick={() => setSelectedGuest(guest)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedGuest?.id === guest.id
                      ? 'border-gold-500 bg-gold-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">{guest.name}</p>
                      <p className="text-sm text-gray-600">Room {guest.room}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded ${
                        guest.status === 'Checked In'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {guest.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Guest Details */}
        {selectedGuest && (
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h2 className="text-xl font-bold text-charcoal-gray mb-4">Guest Profile</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-bold text-gray-900">{selectedGuest.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Room</p>
                  <p className="font-bold text-gray-900">{selectedGuest.room}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-in</p>
                  <p className="font-bold text-gray-900">{selectedGuest.checkIn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-out</p>
                  <p className="font-bold text-gray-900">{selectedGuest.checkOut}</p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-charcoal-gray mb-4">Folio & Billing</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Room Charges</span>
                  <span className="font-medium">$800.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Services</span>
                  <span className="font-medium">$365.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Visitor Fees</span>
                  <span className="font-medium">$84.50</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-gold-600">
                  ${selectedGuest.folio.toFixed(2)}
                </span>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-charcoal-gray mb-4">Visitor Billing</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Jane Doe</p>
                    <p className="text-sm text-gray-600">2 visits</p>
                  </div>
                  <span className="font-bold text-green-600">$75.00</span>
                </div>
              </div>
            </Card>

            <div className="flex space-x-4">
              <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">
                Process Payment
              </button>
              <button className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg">
                View Full History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

