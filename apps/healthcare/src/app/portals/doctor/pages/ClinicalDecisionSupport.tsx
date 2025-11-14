import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { useToast, ToastContainer } from '../../../shared/Toast';
import { Modal } from '../../../shared/Modal';

export default function ClinicalDecisionSupport() {
  const [drug1, setDrug1] = useState('');
  const [drug2, setDrug2] = useState('');
  const [checkResult, setCheckResult] = useState<any>(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState<any>({});

  const { toasts, showToast, removeToast } = useToast();

  const handleDrugInteractionCheck = () => {
    if (!drug1 || !drug2) {
      showToast('Please enter both medications', 'error');
      return;
    }
    // Simulate drug interaction check
    setCheckResult({
      interaction: 'Moderate',
      description: 'Potential interaction detected. Monitor patient closely.',
      recommendation: 'Consider adjusting dosage or timing.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Clinical Decision Support</h1>
        <p className="text-gray-600 mt-2">Drug interaction checking, clinical guideline access, diagnostic support tools, best practice alerts</p>
      </div>

      {/* Drug Interaction Checker */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Drug Interaction Checker</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medication 1</label>
            <input
              type="text"
              value={drug1}
              onChange={(e) => setDrug1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter medication name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medication 2</label>
            <input
              type="text"
              value={drug2}
              onChange={(e) => setDrug2(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter medication name"
            />
          </div>
        </div>
        <Button onClick={handleDrugInteractionCheck}>Check Interaction</Button>
        
        {checkResult && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="font-semibold text-yellow-900 mb-2">Interaction: {checkResult.interaction}</div>
            <div className="text-sm text-yellow-800">{checkResult.description}</div>
            <div className="text-sm text-yellow-800 mt-2"><strong>Recommendation:</strong> {checkResult.recommendation}</div>
          </div>
        )}
      </Card>

      {/* Clinical Guidelines */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Clinical Guidelines</h2>
        <div className="space-y-3">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="font-medium">Hypertension Management Guidelines</div>
            <div className="text-sm text-gray-600 mt-1">ACC/AHA 2023 Guidelines</div>
            <Button size="sm" variant="outline" className="mt-2">View Guidelines</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="font-medium">Diabetes Care Standards</div>
            <div className="text-sm text-gray-600 mt-1">ADA 2024 Standards</div>
            <Button size="sm" variant="outline" className="mt-2">View Standards</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="font-medium">Infectious Disease Protocols</div>
            <div className="text-sm text-gray-600 mt-1">CDC Guidelines</div>
            <Button size="sm" variant="outline" className="mt-2">View Protocols</Button>
          </div>
        </div>
      </Card>

      {/* Prescription Writing */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Prescription Writing</h2>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-gray-700 mb-4">Create and send prescriptions electronically to pharmacies</p>
          <Button onClick={() => {
            setPrescriptionData({
              patient: '',
              medication: '',
              dosage: '',
              frequency: '',
              quantity: '',
              instructions: '',
            });
            setShowPrescriptionModal(true);
          }}>Write Prescription</Button>
        </div>
      </Card>

      {/* Diagnostic Support Tools */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Diagnostic Support Tools</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium mb-2">BMI Calculator</div>
            <Button size="sm" variant="outline" onClick={() => showToast('Opening BMI calculator...', 'info')}>Open Calculator</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium mb-2">Dosage Calculator</div>
            <Button size="sm" variant="outline" onClick={() => showToast('Opening dosage calculator...', 'info')}>Open Calculator</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium mb-2">Risk Assessment Tools</div>
            <Button size="sm" variant="outline" onClick={() => showToast('Opening risk assessment...', 'info')}>View Tools</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="font-medium mb-2">Medical Reference</div>
            <Button size="sm" variant="outline" onClick={() => showToast('Opening medical reference...', 'info')}>Access Library</Button>
          </div>
        </div>
      </Card>

      {/* Prescription Writing Modal */}
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
              const { patient, medication, dosage, frequency, quantity } = prescriptionData;
              if (!patient || !medication || !dosage || !frequency || !quantity) {
                showToast('Please fill in all required fields', 'error');
                return;
              }
              // Check for drug interactions if medication is entered
              if (drug1 && medication) {
                showToast('⚠️ Checking for drug interactions...', 'warning');
                setTimeout(() => {
                  showToast('No significant interactions detected', 'success');
                }, 1000);
              }
              showToast(`Prescription for ${medication} sent to pharmacy`, 'success');
              setShowPrescriptionModal(false);
              setPrescriptionData({});
            }}>Send Prescription</Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient *</label>
            <select
              required
              value={prescriptionData.patient || ''}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, patient: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Patient</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Bob Johnson">Bob Johnson</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medication *</label>
            <input
              type="text"
              required
              value={prescriptionData.medication || ''}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, medication: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter medication name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dosage *</label>
              <input
                type="text"
                required
                value={prescriptionData.dosage || ''}
                onChange={(e) => setPrescriptionData({ ...prescriptionData, dosage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g., 10mg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency *</label>
              <select
                required
                value={prescriptionData.frequency || ''}
                onChange={(e) => setPrescriptionData({ ...prescriptionData, frequency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select Frequency</option>
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="Four times daily">Four times daily</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
            <input
              type="number"
              required
              min="1"
              value={prescriptionData.quantity || ''}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, quantity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Number of tablets/capsules"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <textarea
              value={prescriptionData.instructions || ''}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, instructions: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={3}
              placeholder="Additional instructions for patient..."
            />
          </div>
        </form>
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

