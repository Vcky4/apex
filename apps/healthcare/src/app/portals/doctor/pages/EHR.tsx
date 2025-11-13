import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

export default function EHR() {
  const { toasts, showToast, removeToast } = useToast();
  const { patientId } = useParams();
  const [selectedPatient] = useState(patientId || '1');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const patients = [
    { id: '1', name: 'John Doe', dob: '1980-05-15', mrn: 'MRN-001', lastVisit: '2025-01-18' },
    { id: '2', name: 'Jane Smith', dob: '1975-08-22', mrn: 'MRN-002', lastVisit: '2025-01-17' },
  ];

  const patient = patients.find(p => p.id === selectedPatient) || patients[0];

  const medicalHistory = [
    { date: '2025-01-18', type: 'Visit', diagnosis: 'Hypertension', provider: 'Dr. Sarah Johnson' },
    { date: '2025-01-10', type: 'Lab Test', diagnosis: 'Blood Work - Normal', provider: 'Lab' },
    { date: '2024-12-15', type: 'Visit', diagnosis: 'Annual Check-up', provider: 'Dr. Sarah Johnson' },
  ];

  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2025-01-01' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2024-12-01' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Electronic Health Records</h1>
        <p className="text-gray-600 mt-2">Comprehensive patient medical history, clinical notes, treatment plan management, progress tracking</p>
      </div>

      {/* Patient Info */}
      <Card>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <div>DOB: {patient.dob} | MRN: {patient.mrn}</div>
              <div>Last Visit: {patient.lastVisit}</div>
            </div>
          </div>
          <Button onClick={() => {
            setFormData({ patient: patient.name, date: new Date().toISOString().split('T')[0], note: '' });
            setShowNoteModal(true);
          }}>Add Clinical Note</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medical History */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Medical History</h3>
          <div className="space-y-3">
            {medicalHistory.map((entry, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{entry.type}</div>
                    <div className="text-sm text-gray-600 mt-1">{entry.diagnosis}</div>
                    <div className="text-xs text-gray-500 mt-1">{entry.provider}</div>
                  </div>
                  <div className="text-xs text-gray-500">{entry.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Current Medications */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Current Medications</h3>
          <div className="space-y-3">
            {medications.map((med, idx) => (
              <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium">{med.name}</div>
                <div className="text-sm text-gray-600 mt-1">{med.dosage} - {med.frequency}</div>
                <div className="text-xs text-gray-500 mt-1">Started: {med.startDate}</div>
              </div>
            ))}
          </div>
          <Button size="sm" className="mt-4" variant="outline" onClick={() => showToast('Opening prescription management...', 'info')}>
            Manage Medications
          </Button>
        </Card>
      </div>

      {/* Clinical Notes */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Clinical Notes & Observations</h3>
          <Button size="sm" onClick={() => {
            setFormData({ patient: patient.name, date: new Date().toISOString().split('T')[0], note: '' });
            setShowNoteModal(true);
          }}>Add Note</Button>
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">Visit Note - {patient.lastVisit}</div>
              <div className="text-xs text-gray-500">Dr. Sarah Johnson</div>
            </div>
            <p className="text-sm text-gray-700">
              Patient presents with controlled hypertension. Blood pressure readings stable. 
              Continue current medication regimen. Follow-up in 3 months.
            </p>
          </div>
        </div>
      </Card>

      {/* Treatment Plan */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Treatment Plan</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="font-medium text-blue-900">Active Plan</div>
            <div className="text-sm text-blue-800 mt-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Continue Lisinopril 10mg daily</li>
                <li>Monitor blood pressure weekly</li>
                <li>Follow-up appointment scheduled for April 2025</li>
                <li>Lifestyle modifications: Diet and exercise</li>
              </ul>
            </div>
          </div>
        </div>
        <Button size="sm" className="mt-4" onClick={() => {
          setFormData({ plan: 'Continue Lisinopril 10mg daily\nMonitor blood pressure weekly\nFollow-up appointment scheduled\nLifestyle modifications: Diet and exercise' });
          setShowPlanModal(true);
        }}>
          Update Treatment Plan
        </Button>
      </Card>

      {/* Add Clinical Note Modal */}
      <Modal
        isOpen={showNoteModal}
        onClose={() => {
          setShowNoteModal(false);
          setFormData({});
        }}
        title="Add Clinical Note"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowNoteModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              if (!formData.note) {
                showToast('Please enter a note', 'error');
                return;
              }
              showToast('Clinical note added successfully', 'success');
              setShowNoteModal(false);
              setFormData({});
            }}>Save Note</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
            <input
              type="text"
              value={formData.patient || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Note *</label>
            <textarea
              required
              value={formData.note || ''}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={8}
              placeholder="Enter clinical notes, observations, and findings..."
            />
          </div>
        </div>
      </Modal>

      {/* Update Treatment Plan Modal */}
      <Modal
        isOpen={showPlanModal}
        onClose={() => {
          setShowPlanModal(false);
          setFormData({});
        }}
        title="Update Treatment Plan"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowPlanModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              if (!formData.plan) {
                showToast('Please enter treatment plan details', 'error');
                return;
              }
              showToast('Treatment plan updated successfully', 'success');
              setShowPlanModal(false);
              setFormData({});
            }}>Save Plan</Button>
          </div>
        }
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Plan *</label>
          <textarea
            required
            value={formData.plan || ''}
            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows={8}
            placeholder="Enter treatment plan details..."
          />
        </div>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

