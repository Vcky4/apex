import { Card, Button } from '@apex-providers/ui-components';
import { useToast, ToastContainer } from '../../../shared/Toast';

export default function Telemedicine() {
  const { toasts, showToast, removeToast } = useToast();
  const upcomingSessions = [
    { id: 1, patient: 'John Doe', time: '10:00 AM', date: '2025-01-21', status: 'Scheduled' },
    { id: 2, patient: 'Jane Smith', time: '02:30 PM', date: '2025-01-21', status: 'Scheduled' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Telemedicine Portal</h1>
        <p className="text-gray-600 mt-2">Virtual consultation scheduling, video conferencing integration, remote patient monitoring, digital prescription writing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Upcoming Virtual Consultations</h2>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{session.patient}</div>
                    <div className="text-sm text-gray-600 mt-1">{session.date} at {session.time}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => showToast(`Starting video consultation with ${session.patient}...`, 'info')}>Start Session</Button>
                    <Button size="sm" variant="outline" onClick={() => showToast(`Viewing details for ${session.patient}...`, 'info')}>Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Remote Monitoring */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Remote Patient Monitoring</h2>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900">Active Monitoring</div>
              <div className="text-sm text-blue-800 mt-2">5 patients being monitored</div>
              <Button size="sm" className="mt-3" onClick={() => showToast('Opening monitoring dashboard...', 'info')}>View Dashboard</Button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900">Vital Signs Alerts</div>
              <div className="text-sm text-green-800 mt-2">2 alerts requiring attention</div>
              <Button size="sm" variant="outline" className="mt-3" onClick={() => showToast('Reviewing vital signs alerts...', 'info')}>Review Alerts</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Digital Prescription */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Digital Prescription Writing</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700 mb-4">Create and send prescriptions electronically to pharmacies</p>
          <Button onClick={() => showToast('Opening digital prescription writer...', 'info')}>Write Prescription</Button>
        </div>
      </Card>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

