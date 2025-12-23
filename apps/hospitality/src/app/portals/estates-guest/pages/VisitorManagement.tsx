import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

interface Visitor {
  id: string;
  name: string;
  phone: string;
  visitDate: string;
  visitTime: string;
  type: string;
  status: 'pending' | 'approved' | 'checked-in' | 'checked-out';
  visitCount: number;
  permanentQR: boolean;
}

export default function VisitorManagement() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: '1',
      name: 'Jane Doe',
      phone: '+1 234-567-8900',
      visitDate: '2024-10-16',
      visitTime: '14:00',
      type: 'Event Guest',
      status: 'approved',
      visitCount: 2,
      permanentQR: true,
    },
    {
      id: '2',
      name: 'John Smith',
      phone: '+1 234-567-8901',
      visitDate: '2024-10-18',
      visitTime: '18:00',
      type: 'Wedding Guest',
      status: 'pending',
      visitCount: 0,
      permanentQR: false,
    },
  ]);

  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  const handleBulkInvite = () => {
    // Handle bulk invite
    setIsBulkModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Visitor Management</h1>
          <p className="text-gray-600 mt-2">Bulk visitor invites and event attendance tracking</p>
        </div>
        <button
          onClick={() => setIsBulkModalOpen(true)}
          className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg transition-colors"
        >
          + Bulk Invite Visitors
        </button>
      </div>

      {/* Visitor Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Invited</p>
            <p className="text-2xl font-bold text-charcoal-gray">{visitors.length}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {visitors.filter((v) => v.status === 'approved').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Visits</p>
            <p className="text-2xl font-bold text-blue-600">
              {visitors.reduce((sum, v) => sum + v.visitCount, 0)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Permanent QR Codes</p>
            <p className="text-2xl font-bold text-purple-600">
              {visitors.filter((v) => v.permanentQR).length}
            </p>
          </div>
        </Card>
      </div>

      {/* Visitor List */}
      <Card>
        <div className="space-y-4">
          {visitors.map((visitor) => (
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
                    <p className="text-gray-500">Visits: {visitor.visitCount}</p>
                  </div>
                  <div>
                    <span className="px-2 py-1 text-xs font-bold rounded bg-purple-100 text-purple-800">
                      {visitor.type}
                    </span>
                    {visitor.permanentQR && (
                      <span className="ml-2 px-2 py-1 text-xs font-bold rounded bg-green-100 text-green-800">
                        Permanent QR
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded ${
                    visitor.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : visitor.status === 'pending'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {visitor.status.toUpperCase()}
                </span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View QR
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bulk Invite Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Bulk Visitor Invitation</h3>
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
                  Upload CSV/Excel File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-600 mb-2">Drop file here or click to browse</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Choose File
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Required columns: Name, Phone, Visit Date, Visit Time, Type
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="permanentQR" className="w-4 h-4" />
                <label htmlFor="permanentQR" className="text-sm font-medium text-gray-700">
                  Generate permanent QR codes for multi-day access
                </label>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleBulkInvite}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Generate Invitations & QR Codes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

