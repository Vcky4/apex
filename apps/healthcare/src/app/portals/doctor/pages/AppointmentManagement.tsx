import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';

export default function AppointmentManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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
            <Button onClick={() => alert('Opening schedule settings...')}>Manage Availability</Button>
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
                    <Button size="sm" variant="outline" onClick={() => alert('Rescheduling appointment...')}>Reschedule</Button>
                    <Button size="sm" variant="outline" onClick={() => alert('Canceling appointment...')}>Cancel</Button>
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
            <Button size="sm" className="mt-3" variant="outline" onClick={() => alert('Viewing on-call schedule...')}>View Schedule</Button>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Leave & Availability</h3>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="font-medium text-green-900">Availability Status</div>
            <div className="text-sm text-green-800 mt-2">Available for appointments</div>
            <Button size="sm" className="mt-3" variant="outline" onClick={() => alert('Managing availability...')}>Manage</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

