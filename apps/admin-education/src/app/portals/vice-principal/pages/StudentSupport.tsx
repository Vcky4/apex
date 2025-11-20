import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface SupportProgram {
  id: string;
  program: string;
  students: number;
  sessions: number;
  status: 'Active' | 'Inactive';
  description?: string;
}

interface CounselingSchedule {
  id: string;
  date: string;
  time: string;
  student: string;
  type: 'Individual' | 'Group' | 'Consultation';
}

interface Accommodation {
  id: string;
  type: string;
  count: number;
  support: string;
}

export default function StudentSupport() {
  const [showCreateProgramModal, setShowCreateProgramModal] = useState(false);
  const [showScheduleCounselingModal, setShowScheduleCounselingModal] = useState(false);
  const [showAddAccommodationModal, setShowAddAccommodationModal] = useState(false);

  const [programFormData, setProgramFormData] = useState({
    program: '',
    description: '',
  });

  const [counselingFormData, setCounselingFormData] = useState({
    student: '',
    date: '',
    time: '',
    type: 'Individual' as CounselingSchedule['type'],
    notes: '',
  });

  const [accommodationFormData, setAccommodationFormData] = useState({
    type: '',
    support: '',
    studentCount: 0,
  });
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Student Support</h1>
          <p className="text-gray-600 mt-2">Learning support programs, counseling, and special needs accommodation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowCreateProgramModal(true)}>Create Program</Button>
          <Button variant="outline" onClick={() => setShowScheduleCounselingModal(true)}>Schedule Counseling</Button>
          <Button onClick={() => setShowAddAccommodationModal(true)}>Add Accommodation</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <div className="text-sm text-gray-600 mb-1">Active Support Programs</div>
          <div className="text-3xl font-bold text-blue-600">8</div>
          <div className="text-sm text-gray-600 mt-2">Programs running</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Counseling Sessions</div>
          <div className="text-3xl font-bold text-purple-600">145</div>
          <div className="text-sm text-gray-600 mt-2">This semester</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Special Needs</div>
          <div className="text-3xl font-bold text-green-600">32</div>
          <div className="text-sm text-gray-600 mt-2">Students supported</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-600 mb-1">Support Teachers</div>
          <div className="text-3xl font-bold text-orange-600">6</div>
          <div className="text-sm text-gray-600 mt-2">Active staff</div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Learning Support Programs</h2>
        <div className="space-y-3">
          {[
            { program: 'Reading Support', students: 45, sessions: 120, status: 'Active' },
            { program: 'Math Tutoring', students: 38, sessions: 95, status: 'Active' },
            { program: 'Study Skills', students: 52, sessions: 85, status: 'Active' },
            { program: 'Language Development', students: 28, sessions: 75, status: 'Active' },
          ].map((item) => (
            <div key={item.program} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-charcoal-gray">{item.program}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.students} students enrolled</div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {item.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">{item.sessions} sessions completed this term</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Counseling Schedule</h2>
          <div className="space-y-3">
            {[
              { date: 'Mar 15, 2025', time: '9:00 AM', student: 'Meeting scheduled', type: 'Individual' },
              { date: 'Mar 15, 2025', time: '11:00 AM', student: 'Group session', type: 'Group' },
              { date: 'Mar 16, 2025', time: '2:00 PM', student: 'Parent consultation', type: 'Consultation' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 border rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.student}</div>
                <div className="text-sm text-gray-600 mt-1">{item.date} at {item.time}</div>
                <span className="mt-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-charcoal-gray mb-4">Special Needs Accommodations</h2>
          <div className="space-y-3">
            {[
              { type: 'Learning Disabilities', count: 18, support: 'Fully accommodated' },
              { type: 'Physical Disabilities', count: 6, support: 'Accessible facilities' },
              { type: 'Emotional Support', count: 8, support: 'Counseling provided' },
            ].map((item) => (
              <div key={item.type} className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-charcoal-gray">{item.type}</div>
                <div className="text-sm text-gray-600 mt-1">{item.count} students - {item.support}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Create Program Modal */}
      {showCreateProgramModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create Support Program</h2>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Support program "${programFormData.program}" created successfully!`);
              setProgramFormData({ program: '', description: '' });
              setShowCreateProgramModal(false);
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Program Name *</label>
                <input
                  type="text"
                  value={programFormData.program}
                  onChange={(e) => setProgramFormData({...programFormData, program: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="e.g., Reading Support, Math Tutoring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={programFormData.description}
                  onChange={(e) => setProgramFormData({...programFormData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCreateProgramModal(false);
                    setProgramFormData({ program: '', description: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Create Program</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Counseling Modal */}
      {showScheduleCounselingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Counseling Session</h2>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Counseling session scheduled for ${counselingFormData.student} on ${counselingFormData.date} at ${counselingFormData.time}!`);
              setCounselingFormData({ student: '', date: '', time: '', type: 'Individual', notes: '' });
              setShowScheduleCounselingModal(false);
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                <input
                  type="text"
                  value={counselingFormData.student}
                  onChange={(e) => setCounselingFormData({...counselingFormData, student: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={counselingFormData.date}
                    onChange={(e) => setCounselingFormData({...counselingFormData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <input
                    type="time"
                    value={counselingFormData.time}
                    onChange={(e) => setCounselingFormData({...counselingFormData, time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Type *</label>
                <select
                  value={counselingFormData.type}
                  onChange={(e) => setCounselingFormData({...counselingFormData, type: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                >
                  <option value="Individual">Individual</option>
                  <option value="Group">Group</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={counselingFormData.notes}
                  onChange={(e) => setCounselingFormData({...counselingFormData, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowScheduleCounselingModal(false);
                    setCounselingFormData({ student: '', date: '', time: '', type: 'Individual', notes: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Schedule Session</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Accommodation Modal */}
      {showAddAccommodationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Add Special Needs Accommodation</h2>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Accommodation "${accommodationFormData.type}" added for ${accommodationFormData.studentCount} student(s)!`);
              setAccommodationFormData({ type: '', support: '', studentCount: 0 });
              setShowAddAccommodationModal(false);
            }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Type *</label>
                <input
                  type="text"
                  value={accommodationFormData.type}
                  onChange={(e) => setAccommodationFormData({...accommodationFormData, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="e.g., Learning Disabilities, Physical Disabilities"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Students *</label>
                <input
                  type="number"
                  value={accommodationFormData.studentCount}
                  onChange={(e) => setAccommodationFormData({...accommodationFormData, studentCount: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Provided *</label>
                <input
                  type="text"
                  value={accommodationFormData.support}
                  onChange={(e) => setAccommodationFormData({...accommodationFormData, support: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                  placeholder="e.g., Fully accommodated, Accessible facilities"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddAccommodationModal(false);
                    setAccommodationFormData({ type: '', support: '', studentCount: 0 });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">Add Accommodation</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

