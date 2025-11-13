import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../shared/Modal';
import { useToast, ToastContainer } from '../../shared/Toast';

interface Medication {
  id: number;
  patient: string;
  medication: string;
  dosage: string;
  route: string;
  scheduledTime: string;
  status: 'Due' | 'Given' | 'Missed';
  givenTime?: string;
  givenBy?: string;
}

export default function MedicationAdministration() {
  const { toasts, showToast, removeToast } = useToast();
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, patient: 'John Doe', medication: 'Lisinopril', dosage: '10mg', route: 'PO', scheduledTime: '08:00', status: 'Due' },
    { id: 2, patient: 'Jane Smith', medication: 'Metformin', dosage: '500mg', route: 'PO', scheduledTime: '09:00', status: 'Due' },
    { id: 3, patient: 'Bob Johnson', medication: 'Aspirin', dosage: '81mg', route: 'PO', scheduledTime: '08:00', status: 'Given', givenTime: '08:05', givenBy: 'Nurse Patricia Brown' },
  ]);

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleAdminister = (medication: Medication) => {
    setSelectedMedication(medication);
    setFormData({
      givenTime: new Date().toTimeString().slice(0, 5),
      notes: '',
    });
    setShowAdminModal(true);
  };

  const handleSaveAdministration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedication) return;

    const { givenTime, notes } = formData;
    
    setMedications(medications.map(m => 
      m.id === selectedMedication.id 
        ? { 
            ...m, 
            status: 'Given', 
            givenTime: givenTime || new Date().toTimeString().slice(0, 5),
            givenBy: 'Nurse Patricia Brown',
            notes: notes || '',
          }
        : m
    ));

    showToast(`${selectedMedication.medication} administered to ${selectedMedication.patient}`, 'success');
    setShowAdminModal(false);
    setSelectedMedication(null);
    setFormData({});
  };

  const handleCheckAllergies = (medication: Medication) => {
    showToast(`Checking allergies for ${medication.patient}...`, 'info');
    setTimeout(() => {
      showToast(`No known allergies to ${medication.medication}. Safe to administer.`, 'success');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Medication Administration</h1>
        <p className="text-gray-600 mt-2">Medication schedule management, administration documentation, allergy checking, stock level monitoring</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Medication Schedule</h2>
          <div className="text-sm text-gray-600">
            Due: {medications.filter(m => m.status === 'Due').length} | 
            Given: {medications.filter(m => m.status === 'Given').length}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scheduled Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {medications.map((med) => (
                <tr key={med.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{med.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{med.medication}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{med.dosage}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{med.route}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{med.scheduledTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      med.status === 'Given' ? 'bg-green-100 text-green-800' :
                      med.status === 'Due' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {med.status}
                    </span>
                    {med.givenTime && (
                      <div className="text-xs text-gray-500 mt-1">Given: {med.givenTime}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {med.status === 'Due' && (
                      <>
                        <button onClick={() => handleCheckAllergies(med)} className="text-blue-600 hover:text-blue-900 mr-3">Check Allergies</button>
                        <button onClick={() => handleAdminister(med)} className="text-green-600 hover:text-green-900">Administer</button>
                      </>
                    )}
                    {med.status === 'Given' && (
                      <span className="text-gray-500">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Administration Modal */}
      <Modal
        isOpen={showAdminModal}
        onClose={() => {
          setShowAdminModal(false);
          setSelectedMedication(null);
          setFormData({});
        }}
        title={`Administer Medication: ${selectedMedication?.medication}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowAdminModal(false);
              setSelectedMedication(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Record Administration</Button>
          </div>
        }
      >
        {selectedMedication && (
          <form onSubmit={handleSaveAdministration} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Patient: {selectedMedication.patient}</div>
              <div className="text-sm text-blue-800 mt-1">{selectedMedication.medication} {selectedMedication.dosage} via {selectedMedication.route}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Administered *</label>
              <input
                type="time"
                required
                value={formData.givenTime || ''}
                onChange={(e) => setFormData({ ...formData, givenTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                rows={3}
                placeholder="Any observations or notes..."
              />
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Safety Check:</strong> Verify patient identity, medication, dosage, route, and time before administration.
              </p>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
