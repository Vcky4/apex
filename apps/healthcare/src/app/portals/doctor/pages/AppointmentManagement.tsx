import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

export default function AppointmentManagement() {
  const { toasts, showToast, removeToast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>({});

  const appointments = [
    { id: 1, patient: 'John Doe', time: '09:00 AM', type: 'Follow-up', duration: '30 min' },
    { id: 2, patient: 'Jane Smith', time: '10:30 AM', type: 'Consultation', duration: '45 min' },
    { id: 3, patient: 'Bob Johnson', time: '02:00 PM', type: 'Check-up', duration: '30 min' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Appointment Management</h1>
        <p className="text-gray-600 mt-2">Personal schedule management, procedure scheduling, on-call calendar, leave and availability management</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <div className="flex space-x-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <Button onClick={() => showToast('Opening schedule settings...', 'info')}>Manage Availability</Button>
            <Button onClick={() => {
              setAppointmentData({ date: selectedDate });
              setShowAppointmentModal(true);
            }}>New Appointment</Button>
          </div>
        </div>
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">{apt.patient}</div>
                  <div className="text-sm text-gray-600 mt-1">{apt.type} • {apt.duration}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{apt.time}</div>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => showToast(`Rescheduling appointment with ${apt.patient}...`, 'info')}>Reschedule</Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      if (confirm(`Cancel appointment with ${apt.patient}?`)) {
                        showToast(`Appointment with ${apt.patient} cancelled`, 'success');
                      }
                    }}>Cancel</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">On-Call Calendar</h3>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="font-medium text-blue-900">Next On-Call</div>
            <div className="text-sm text-blue-800 mt-2">January 25, 2025 - 7:00 PM to 7:00 AM</div>
            <Button size="sm" className="mt-3" variant="outline" onClick={() => showToast('Opening on-call schedule...', 'info')}>View Schedule</Button>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Leave & Availability</h3>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="font-medium text-green-900">Availability Status</div>
            <div className="text-sm text-green-800 mt-2">Available for appointments</div>
            <Button size="sm" className="mt-3" variant="outline" onClick={() => showToast('Opening availability management...', 'info')}>Manage</Button>
          </div>
        </Card>
      </div>
      {/* Schedule Appointment Modal */}
      <Modal
        isOpen={showAppointmentModal}
        onClose={() => {
          setShowAppointmentModal(false);
          setAppointmentData({});
        }}
        title="Schedule New Appointment"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowAppointmentModal(false);
              setAppointmentData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              if (!appointmentData.patient || !appointmentData.type || !appointmentData.time) {
                showToast('Please fill required fields', 'error');
                return;
              }
              showToast(`Appointment scheduled for ${appointmentData.patient} on ${appointmentData.date}`, 'success');
              setShowAppointmentModal(false);
              setAppointmentData({});
            }}>Schedule</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={appointmentData.patient || ''}
              onChange={(e) => setAppointmentData({ ...appointmentData, patient: e.target.value })}
              placeholder="Enter patient name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={appointmentData.date || ''}
                onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={appointmentData.time || ''}
                onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type *</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={appointmentData.type || ''}
              onChange={(e) => setAppointmentData({ ...appointmentData, type: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Check-up">Check-up</option>
              <option value="Procedure">Procedure</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={appointmentData.duration || '30 min'}
              onChange={(e) => setAppointmentData({ ...appointmentData, duration: e.target.value })}
            >
              <option value="15 min">15 min</option>
              <option value="30 min">30 min</option>
              <option value="45 min">45 min</option>
              <option value="60 min">1 hour</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={3}
              value={appointmentData.notes || ''}
              onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
              placeholder="Additional notes..."
            />
          </div>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

