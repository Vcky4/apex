import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../shared/Modal';
import { useToast, ToastContainer } from '../../shared/Toast';

interface HandoverReport {
  id: number;
  shift: 'Day' | 'Night';
  date: string;
  patients: number;
  criticalIssues: string[];
  tasks: string[];
  status: 'Draft' | 'Completed';
}

export default function ShiftManagement() {
  const { toasts, showToast, removeToast } = useToast();
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const [handoverReports, setHandoverReports] = useState<HandoverReport[]>([
    {
      id: 1,
      shift: 'Day',
      date: '2025-01-20',
      patients: 8,
      criticalIssues: ['Patient in Room 201 requires frequent monitoring'],
      tasks: ['Medication due at 2 PM', 'Wound dressing change'],
      status: 'Completed',
    },
  ]);

  const handleCreateHandover = () => {
    setFormData({
      shift: 'Day',
      date: new Date().toISOString().split('T')[0],
      criticalIssues: [],
      tasks: [],
    });
    setShowHandoverModal(true);
  };

  const handleSaveHandover = (e: React.FormEvent) => {
    e.preventDefault();
    const { shift, date, patients, criticalIssues, tasks } = formData;
    
    if (!shift || !date) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newReport: HandoverReport = {
      id: Date.now(),
      shift,
      date,
      patients: parseInt(patients) || 0,
      criticalIssues: Array.isArray(criticalIssues) ? criticalIssues : criticalIssues.split(',').map((i: string) => i.trim()).filter(Boolean),
      tasks: Array.isArray(tasks) ? tasks : tasks.split(',').map((t: string) => t.trim()).filter(Boolean),
      status: 'Draft',
    };

    setHandoverReports([...handoverReports, newReport]);
    showToast('Handover report created successfully', 'success');
    setShowHandoverModal(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Shift Management</h1>
        <p className="text-gray-600 mt-2">Handover report generation, task assignment coordination, break schedule management, incident reporting</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Handover Reports</h2>
          <Button onClick={handleCreateHandover}>Create Handover Report</Button>
        </div>
        <div className="space-y-4">
          {handoverReports.map((report) => (
            <div key={report.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">{report.shift} Shift - {report.date}</div>
                  <div className="text-sm text-gray-600 mt-1">Patients: {report.patients}</div>
                  {report.criticalIssues.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm font-medium text-red-700">Critical Issues:</div>
                      <ul className="text-sm text-red-600 mt-1 list-disc list-inside">
                        {report.criticalIssues.map((issue, idx) => (
                          <li key={idx}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {report.tasks.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm font-medium text-gray-700">Tasks:</div>
                      <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                        {report.tasks.map((task, idx) => (
                          <li key={idx}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  report.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Break Schedule</h3>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900">Morning Break</div>
              <div className="text-sm text-blue-800">10:00 AM - 10:15 AM</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900">Lunch Break</div>
              <div className="text-sm text-green-800">12:30 PM - 1:00 PM</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium text-purple-900">Afternoon Break</div>
              <div className="text-sm text-purple-800">3:00 PM - 3:15 PM</div>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Incident Reporting</h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-4">Report any incidents or safety concerns</p>
            <Button onClick={() => showToast('Opening incident report form...', 'info')}>Report Incident</Button>
          </div>
        </Card>
      </div>

      {/* Handover Report Modal */}
      <Modal
        isOpen={showHandoverModal}
        onClose={() => {
          setShowHandoverModal(false);
          setFormData({});
        }}
        title="Create Handover Report"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowHandoverModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Save Report</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveHandover} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shift *</label>
              <select
                required
                value={formData.shift || ''}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Select Shift</option>
                <option value="Day">Day Shift</option>
                <option value="Night">Night Shift</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                required
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Patients</label>
            <input
              type="number"
              value={formData.patients || ''}
              onChange={(e) => setFormData({ ...formData, patients: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="8"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Critical Issues (comma-separated)</label>
            <textarea
              value={Array.isArray(formData.criticalIssues) ? formData.criticalIssues.join(', ') : formData.criticalIssues || ''}
              onChange={(e) => setFormData({ ...formData, criticalIssues: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={3}
              placeholder="Patient in Room 201 requires frequent monitoring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tasks for Next Shift (comma-separated)</label>
            <textarea
              value={Array.isArray(formData.tasks) ? formData.tasks.join(', ') : formData.tasks || ''}
              onChange={(e) => setFormData({ ...formData, tasks: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={3}
              placeholder="Medication due at 2 PM, Wound dressing change"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
