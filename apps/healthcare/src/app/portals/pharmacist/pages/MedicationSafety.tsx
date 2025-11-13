import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../shared/Modal';
import { useToast, ToastContainer } from '../../shared/Toast';

interface DrugInteraction {
  id: number;
  medication1: string;
  medication2: string;
  severity: 'Major' | 'Moderate' | 'Minor';
  description: string;
  recommendation: string;
}

interface AllergyCheck {
  patient: string;
  medication: string;
  allergies: string[];
  result: 'Safe' | 'Warning' | 'Contraindicated';
}

export default function MedicationSafety() {
  const { toasts, showToast, removeToast } = useToast();
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [checkType, setCheckType] = useState<'interaction' | 'allergy' | 'dosage'>('interaction');
  const [formData, setFormData] = useState<any>({});

  const [interactions, setInteractions] = useState<DrugInteraction[]>([
    {
      id: 1,
      medication1: 'Lisinopril',
      medication2: 'Ibuprofen',
      severity: 'Moderate',
      description: 'May reduce antihypertensive effect',
      recommendation: 'Monitor blood pressure closely',
    },
    {
      id: 2,
      medication1: 'Warfarin',
      medication2: 'Aspirin',
      severity: 'Major',
      description: 'Increased risk of bleeding',
      recommendation: 'Avoid combination or monitor closely',
    },
  ]);

  const handleCheckInteraction = () => {
    setCheckType('interaction');
    setFormData({
      medication1: '',
      medication2: '',
    });
    setShowCheckModal(true);
  };

  const handleCheckAllergy = () => {
    setCheckType('allergy');
    setFormData({
      patient: '',
      medication: '',
    });
    setShowCheckModal(true);
  };

  const handleCheckDosage = () => {
    setCheckType('dosage');
    setFormData({
      medication: '',
      dosage: '',
      patientAge: '',
      patientWeight: '',
    });
    setShowCheckModal(true);
  };

  const handlePerformCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkType === 'interaction') {
      const { medication1, medication2 } = formData;
      if (!medication1 || !medication2) {
        showToast('Please enter both medications', 'error');
        return;
      }
      
      // Simulate interaction check
      const hasInteraction = interactions.some(i => 
        (i.medication1 === medication1 && i.medication2 === medication2) ||
        (i.medication1 === medication2 && i.medication2 === medication1)
      );
      
      if (hasInteraction) {
        const interaction = interactions.find(i => 
          (i.medication1 === medication1 && i.medication2 === medication2) ||
          (i.medication1 === medication2 && i.medication2 === medication1)
        );
        showToast(`⚠️ ${interaction?.severity} interaction detected: ${interaction?.description}`, 'warning');
      } else {
        showToast('No significant drug interactions detected', 'success');
      }
    } else if (checkType === 'allergy') {
      const { patient, medication } = formData;
      if (!patient || !medication) {
        showToast('Please enter patient and medication', 'error');
        return;
      }
      
      // Simulate allergy check
      const mockAllergies = ['Penicillin', 'Sulfa'];
      const hasAllergy = mockAllergies.some(a => medication.toLowerCase().includes(a.toLowerCase()));
      
      if (hasAllergy) {
        showToast(`⚠️ Allergy warning: Patient may be allergic to ${medication}`, 'warning');
      } else {
        showToast(`No known allergies to ${medication}`, 'success');
      }
    } else if (checkType === 'dosage') {
      const { medication, dosage, patientAge, patientWeight } = formData;
      if (!medication || !dosage) {
        showToast('Please enter medication and dosage', 'error');
        return;
      }
      
      // Simulate dosage validation
      showToast(`Dosage validation completed for ${medication}. Dosage appears appropriate.`, 'success');
    }
    
    setShowCheckModal(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Medication Safety</h1>
        <p className="text-gray-600 mt-2">Drug interaction checking, allergy verification, dosage validation, contraindication alerts</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button onClick={handleCheckInteraction} className="h-24 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">💊</span>
          <span>Check Drug Interactions</span>
        </Button>
        <Button onClick={handleCheckAllergy} variant="secondary" className="h-24 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">⚠️</span>
          <span>Verify Allergies</span>
        </Button>
        <Button onClick={handleCheckDosage} variant="outline" className="h-24 flex flex-col items-center justify-center">
          <span className="text-2xl mb-2">📏</span>
          <span>Validate Dosage</span>
        </Button>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Drug Interactions</h2>
        <div className="space-y-4">
          {interactions.map((interaction) => (
            <div key={interaction.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">
                    {interaction.medication1} + {interaction.medication2}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{interaction.description}</div>
                  <div className="text-sm text-gray-700 mt-2">
                    <strong>Recommendation:</strong> {interaction.recommendation}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  interaction.severity === 'Major' ? 'bg-red-100 text-red-800' :
                  interaction.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {interaction.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Safety Check Modal */}
      <Modal
        isOpen={showCheckModal}
        onClose={() => {
          setShowCheckModal(false);
          setFormData({});
        }}
        title={
          checkType === 'interaction' ? 'Check Drug Interactions' :
          checkType === 'allergy' ? 'Verify Allergies' :
          'Validate Dosage'
        }
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowCheckModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Perform Check</Button>
          </div>
        }
      >
        <form onSubmit={handlePerformCheck} className="space-y-4">
          {checkType === 'interaction' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medication 1 *</label>
                <input
                  type="text"
                  required
                  value={formData.medication1 || ''}
                  onChange={(e) => setFormData({ ...formData, medication1: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Enter medication name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medication 2 *</label>
                <input
                  type="text"
                  required
                  value={formData.medication2 || ''}
                  onChange={(e) => setFormData({ ...formData, medication2: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Enter medication name"
                />
              </div>
            </>
          )}
          {checkType === 'allergy' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
                <input
                  type="text"
                  required
                  value={formData.patient || ''}
                  onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Patient name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medication *</label>
                <input
                  type="text"
                  required
                  value={formData.medication || ''}
                  onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Medication name"
                />
              </div>
            </>
          )}
          {checkType === 'dosage' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medication *</label>
                <input
                  type="text"
                  required
                  value={formData.medication || ''}
                  onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Medication name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage *</label>
                <input
                  type="text"
                  required
                  value={formData.dosage || ''}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="e.g., 10mg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Age</label>
                  <input
                    type="number"
                    value={formData.patientAge || ''}
                    onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.patientWeight || ''}
                    onChange={(e) => setFormData({ ...formData, patientWeight: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    placeholder="Weight"
                  />
                </div>
              </div>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
}
