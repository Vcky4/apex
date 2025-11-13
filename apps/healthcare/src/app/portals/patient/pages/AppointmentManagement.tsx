import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../shared/Modal';
import { useToast, ToastContainer } from '../../shared/Toast';

interface Appointment {
  id: number;
  provider: string;
  specialty: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Telemedicine';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  reason?: string;
}

export default function AppointmentManagement() {
  const { toasts, showToast, removeToast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, provider: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2025-01-25', time: '10:00 AM', type: 'In-Person', status: 'Scheduled', reason: 'Follow-up' },
    { id: 2, provider: 'Dr. Michael Chen', specialty: 'Primary Care', date: '2025-02-01', time: '02:30 PM', type: 'Telemedicine', status: 'Scheduled', reason: 'Consultation' },
    { id: 3, provider: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', date: '2025-01-15', time: '09:00 AM', type: 'In-Person', status: 'Completed', reason: 'Check-up' },
  ]);

  const [showBookModal, setShowBookModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleBookAppointment = () => {
    setFormData({
      date: '',
      time: '',
      type: 'In-Person',
    });
    setShowBookModal(true);
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const { provider, specialty, date, time, type, reason } = formData;
    
    if (!provider || !date || !time) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now(),
      provider,
      specialty,
      date,
      time,
      type: type || 'In-Person',
      status: 'Scheduled',
      reason,
    };

    setAppointments([...appointments, newAppointment]);
    showToast(`Appointment scheduled with ${provider} on ${date} at ${time}`, 'success');
    setShowBookModal(false);
    setFormData({});
  };

  const handleCancelAppointment = (appointment: Appointment) => {
    if (confirm(`Cancel appointment with ${appointment.provider} on ${appointment.date}?`)) {
      setAppointments(appointments.map(a => 
        a.id === appointment.id ? { ...a, status: 'Cancelled' } : a
      ));
      showToast('Appointment cancelled successfully', 'success');
    }
  };

  const handleReschedule = (appointment: Appointment) => {
    setFormData({
      provider: appointment.provider,
      specialty: appointment.specialty,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      reason: appointment.reason,
      rescheduling: true,
      originalId: appointment.id,
    });
    setShowBookModal(true);
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Appointment Management</h1>
        <p className="text-gray-600 mt-2">Schedule new appointments, view upcoming visits, reschedule or cancel, telemedicine options</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Appointments</h2>
          <Button onClick={handleBookAppointment}>Book Appointment</Button>
        </div>
        <div className="space-y-4">
          {appointments.filter(a => a.status === 'Scheduled').map((apt) => (
            <div key={apt.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">{apt.provider}</div>
                  <div className="text-sm text-gray-600 mt-1">{apt.specialty}</div>
                  <div className="text-sm text-gray-700 mt-2">{apt.date} at {apt.time}</div>
                  <div className="text-xs text-gray-500 mt-1">{apt.type} • {apt.reason}</div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleReschedule(apt)}>Reschedule</Button>
                  <Button size="sm" variant="outline" onClick={() => handleCancelAppointment(apt)}>Cancel</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Book Appointment Modal */}
      <Modal
        isOpen={showBookModal}
        onClose={() => {
          setShowBookModal(false);
          setFormData({});
        }}
        title={formData.rescheduling ? 'Reschedule Appointment' : 'Book New Appointment'}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowBookModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>{formData.rescheduling ? 'Reschedule' : 'Book Appointment'}</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveAppointment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provider *</label>
            <select
              required
              value={formData.provider || ''}
              onChange={(e) => {
                const provider = e.target.value;
                const specialty = provider.includes('Sarah') ? 'Cardiology' : provider.includes('Michael') ? 'Primary Care' : 'Pediatrics';
                setFormData({ ...formData, provider, specialty });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Provider</option>
              <option value="Dr. Sarah Johnson">Dr. Sarah Johnson - Cardiology</option>
              <option value="Dr. Michael Chen">Dr. Michael Chen - Primary Care</option>
              <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez - Pediatrics</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                required
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
              <input
                type="time"
                required
                value={formData.time || ''}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type *</label>
            <select
              required
              value={formData.type || ''}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="In-Person">In-Person</option>
              <option value="Telemedicine">Telemedicine</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
            <input
              type="text"
              value={formData.reason || ''}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Follow-up, Consultation, Check-up, etc."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
