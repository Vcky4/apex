import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

export default function VisitorManagement() {
  const [visitorLimits, setVisitorLimits] = useState({
    perGuest: 10,
    perTenant: 5,
    perEvent: 50,
  });

  const [visitorTraffic, setVisitorTraffic] = useState([
    { date: '2024-10-11', count: 45, property: 'Grand Estate Villa' },
    { date: '2024-10-10', count: 38, property: 'Luxury Beach Resort' },
    { date: '2024-10-09', count: 52, property: 'Grand Estate Villa' },
  ]);

  const [permanentVisitors, setPermanentVisitors] = useState([
    {
      id: '1',
      name: 'Jane Doe',
      guest: 'John Wick',
      property: 'Grand Estate Villa',
      status: 'approved',
      qrCode: 'QR-12345',
    },
    {
      id: '2',
      name: 'John Smith',
      guest: 'Sarah Connor',
      property: 'Luxury Beach Resort',
      status: 'pending',
      qrCode: null,
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Tenant & Visitor Management</h1>
        <p className="text-gray-600 mt-2">Set visitor limits and monitor access</p>
      </div>

      {/* Visitor Limits Configuration */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Visitor Limits Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visitors per Guest
            </label>
            <input
              type="number"
              value={visitorLimits.perGuest}
              onChange={(e) =>
                setVisitorLimits({ ...visitorLimits, perGuest: parseInt(e.target.value) || 0 })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visitors per Tenant
            </label>
            <input
              type="number"
              value={visitorLimits.perTenant}
              onChange={(e) =>
                setVisitorLimits({ ...visitorLimits, perTenant: parseInt(e.target.value) || 0 })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visitors per Event
            </label>
            <input
              type="number"
              value={visitorLimits.perEvent}
              onChange={(e) =>
                setVisitorLimits({ ...visitorLimits, perEvent: parseInt(e.target.value) || 0 })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
            Save Limits
          </button>
        </div>
      </Card>

      {/* Permanent Visitors */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Permanent Visitors</h2>
        <div className="space-y-4">
          {permanentVisitors.map((visitor) => (
            <div
              key={visitor.id}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{visitor.name}</p>
                <p className="text-sm text-gray-600">
                  Guest: {visitor.guest} • Property: {visitor.property}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {visitor.qrCode && (
                  <span className="px-2 py-1 text-xs font-bold rounded bg-green-100 text-green-800">
                    QR: {visitor.qrCode}
                  </span>
                )}
                <span
                  className={`px-3 py-1 text-xs font-bold rounded ${
                    visitor.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {visitor.status.toUpperCase()}
                </span>
                {visitor.status === 'pending' && (
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Visitor Traffic */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Visitor Traffic Monitoring</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 text-sm font-bold text-gray-700">Date</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Property</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Visitor Count</th>
                <th className="text-left p-3 text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitorTraffic.map((traffic, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-900">{traffic.date}</td>
                  <td className="p-3 text-sm text-gray-700">{traffic.property}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs font-bold rounded bg-blue-100 text-blue-800">
                      {traffic.count} visitors
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Security Access Audits */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Security Access Audits</h2>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Last Audit: October 10, 2024</p>
                <p className="text-sm text-gray-600">No violations detected</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg">
                Run Audit
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

