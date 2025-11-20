import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface Prescription {
  id: number;
  patient: string;
  medication: string;
  dosage: string;
  quantity: number;
  prescriber: string;
  dateReceived: string;
  status: 'Pending' | 'Verified' | 'Dispensed' | 'Rejected';
  rejectionReason?: string;
}

export default function PrescriptionManagement() {
  const { toasts, showToast, removeToast } = useToast();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { id: 1, patient: 'John Doe', medication: 'Lisinopril', dosage: '10mg', quantity: 30, prescriber: 'Dr. Sarah Johnson', dateReceived: '2025-01-20', status: 'Pending' },
    { id: 2, patient: 'Jane Smith', medication: 'Metformin', dosage: '500mg', quantity: 60, prescriber: 'Dr. Michael Chen', dateReceived: '2025-01-19', status: 'Verified' },
    { id: 3, patient: 'Bob Johnson', medication: 'Amoxicillin', dosage: '500mg', quantity: 21, prescriber: 'Dr. Emily Rodriguez', dateReceived: '2025-01-18', status: 'Dispensed' },
  ]);

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDispenseModal, setShowDispenseModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleVerify = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setFormData({
      verified: true,
      notes: '',
    });
    setShowVerifyModal(true);
  };

  const handleSaveVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPrescription) return;

    setPrescriptions(prescriptions.map(p => 
      p.id === selectedPrescription.id ? { ...p, status: 'Verified' } : p
    ));

    showToast(`Prescription for ${selectedPrescription.medication} verified successfully`, 'success');
    setShowVerifyModal(false);
    setSelectedPrescription(null);
    setFormData({});
  };

  const handleDispense = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setFormData({
      dispensedQuantity: prescription.quantity,
      lotNumber: '',
    });
    setShowDispenseModal(true);
  };

  const handleSaveDispense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPrescription) return;

    const { dispensedQuantity, lotNumber } = formData;
    if (!dispensedQuantity) {
      showToast('Please enter dispensed quantity', 'error');
      return;
    }

    setPrescriptions(prescriptions.map(p => 
      p.id === selectedPrescription.id ? { ...p, status: 'Dispensed' } : p
    ));

    showToast(`${selectedPrescription.medication} dispensed to ${selectedPrescription.patient}`, 'success');
    setShowDispenseModal(false);
    setSelectedPrescription(null);
    setFormData({});
  };

  const handleReject = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setFormData({
      rejectionReason: '',
    });
    setShowRejectModal(true);
  };

  const handleSaveRejection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPrescription) return;

    const { rejectionReason } = formData;
    if (!rejectionReason) {
      showToast('Please provide rejection reason', 'error');
      return;
    }

    setPrescriptions(prescriptions.map(p => 
      p.id === selectedPrescription.id 
        ? { ...p, status: 'Rejected', rejectionReason }
        : p
    ));

    showToast(`Prescription rejected. Reason: ${rejectionReason}`, 'warning');
    setShowRejectModal(false);
    setSelectedPrescription(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Prescription Management</h1>
        <p className="text-gray-600 mt-2">Prescription receiving and verification, dispensing workflow, refill processing, prescription status tracking</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Prescription Queue</h2>
          <div className="text-sm text-gray-600">
            Pending: {prescriptions.filter(p => p.status === 'Pending').length} | 
            Verified: {prescriptions.filter(p => p.status === 'Verified').length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prescriber</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptions.map((prescription) => (
                <tr key={prescription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{prescription.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{prescription.medication}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{prescription.dosage}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{prescription.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{prescription.prescriber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      prescription.status === 'Dispensed' ? 'bg-green-100 text-green-800' :
                      prescription.status === 'Verified' ? 'bg-blue-100 text-blue-800' :
                      prescription.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {prescription.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {prescription.status === 'Pending' && (
                      <>
                        <button onClick={() => handleVerify(prescription)} className="text-blue-600 hover:text-blue-900 mr-3">Verify</button>
                        <button onClick={() => handleReject(prescription)} className="text-red-600 hover:text-red-900">Reject</button>
                      </>
                    )}
                    {prescription.status === 'Verified' && (
                      <button onClick={() => handleDispense(prescription)} className="text-green-600 hover:text-green-900">Dispense</button>
                    )}
                    {prescription.status === 'Dispensed' && (
                      <span className="text-gray-500">Completed</span>
                    )}
                    {prescription.status === 'Rejected' && (
                      <span className="text-red-600 text-xs">{prescription.rejectionReason}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Verify Modal */}
      <Modal
        isOpen={showVerifyModal}
        onClose={() => {
          setShowVerifyModal(false);
          setSelectedPrescription(null);
          setFormData({});
        }}
        title={`Verify Prescription: ${selectedPrescription?.medication}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowVerifyModal(false);
              setSelectedPrescription(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Verify Prescription</Button>
          </div>
        }
      >
        {selectedPrescription && (
          <form onSubmit={handleSaveVerification} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Patient: {selectedPrescription.patient}</div>
              <div className="text-sm text-blue-800 mt-1">Medication: {selectedPrescription.medication} {selectedPrescription.dosage}</div>
              <div className="text-sm text-blue-800 mt-1">Quantity: {selectedPrescription.quantity}</div>
              <div className="text-sm text-blue-800 mt-1">Prescriber: {selectedPrescription.prescriber}</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Verification Checklist:</strong>
              </p>
              <ul className="text-sm text-green-800 mt-2 list-disc list-inside">
                <li>Prescriber is licensed and authorized</li>
                <li>Medication and dosage are appropriate</li>
                <li>No drug interactions detected</li>
                <li>Patient allergies checked</li>
              </ul>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                rows={3}
                placeholder="Any additional notes..."
              />
            </div>
          </form>
        )}
      </Modal>

      {/* Dispense Modal */}
      <Modal
        isOpen={showDispenseModal}
        onClose={() => {
          setShowDispenseModal(false);
          setSelectedPrescription(null);
          setFormData({});
        }}
        title={`Dispense Prescription: ${selectedPrescription?.medication}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowDispenseModal(false);
              setSelectedPrescription(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Dispense</Button>
          </div>
        }
      >
        {selectedPrescription && (
          <form onSubmit={handleSaveDispense} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Patient: {selectedPrescription.patient}</div>
              <div className="text-sm text-blue-800 mt-1">Medication: {selectedPrescription.medication} {selectedPrescription.dosage}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dispensed Quantity *</label>
              <input
                type="number"
                required
                min="1"
                max={selectedPrescription.quantity}
                value={formData.dispensedQuantity || ''}
                onChange={(e) => setFormData({ ...formData, dispensedQuantity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lot Number</label>
              <input
                type="text"
                value={formData.lotNumber || ''}
                onChange={(e) => setFormData({ ...formData, lotNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter lot number"
              />
            </div>
          </form>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setSelectedPrescription(null);
          setFormData({});
        }}
        title={`Reject Prescription: ${selectedPrescription?.medication}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowRejectModal(false);
              setSelectedPrescription(null);
              setFormData({});
            }}>Cancel</Button>
            <Button variant="danger" onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Reject Prescription</Button>
          </div>
        }
      >
        {selectedPrescription && (
          <form onSubmit={handleSaveRejection} className="space-y-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Warning:</strong> Please provide a clear reason for rejecting this prescription.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason *</label>
              <textarea
                required
                value={formData.rejectionReason || ''}
                onChange={(e) => setFormData({ ...formData, rejectionReason: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                rows={4}
                placeholder="Enter reason for rejection (e.g., dosage error, drug interaction, etc.)"
              />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
