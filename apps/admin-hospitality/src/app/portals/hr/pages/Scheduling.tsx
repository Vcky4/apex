import React, { useState } from 'react';
import { Card, Button } from '@apex-providers/ui-components';

// Simple Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

// Notification Toast Component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'info'; onClose: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transition-opacity duration-300 ${
      type === 'success' ? 'bg-green-600' : 'bg-blue-600'
    }`}>
      {message}
    </div>
  );
};

export default function Scheduling() {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-10-15'));
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Data States
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employee: 'John Smith', dates: 'Oct 20-22', type: 'Personal', status: 'Pending', department: 'Maintenance' },
    { id: 2, employee: 'Maria Garcia', dates: 'Nov 1-5', type: 'Vacation', status: 'Approved', department: 'Housekeeping' },
    { id: 3, employee: 'David Wilson', dates: 'Oct 25', type: 'Sick Leave', status: 'Pending', department: 'F&B' },
    { id: 4, employee: 'Sarah Jones', dates: 'Nov 10-12', type: 'Training', status: 'Pending', department: 'Front Desk' },
  ]);

  const [schedule, setSchedule] = useState([
    {
      id: 1,
      employee: 'Sarah Jones',
      role: 'Front Desk Agent',
      department: 'Front Desk',
      shifts: [
        { day: 'Mon', shift: 'Morning', status: 'confirmed' },
        { day: 'Tue', shift: 'Morning', status: 'confirmed' },
        { day: 'Wed', shift: 'Off', status: 'off' },
        { day: 'Thu', shift: 'Afternoon', status: 'confirmed' },
        { day: 'Fri', shift: 'Afternoon', status: 'confirmed' },
        { day: 'Sat', shift: 'Off', status: 'off' },
        { day: 'Sun', shift: 'Morning', status: 'pending' },
      ]
    },
    {
      id: 2,
      employee: 'Mike Chen',
      role: 'Concierge',
      department: 'Front Desk',
      shifts: [
        { day: 'Mon', shift: 'Off', status: 'off' },
        { day: 'Tue', shift: 'Afternoon', status: 'confirmed' },
        { day: 'Wed', shift: 'Afternoon', status: 'confirmed' },
        { day: 'Thu', shift: 'Morning', status: 'confirmed' },
        { day: 'Fri', shift: 'Morning', status: 'confirmed' },
        { day: 'Sat', shift: 'Morning', status: 'confirmed' },
        { day: 'Sun', shift: 'Off', status: 'off' },
      ]
    },
    {
      id: 3,
      employee: 'Elena Rodriguez',
      role: 'Housekeeping Lead',
      department: 'Housekeeping',
      shifts: [
        { day: 'Mon', shift: 'Morning', status: 'confirmed' },
        { day: 'Tue', shift: 'Morning', status: 'confirmed' },
        { day: 'Wed', shift: 'Morning', status: 'confirmed' },
        { day: 'Thu', shift: 'Off', status: 'off' },
        { day: 'Fri', shift: 'Off', status: 'off' },
        { day: 'Sat', shift: 'Afternoon', status: 'confirmed' },
        { day: 'Sun', shift: 'Afternoon', status: 'confirmed' },
      ]
    },
  ]);

  const departments = ['Front Desk', 'Housekeeping', 'F&B', 'Maintenance'];
  
  const occupancyForecast = [
    { day: 'Mon', rate: '75%' },
    { day: 'Tue', rate: '68%' },
    { day: 'Wed', rate: '72%' },
    { day: 'Thu', rate: '85%' },
    { day: 'Fri', rate: '95%' },
    { day: 'Sat', rate: '98%' },
    { day: 'Sun', rate: '60%' },
  ];

  const filteredSchedule = selectedDepartment 
    ? schedule.filter(s => s.department === selectedDepartment)
    : schedule;

  const handleLeaveAction = (id: number, action: 'Approve' | 'Deny') => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: action === 'Approve' ? 'Approved' : 'Denied' } : req
    ));
    setToast({
      message: `Leave request ${action === 'Approve' ? 'approved' : 'denied'}`,
      type: 'success'
    });
  };

  const handleAutoGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setSchedule(prev => prev.map(row => ({
        ...row,
        shifts: row.shifts.map(s => ({
          ...s,
          // Randomly fill pending/off shifts for demo
          status: s.status === 'off' ? 'off' : 'pending',
          shift: s.shift === 'Off' ? 'Morning' : s.shift
        }))
      })));
      setIsGenerating(false);
      setToast({ message: 'Schedule generated based on occupancy forecast', type: 'success' });
    }, 1500);
  };

  const handlePublish = () => {
    // Convert all pending to confirmed
    setSchedule(prev => prev.map(row => ({
      ...row,
      shifts: row.shifts.map(s => ({
        ...s,
        status: s.status === 'pending' ? 'confirmed' : s.status
      }))
    })));
    setToast({ message: 'Schedule published and staff notified!', type: 'success' });
  };

  const changeWeek = (offset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (offset * 7));
    setSelectedDate(newDate);
  };

  const formatDateRange = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    return `Week of ${start.toLocaleString('default', { month: 'short' })} ${start.getDate()}, ${start.getFullYear()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'off': return 'bg-gray-50 text-gray-400 border-gray-100';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Staff Scheduling</h1>
          <p className="text-gray-600 mt-1">Roster management and shift planning</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleAutoGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Auto-Generate Schedule'}
          </Button>
          <Button onClick={handlePublish}>Publish Schedule</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar: Controls & Forecast */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Occupancy Forecast</h3>
            <div className="space-y-3">
              {occupancyForecast.map((day) => (
                <div key={day.day} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-600 w-8">{day.day}</span>
                  <div className="flex-1 mx-3 bg-gray-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        parseInt(day.rate) > 90 ? 'bg-red-500' : 
                        parseInt(day.rate) > 70 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: day.rate }}
                    ></div>
                  </div>
                  <span className="text-gray-900 font-bold text-right w-10">{day.rate}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>High occupancy (&gt;90%) requires additional on-call staff.</p>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Leave Requests</h3>
            <div className="space-y-3">
              {leaveRequests.slice(0, 2).map((req) => (
                <div key={req.id} className="p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow bg-gray-50">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm text-gray-900">{req.employee}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      req.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                      req.status === 'Denied' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{req.dates} • {req.type}</p>
                  {req.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleLeaveAction(req.id, 'Approve')}
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleLeaveAction(req.id, 'Deny')}
                        className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                      >
                        Deny
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View All {leaveRequests.length} Requests
            </button>
          </Card>
        </div>

        {/* Main Calendar View */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-bold text-charcoal-gray">{formatDateRange(selectedDate)}</h2>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => changeWeek(-1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    ←
                  </button>
                  <button 
                    onClick={() => changeWeek(1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedDepartment(null)}
                  className={`px-3 py-1 text-sm border rounded-full transition-colors ${
                    !selectedDepartment 
                      ? 'bg-charcoal-gray text-white border-charcoal-gray' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                {departments.map(dept => (
                  <button 
                    key={dept} 
                    onClick={() => setSelectedDepartment(dept === selectedDepartment ? null : dept)}
                    className={`px-3 py-1 text-sm border rounded-full transition-colors ${
                      dept === selectedDepartment 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 w-48">Employee</th>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <th key={day} className="text-center py-3 px-2 text-sm font-medium text-gray-500">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSchedule.length > 0 ? (
                    filteredSchedule.map((row, idx) => (
                      <tr key={idx} className="group hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{row.employee}</p>
                            <p className="text-xs text-gray-500">{row.role}</p>
                          </div>
                        </td>
                        {row.shifts.map((shift, sIdx) => (
                          <td key={sIdx} className="py-2 px-1 text-center">
                            <div className={`text-xs py-2 px-1 rounded border cursor-pointer transition-colors ${getStatusColor(shift.status)}`}>
                              {shift.shift === 'Off' ? 'OFF' : shift.shift.split(' ')[0]}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-500">
                        No staff scheduled for this department.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></span>
                  <span>Confirmed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-yellow-50 border border-yellow-200 rounded"></span>
                  <span>Pending Approval</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-gray-50 border border-gray-100 rounded"></span>
                  <span>Off</span>
                </div>
              </div>
              <p>Shift compliance: 100% (No break violations)</p>
            </div>
          </Card>
        </div>
      </div>

      {/* All Requests Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="All Leave Requests"
      >
        <div className="space-y-4">
          <div className="flex space-x-2 mb-4">
            <input 
              type="text" 
              placeholder="Search employee..." 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Denied</option>
            </select>
          </div>
          
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaveRequests.map((req) => (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{req.employee}</div>
                      <div className="text-sm text-gray-500">{req.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.dates}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        req.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                        req.status === 'Denied' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {req.status === 'Pending' ? (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleLeaveAction(req.id, 'Approve')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleLeaveAction(req.id, 'Deny')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Deny
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
}
