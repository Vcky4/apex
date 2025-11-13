import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../shared/Modal';
import { useToast, ToastContainer } from '../../shared/Toast';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  prescriber: string;
  startDate: string;
  refillsRemaining: number;
  pharmacy: string;
}

export default function MedicationTracking() {
  const { toasts, showToast, removeToast } = useToast();
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescriber: 'Dr. Sarah Johnson', startDate: '2025-01-01', refillsRemaining: 2, pharmacy: 'CVS Pharmacy' },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescriber: 'Dr. Michael Chen', startDate: '2024-12-01', refillsRemaining: 0, pharmacy: 'Walgreens' },
  ]);

  const handleRequestRefill = (medication: Medication) => {
    if (medication.refillsRemaining === 0) {
      showToast('No refills remaining. Please contact your doctor for a new prescription.', 'warning');
      return;
    }
    setSelectedMedication(medication);
    setShowRefillModal(true);
  };

  const handleConfirmRefill = () => {
    if (!selectedMedication) return;
    
    setMedications(medications.map(m => 
      m.id === selectedMedication.id 
        ? { ...m, refillsRemaining: m.refillsRemaining - 1 }
        : m
    ));

    showToast(`Refill requested for ${selectedMedication.name}. Pharmacy: ${selectedMedication.pharmacy}`, 'success');
    setShowRefillModal(false);
    setSelectedMedication(null);
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Medication Tracking</h1>
        <p className="text-gray-600 mt-2">Current medication list, refill requests, adherence tracking, pharmacy information</p>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Current Medications</h2>
        <div className="space-y-4">
          {medications.map((med) => (
            <div key={med.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">{med.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{med.dosage} • {med.frequency}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Prescribed by: {med.prescriber} | Started: {med.startDate}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Pharmacy: {med.pharmacy}</div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      med.refillsRemaining > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {med.refillsRemaining} refills remaining
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button size="sm" onClick={() => handleRequestRefill(med)} disabled={med.refillsRemaining === 0}>
                    Request Refill
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => showToast(`Viewing medication details for ${med.name}...`, 'info')}>
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Medication Adherence</h3>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="font-medium text-green-900">Adherence Rate: 95%</div>
          <div className="text-sm text-green-800 mt-2">You're doing great! Keep taking your medications as prescribed.</div>
        </div>
      </Card>

      {/* Refill Request Modal */}
      <Modal
        isOpen={showRefillModal}
        onClose={() => {
          setShowRefillModal(false);
          setSelectedMedication(null);
        }}
        title={`Request Refill: ${selectedMedication?.name}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowRefillModal(false);
              setSelectedMedication(null);
            }}>Cancel</Button>
            <Button onClick={handleConfirmRefill}>Confirm Refill Request</Button>
          </div>
        }
      >
        {selectedMedication && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Medication: {selectedMedication.name}</div>
              <div className="text-sm text-blue-800 mt-1">Dosage: {selectedMedication.dosage}</div>
              <div className="text-sm text-blue-800 mt-1">Pharmacy: {selectedMedication.pharmacy}</div>
              <div className="text-sm text-blue-800 mt-1">Refills Remaining: {selectedMedication.refillsRemaining}</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Your refill request will be sent to {selectedMedication.pharmacy}. 
                You will be notified when your prescription is ready for pickup.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
