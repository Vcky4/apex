import { Card } from '@apex-providers/ui-components';

export default function TransportAdministration() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Transport Administration</h1>
        <p className="text-gray-600 mt-2">Bus routes, driver management, and fleet operations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Active Buses</div>
          <div className="text-3xl font-bold text-green-600">12/12</div>
          <div className="text-sm text-gray-600 mt-2">All operational</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Route Efficiency</div>
          <div className="text-3xl font-bold text-blue-600">91.8%</div>
          <div className="text-sm text-green-600 mt-2">↑ 3.2% improvement</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Active Drivers</div>
          <div className="text-3xl font-bold text-purple-600">14</div>
          <div className="text-sm text-gray-600 mt-2">All certified</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Fuel Efficiency</div>
          <div className="text-3xl font-bold text-orange-600">88.2%</div>
          <div className="text-sm text-green-600 mt-2">↑ 2.1% improvement</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Bus Routes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Route</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Bus</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Students</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Driver</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { route: 'Route A - Downtown', bus: 'BUS-01', students: 45, driver: 'Driver Smith', status: 'Active' },
                { route: 'Route B - Suburb East', bus: 'BUS-02', students: 42, driver: 'Driver Johnson', status: 'Active' },
                { route: 'Route C - Suburb West', bus: 'BUS-03', students: 38, driver: 'Driver Davis', status: 'Active' },
                { route: 'Route D - Industrial Area', bus: 'BUS-04', students: 35, driver: 'Driver Wilson', status: 'Active' },
              ].map((route) => (
                <tr key={route.route} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{route.route}</td>
                  <td className="py-3 px-4">{route.bus}</td>
                  <td className="py-3 px-4">{route.students} students</td>
                  <td className="py-3 px-4">{route.driver}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      {route.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Driver Performance</h2>
          <div className="space-y-3">
            {[
              { driver: 'Driver Smith', rating: 4.8, trips: 145, status: 'Excellent' },
              { driver: 'Driver Johnson', rating: 4.7, trips: 138, status: 'Excellent' },
              { driver: 'Driver Davis', rating: 4.6, trips: 132, status: 'Good' },
              { driver: 'Driver Wilson', rating: 4.5, trips: 128, status: 'Good' },
            ].map((item) => (
              <div key={item.driver} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-charcoal-gray">{item.driver}</div>
                    <div className="text-sm text-gray-600">{item.trips} trips completed</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{item.rating}/5</div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.status === 'Excellent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Fleet Maintenance</h2>
          <div className="space-y-3">
            {[
              { bus: 'BUS-01', lastService: 'Mar 1, 2025', nextService: 'May 1, 2025', status: 'Operational' },
              { bus: 'BUS-02', lastService: 'Feb 28, 2025', nextService: 'Apr 28, 2025', status: 'Operational' },
              { bus: 'BUS-03', lastService: 'Mar 5, 2025', nextService: 'May 5, 2025', status: 'Operational' },
            ].map((item) => (
              <div key={item.bus} className="p-3 border rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.bus}</div>
                <div className="text-sm text-gray-600 mt-1">Last service: {item.lastService}</div>
                <div className="text-sm text-gray-600">Next service: {item.nextService}</div>
                <span className="mt-2 inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

