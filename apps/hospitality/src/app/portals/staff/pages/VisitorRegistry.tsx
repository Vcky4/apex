import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

interface Visitor {
  id: string;
  name: string;
  phone: string;
  guest: string;
  visitDate: string;
  visitTime: string;
  type: string;
  status: 'pending' | 'checked-in' | 'checked-out';
  checkInTime?: string;
  checkOutTime?: string;
}

export default function VisitorRegistry() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: '1',
      name: 'Jane Doe',
      phone: '+1 234-567-8900',
      guest: 'John Wick (Room 801)',
      visitDate: '2024-10-11',
      visitTime: '14:00',
      type: 'Family',
      status: 'checked-in',
      checkInTime: '14:05',
    },
    {
      id: '2',
      name: 'John Smith',
      phone: '+1 234-567-8901',
      guest: 'Sarah Connor (Room 502)',
      visitDate: '2024-10-11',
      visitTime: '16:00',
      type: 'Consultancy',
      status: 'pending',
    },
  ]);

  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    date: '',
  });

  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guest: '',
    visitDate: '',
    visitTime: '',
    type: 'Family',
  });

  const filteredVisitors = visitors.filter((visitor) => {
    if (filters.status !== 'all' && visitor.status !== filters.status) return false;
    if (filters.type !== 'all' && visitor.type !== filters.type) return false;
    if (filters.date && visitor.visitDate !== filters.date) return false;
    return true;
  });

  const handleCheckIn = (visitorId: string) => {
    setVisitors(
      visitors.map((v) =>
        v.id === visitorId
          ? { ...v, status: 'checked-in' as const, checkInTime: new Date().toLocaleTimeString() }
          : v
      )
    );
  };

  const handleCheckOut = (visitorId: string) => {
    setVisitors(
      visitors.map((v) =>
        v.id === visitorId
          ? { ...v, status: 'checked-out' as const, checkOutTime: new Date().toLocaleTimeString() }
          : v
      )
    );
  };

  const handleRegisterVisitor = () => {
    const newVisitor: Visitor = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
    };
    setVisitors([...visitors, newVisitor]);
    setIsRegisterModalOpen(false);
    setFormData({
      name: '',
      phone: '',
      guest: '',
      visitDate: '',
      visitTime: '',
      type: 'Family',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Visitor Registry</h1>
          <p className="text-gray-600 mt-2">Central visitor management and tracking</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsBulkModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            Bulk Upload
          </button>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg"
          >
            + Register Visitor
          </button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="checked-in">Checked In</option>
              <option value="checked-out">Checked Out</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Visit Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Types</option>
              <option value="Family">Family</option>
              <option value="Service">Service</option>
              <option value="Consultancy">Consultancy</option>
              <option value="Repair">Repair</option>
              <option value="Event">Event</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </Card>

      {/* Visitor List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 text-sm font-bold text-gray-700">Visitor</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Guest</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Visit Details</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Type</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Status</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-gray-900">{visitor.name}</p>
                      <p className="text-sm text-gray-600">{visitor.phone}</p>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700">{visitor.guest}</td>
                  <td className="p-3">
                    <div className="text-sm">
                      <p className="text-gray-900">{visitor.visitDate}</p>
                      <p className="text-gray-600">{visitor.visitTime}</p>
                      {visitor.checkInTime && (
                        <p className="text-green-600 text-xs">Checked in: {visitor.checkInTime}</p>
                      )}
                      {visitor.checkOutTime && (
                        <p className="text-gray-500 text-xs">Checked out: {visitor.checkOutTime}</p>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs font-bold rounded bg-purple-100 text-purple-800">
                      {visitor.type}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded ${
                        visitor.status === 'checked-in'
                          ? 'bg-green-100 text-green-800'
                          : visitor.status === 'pending'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {visitor.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      {visitor.status === 'pending' && (
                        <button
                          onClick={() => handleCheckIn(visitor.id)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          Check In
                        </button>
                      )}
                      {visitor.status === 'checked-in' && (
                        <button
                          onClick={() => handleCheckOut(visitor.id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          Check Out
                        </button>
                      )}
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

      {/* Register Visitor Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Register Visitor</h3>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Guest</label>
                <input
                  type="text"
                  value={formData.guest}
                  onChange={(e) => setFormData({ ...formData, guest: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Guest name or room number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visit Time</label>
                  <input
                    type="time"
                    value={formData.visitTime}
                    onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Family">Family</option>
                  <option value="Service">Service</option>
                  <option value="Consultancy">Consultancy</option>
                  <option value="Repair">Repair</option>
                  <option value="Event">Event</option>
                </select>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleRegisterVisitor}
                  disabled={!formData.name || !formData.phone || !formData.guest}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Register & Notify Guest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Bulk Visitor Upload</h3>
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-600">
                Upload a CSV or Excel file with visitor information. Required columns: Name, Phone, Guest, Visit Date, Visit Time, Type
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-2">Drop file here or click to browse</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Choose File
                </button>
              </div>
              <div className="flex justify-end pt-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Upload & Generate QR Codes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

