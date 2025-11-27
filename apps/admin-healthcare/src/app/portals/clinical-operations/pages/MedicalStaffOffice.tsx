import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

export default function MedicalStaffOffice() {
  const { toasts, showToast, removeToast } = useToast();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', ward: 'Cardiology Wing A' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Internal Medicine', ward: 'General Ward 3' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', ward: 'Pediatrics ICU' },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Emergency Medicine', ward: 'Unassigned' },
  ];

  const committees = [
    { name: 'Medical Executive Committee', nextMeeting: '2025-02-15', status: 'Scheduled' },
    { name: 'Credentialing Committee', nextMeeting: '2025-02-10', status: 'Scheduled' },
    { name: 'Quality Improvement Committee', nextMeeting: '2025-02-20', status: 'Scheduled' },
  ];

  const handleAssignWard = (doctor: any) => {
    setSelectedDoctor(doctor);
    setFormData({ ward: doctor.ward === 'Unassigned' ? '' : doctor.ward });
    setShowAssignModal(true);
  };

  const handleSaveAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;
    
    // In a real app, we would update state or call API here
    showToast(`${selectedDoctor.name} assigned to ${formData.ward}`, 'success');
    setShowAssignModal(false);
    setSelectedDoctor(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Medical Staff Office</h1>
        <p className="text-gray-600 mt-2">Physician privilege management, ward assignments, committee meeting coordination</p>
      </div>

      <DashboardGrid columns={3}>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Active Physicians</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">142</div>
          <p className="text-sm text-gray-600">With active privileges</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Unassigned Physicians</h3>
          <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
          <p className="text-sm text-gray-600">Awaiting ward assignment</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Committees</h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
          <p className="text-sm text-gray-600">Active committees</p>
        </Card>
      </DashboardGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Ward Assignments</h2>
          </div>
          <div className="space-y-3">
            {doctors.map((doctor, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{doctor.specialty}</p>
                    <p className="text-xs text-gray-500 mt-1">Current Ward: <span className="font-medium text-gray-800">{doctor.ward}</span></p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleAssignWard(doctor)}>Assign Ward</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Committee Meeting Coordination</h2>
            <Button onClick={() => showToast('Schedule meeting feature coming soon', 'info')}>Schedule Meeting</Button>
          </div>
          <div className="space-y-3">
            {committees.map((committee, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{committee.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Next Meeting: {committee.nextMeeting}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {committee.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Assign Ward Modal */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedDoctor(null);
          setFormData({});
        }}
        title={`Assign Ward: ${selectedDoctor?.name}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAssignModal(false)}>Cancel</Button>
            <Button onClick={() => {
               const form = document.querySelector('form');
               if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }}>Confirm Assignment</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveAssignment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Ward *</label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.ward || ''}
              onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
            >
              <option value="">Select Ward</option>
              <option value="Cardiology Wing A">Cardiology Wing A</option>
              <option value="General Ward 3">General Ward 3</option>
              <option value="Pediatrics ICU">Pediatrics ICU</option>
              <option value="Emergency Dept">Emergency Dept</option>
              <option value="Surgery Ward">Surgery Ward</option>
            </select>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
            Note: This will update the physician's primary duty location.
          </div>
        </form>
      </Modal>
    </div>
  );
}

