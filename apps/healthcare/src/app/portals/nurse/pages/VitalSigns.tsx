import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface VitalSign {
  id: number;
  patient: string;
  time: string;
  temperature?: string;
  bloodPressure?: string;
  heartRate?: string;
  respiratoryRate?: string;
  oxygenSaturation?: string;
  notes?: string;
}

export default function VitalSigns() {
  const { toasts, showToast, removeToast } = useToast();
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
    { id: 1, patient: 'John Doe', time: '08:00', temperature: '98.6°F', bloodPressure: '130/85', heartRate: '72 bpm', respiratoryRate: '16/min', oxygenSaturation: '98%' },
    { id: 2, patient: 'Jane Smith', time: '08:15', temperature: '99.2°F', bloodPressure: '125/80', heartRate: '68 bpm', respiratoryRate: '18/min', oxygenSaturation: '99%' },
  ]);

  const [showVitalModal, setShowVitalModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleRecordVitals = () => {
    setFormData({
      time: new Date().toTimeString().slice(0, 5),
      patient: '',
    });
    setShowVitalModal(true);
  };

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    const { patient, temperature, bloodPressure, heartRate, respiratoryRate, oxygenSaturation, notes } = formData;
    
    if (!patient) {
      showToast('Please select a patient', 'error');
      return;
    }

    const newVital: VitalSign = {
      id: Date.now(),
      patient,
      time: formData.time || new Date().toTimeString().slice(0, 5),
      temperature,
      bloodPressure,
      heartRate,
      respiratoryRate,
      oxygenSaturation,
      notes,
    };

    setVitalSigns([...vitalSigns, newVital]);
    
    // Check for critical values
    if (bloodPressure && (parseInt(bloodPressure.split('/')[0]) > 180 || parseInt(bloodPressure.split('/')[0]) < 90)) {
      showToast(`⚠️ Critical blood pressure reading for ${patient}!`, 'warning');
    }
    if (heartRate && (parseInt(heartRate) > 120 || parseInt(heartRate) < 50)) {
      showToast(`⚠️ Critical heart rate for ${patient}!`, 'warning');
    }
    if (oxygenSaturation && parseInt(oxygenSaturation) < 95) {
      showToast(`⚠️ Low oxygen saturation for ${patient}!`, 'warning');
    } else {
      showToast(`Vital signs recorded for ${patient}`, 'success');
    }

    setShowVitalModal(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Vital Signs & Monitoring</h1>
        <p className="text-gray-600 mt-2">Regular vital sign recording, trend analysis and alerts, monitoring device integration, critical value reporting</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Vital Signs</h2>
          <Button onClick={handleRecordVitals}>Record Vital Signs</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Temp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">HR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">RR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SpO2</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vitalSigns.map((vital) => (
                <tr key={vital.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{vital.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vital.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vital.temperature || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vital.bloodPressure || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vital.heartRate || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vital.respiratoryRate || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vital.oxygenSaturation || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => showToast(`Viewing trend analysis for ${vital.patient}...`, 'info')} className="text-blue-600 hover:text-blue-900">View Trends</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Record Vital Signs Modal */}
      <Modal
        isOpen={showVitalModal}
        onClose={() => {
          setShowVitalModal(false);
          setFormData({});
        }}
        title="Record Vital Signs"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowVitalModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Save Vital Signs</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveVitals} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
            <select
              required
              value={formData.patient || ''}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select Patient</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Bob Johnson">Bob Johnson</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°F)</label>
              <input
                type="text"
                value={formData.temperature || ''}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="98.6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
              <input
                type="text"
                value={formData.bloodPressure || ''}
                onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate (bpm)</label>
              <input
                type="text"
                value={formData.heartRate || ''}
                onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="72"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Respiratory Rate</label>
              <input
                type="text"
                value={formData.respiratoryRate || ''}
                onChange={(e) => setFormData({ ...formData, respiratoryRate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="16/min"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Oxygen Saturation (%)</label>
              <input
                type="text"
                value={formData.oxygenSaturation || ''}
                onChange={(e) => setFormData({ ...formData, oxygenSaturation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="98"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={formData.time || ''}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={2}
              placeholder="Any observations..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
