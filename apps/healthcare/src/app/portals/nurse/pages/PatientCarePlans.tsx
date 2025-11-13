import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../../shared/Modal';
import { useToast, ToastContainer } from '../../shared/Toast';

interface CarePlan {
  id: number;
  patient: string;
  diagnosis: string;
  goals: string[];
  interventions: string[];
  status: 'Active' | 'Completed';
  lastUpdated: string;
}

export default function PatientCarePlans() {
  const { toasts, showToast, removeToast } = useToast();
  const { patientId } = useParams();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<CarePlan | null>(null);
  const [formData, setFormData] = useState<any>({});

  const [carePlans, setCarePlans] = useState<CarePlan[]>([
    {
      id: 1,
      patient: 'John Doe',
      diagnosis: 'Hypertension',
      goals: ['Maintain BP < 140/90', 'Weight reduction', 'Medication adherence'],
      interventions: ['Daily BP monitoring', 'Dietary counseling', 'Medication education'],
      status: 'Active',
      lastUpdated: '2025-01-18',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      diagnosis: 'Post-operative Care',
      goals: ['Wound healing', 'Pain management', 'Mobility improvement'],
      interventions: ['Wound care', 'Pain assessment', 'Physical therapy'],
      status: 'Active',
      lastUpdated: '2025-01-17',
    },
  ]);

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setFormData({ goals: [], interventions: [] });
    setShowPlanModal(true);
  };

  const handleEditPlan = (plan: CarePlan) => {
    setSelectedPlan(plan);
    setFormData(plan);
    setShowPlanModal(true);
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const { patient, diagnosis, goals, interventions } = formData;
    
    if (!patient || !diagnosis) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (selectedPlan) {
      setCarePlans(carePlans.map(p => 
        p.id === selectedPlan.id 
          ? { ...formData, id: selectedPlan.id, lastUpdated: new Date().toISOString().split('T')[0], status: formData.status || 'Active' }
          : p
      ));
      showToast('Care plan updated successfully', 'success');
    } else {
      const newPlan: CarePlan = {
        id: Date.now(),
        patient,
        diagnosis,
        goals: Array.isArray(goals) ? goals : goals.split(',').map((g: string) => g.trim()),
        interventions: Array.isArray(interventions) ? interventions : interventions.split(',').map((i: string) => i.trim()),
        status: 'Active',
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      setCarePlans([...carePlans, newPlan]);
      showToast('Care plan created successfully', 'success');
    }
    setShowPlanModal(false);
    setFormData({});
  };

  const handleCompletePlan = (plan: CarePlan) => {
    setCarePlans(carePlans.map(p => 
      p.id === plan.id ? { ...p, status: 'Completed' } : p
    ));
    showToast(`Care plan for ${plan.patient} marked as completed`, 'success');
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Patient Care Plans</h1>
        <p className="text-gray-600 mt-2">Nursing assessment documentation, care plan implementation, progress evaluation, intervention tracking</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Active Care Plans</h2>
          <Button onClick={handleCreatePlan}>Create Care Plan</Button>
        </div>
        <div className="space-y-4">
          {carePlans.filter(p => p.status === 'Active').map((plan) => (
            <div key={plan.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{plan.patient}</h3>
                  <p className="text-sm text-gray-600 mt-1">Diagnosis: {plan.diagnosis}</p>
                  <div className="mt-3">
                    <div className="text-sm font-medium text-gray-700">Goals:</div>
                    <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                      {plan.goals.map((goal, idx) => (
                        <li key={idx}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-700">Interventions:</div>
                    <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                      {plan.interventions.map((intervention, idx) => (
                        <li key={idx}>{intervention}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Last updated: {plan.lastUpdated}</div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditPlan(plan)}>Edit</Button>
                  <Button size="sm" onClick={() => handleCompletePlan(plan)}>Complete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Create/Edit Care Plan Modal */}
      <Modal
        isOpen={showPlanModal}
        onClose={() => {
          setShowPlanModal(false);
          setFormData({});
          setSelectedPlan(null);
        }}
        title={selectedPlan ? 'Edit Care Plan' : 'Create Care Plan'}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowPlanModal(false);
              setFormData({});
              setSelectedPlan(null);
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Save Plan</Button>
          </div>
        }
      >
        <form onSubmit={handleSavePlan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
            <input
              type="text"
              required
              value={formData.patient || ''}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis *</label>
            <input
              type="text"
              required
              value={formData.diagnosis || ''}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Hypertension, Post-operative care, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goals (comma-separated) *</label>
            <textarea
              required
              value={Array.isArray(formData.goals) ? formData.goals.join(', ') : formData.goals || ''}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={3}
              placeholder="Maintain BP < 140/90, Weight reduction, Medication adherence"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interventions (comma-separated) *</label>
            <textarea
              required
              value={Array.isArray(formData.interventions) ? formData.interventions.join(', ') : formData.interventions || ''}
              onChange={(e) => setFormData({ ...formData, interventions: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={3}
              placeholder="Daily BP monitoring, Dietary counseling, Medication education"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
