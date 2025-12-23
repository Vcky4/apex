import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'VIP' | 'General';
  rsvp: 'pending' | 'confirmed' | 'declined';
  credits: {
    food: number;
    drinks: number;
    services: number;
  };
  checkInStatus: 'not-arrived' | 'checked-in' | 'checked-out';
}

export default function GuestInvites() {
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+1 234-567-8900',
      type: 'VIP',
      rsvp: 'confirmed',
      credits: { food: 100, drinks: 50, services: 0 },
      checkInStatus: 'checked-in',
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 234-567-8901',
      type: 'General',
      rsvp: 'confirmed',
      credits: { food: 50, drinks: 25, services: 0 },
      checkInStatus: 'not-arrived',
    },
  ]);

  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const handleBulkInvite = () => {
    // Handle bulk invite
    setIsBulkModalOpen(false);
  };

  const updateCredits = (guestId: string, category: 'food' | 'drinks' | 'services', amount: number) => {
    setGuests(
      guests.map((g) =>
        g.id === guestId
          ? { ...g, credits: { ...g.credits, [category]: amount } }
          : g
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Guest Invitation System</h1>
          <p className="text-gray-600 mt-2">Bulk guest invitations and RSVP tracking</p>
        </div>
        <button
          onClick={() => setIsBulkModalOpen(true)}
          className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg transition-colors"
        >
          + Bulk Guest Invitations
        </button>
      </div>

      {/* Guest Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Invited</p>
            <p className="text-2xl font-bold text-charcoal-gray">{guests.length}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">
              {guests.filter((g) => g.rsvp === 'confirmed').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Checked In</p>
            <p className="text-2xl font-bold text-blue-600">
              {guests.filter((g) => g.checkInStatus === 'checked-in').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">VIP Guests</p>
            <p className="text-2xl font-bold text-purple-600">
              {guests.filter((g) => g.type === 'VIP').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Guest List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 text-sm font-bold text-gray-700">Guest</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Type</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">RSVP</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Credits</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Status</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-gray-900">{guest.name}</p>
                      <p className="text-sm text-gray-600">{guest.email}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded ${
                        guest.type === 'VIP'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {guest.type}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded ${
                        guest.rsvp === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : guest.rsvp === 'declined'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {guest.rsvp.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Food:</span>
                        <span className="font-medium">${guest.credits.food}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Drinks:</span>
                        <span className="font-medium">${guest.credits.drinks}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded ${
                        guest.checkInStatus === 'checked-in'
                          ? 'bg-green-100 text-green-800'
                          : guest.checkInStatus === 'checked-out'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {guest.checkInStatus.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedGuest(guest)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Manage Credits
                      </button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
                        View QR
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Credit Management Modal */}
      {selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Manage Credits - {selectedGuest.name}</h3>
              <button
                onClick={() => setSelectedGuest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Food Credits ($)</label>
                <input
                  type="number"
                  value={selectedGuest.credits.food}
                  onChange={(e) =>
                    updateCredits(selectedGuest.id, 'food', parseFloat(e.target.value) || 0)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drinks Credits ($)</label>
                <input
                  type="number"
                  value={selectedGuest.credits.drinks}
                  onChange={(e) =>
                    updateCredits(selectedGuest.id, 'drinks', parseFloat(e.target.value) || 0)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Services Credits ($)</label>
                <input
                  type="number"
                  value={selectedGuest.credits.services}
                  onChange={(e) =>
                    updateCredits(selectedGuest.id, 'services', parseFloat(e.target.value) || 0)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedGuest(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Credits
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Invite Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Bulk Guest Invitations</h3>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Guest List (CSV/Excel)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-600 mb-2">Drop file here or click to browse</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Choose File
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Required columns: Name, Email, Phone, Type (VIP/General)
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="autoQR" className="w-4 h-4" defaultChecked />
                <label htmlFor="autoQR" className="text-sm font-medium text-gray-700">
                  Automatically generate QR codes
                </label>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleBulkInvite}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send Invitations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

