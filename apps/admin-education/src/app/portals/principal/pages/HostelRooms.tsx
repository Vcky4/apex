import { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

interface HostelRoom {
  id: number;
  roomNumber: string;
  building: string;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  type: 'Single' | 'Double' | 'Triple' | 'Quad';
  amenities: string[];
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  gender: 'Male' | 'Female' | 'Mixed';
}

export default function HostelRooms() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<HostelRoom | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBuilding, setFilterBuilding] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [rooms, setRooms] = useState<HostelRoom[]>([
    {
      id: 1,
      roomNumber: '201',
      building: 'North Hall',
      floor: 2,
      capacity: 2,
      currentOccupancy: 2,
      type: 'Double',
      amenities: ['WiFi', 'AC', 'Private Bathroom', 'Study Desk'],
      status: 'Occupied',
      gender: 'Male',
    },
    {
      id: 2,
      roomNumber: '305',
      building: 'North Hall',
      floor: 3,
      capacity: 2,
      currentOccupancy: 1,
      type: 'Double',
      amenities: ['WiFi', 'AC', 'Private Bathroom', 'Study Desk', 'Balcony'],
      status: 'Available',
      gender: 'Female',
    },
    {
      id: 3,
      roomNumber: '412',
      building: 'South Hall',
      floor: 4,
      capacity: 1,
      currentOccupancy: 0,
      type: 'Single',
      amenities: ['WiFi', 'AC', 'Shared Bathroom', 'Study Desk'],
      status: 'Available',
      gender: 'Male',
    },
    {
      id: 4,
      roomNumber: '108',
      building: 'East Hall',
      floor: 1,
      capacity: 2,
      currentOccupancy: 0,
      type: 'Double',
      amenities: ['WiFi', 'AC', 'Private Bathroom', 'Study Desk'],
      status: 'Maintenance',
      gender: 'Female',
    },
  ]);

  const [formData, setFormData] = useState({
    roomNumber: '',
    building: '',
    floor: 1,
    capacity: 2,
    type: 'Double' as HostelRoom['type'],
    amenities: [] as string[],
    gender: 'Mixed' as HostelRoom['gender'],
    status: 'Available' as HostelRoom['status'],
  });

  const buildings = Array.from(new Set(rooms.map(r => r.building)));
  const availableSpaces = rooms.filter(r => r.status === 'Available').reduce((sum, r) => sum + (r.capacity - r.currentOccupancy), 0);
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = searchTerm === '' || 
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBuilding = filterBuilding === 'all' || room.building === filterBuilding;
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    return matchesSearch && matchesBuilding && matchesStatus;
  });

  const handleAddRoom = () => {
    if (!formData.roomNumber || !formData.building) {
      alert('Please fill in all required fields');
      return;
    }

    const newRoom: HostelRoom = {
      id: rooms.length + 1,
      roomNumber: formData.roomNumber,
      building: formData.building,
      floor: formData.floor,
      capacity: formData.capacity,
      currentOccupancy: 0,
      type: formData.type,
      amenities: formData.amenities,
      gender: formData.gender,
      status: formData.status,
    };

    setRooms([...rooms, newRoom]);
    setShowAddModal(false);
    setFormData({
      roomNumber: '',
      building: '',
      floor: 1,
      capacity: 2,
      type: 'Double',
      amenities: [],
      gender: 'Mixed',
      status: 'Available',
    });
    alert('Room added successfully!');
  };

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, this would parse CSV/Excel file
    alert('Bulk upload feature: This would parse and upload rooms from CSV/Excel file');
    setShowBulkUploadModal(false);
  };

  const handleEdit = (room: HostelRoom) => {
    setSelectedRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      building: room.building,
      floor: room.floor,
      capacity: room.capacity,
      type: room.type,
      amenities: room.amenities,
      gender: room.gender,
      status: room.status,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (selectedRoom) {
      setRooms(rooms.map(r =>
        r.id === selectedRoom.id
          ? { ...r, ...formData, currentOccupancy: r.currentOccupancy }
          : r
      ));
      setShowEditModal(false);
      setSelectedRoom(null);
      alert('Room updated successfully!');
    }
  };

  const toggleAmenity = (amenity: string) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) });
    } else {
      setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Occupied':
        return 'bg-blue-100 text-blue-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reserved':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hostel Rooms Management</h1>
          <p className="text-gray-600 mt-2">Manage hostel rooms and track available spaces</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => setShowBulkUploadModal(true)} variant="outline">
            Bulk Upload
          </Button>
          <Button onClick={() => setShowAddModal(true)} variant="primary">
            Add Room
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Total Rooms</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalRooms}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Available Spaces</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{availableSpaces}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Occupied Rooms</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{occupiedRooms}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {Math.round((occupiedRooms / totalRooms) * 100)}%
            </p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="search"
              placeholder="Search by room number or building..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
            />
            <select
              value={filterBuilding}
              onChange={(e) => setFilterBuilding(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
            >
              <option value="all">All Buildings</option>
              {buildings.map(building => (
                <option key={building} value={building}>{building}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Rooms Table */}
      <Card>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Building</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Floor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Occupancy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.roomNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.building}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Floor {room.floor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.capacity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {room.currentOccupancy}/{room.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusColor(room.status)}`}>
                        {room.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(room)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Add Room Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {showEditModal ? 'Edit Room' : 'Add New Room'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Number *</label>
                  <input
                    type="text"
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Building *</label>
                  <input
                    type="text"
                    value={formData.building}
                    onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                  <input
                    type="number"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as HostelRoom['type'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Triple">Triple</option>
                    <option value="Quad">Quad</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as HostelRoom['gender'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as HostelRoom['status'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="grid grid-cols-3 gap-2">
                  {['WiFi', 'AC', 'Private Bathroom', 'Shared Bathroom', 'Study Desk', 'Balcony', 'Window View', 'Kitchen'].map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="w-4 h-4 text-authority-purple border-gray-300 rounded focus:ring-authority-purple"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setFormData({
                    roomNumber: '',
                    building: '',
                    floor: 1,
                    capacity: 2,
                    type: 'Double',
                    amenities: [],
                    gender: 'Mixed',
                    status: 'Available',
                  });
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={showEditModal ? handleSaveEdit : handleAddRoom}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {showEditModal ? 'Save Changes' : 'Add Room'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Bulk Upload Rooms</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload CSV/Excel File</label>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleBulkUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-purple"
                />
                <p className="text-xs text-gray-500 mt-2">
                  File should contain columns: Room Number, Building, Floor, Capacity, Type, Gender, Status, Amenities
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowBulkUploadModal(false)}
                className="px-6 py-2 bg-authority-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

