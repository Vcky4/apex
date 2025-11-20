import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface Venue {
  id: number;
  name: string;
  building: string;
  capacity: number;
  type: 'Lecture Hall' | 'Lab' | 'Examination Hall' | 'Auditorium' | 'Classroom';
  amenities: string[];
  available: boolean;
}

interface ExamAllocation {
  id: number;
  examName: string;
  course: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  venueId: number;
  students: number;
  invigilators: number;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export default function ExamVenues() {
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamAllocation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [venues, setVenues] = useState<Venue[]>([
    {
      id: 1,
      name: 'Main Auditorium',
      building: 'Academic Building',
      capacity: 500,
      type: 'Auditorium',
      amenities: ['Projector', 'Sound System', 'WiFi', 'AC'],
      available: true,
    },
    {
      id: 2,
      name: 'Hall A',
      building: 'Examination Center',
      capacity: 200,
      type: 'Examination Hall',
      amenities: ['AC', 'WiFi', 'Desks'],
      available: true,
    },
    {
      id: 3,
      name: 'Hall B',
      building: 'Examination Center',
      capacity: 200,
      type: 'Examination Hall',
      amenities: ['AC', 'WiFi', 'Desks'],
      available: true,
    },
    {
      id: 4,
      name: 'Lab 1',
      building: 'Science Building',
      capacity: 50,
      type: 'Lab',
      amenities: ['Computers', 'AC', 'WiFi'],
      available: false,
    },
  ]);

  const [examAllocations, setExamAllocations] = useState<ExamAllocation[]>([
    {
      id: 1,
      examName: 'Mathematics Final Exam',
      course: 'MATH101',
      date: '2025-03-25',
      startTime: '09:00',
      endTime: '12:00',
      venue: 'Hall A',
      venueId: 2,
      students: 180,
      invigilators: 4,
      status: 'Scheduled',
    },
    {
      id: 2,
      examName: 'Physics Midterm',
      course: 'PHY201',
      date: '2025-03-20',
      startTime: '10:00',
      endTime: '11:30',
      venue: 'Main Auditorium',
      venueId: 1,
      students: 150,
      invigilators: 3,
      status: 'Scheduled',
    },
  ]);

  const [allocationForm, setAllocationForm] = useState({
    examName: '',
    course: '',
    date: '',
    startTime: '',
    endTime: '',
    venueId: '',
    students: 0,
    invigilators: 1,
  });

  const availableVenues = venues.filter(v => v.available || filterType !== 'all');
  const filteredVenues = venues.filter(v => {
    const matchesSearch = searchTerm === '' || 
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || v.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAllocateExam = () => {
    if (!allocationForm.examName || !allocationForm.course || !allocationForm.date || !allocationForm.venueId) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedVenue = venues.find(v => v.id === parseInt(allocationForm.venueId));
    if (!selectedVenue) {
      alert('Please select a valid venue');
      return;
    }

    if (allocationForm.students > selectedVenue.capacity) {
      alert(`Number of students (${allocationForm.students}) exceeds venue capacity (${selectedVenue.capacity})`);
      return;
    }

    const newAllocation: ExamAllocation = {
      id: examAllocations.length + 1,
      examName: allocationForm.examName,
      course: allocationForm.course,
      date: allocationForm.date,
      startTime: allocationForm.startTime,
      endTime: allocationForm.endTime,
      venue: selectedVenue.name,
      venueId: selectedVenue.id,
      students: allocationForm.students,
      invigilators: allocationForm.invigilators,
      status: 'Scheduled',
    };

    setExamAllocations([...examAllocations, newAllocation]);
    setShowAllocationModal(false);
    setAllocationForm({
      examName: '',
      course: '',
      date: '',
      startTime: '',
      endTime: '',
      venueId: '',
      students: 0,
      invigilators: 1,
    });
    alert('Exam allocated to venue successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exam Venues & Allocations</h1>
          <p className="text-gray-600 mt-2">Manage examination venues and allocate tests/exams</p>
        </div>
        <Button onClick={() => setShowAllocationModal(true)} variant="primary">
          Allocate Exam to Venue
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Total Venues</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{venues.length}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Available Venues</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {venues.filter(v => v.available).length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Total Capacity</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {venues.reduce((sum, v) => sum + v.capacity, 0)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Scheduled Exams</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {examAllocations.filter(e => e.status === 'Scheduled').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Exam Allocations */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Exam Allocations</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invigilators</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {examAllocations.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.examName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {exam.date} • {exam.startTime} - {exam.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.venue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.students}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exam.invigilators}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusColor(exam.status)}`}>
                        {exam.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Venues List */}
      <Card>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Available Venues</h2>
            <div className="flex space-x-3">
              <input
                type="search"
                placeholder="Search venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
              >
                <option value="all">All Types</option>
                <option value="Lecture Hall">Lecture Hall</option>
                <option value="Lab">Lab</option>
                <option value="Examination Hall">Examination Hall</option>
                <option value="Auditorium">Auditorium</option>
                <option value="Classroom">Classroom</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className={`border-2 rounded-lg p-4 ${
                  venue.available
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{venue.name}</h3>
                    <p className="text-sm text-gray-600">{venue.building}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                    venue.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {venue.available ? 'Available' : 'Occupied'}
                  </span>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-semibold text-gray-900">{venue.capacity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold text-gray-900">{venue.type}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {venue.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Allocate Exam Modal */}
      {showAllocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Allocate Exam to Venue</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exam Name *</label>
                  <input
                    type="text"
                    value={allocationForm.examName}
                    onChange={(e) => setAllocationForm({ ...allocationForm, examName: e.target.value })}
                    placeholder="e.g., Mathematics Final Exam"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Code *</label>
                  <input
                    type="text"
                    value={allocationForm.course}
                    onChange={(e) => setAllocationForm({ ...allocationForm, course: e.target.value })}
                    placeholder="e.g., MATH101"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={allocationForm.date}
                    onChange={(e) => setAllocationForm({ ...allocationForm, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
                  <input
                    type="time"
                    value={allocationForm.startTime}
                    onChange={(e) => setAllocationForm({ ...allocationForm, startTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
                  <input
                    type="time"
                    value={allocationForm.endTime}
                    onChange={(e) => setAllocationForm({ ...allocationForm, endTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Venue *</label>
                <select
                  value={allocationForm.venueId}
                  onChange={(e) => {
                    setAllocationForm({ ...allocationForm, venueId: e.target.value });
                    const venue = venues.find(v => v.id === parseInt(e.target.value));
                    if (venue) {
                      setAllocationForm({ ...allocationForm, venueId: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                >
                  <option value="">Choose a venue...</option>
                  {availableVenues.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name} ({venue.building}) - Capacity: {venue.capacity}
                    </option>
                  ))}
                </select>
                {allocationForm.venueId && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected venue capacity: {venues.find(v => v.id === parseInt(allocationForm.venueId))?.capacity} students
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Students *</label>
                  <input
                    type="number"
                    value={allocationForm.students}
                    onChange={(e) => setAllocationForm({ ...allocationForm, students: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Invigilators</label>
                  <input
                    type="number"
                    value={allocationForm.invigilators}
                    onChange={(e) => setAllocationForm({ ...allocationForm, invigilators: parseInt(e.target.value) })}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAllocationModal(false);
                  setAllocationForm({
                    examName: '',
                    course: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    venueId: '',
                    students: 0,
                    invigilators: 1,
                  });
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAllocateExam}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Allocate Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

