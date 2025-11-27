import { Card, Button } from '@apex-providers/ui-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

export default function EHR() {
  const { toasts, showToast, removeToast } = useToast();
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(patientId || '1');

  useEffect(() => {
    if (patientId) {
      setSelectedPatient(patientId);
    }
  }, [patientId]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showLabOrderModal, setShowLabOrderModal] = useState(false);
  const [showManageMedsModal, setShowManageMedsModal] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState<any>({});
  const [labOrderData, setLabOrderData] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [currentMedications, setCurrentMedications] = useState([
    { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2025-01-01', status: 'Active' },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2024-12-01', status: 'Active' },
  ]);

  const availableMedications = [
    { name: 'Lisinopril 10mg', inStock: true },
    { name: 'Metformin 500mg', inStock: true },
    { name: 'Amoxicillin 500mg', inStock: false },
    { name: 'Atorvastatin 20mg', inStock: true },
    { name: 'Albuterol Inhaler', inStock: false },
    { name: 'Omeprazole 20mg', inStock: true },
  ];

  const [patients] = useState([
    { id: '1', name: 'John Doe', dob: '1980-05-15', mrn: 'MRN-001', lastVisit: '2025-01-18' },
    { id: '2', name: 'Jane Smith', dob: '1975-08-22', mrn: 'MRN-002', lastVisit: '2025-01-17' },
    { id: '3', name: 'Bob Johnson', dob: '1985-03-10', mrn: 'MRN-003', lastVisit: '2025-01-19' },
  ]);

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

      {/* Patient Selection */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
            <select
              value={selectedPatient}
              onChange={(e) => {
                const newPatientId = e.target.value;
                setSelectedPatient(newPatientId);
                navigate(`/doctor/patients/ehr/${newPatientId}`);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - {p.mrn}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

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
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => showToast('Opening patient chart...', 'info')}>View Full Chart</Button>
            <Button variant="outline" onClick={() => {
              setLabOrderData({ patient: patient.name, date: new Date().toISOString().split('T')[0] });
              setShowLabOrderModal(true);
            }}>Order Labs</Button>
            <Button variant="outline" onClick={() => {
              setPrescriptionData({ patient: patient.name });
              setShowPrescriptionModal(true);
            }}>Prescribe</Button>
            <Button onClick={() => {
              setFormData({ patient: patient.name, date: new Date().toISOString().split('T')[0], note: '' });
              setShowNoteModal(true);
            }}>Add Clinical Note</Button>
          </div>
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
            {currentMedications.filter(m => m.status === 'Active').map((med) => (
              <div key={med.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="font-medium">{med.name}</div>
                <div className="text-sm text-gray-600 mt-1">{med.dosage} - {med.frequency}</div>
                <div className="text-xs text-gray-500 mt-1">Started: {med.startDate}</div>
              </div>
            ))}
          </div>
          <Button size="sm" className="mt-4" variant="outline" onClick={() => setShowManageMedsModal(true)}>
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

      {/* Order Lab Test Modal */}
      <Modal
        isOpen={showLabOrderModal}
        onClose={() => {
          setShowLabOrderModal(false);
          setLabOrderData({});
        }}
        title="Order Lab Tests"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowLabOrderModal(false);
              setLabOrderData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              if (!labOrderData.testName) {
                showToast('Please select a test', 'error');
                return;
              }
              showToast(`Lab order for ${labOrderData.testName} sent successfully`, 'success');
              setShowLabOrderModal(false);
              setLabOrderData({});
            }}>Order Test</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
            <input
              type="text"
              value={labOrderData.patient || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Test Type *</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={labOrderData.testName || ''}
              onChange={(e) => setLabOrderData({ ...labOrderData, testName: e.target.value })}
            >
              <option value="">Select Test</option>
              <option value="Complete Blood Count">Complete Blood Count (CBC)</option>
              <option value="Basic Metabolic Panel">Basic Metabolic Panel (BMP)</option>
              <option value="Lipid Panel">Lipid Panel</option>
              <option value="Liver Function Test">Liver Function Test</option>
              <option value="Thyroid Panel">Thyroid Panel</option>
              <option value="Urinalysis">Urinalysis</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={labOrderData.priority || 'Routine'}
              onChange={(e) => setLabOrderData({ ...labOrderData, priority: e.target.value })}
            >
              <option value="Routine">Routine</option>
              <option value="Urgent">Urgent</option>
              <option value="Stat">Stat (Emergency)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Indication / Notes</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={3}
              value={labOrderData.notes || ''}
              onChange={(e) => setLabOrderData({ ...labOrderData, notes: e.target.value })}
              placeholder="Reason for test..."
            />
          </div>
        </div>
      </Modal>

      {/* Manage Medications Modal */}
      <Modal
        isOpen={showManageMedsModal}
        onClose={() => setShowManageMedsModal(false)}
        title="Manage Medications"
        size="lg"
        footer={
          <div className="flex justify-end">
            <Button onClick={() => setShowManageMedsModal(false)}>Done</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Active Medications</h3>
            <Button size="sm" onClick={() => {
              setShowManageMedsModal(false);
              setPrescriptionData({ patient: patient.name });
              setShowPrescriptionModal(true);
            }}>Add New</Button>
          </div>
          
          <div className="space-y-3">
            {currentMedications.map((med) => (
              <div key={med.id} className={`p-4 border rounded-lg flex justify-between items-center ${med.status === 'Discontinued' ? 'bg-gray-50 border-gray-200 opacity-70' : 'border-gray-200'}`}>
                <div>
                  <div className="font-medium flex items-center">
                    {med.name}
                    {med.status === 'Discontinued' && <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">Discontinued</span>}
                  </div>
                  <div className="text-sm text-gray-600">{med.dosage} • {med.frequency}</div>
                  <div className="text-xs text-gray-500 mt-1">Started: {med.startDate}</div>
                </div>
                <div className="flex space-x-2">
                  {med.status === 'Active' && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => {
                        // Edit logic would go here
                        showToast('Edit functionality coming soon', 'info');
                      }}>Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 border-red-200" onClick={() => {
                         if(confirm(`Are you sure you want to discontinue ${med.name}?`)) {
                           setCurrentMedications(currentMedications.map(m => 
                             m.id === med.id ? { ...m, status: 'Discontinued' } : m
                           ));
                           showToast(`${med.name} discontinued`, 'info');
                         }
                      }}>Discontinue</Button>
                    </>
                  )}
                  {med.status === 'Discontinued' && (
                    <Button size="sm" variant="outline" onClick={() => {
                       setCurrentMedications(currentMedications.map(m => 
                         m.id === med.id ? { ...m, status: 'Active' } : m
                       ));
                       showToast(`${med.name} reactivated`, 'success');
                    }}>Reactivate</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Write Prescription Modal */}
      <Modal
        isOpen={showPrescriptionModal}
        onClose={() => {
          setShowPrescriptionModal(false);
          setPrescriptionData({});
        }}
        title="Write Prescription"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowPrescriptionModal(false);
              setPrescriptionData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              if (!prescriptionData.medication || (!prescriptionData.dosage && !prescriptionData.isOutOfStock)) {
                showToast('Please fill required fields', 'error');
                return;
              }
              if (prescriptionData.requestPharmacist) {
                showToast('Request sent to Pharmacist', 'success');
              }
              if (!prescriptionData.isOutOfStock) {
                showToast(`Prescription for ${prescriptionData.medication} sent`, 'success');
              } else {
                showToast('Patient advised for external purchase', 'info');
              }
              setShowPrescriptionModal(false);
              setPrescriptionData({});
            }}>Send Prescription</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
            <input
              type="text"
              value={prescriptionData.patient || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medication *</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={prescriptionData.medication || ''}
              onChange={(e) => {
                const selectedMed = availableMedications.find(m => m.name === e.target.value);
                setPrescriptionData({ 
                  ...prescriptionData, 
                  medication: e.target.value,
                  isOutOfStock: selectedMed ? !selectedMed.inStock : false,
                  // Auto-fill dosage if needed or reset
                });
              }}
            >
              <option value="">Select Medication</option>
              {availableMedications.map(med => (
                <option 
                  key={med.name} 
                  value={med.name} 
                  className={!med.inStock ? 'text-gray-400 bg-gray-50' : ''}
                >
                  {med.name} {!med.inStock ? '(Out of Stock)' : ''}
                </option>
              ))}
            </select>
            {prescriptionData.isOutOfStock && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                <div className="font-medium flex items-center">
                  <span className="mr-2">⚠️</span> Item Out of Stock
                </div>
                <p className="mt-1 ml-6">Please advise patient to purchase from external pharmacy.</p>
                
                <div className="mt-3 pt-3 border-t border-yellow-200 ml-6">
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mt-1 rounded text-blue-600 focus:ring-blue-500"
                      checked={prescriptionData.requestPharmacist || false}
                      onChange={(e) => setPrescriptionData({ ...prescriptionData, requestPharmacist: e.target.checked })}
                    />
                    <span>Send request to pharmacist for drug test/restock</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className={`grid grid-cols-2 gap-4 ${prescriptionData.isOutOfStock ? 'opacity-50 pointer-events-none' : ''}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dosage *</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g. 10mg"
                value={prescriptionData.dosage || ''}
                onChange={(e) => setPrescriptionData({ ...prescriptionData, dosage: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency *</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={prescriptionData.frequency || ''}
                onChange={(e) => setPrescriptionData({ ...prescriptionData, frequency: e.target.value })}
              >
                <option value="">Select Frequency</option>
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Quantity"
              value={prescriptionData.quantity || ''}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, quantity: e.target.value })}
            />
          </div>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

