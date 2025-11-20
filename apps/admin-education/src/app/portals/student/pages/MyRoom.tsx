import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface Room {
  id: number;
  number: string;
  building: string;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  type: 'Single' | 'Double' | 'Triple' | 'Quad';
  amenities: string[];
  available: boolean;
}

interface MaintenanceReport {
  id: number;
  date: string;
  issue: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
}

export default function MyRoom() {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showRoomSelectionModal, setShowRoomSelectionModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  const [maintenanceForm, setMaintenanceForm] = useState({
    issue: '',
    description: '',
    priority: 'Medium',
  });

  // Mock current room assignment
  const currentRoom: Room = {
    id: 1,
    number: '201',
    building: 'North Hall',
    floor: 2,
    capacity: 2,
    currentOccupancy: 2,
    type: 'Double',
    amenities: ['WiFi', 'AC', 'Private Bathroom', 'Study Desk'],
    available: false,
  };

  const [maintenanceReports, setMaintenanceReports] = useState<MaintenanceReport[]>([
    {
      id: 1,
      date: '2025-01-15',
      issue: 'AC Not Working',
      description: 'The air conditioning unit in room 201 is not cooling properly.',
      status: 'Resolved',
      priority: 'High',
    },
    {
      id: 2,
      date: '2025-01-20',
      issue: 'Leaky Faucet',
      description: 'The bathroom faucet has been dripping continuously.',
      status: 'In Progress',
      priority: 'Medium',
    },
  ]);

  const availableRooms: Room[] = [
    {
      id: 2,
      number: '305',
      building: 'North Hall',
      floor: 3,
      capacity: 2,
      currentOccupancy: 1,
      type: 'Double',
      amenities: ['WiFi', 'AC', 'Private Bathroom', 'Study Desk', 'Balcony'],
      available: true,
    },
    {
      id: 3,
      number: '412',
      building: 'South Hall',
      floor: 4,
      capacity: 1,
      currentOccupancy: 0,
      type: 'Single',
      amenities: ['WiFi', 'AC', 'Shared Bathroom', 'Study Desk', 'Window View'],
      available: true,
    },
    {
      id: 4,
      number: '108',
      building: 'East Hall',
      floor: 1,
      capacity: 2,
      currentOccupancy: 1,
      type: 'Double',
      amenities: ['WiFi', 'AC', 'Private Bathroom', 'Study Desk'],
      available: true,
    },
  ];

  const handleSubmitMaintenanceReport = () => {
    if (!maintenanceForm.issue || !maintenanceForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newReport: MaintenanceReport = {
      id: maintenanceReports.length + 1,
      date: new Date().toISOString().split('T')[0],
      issue: maintenanceForm.issue,
      description: maintenanceForm.description,
      status: 'Pending',
      priority: maintenanceForm.priority as MaintenanceReport['priority'],
    };

    setMaintenanceReports([newReport, ...maintenanceReports]);
    setShowMaintenanceModal(false);
    setMaintenanceForm({ issue: '', description: '', priority: 'Medium' });
    alert('Maintenance report submitted successfully! You will be notified when it is resolved.');
  };

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleConfirmRoomChange = () => {
    if (selectedRoom) {
      alert(`Room change request submitted! You will be notified once your request to move to Room ${selectedRoom.number} (${selectedRoom.building}) is approved.`);
      setShowRoomSelectionModal(false);
      setSelectedRoom(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Room</h1>
          <p className="text-gray-600 mt-2">View your room assignment and manage maintenance requests</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => setShowMaintenanceModal(true)} variant="primary">
            Report Maintenance Issue
          </Button>
          <Button onClick={() => setShowRoomSelectionModal(true)} variant="outline">
            Change Room
          </Button>
        </div>
      </div>

      {/* Current Room Card */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Current Room Assignment</h2>
              <p className="text-gray-600 mt-1">Room {currentRoom.number} • {currentRoom.building}</p>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
              Assigned
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Room Details</p>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Number:</span>
                    <span className="font-semibold text-gray-900">{currentRoom.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Building:</span>
                    <span className="font-semibold text-gray-900">{currentRoom.building}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Floor:</span>
                    <span className="font-semibold text-gray-900">Floor {currentRoom.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room Type:</span>
                    <span className="font-semibold text-gray-900">{currentRoom.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Occupancy:</span>
                    <span className="font-semibold text-gray-900">
                      {currentRoom.currentOccupancy}/{currentRoom.capacity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {currentRoom.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Maintenance Reports */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Maintenance Reports</h2>
          {maintenanceReports.length > 0 ? (
            <div className="space-y-4">
              {maintenanceReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{report.issue}</h3>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(report.priority)}`}>
                        {report.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Reported on: {report.date}</span>
                    {report.status === 'Resolved' && (
                      <span className="text-sm text-green-600 font-medium">✓ Issue Resolved</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No maintenance reports yet</p>
          )}
        </div>
      </Card>

      {/* Maintenance Report Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Report Maintenance Issue</h2>
              <p className="text-sm text-gray-600 mt-1">Room {currentRoom.number} • {currentRoom.building}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Type *
                </label>
                <select
                  value={maintenanceForm.issue}
                  onChange={(e) => setMaintenanceForm({ ...maintenanceForm, issue: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                >
                  <option value="">Select an issue...</option>
                  <option value="AC/Heating">AC/Heating</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Furniture">Furniture</option>
                  <option value="WiFi/Internet">WiFi/Internet</option>
                  <option value="Door/Lock">Door/Lock</option>
                  <option value="Window">Window</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={maintenanceForm.description}
                  onChange={(e) => setMaintenanceForm({ ...maintenanceForm, description: e.target.value })}
                  rows={4}
                  placeholder="Please describe the issue in detail..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level *
                </label>
                <select
                  value={maintenanceForm.priority}
                  onChange={(e) => setMaintenanceForm({ ...maintenanceForm, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                >
                  <option value="Low">Low - Can wait a few days</option>
                  <option value="Medium">Medium - Should be fixed soon</option>
                  <option value="High">High - Needs immediate attention</option>
                  <option value="Urgent">Urgent - Safety/Health concern</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowMaintenanceModal(false);
                  setMaintenanceForm({ issue: '', description: '', priority: 'Medium' });
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitMaintenanceReport}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room Selection Modal */}
      {showRoomSelectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Available Rooms</h2>
              <p className="text-sm text-gray-600 mt-1">Select a room to request a room change</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => handleSelectRoom(room)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedRoom?.id === room.id
                        ? 'border-authority-purple bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Room {room.number}
                        </h3>
                        <p className="text-sm text-gray-600">{room.building} • Floor {room.floor}</p>
                      </div>
                      {selectedRoom?.id === room.id && (
                        <span className="px-2 py-1 bg-authority-purple text-white rounded-full text-xs font-semibold">
                          Selected
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-semibold text-gray-900">{room.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Availability:</span>
                        <span className="font-semibold text-green-600">
                          {room.capacity - room.currentOccupancy} spot(s) available
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-600 mb-2">Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity, idx) => (
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
              {availableRooms.length === 0 && (
                <p className="text-gray-500 text-center py-8">No available rooms at this time</p>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <div>
                {selectedRoom && (
                  <p className="text-sm text-gray-600">
                    Selected: <span className="font-semibold text-gray-900">
                      Room {selectedRoom.number} ({selectedRoom.building})
                    </span>
                  </p>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowRoomSelectionModal(false);
                    setSelectedRoom(null);
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRoomChange}
                  disabled={!selectedRoom}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    selectedRoom
                      ? 'bg-authority-purple text-white hover:bg-opacity-90'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Request Room Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

