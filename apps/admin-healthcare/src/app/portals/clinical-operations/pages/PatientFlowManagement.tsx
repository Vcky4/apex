import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface Bed {
  id: number;
  unit: string;
  bedNumber: string;
  status: 'Occupied' | 'Available' | 'Cleaning' | 'Maintenance';
  patient?: string;
  admissionDate?: string;
}

interface Admission {
  id: number;
  patient: string;
  unit: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Assigned' | 'Completed';
  requestedDate: string;
  assignedBed?: string;
}

export default function PatientFlowManagement() {
  const { toasts, showToast, removeToast } = useToast();
  
  const [beds, setBeds] = useState<Bed[]>([
    { id: 1, unit: 'ICU', bedNumber: 'ICU-101', status: 'Occupied', patient: 'John Doe', admissionDate: '2025-01-15' },
    { id: 2, unit: 'ICU', bedNumber: 'ICU-102', status: 'Available' },
    { id: 3, unit: 'General', bedNumber: 'GEN-201', status: 'Occupied', patient: 'Jane Smith', admissionDate: '2025-01-16' },
    { id: 4, unit: 'General', bedNumber: 'GEN-202', status: 'Cleaning' },
    { id: 5, unit: 'Cardiology', bedNumber: 'CARD-301', status: 'Available' },
  ]);

  const [admissions, setAdmissions] = useState<Admission[]>([
    { id: 1, patient: 'Bob Johnson', unit: 'ICU', priority: 'High', status: 'Pending', requestedDate: '2025-01-20' },
    { id: 2, patient: 'Alice Brown', unit: 'General', priority: 'Medium', status: 'Pending', requestedDate: '2025-01-20' },
  ]);

  const [showBedModal, setShowBedModal] = useState(false);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [formData, setFormData] = useState<any>({});

  const availableBeds = beds.filter(b => b.status === 'Available').length;
  const occupiedBeds = beds.filter(b => b.status === 'Occupied').length;
  const totalBeds = beds.length;

  const handleManageBeds = () => {
    setShowBedModal(true);
  };

  const handleAssignBed = (admission: Admission) => {
    const availableBed = beds.find(b => b.status === 'Available' && b.unit === admission.unit);
    
    if (availableBed) {
      if (confirm(`Assign ${admission.patient} to ${availableBed.bedNumber} in ${admission.unit}?`)) {
        setBeds(beds.map(b => 
          b.id === availableBed.id 
            ? { ...b, status: 'Occupied', patient: admission.patient, admissionDate: new Date().toISOString().split('T')[0] }
            : b
        ));
        setAdmissions(admissions.map(a => 
          a.id === admission.id ? { ...a, status: 'Assigned', assignedBed: availableBed.bedNumber } : a
        ));
        showToast(`Bed ${availableBed.bedNumber} assigned to ${admission.patient}`, 'success');
      }
    } else {
      showToast(`No available beds in ${admission.unit}. Please check other units or wait for discharge.`, 'warning');
    }
  };

  const handleDischarge = (bed: Bed) => {
    if (confirm(`Discharge patient ${bed.patient} from bed ${bed.bedNumber}?`)) {
      setBeds(beds.map(b => 
        b.id === bed.id 
          ? { ...b, status: 'Cleaning', patient: undefined, admissionDate: undefined }
          : b
      ));
      showToast(`Patient ${bed.patient} discharged. Bed ${bed.bedNumber} set to cleaning.`, 'success');
      
      // After cleaning, make it available
      setTimeout(() => {
        setBeds(beds.map(b => 
          b.id === bed.id ? { ...b, status: 'Available' } : b
        ));
        showToast(`Bed ${bed.bedNumber} is now available`, 'success');
      }, 2000);
    }
  };

  const handleAddAdmission = () => {
    setFormData({ requestedDate: new Date().toISOString().split('T')[0] });
    setShowAdmissionModal(true);
  };

  const handleSaveAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    const { patient, unit, priority } = formData;
    
    if (!patient || !unit || !priority) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newAdmission: Admission = {
      id: Date.now(),
      patient,
      unit,
      priority,
      status: 'Pending',
      requestedDate: formData.requestedDate || new Date().toISOString().split('T')[0],
    };

    setAdmissions([...admissions, newAdmission]);
    showToast(`Admission request created for ${patient}`, 'success');
    setShowAdmissionModal(false);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Patient Flow Management</h1>
        <p className="text-gray-600 mt-2">Admission-discharge-transfer coordination, bed management optimization, wait time reduction</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard title="Avg Length of Stay" value="3.2 days" color="blue" trend={{ value: -0.3, isPositive: true }} />
        <StatCard title="Bed Turnover Rate" value="2.8/day" color="green" trend={{ value: 0.2, isPositive: true }} />
        <StatCard title="ED Wait Time" value="28 min" color="orange" trend={{ value: -5, isPositive: true }} />
        <StatCard title="Throughput Rate" value="94%" color="purple" trend={{ value: 2.1, isPositive: true }} />
      </DashboardGrid>

      <DashboardGrid columns={2}>
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Bed Management</h3>
            <Button size="sm" onClick={handleManageBeds}>Manage Beds</Button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Occupied Beds</span>
              <span className="font-semibold">{occupiedBeds} / {totalBeds}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${(occupiedBeds / totalBeds) * 100}%` }}></div>
            </div>
            <div className="flex justify-between mt-3">
              <span>Available Beds</span>
              <span className="font-semibold text-green-600">{availableBeds}</span>
            </div>
            <div className="flex justify-between mt-3">
              <span>Beds in Cleaning</span>
              <span className="font-semibold text-yellow-600">{beds.filter(b => b.status === 'Cleaning').length}</span>
            </div>
            <div className="mt-4 space-y-2">
              {beds.slice(0, 5).map(bed => (
                <div key={bed.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">{bed.bedNumber} ({bed.unit})</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      bed.status === 'Available' ? 'bg-green-100 text-green-800' :
                      bed.status === 'Occupied' ? 'bg-blue-100 text-blue-800' :
                      bed.status === 'Cleaning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {bed.status}
                    </span>
                    {bed.status === 'Occupied' && (
                      <Button size="sm" variant="outline" onClick={() => handleDischarge(bed)}>Discharge</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Admission-Discharge-Transfer</h3>
            <Button size="sm" onClick={handleAddAdmission}>New Admission</Button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium">Pending Admissions</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">{admissions.filter(a => a.status === 'Pending').length}</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium">Scheduled Discharges</div>
              <div className="text-2xl font-bold text-green-600 mt-1">{beds.filter(b => b.status === 'Occupied').length}</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium">Transfers Today</div>
              <div className="text-2xl font-bold text-purple-600 mt-1">8</div>
            </div>
            <div className="mt-4 space-y-2">
              {admissions.filter(a => a.status === 'Pending').map(admission => (
                <div key={admission.id} className="p-2 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-sm">{admission.patient}</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        admission.priority === 'High' ? 'bg-red-100 text-red-800' :
                        admission.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {admission.priority}
                      </span>
                    </div>
                    <Button size="sm" onClick={() => handleAssignBed(admission)}>Assign Ward/Bed</Button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Target: {admission.unit} • {admission.requestedDate}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </DashboardGrid>

      {/* Bed Management Modal */}
      <Modal
        isOpen={showBedModal}
        onClose={() => setShowBedModal(false)}
        title="Bed Management"
        size="lg"
        footer={
          <Button variant="outline" onClick={() => setShowBedModal(false)}>Close</Button>
        }
      >
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bed Number</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {beds.map(bed => (
                  <tr key={bed.id}>
                    <td className="px-4 py-2 text-sm">{bed.bedNumber}</td>
                    <td className="px-4 py-2 text-sm">{bed.unit}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        bed.status === 'Available' ? 'bg-green-100 text-green-800' :
                        bed.status === 'Occupied' ? 'bg-blue-100 text-blue-800' :
                        bed.status === 'Cleaning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {bed.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">{bed.patient || 'N/A'}</td>
                    <td className="px-4 py-2">
                      {bed.status === 'Occupied' && (
                        <Button size="sm" variant="outline" onClick={() => handleDischarge(bed)}>Discharge</Button>
                      )}
                      {bed.status === 'Cleaning' && (
                        <Button size="sm" onClick={() => {
                          setBeds(beds.map(b => b.id === bed.id ? { ...b, status: 'Available' } : b));
                          showToast(`Bed ${bed.bedNumber} marked as available`, 'success');
                        }}>Mark Available</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      {/* New Admission Modal */}
      <Modal
        isOpen={showAdmissionModal}
        onClose={() => {
          setShowAdmissionModal(false);
          setFormData({});
        }}
        title="New Admission Request"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowAdmissionModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Create Request</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveAdmission} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
            <input
              type="text"
              required
              value={formData.patient || ''}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
            <select
              required
              value={formData.unit || ''}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Unit</option>
              <option value="ICU">ICU</option>
              <option value="General">General</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Emergency">Emergency</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
            <select
              required
              value={formData.priority || ''}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requested Date</label>
            <input
              type="date"
              value={formData.requestedDate || ''}
              onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
