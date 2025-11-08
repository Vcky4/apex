import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface Shift {
  id: number;
  staff: string;
  role: string;
  shift: string;
  date: string;
  status: 'Scheduled' | 'On-Call' | 'Pending';
  unit?: string;
}

interface LeaveRequest {
  id: number;
  staff: string;
  type: string;
  start: string;
  end: string;
  status: 'Pending' | 'Approved' | 'Denied';
  reason?: string;
}

interface StaffingGap {
  unit: string;
  date: string;
  shift: string;
  needed: number;
  current: number;
  gap: number;
}

export default function StaffScheduling() {
  const { toasts, showToast, removeToast } = useToast();
  const [selectedView, setSelectedView] = useState<'calendar' | 'shifts' | 'requests'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [shifts, setShifts] = useState<Shift[]>([
    { id: 1, staff: 'Dr. Sarah Johnson', role: 'Physician', shift: 'Day (7am-7pm)', date: '2025-01-20', status: 'Scheduled', unit: 'Cardiology' },
    { id: 2, staff: 'Nurse Patricia Brown', role: 'RN', shift: 'Night (7pm-7am)', date: '2025-01-20', status: 'Scheduled', unit: 'ICU' },
    { id: 3, staff: 'Dr. Michael Chen', role: 'Physician', shift: 'On-Call', date: '2025-01-20', status: 'On-Call', unit: 'Emergency' },
    { id: 4, staff: 'Nurse Robert Taylor', role: 'RN', shift: 'Day (7am-7pm)', date: '2025-01-21', status: 'Pending', unit: 'Emergency' },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 1, staff: 'Dr. Emily Rodriguez', type: 'Vacation', start: '2025-02-01', end: '2025-02-05', status: 'Pending', reason: 'Family vacation' },
    { id: 2, staff: 'Nurse Lisa Anderson', type: 'Sick Leave', start: '2025-01-22', end: '2025-01-23', status: 'Approved' },
  ]);

  const [staffingGaps] = useState<StaffingGap[]>([
    { unit: 'ICU', date: '2025-01-22', shift: 'Night', needed: 2, current: 1, gap: 1 },
    { unit: 'Emergency', date: '2025-01-23', shift: 'Day', needed: 3, current: 2, gap: 1 },
  ]);

  const [showShiftModal, setShowShiftModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [reviewingRequest, setReviewingRequest] = useState<LeaveRequest | null>(null);
  const [formData, setFormData] = useState<Partial<Shift & { staffCount?: number; dueDate?: string }>>({});

  const availableStaff = [
    'Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez', 'Dr. James Wilson',
    'Nurse Patricia Brown', 'Nurse Robert Taylor', 'Nurse Lisa Anderson', 'Nurse John Smith'
  ];

  const handleAssignShift = () => {
    setEditingShift(null);
    setFormData({ date: selectedDate });
    setShowShiftModal(true);
  };

  const handleEditShift = (shift: Shift) => {
    setEditingShift(shift);
    setFormData(shift);
    setShowShiftModal(true);
  };

  const handleSaveShift = (e: React.FormEvent) => {
    e.preventDefault();
    const { staff, role, shift, date, status, unit } = formData;
    
    if (!staff || !role || !shift || !date) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    if (editingShift) {
      setShifts(shifts.map(s => s.id === editingShift.id ? { 
        id: editingShift.id,
        staff,
        role,
        shift,
        date,
        status: status || 'Scheduled',
        unit,
      } : s));
      showToast('Shift updated successfully', 'success');
    } else {
      const newShift: Shift = {
        id: Date.now(),
        staff,
        role,
        shift,
        date,
        status: 'Scheduled',
        unit,
      };
      setShifts([...shifts, newShift]);
      showToast(`Shift assigned to ${staff} on ${date}`, 'success');
    }
    setShowShiftModal(false);
    setFormData({});
  };

  const handleRemoveShift = (shift: Shift) => {
    if (confirm(`Remove shift assignment for ${shift.staff} on ${shift.date}?`)) {
      setShifts(shifts.filter(s => s.id !== shift.id));
      showToast('Shift removed successfully', 'success');
    }
  };

  const handleApproveLeave = (request: LeaveRequest) => {
    setLeaveRequests(leaveRequests.map(r => 
      r.id === request.id ? { ...r, status: 'Approved' } : r
    ));
    showToast(`Leave request approved for ${request.staff}`, 'success');
    
    // Check if this creates a staffing gap
    const affectedShifts = shifts.filter(s => 
      s.staff === request.staff && 
      s.date >= request.start && 
      s.date <= request.end
    );
    
    if (affectedShifts.length > 0) {
      showToast(`Warning: ${affectedShifts.length} shift(s) need coverage due to approved leave`, 'warning');
    }
  };

  const handleDenyLeave = (request: LeaveRequest, reason: string) => {
    setLeaveRequests(leaveRequests.map(r => 
      r.id === request.id ? { ...r, status: 'Denied' } : r
    ));
    showToast(`Leave request denied for ${request.staff}. Reason: ${reason}`, 'warning');
  };

  const handleReviewLeave = (request: LeaveRequest) => {
    setReviewingRequest(request);
    setShowLeaveModal(true);
  };

  const handleGenerateSchedule = () => {
    showToast('Generating optimized schedule...', 'info');
    setTimeout(() => {
      // Simulate schedule generation
      const newShifts: Shift[] = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Add sample shifts
        newShifts.push({
          id: Date.now() + i * 10,
          staff: availableStaff[i % availableStaff.length],
          role: i % 2 === 0 ? 'Physician' : 'RN',
          shift: i % 2 === 0 ? 'Day (7am-7pm)' : 'Night (7pm-7am)',
          date: dateStr,
          status: 'Scheduled',
          unit: ['ICU', 'Emergency', 'Cardiology', 'Pediatrics'][i % 4],
        });
      }
      setShifts([...shifts, ...newShifts]);
      showToast('Schedule generated successfully for next 7 days', 'success');
    }, 1500);
  };

  const handleFillGap = (gap: StaffingGap) => {
    setShowShiftModal(true);
    setFormData({
      date: gap.date,
      shift: gap.shift,
      unit: gap.unit,
      role: 'RN',
    });
    showToast(`Opening shift assignment form to fill gap in ${gap.unit}`, 'info');
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Staff Scheduling & Rotation</h1>
        <p className="text-gray-600 mt-2">Shift pattern optimization, on-call schedule management, vacation coordination</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedView('calendar')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'calendar'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Schedule Calendar
          </button>
          <button
            onClick={() => setSelectedView('shifts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'shifts'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Shift Assignments ({shifts.length})
          </button>
          <button
            onClick={() => setSelectedView('requests')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedView === 'requests'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Leave Requests ({leaveRequests.filter(r => r.status === 'Pending').length})
          </button>
        </nav>
      </div>

      {/* Staffing Gaps Alert */}
      {staffingGaps.length > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-orange-900">⚠️ Staffing Gaps Detected</h3>
              <p className="text-sm text-orange-700 mt-1">{staffingGaps.length} shift(s) need coverage</p>
              <div className="mt-2 space-y-1">
                {staffingGaps.map((gap, idx) => (
                  <div key={idx} className="text-xs text-orange-800">
                    {gap.unit} - {gap.date} ({gap.shift}): Need {gap.gap} more staff
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" onClick={() => {
                if (staffingGaps.length > 0) {
                  handleFillGap(staffingGaps[0]);
                }
              }}>Fill Gaps</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Calendar View */}
      {selectedView === 'calendar' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Schedule Calendar</h2>
            <div className="flex space-x-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <Button onClick={handleGenerateSchedule}>Generate Schedule</Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-700 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 28 }).map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              const dateStr = date.toISOString().split('T')[0];
              const dayShifts = shifts.filter(s => s.date === dateStr);
              
              return (
                <div 
                  key={i} 
                  className="border border-gray-200 rounded-lg p-2 min-h-[100px] hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedDate(dateStr);
                    setSelectedView('shifts');
                  }}
                >
                  <div className="text-sm font-medium text-gray-700">{i + 1}</div>
                  {dayShifts.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {dayShifts.slice(0, 2).map((shift, idx) => (
                        <div key={idx} className={`text-xs p-1 rounded ${
                          shift.status === 'Scheduled' ? 'bg-green-100 text-green-800' :
                          shift.status === 'On-Call' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {shift.staff.split(' ').pop()}
                        </div>
                      ))}
                      {dayShifts.length > 2 && (
                        <div className="text-xs text-gray-500">+{dayShifts.length - 2} more</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Shifts View */}
      {selectedView === 'shifts' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shift Assignments</h2>
            <Button onClick={handleAssignShift}>Assign Shift</Button>
          </div>
          <div className="mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Filter by date"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shifts
                  .filter(s => !selectedDate || s.date === selectedDate)
                  .map((shift) => (
                  <tr key={shift.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{shift.staff}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shift.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shift.shift}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shift.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shift.unit || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        shift.status === 'Scheduled' ? 'bg-green-100 text-green-800' :
                        shift.status === 'On-Call' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {shift.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleEditShift(shift)} className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button onClick={() => handleRemoveShift(shift)} className="text-red-600 hover:text-red-900">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Leave Requests View */}
      {selectedView === 'requests' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Leave & Vacation Requests</h2>
            <Button onClick={() => {
              const pending = leaveRequests.filter(r => r.status === 'Pending').length;
              showToast(`Viewing ${pending} pending leave requests`, 'info');
            }}>View All</Button>
          </div>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.staff}</h3>
                    <p className="text-sm text-gray-600 mt-1">{request.type}</p>
                    <p className="text-xs text-gray-500 mt-1">{request.start} to {request.end}</p>
                    {request.reason && (
                      <p className="text-xs text-gray-500 mt-1">Reason: {request.reason}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Denied' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                    {request.status === 'Pending' && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleReviewLeave(request)}>Review</Button>
                        <Button size="sm" onClick={() => handleApproveLeave(request)}>Approve</Button>
                        <Button size="sm" variant="danger" onClick={() => {
                          const reason = prompt('Reason for denial:');
                          if (reason) {
                            handleDenyLeave(request, reason);
                          }
                        }}>Deny</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Overtime Analysis */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Overtime & Staffing Gap Analysis</h2>
        <DashboardGrid columns={3}>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">142 hrs</div>
            <p className="text-sm text-gray-600 mt-1">This Week</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{staffingGaps.length}</div>
            <p className="text-sm text-gray-600 mt-1">Open Shifts</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">96%</div>
            <p className="text-sm text-gray-600 mt-1">Coverage Rate</p>
          </div>
        </DashboardGrid>
      </Card>

      {/* Assign/Edit Shift Modal */}
      <Modal
        isOpen={showShiftModal}
        onClose={() => {
          setShowShiftModal(false);
          setFormData({});
          setEditingShift(null);
        }}
        title={editingShift ? 'Edit Shift Assignment' : 'Assign Shift'}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowShiftModal(false);
              setFormData({});
              setEditingShift(null);
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Save</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveShift} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member *</label>
            <select
              required
              value={formData.staff || ''}
              onChange={(e) => setFormData({ ...formData, staff: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Staff</option>
              {availableStaff.map(staff => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
            <select
              required
              value={formData.role || ''}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Role</option>
              <option value="Physician">Physician</option>
              <option value="RN">Registered Nurse</option>
              <option value="LPN">Licensed Practical Nurse</option>
              <option value="NP">Nurse Practitioner</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shift Type *</label>
            <select
              required
              value={formData.shift || ''}
              onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Shift</option>
              <option value="Day (7am-7pm)">Day (7am-7pm)</option>
              <option value="Night (7pm-7am)">Night (7pm-7am)</option>
              <option value="On-Call">On-Call</option>
              <option value="Weekend">Weekend</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="date"
              required
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select
              value={formData.unit || ''}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Unit</option>
              <option value="ICU">ICU</option>
              <option value="Emergency">Emergency</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Surgery">Surgery</option>
              <option value="General">General</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Review Leave Request Modal */}
      <Modal
        isOpen={showLeaveModal}
        onClose={() => {
          setShowLeaveModal(false);
          setReviewingRequest(null);
        }}
        title="Review Leave Request"
        size="lg"
        footer={
          reviewingRequest && reviewingRequest.status === 'Pending' && (
            <div className="flex justify-between">
              <Button
                variant="danger"
                onClick={() => {
                  const reason = prompt('Reason for denial:');
                  if (reason) {
                    handleDenyLeave(reviewingRequest, reason);
                    setShowLeaveModal(false);
                  }
                }}
              >
                Deny
              </Button>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => {
                  setShowLeaveModal(false);
                  setReviewingRequest(null);
                }}>Cancel</Button>
                <Button onClick={() => {
                  handleApproveLeave(reviewingRequest);
                  setShowLeaveModal(false);
                }}>Approve</Button>
              </div>
            </div>
          )
        }
      >
        {reviewingRequest && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">Staff Member</h4>
              <p className="text-gray-600">{reviewingRequest.staff}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Leave Type</h4>
              <p className="text-gray-600">{reviewingRequest.type}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Dates</h4>
              <p className="text-gray-600">{reviewingRequest.start} to {reviewingRequest.end}</p>
              <p className="text-xs text-gray-500 mt-1">
                Duration: {Math.ceil((new Date(reviewingRequest.end).getTime() - new Date(reviewingRequest.start).getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
            </div>
            {reviewingRequest.reason && (
              <div>
                <h4 className="font-semibold text-gray-900">Reason</h4>
                <p className="text-gray-600">{reviewingRequest.reason}</p>
              </div>
            )}
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-semibold mb-2">Impact Analysis:</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Check for overlapping shifts</li>
                <li>• Verify coverage availability</li>
                <li>• Review department workload</li>
                <li>• Consider patient care continuity</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
