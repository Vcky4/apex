import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

export default function AppointmentBooking() {
  const { toasts, showToast, removeToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [patientFormData, setPatientFormData] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', department: 'Cardiology' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'General Practice', department: 'Primary Care' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', department: 'Pediatrics' },
  ];

  const [patients, setPatients] = useState([
    { id: 1, name: 'John Doe', dob: '1980-05-15', gender: 'Male', phone: '555-0101' },
    { id: 2, name: 'Jane Smith', dob: '1975-08-22', gender: 'Female', phone: '555-0102' },
    { id: 3, name: 'Bob Johnson', dob: '1985-03-10', gender: 'Male', phone: '555-0103' },
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', date: '2025-01-25', time: '09:00', type: 'Consultation', status: 'Scheduled' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Chen', date: '2025-01-25', time: '10:30', type: 'Check-up', status: 'Checked In' },
  ]);

  const filteredAppointments = appointments.filter(apt => 
    apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient = {
      id: patients.length + 1,
      name: patientFormData.name,
      dob: patientFormData.dob,
      gender: patientFormData.gender,
      phone: patientFormData.phone
    };
    setPatients([...patients, newPatient]);
    showToast(`Patient ${newPatient.name} registered successfully`, 'success');
    setShowRegisterModal(false);
    setPatientFormData({});
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt = {
      id: appointments.length + 1,
      patient: formData.patientName,
      doctor: doctors.find(d => d.id.toString() === formData.doctorId)?.name || 'Unknown',
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: 'Scheduled'
    };
    setAppointments([...appointments, newApt]);
    showToast(`Appointment booked for ${formData.patientName}`, 'success');
    setShowModal(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Appointment Booking</h1>
        <p className="text-gray-600 mt-2">Schedule patient visits, manage front desk operations, patient check-in</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search appointments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowRegisterModal(true)}>Register Patient</Button>
            <Button onClick={() => setShowModal(true)}>Book Appointment</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 font-semibold text-gray-600">Patient Name</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Doctor</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Date & Time</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Type</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">{apt.patient}</td>
                  <td className="px-4 py-4 text-gray-600">{apt.doctor}</td>
                  <td className="px-4 py-4 text-gray-600">{apt.date} at {apt.time}</td>
                  <td className="px-4 py-4 text-gray-600">{apt.type}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      apt.status === 'Checked In' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {apt.status === 'Scheduled' && (
                      <Button size="sm" variant="outline" onClick={() => {
                        setAppointments(appointments.map(a => a.id === apt.id ? { ...a, status: 'Checked In' } : a));
                        showToast(`${apt.patient} checked in`, 'success');
                      }}>Check In</Button>
                    )}
                     {apt.status === 'Checked In' && (
                      <Button size="sm" variant="outline" onClick={() => showToast('Opening vitals entry...', 'info')}>Enter Vitals</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={showRegisterModal}
        onClose={() => { setShowRegisterModal(false); setPatientFormData({}); }}
        title="Register New Patient"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowRegisterModal(false)}>Cancel</Button>
            <Button onClick={() => {
               const form = document.getElementById('register-form') as HTMLFormElement;
               if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }}>Register Patient</Button>
          </div>
        }
      >
        <form id="register-form" onSubmit={handleRegisterPatient} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={patientFormData.name || ''}
              onChange={(e) => setPatientFormData({...patientFormData, name: e.target.value})}
              placeholder="Enter full name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={patientFormData.dob || ''}
                onChange={(e) => setPatientFormData({...patientFormData, dob: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={patientFormData.gender || ''}
                onChange={(e) => setPatientFormData({...patientFormData, gender: e.target.value})}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={patientFormData.phone || ''}
              onChange={(e) => setPatientFormData({...patientFormData, phone: e.target.value})}
              placeholder="(555) 000-0000"
            />
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setFormData({}); }}
        title="Book New Appointment"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => {
               const form = document.getElementById('booking-form') as HTMLFormElement;
               if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }}>Confirm Booking</Button>
          </div>
        }
      >
        <form id="booking-form" onSubmit={handleBookAppointment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.patientName || ''}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
            >
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.name}>{p.name} (DOB: {p.dob})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor *</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.doctorId || ''}
                onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
              >
                <option value="">Select Doctor</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name} - {d.department}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.type || ''}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Consultation">Consultation</option>
                <option value="Check-up">Check-up</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.date || ''}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
              <input
                type="time"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData.time || ''}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

