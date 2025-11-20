import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface Club {
  id: string;
  name: string;
  members: number;
  meetings: string;
  status: 'Active' | 'Inactive';
  description?: string;
  advisor?: string;
}

interface SportsTeam {
  id: string;
  team: string;
  players: number;
  coach: string;
  season: 'In Season' | 'Pre-Season' | 'Off Season';
}

interface Event {
  id: string;
  event: string;
  date: string;
  participants: number;
  status: 'Confirmed' | 'Planned' | 'Scheduled';
  location?: string;
  description?: string;
}

export default function ActivitiesCoordination() {
  const [showCreateClubModal, setShowCreateClubModal] = useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showClubDetailsModal, setShowClubDetailsModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const [clubFormData, setClubFormData] = useState({
    name: '',
    description: '',
    meetings: 'Weekly',
    advisor: '',
  });

  const [teamFormData, setTeamFormData] = useState({
    team: '',
    coach: '',
    season: 'In Season' as SportsTeam['season'],
  });

  const [eventFormData, setEventFormData] = useState({
    event: '',
    date: '',
    location: '',
    description: '',
    status: 'Planned' as Event['status'],
  });

  const [clubs, setClubs] = useState<Club[]>([
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Activities Coordination</h1>
          <p className="text-gray-600 mt-2">Club management, sports teams, and event planning</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowCreateClubModal(true)}>Create Club</Button>
          <Button variant="outline" onClick={() => setShowCreateTeamModal(true)}>Create Team</Button>
          <Button onClick={() => setShowCreateEventModal(true)}>Create Event</Button>
        </div>
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
            { id: '1', name: 'Science Club', members: 45, meetings: 'Weekly', status: 'Active' as const, advisor: 'Dr. Smith' },
            { id: '2', name: 'Debate Society', members: 32, meetings: 'Bi-weekly', status: 'Active' as const, advisor: 'Ms. Johnson' },
            { id: '3', name: 'Art Club', members: 38, meetings: 'Weekly', status: 'Active' as const, advisor: 'Mr. Davis' },
            { id: '4', name: 'Music Ensemble', members: 28, meetings: 'Weekly', status: 'Active' as const, advisor: 'Ms. Wilson' },
            { id: '5', name: 'Photography Club', members: 22, meetings: 'Monthly', status: 'Active' as const, advisor: 'Mr. Brown' },
            { id: '6', name: 'Robotics Club', members: 35, meetings: 'Bi-weekly', status: 'Active' as const, advisor: 'Dr. White' },
          ].map((club) => (
            <div key={club.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
              setSelectedClub(club);
              setShowClubDetailsModal(true);
            }}>
              <div className="font-semibold text-charcoal-gray">{club.name}</div>
              <div className="text-sm text-gray-600 mt-1">{club.members} members</div>
              <div className="text-xs text-gray-500 mt-1">Meetings: {club.meetings}</div>
              {club.advisor && <div className="text-xs text-gray-500 mt-1">Advisor: {club.advisor}</div>}
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
              { id: '1', team: 'Basketball', players: 15, coach: 'Coach Smith', season: 'In Season' as const },
              { id: '2', team: 'Soccer', players: 18, coach: 'Coach Johnson', season: 'In Season' as const },
              { id: '3', team: 'Track & Field', players: 22, coach: 'Coach Davis', season: 'Pre-Season' as const },
              { id: '4', team: 'Swimming', players: 12, coach: 'Coach Wilson', season: 'Off Season' as const },
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
              { id: '1', event: 'Science Fair', date: 'Mar 15, 2025', participants: 120, status: 'Confirmed' as const, location: 'Main Hall' },
              { id: '2', event: 'Sports Day', date: 'Mar 28, 2025', participants: 300, status: 'Planned' as const, location: 'Sports Field' },
              { id: '3', event: 'Music Concert', date: 'Apr 10, 2025', participants: 80, status: 'Scheduled' as const, location: 'Auditorium' },
              { id: '4', event: 'Art Exhibition', date: 'Apr 20, 2025', participants: 65, status: 'Planned' as const, location: 'Gallery' },
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

      {/* Create Club Modal */}
      {showCreateClubModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Club</h2>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newClub: Club = {
                id: `club-${Date.now()}`,
                name: clubFormData.name,
                members: 0,
                meetings: clubFormData.meetings,
                status: 'Active',
                description: clubFormData.description,
                advisor: clubFormData.advisor,
              };
              setClubs([...clubs, newClub]);
              setClubFormData({ name: '', description: '', meetings: 'Weekly', advisor: '' });
              setShowCreateClubModal(false);
              alert('Club created successfully!');
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Club Name *</label>
                <input
                  type="text"
                  value={clubFormData.name}
                  onChange={(e) => setClubFormData({...clubFormData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Advisor</label>
                <input
                  type="text"
                  value={clubFormData.advisor}
                  onChange={(e) => setClubFormData({...clubFormData, advisor: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="e.g., Dr. Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Frequency *</label>
                <select
                  value={clubFormData.meetings}
                  onChange={(e) => setClubFormData({...clubFormData, meetings: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={clubFormData.description}
                  onChange={(e) => setClubFormData({...clubFormData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateClubModal(false);
                    setClubFormData({ name: '', description: '', meetings: 'Weekly', advisor: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Create Club</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      {showCreateTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create Sports Team</h2>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newTeam: SportsTeam = {
                id: `team-${Date.now()}`,
                team: teamFormData.team,
                players: 0,
                coach: teamFormData.coach,
                season: teamFormData.season,
              };
              // Would add to teams state here
              setTeamFormData({ team: '', coach: '', season: 'In Season' });
              setShowCreateTeamModal(false);
              alert('Sports team created successfully!');
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Name *</label>
                <input
                  type="text"
                  value={teamFormData.team}
                  onChange={(e) => setTeamFormData({...teamFormData, team: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="e.g., Basketball, Soccer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Coach *</label>
                <input
                  type="text"
                  value={teamFormData.coach}
                  onChange={(e) => setTeamFormData({...teamFormData, coach: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Season *</label>
                <select
                  value={teamFormData.season}
                  onChange={(e) => setTeamFormData({...teamFormData, season: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                >
                  <option value="In Season">In Season</option>
                  <option value="Pre-Season">Pre-Season</option>
                  <option value="Off Season">Off Season</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateTeamModal(false);
                    setTeamFormData({ team: '', coach: '', season: 'In Season' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Create Team</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create Event</h2>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newEvent: Event = {
                id: `event-${Date.now()}`,
                event: eventFormData.event,
                date: eventFormData.date,
                participants: 0,
                status: eventFormData.status,
                location: eventFormData.location,
                description: eventFormData.description,
              };
              // Would add to events state here
              setEventFormData({ event: '', date: '', location: '', description: '', status: 'Planned' });
              setShowCreateEventModal(false);
              alert('Event created successfully!');
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name *</label>
                <input
                  type="text"
                  value={eventFormData.event}
                  onChange={(e) => setEventFormData({...eventFormData, event: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={eventFormData.date}
                    onChange={(e) => setEventFormData({...eventFormData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                  <select
                    value={eventFormData.status}
                    onChange={(e) => setEventFormData({...eventFormData, status: e.target.value as any})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="Planned">Planned</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={eventFormData.location}
                  onChange={(e) => setEventFormData({...eventFormData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="e.g., Main Hall, Sports Field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={eventFormData.description}
                  onChange={(e) => setEventFormData({...eventFormData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateEventModal(false);
                    setEventFormData({ event: '', date: '', location: '', description: '', status: 'Planned' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Create Event</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Club Details Modal */}
      {showClubDetailsModal && selectedClub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{selectedClub.name}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Members</label>
                  <p className="text-gray-900">{selectedClub.members}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meetings</label>
                  <p className="text-gray-900">{selectedClub.meetings}</p>
                </div>
                {selectedClub.advisor && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Advisor</label>
                    <p className="text-gray-900">{selectedClub.advisor}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedClub.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedClub.status}
                  </span>
                </div>
              </div>
              {selectedClub.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-900">{selectedClub.description}</p>
                </div>
              )}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowClubDetailsModal(false);
                    setSelectedClub(null);
                  }}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

