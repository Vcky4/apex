import { Card } from '@apex-providers/ui-components';

export default function ActivitiesCoordination() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Activities Coordination</h1>
        <p className="text-gray-600 mt-2">Club management, sports teams, and event planning</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Active Clubs</div>
          <div className="text-3xl font-bold text-purple-600">12</div>
          <div className="text-sm text-gray-600 mt-2">Student clubs</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Sports Teams</div>
          <div className="text-3xl font-bold text-blue-600">8</div>
          <div className="text-sm text-gray-600 mt-2">Active teams</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Upcoming Events</div>
          <div className="text-3xl font-bold text-green-600">15</div>
          <div className="text-sm text-gray-600 mt-2">Scheduled</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Participation Rate</div>
          <div className="text-3xl font-bold text-orange-600">78.2%</div>
          <div className="text-sm text-green-600 mt-2">↑ 5.3% increase</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Clubs & Societies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Science Club', members: 45, meetings: 'Weekly', status: 'Active' },
            { name: 'Debate Society', members: 32, meetings: 'Bi-weekly', status: 'Active' },
            { name: 'Art Club', members: 38, meetings: 'Weekly', status: 'Active' },
            { name: 'Music Ensemble', members: 28, meetings: 'Weekly', status: 'Active' },
            { name: 'Photography Club', members: 22, meetings: 'Monthly', status: 'Active' },
            { name: 'Robotics Club', members: 35, meetings: 'Bi-weekly', status: 'Active' },
          ].map((club) => (
            <div key={club.name} className="p-4 border rounded-lg">
              <div className="font-semibold text-charcoal-gray">{club.name}</div>
              <div className="text-sm text-gray-600 mt-1">{club.members} members</div>
              <div className="text-xs text-gray-500 mt-1">Meetings: {club.meetings}</div>
              <span className="mt-2 inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                {club.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Sports Teams</h2>
          <div className="space-y-3">
            {[
              { team: 'Basketball', players: 15, coach: 'Coach Smith', season: 'In Season' },
              { team: 'Soccer', players: 18, coach: 'Coach Johnson', season: 'In Season' },
              { team: 'Track & Field', players: 22, coach: 'Coach Davis', season: 'Pre-Season' },
              { team: 'Swimming', players: 12, coach: 'Coach Wilson', season: 'Off Season' },
            ].map((item) => (
              <div key={item.team} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-charcoal-gray">{item.team}</div>
                    <div className="text-sm text-gray-600 mt-1">{item.players} players - {item.coach}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.season === 'In Season' ? 'bg-green-100 text-green-800' :
                    item.season === 'Pre-Season' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.season}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {[
              { event: 'Science Fair', date: 'Mar 15, 2025', participants: 120, status: 'Confirmed' },
              { event: 'Sports Day', date: 'Mar 28, 2025', participants: 300, status: 'Planned' },
              { event: 'Music Concert', date: 'Apr 10, 2025', participants: 80, status: 'Scheduled' },
              { event: 'Art Exhibition', date: 'Apr 20, 2025', participants: 65, status: 'Planned' },
            ].map((item) => (
              <div key={item.event} className="p-3 border rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.event}</div>
                <div className="text-sm text-gray-600 mt-1">{item.date} - {item.participants} participants</div>
                <span className={`mt-2 inline-block px-2 py-1 rounded text-xs ${
                  item.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                  item.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
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

