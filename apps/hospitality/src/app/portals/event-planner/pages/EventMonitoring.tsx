import { useState } from 'react';
import { Card, StatCard, DashboardGrid } from '@apex-providers/ui-components';

export default function EventMonitoring() {
  const [selectedEvent] = useState('wedding-reception');

  const liveStats = {
    totalInvited: 120,
    checkedIn: 87,
    capacity: 150,
    creditUsage: 65,
  };

  const recentCheckIns = [
    { id: '1', name: 'Jane Doe', time: '18:05', credits: { food: 50, drinks: 25 } },
    { id: '2', name: 'John Smith', time: '18:12', credits: { food: 30, drinks: 15 } },
    { id: '3', name: 'Sarah Johnson', time: '18:18', credits: { food: 75, drinks: 40 } },
  ];

  const capacityPercentage = (liveStats.checkedIn / liveStats.capacity) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Real-time Event Monitoring</h1>
        <p className="text-gray-600 mt-2">Live check-in status and analytics</p>
      </div>

      {/* Live Statistics */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Invited"
          value={liveStats.totalInvited.toString()}
          icon={<span className="text-2xl">📧</span>}
          color="blue"
        />
        <StatCard
          title="Checked In"
          value={liveStats.checkedIn.toString()}
          icon={<span className="text-2xl">✅</span>}
          color="green"
        />
        <StatCard
          title="Capacity"
          value={`${liveStats.checkedIn}/${liveStats.capacity}`}
          icon={<span className="text-2xl">👥</span>}
          color="purple"
        />
        <StatCard
          title="Credit Usage"
          value={`${liveStats.creditUsage}%`}
          icon={<span className="text-2xl">💳</span>}
          color="orange"
        />
      </DashboardGrid>

      {/* Capacity Alert */}
      {capacityPercentage > 80 && (
        <Card>
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-bold text-orange-800">Capacity Alert</p>
                <p className="text-sm text-orange-600">
                  Event is at {capacityPercentage.toFixed(0)}% capacity ({liveStats.checkedIn}/{liveStats.capacity} guests)
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Live Check-in Feed */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Live Check-in Feed</h2>
        <div className="space-y-3">
          {recentCheckIns.map((checkIn) => (
            <div
              key={checkIn.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{checkIn.name}</p>
                <p className="text-sm text-gray-600">Checked in at {checkIn.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Credits Used</p>
                <p className="font-medium text-gray-900">
                  ${checkIn.credits.food + checkIn.credits.drinks}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Credit Usage Analytics */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Credit Usage Analytics</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Food Credits</span>
              <span className="text-sm text-gray-600">$4,250 / $6,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: '70.8%' }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Drinks Credits</span>
              <span className="text-sm text-gray-600">$2,100 / $3,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: '70%' }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Services Credits</span>
              <span className="text-sm text-gray-600">$850 / $1,500</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-600 h-2.5 rounded-full"
                style={{ width: '56.7%' }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Incident Reporting */}
      <Card>
        <h2 className="text-xl font-bold text-charcoal-gray mb-4">Incident Reporting</h2>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">No incidents reported</p>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg">
              Report Incident
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

