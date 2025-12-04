import React, { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default function FrontDesk() {
  const [view, setView] = useState<'checkin' | 'checkout' | 'inhouse'>('checkin');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Mock Data
  const guests = [
    { id: 1, name: 'Alice Smith', room: '304', type: 'Standard', status: 'Arriving', bookingId: 'BK-7890', balance: 0, loyalty: 'Silver' },
    { id: 2, name: 'Bob Jones', room: '501', type: 'Suite', status: 'Arriving', bookingId: 'BK-7891', balance: 0, loyalty: 'Gold' },
    { id: 3, name: 'Charlie Brown', room: '202', type: 'Standard', status: 'Departing', bookingId: 'BK-7885', balance: 125.50, loyalty: 'Member' },
    { id: 4, name: 'David Wilson', room: '405', type: 'Deluxe', status: 'In-House', bookingId: 'BK-7888', balance: 450.00, loyalty: 'Platinum' },
    { id: 5, name: 'Eva Green', room: '601', type: 'Suite', status: 'Departing', bookingId: 'BK-7882', balance: 0.00, loyalty: 'Gold' },
  ];

  const filteredGuests = guests.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.room.includes(searchTerm);
    if (!matchesSearch) return false;
    
    if (view === 'checkin') return g.status === 'Arriving';
    if (view === 'checkout') return g.status === 'Departing';
    if (view === 'inhouse') return g.status === 'In-House';
    return true;
  });

  const handleAction = (guest: any) => {
    setSelectedGuest(guest);
    if (view === 'checkin') {
      setIsCheckInModalOpen(true);
    } else if (view === 'checkout') {
      setIsCheckOutModalOpen(true);
    } else {
      setIsProfileModalOpen(true);
    }
  };

  const completeCheckIn = () => {
    alert(`Check-in completed for ${selectedGuest.name}. Key card activated.`);
    setIsCheckInModalOpen(false);
  };

  const completeCheckOut = () => {
    alert(`Check-out completed for ${selectedGuest.name}. Room 304 status updated to Dirty.`);
    setIsCheckOutModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Front Desk Console</h1>
          <p className="text-gray-600 mt-1">Manage arrivals, departures, and guest requests</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search guest or room..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Workflow Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 pb-1">
        <button 
          onClick={() => setView('checkin')}
          className={`pb-3 px-4 font-medium text-sm transition-colors ${
            view === 'checkin' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Arrivals (Check-in)
        </button>
        <button 
          onClick={() => setView('checkout')}
          className={`pb-3 px-4 font-medium text-sm transition-colors ${
            view === 'checkout' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Departures (Check-out)
        </button>
        <button 
          onClick={() => setView('inhouse')}
          className={`pb-3 px-4 font-medium text-sm transition-colors ${
            view === 'inhouse' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          In-House Guests
        </button>
      </div>

      {/* Guest List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{guest.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{guest.room}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{guest.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">{guest.bookingId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        guest.status === 'Arriving' ? 'bg-blue-100 text-blue-800' : 
                        guest.status === 'Departing' ? 'bg-orange-100 text-orange-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {guest.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleAction(guest)}
                        className="text-blue-600 hover:text-blue-900 font-bold"
                      >
                        {view === 'checkin' ? 'Check In' : view === 'checkout' ? 'Check Out' : 'View Profile'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No guests found for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Check-In Modal */}
      <Modal
        isOpen={isCheckInModalOpen}
        onClose={() => setIsCheckInModalOpen(false)}
        title={`Check-In: ${selectedGuest?.name}`}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-500 uppercase">Booking ID</p>
              <p className="font-bold text-gray-900">{selectedGuest?.bookingId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Assigned Room</p>
              <p className="font-bold text-gray-900">{selectedGuest?.room} ({selectedGuest?.type})</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Stay Duration</p>
              <p className="font-bold text-gray-900">3 Nights</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Payment Status</p>
              <span className="text-green-600 font-bold text-sm">Pre-Authorized</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-900">Registration Steps</h4>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" />
              <span className="text-gray-700">Verify ID Document</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" />
              <span className="text-gray-700">Confirm Contact Details</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" />
              <span className="text-gray-700">Sign Registration Card (Digital)</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" />
              <span className="text-gray-700">Issue Room Key(s)</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => setIsCheckInModalOpen(false)}>Cancel</Button>
            <Button onClick={completeCheckIn}>Complete Check-In</Button>
          </div>
        </div>
      </Modal>

      {/* Check-Out Modal */}
      <Modal
        isOpen={isCheckOutModalOpen}
        onClose={() => setIsCheckOutModalOpen(false)}
        title={`Check-Out: ${selectedGuest?.name}`}
      >
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex justify-between items-center">
              <span className="text-blue-800 font-medium">Outstanding Balance</span>
              <span className="text-2xl font-bold text-blue-900">${selectedGuest?.balance.toFixed(2)}</span>
            </div>
          </div>

          {selectedGuest?.balance > 0 ? (
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900">Payment Required</h4>
              <p className="text-sm text-gray-600">Please process payment to complete check-out.</p>
              <div className="flex space-x-3">
                <button className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm">
                  Charge Card on File
                </button>
                <button className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm">
                  Cash / Terminal
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <span>✓</span>
              <span className="font-medium">Balance Settled</span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-gray-900">Departure Checklist</h4>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" />
              <span className="text-gray-700">Collect Room Keys</span>
            </label>
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" />
              <span className="text-gray-700">Verify Mini-Bar Consumption</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => setIsCheckOutModalOpen(false)}>Cancel</Button>
            <Button onClick={completeCheckOut} disabled={selectedGuest?.balance > 0}>Complete Check-Out</Button>
          </div>
        </div>
      </Modal>

      {/* Guest Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title={`Guest Profile: ${selectedGuest?.name}`}
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
              {selectedGuest?.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{selectedGuest?.name}</h3>
              <p className="text-gray-600">{selectedGuest?.loyalty} Member</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Email</p>
              <p className="font-medium">guest@example.com</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Phone</p>
              <p className="font-medium">+1 (555) 123-4567</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Nationality</p>
              <p className="font-medium">United States</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Preferences</p>
              <p className="font-medium">High Floor, Extra Pillow</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-bold text-gray-900 mb-2">Recent Stays</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Sep 2025 - 2 Nights</span>
                <span>Apex New York</span>
              </li>
              <li className="flex justify-between">
                <span>Jun 2025 - 5 Nights</span>
                <span>Apex London</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setIsProfileModalOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
