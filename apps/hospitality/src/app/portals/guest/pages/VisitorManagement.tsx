import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

interface Visitor {
  id: string;
  name: string;
  phone: string;
  visitDate: string;
  visitTime: string;
  duration: string;
  type: string;
  status: 'pending' | 'approved' | 'active' | 'completed';
  paid: boolean;
  price?: number;
}

export default function VisitorManagement() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: '1',
      name: 'Jane Doe',
      phone: '+1 234-567-8900',
      visitDate: '2024-10-11',
      visitTime: '14:00',
      duration: '2 hours',
      type: 'Family',
      status: 'approved',
      paid: false,
    },
    {
      id: '2',
      name: 'John Smith',
      phone: '+1 234-567-8901',
      visitDate: '2024-10-11',
      visitTime: '16:00',
      duration: '3 hours',
      type: 'Consultancy',
      status: 'pending',
      paid: true,
      price: 75.00,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    visitDate: '',
    visitTime: '',
    duration: '2 hours',
    type: 'Family',
    paid: false,
    price: 0,
  });

  const handleAddVisitor = () => {
    const newVisitor: Visitor = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
    };
    setVisitors([...visitors, newVisitor]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      phone: '',
      visitDate: '',
      visitTime: '',
      duration: '2 hours',
      type: 'Family',
      paid: false,
      price: 0,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Visitor Management</h1>
          <p className="text-gray-600 mt-2">Invite and manage your visitors</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg transition-colors"
        >
          + Invite Visitor
        </button>
      </div>

      {/* Visitor List */}
      <Card>
        <div className="space-y-4">
          {visitors.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No visitors yet. Invite your first visitor!</p>
          ) : (
            visitors.map(visitor => (
              <div
                key={visitor.id}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-bold text-gray-900">{visitor.name}</h3>
                      <p className="text-sm text-gray-600">{visitor.phone}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">
                        {visitor.visitDate} at {visitor.visitTime}
                      </p>
                      <p className="text-gray-500">Duration: {visitor.duration}</p>
                    </div>
                    <div>
                      <span className="px-2 py-1 text-xs font-bold rounded bg-purple-100 text-purple-800">
                        {visitor.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {visitor.paid && (
                    <span className="text-sm font-bold text-green-600">
                      ${visitor.price?.toFixed(2)}
                    </span>
                  )}
                  <span className={`px-3 py-1 text-xs font-bold rounded ${getStatusColor(visitor.status)}`}>
                    {visitor.status.toUpperCase()}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View QR
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Add Visitor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Invite Visitor</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
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
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="+1 234-567-8900"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Visit Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3 hours">3 hours</option>
                  <option value="4 hours">4 hours</option>
                  <option value="Full day">Full day</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visitation Type</label>
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
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="paid"
                  checked={formData.paid}
                  onChange={(e) => setFormData({ ...formData, paid: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="paid" className="text-sm font-medium text-gray-700">
                  Paid Visit
                </label>
              </div>
              {formData.paid && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              )}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleAddVisitor}
                  disabled={!formData.name || !formData.phone || !formData.visitDate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

