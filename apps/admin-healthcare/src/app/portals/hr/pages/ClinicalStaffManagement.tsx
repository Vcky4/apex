import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface Physician {
  id: number;
  name: string;
  specialty: string;
  status: 'Active' | 'Pending';
  credentialExpiry: string;
  privileges: 'Full' | 'Limited';
  licenseNumber?: string;
  boardCertification?: string;
}

interface Nurse {
  id: number;
  name: string;
  unit: string;
  status: 'Active' | 'Pending';
  certification: string;
  expiry: string;
  licenseNumber?: string;
}

interface Credential {
  id: number;
  name: string;
  type: string;
  submitted: string;
  status: 'Under Review' | 'Pending Verification' | 'Approved' | 'Rejected';
  documents?: string[];
}

export default function ClinicalStaffManagement() {
  const { toasts, showToast, removeToast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'physicians' | 'nurses' | 'credentials'>('physicians');
  
  const [physicians, setPhysicians] = useState<Physician[]>([
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', status: 'Active', credentialExpiry: '2025-12-31', privileges: 'Full', licenseNumber: 'MD-12345', boardCertification: 'ABIM' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Emergency Medicine', status: 'Active', credentialExpiry: '2025-11-15', privileges: 'Full', licenseNumber: 'MD-12346', boardCertification: 'ABEM' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', status: 'Pending', credentialExpiry: '2025-10-20', privileges: 'Limited', licenseNumber: 'MD-12347', boardCertification: 'ABP' },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Surgery', status: 'Active', credentialExpiry: '2026-01-10', privileges: 'Full', licenseNumber: 'MD-12348', boardCertification: 'ABS' },
  ]);

  const [nurses, setNurses] = useState<Nurse[]>([
    { id: 1, name: 'Nurse Patricia Brown', unit: 'ICU', status: 'Active', certification: 'ACLS, BLS', expiry: '2025-12-31', licenseNumber: 'RN-5678' },
    { id: 2, name: 'Nurse Robert Taylor', unit: 'Emergency', status: 'Active', certification: 'ACLS, PALS', expiry: '2025-11-20', licenseNumber: 'RN-5679' },
    { id: 3, name: 'Nurse Lisa Anderson', unit: 'Pediatrics', status: 'Active', certification: 'BLS, PALS', expiry: '2025-10-15', licenseNumber: 'RN-5680' },
  ]);

  const [pendingCredentials, setPendingCredentials] = useState<Credential[]>([
    { id: 1, name: 'Dr. Emily Rodriguez', type: 'Medical License', submitted: '2025-01-15', status: 'Under Review', documents: ['license.pdf', 'transcript.pdf'] },
    { id: 2, name: 'Dr. David Martinez', type: 'Board Certification', submitted: '2025-01-10', status: 'Pending Verification', documents: ['certification.pdf'] },
  ]);

  // Modal states
  const [showPhysicianModal, setShowPhysicianModal] = useState(false);
  const [showNurseModal, setShowNurseModal] = useState(false);
  const [showCredentialModal, setShowCredentialModal] = useState(false);
  const [editingPhysician, setEditingPhysician] = useState<Physician | null>(null);
  const [editingNurse, setEditingNurse] = useState<Nurse | null>(null);
  const [reviewingCredential, setReviewingCredential] = useState<Credential | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleAddPhysician = () => {
    setEditingPhysician(null);
    setFormData({});
    setShowPhysicianModal(true);
  };

  const handleEditPhysician = (physician: Physician) => {
    setEditingPhysician(physician);
    setFormData(physician);
    setShowPhysicianModal(true);
  };

  const handleSavePhysician = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPhysician) {
      setPhysicians(physicians.map(p => p.id === editingPhysician.id ? { ...formData, id: editingPhysician.id } : p));
      showToast('Physician updated successfully', 'success');
    } else {
      const newPhysician: Physician = {
        ...formData,
        id: Date.now(),
        status: 'Pending',
      };
      setPhysicians([...physicians, newPhysician]);
      showToast('Physician added successfully. Credentialing process initiated.', 'success');
    }
    setShowPhysicianModal(false);
    setFormData({});
  };

  const handleRenewCredential = (physician: Physician) => {
    const newExpiry = new Date(physician.credentialExpiry);
    newExpiry.setFullYear(newExpiry.getFullYear() + 1);
    setPhysicians(physicians.map(p => 
      p.id === physician.id 
        ? { ...p, credentialExpiry: newExpiry.toISOString().split('T')[0], status: 'Active' }
        : p
    ));
    showToast(`Credential renewal initiated for ${physician.name}. New expiry: ${newExpiry.toISOString().split('T')[0]}`, 'success');
  };

  const handleAddNurse = () => {
    setEditingNurse(null);
    setFormData({});
    setShowNurseModal(true);
  };

  const handleEditNurse = (nurse: Nurse) => {
    setEditingNurse(nurse);
    setFormData(nurse);
    setShowNurseModal(true);
  };

  const handleSaveNurse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNurse) {
      setNurses(nurses.map(n => n.id === editingNurse.id ? { ...formData, id: editingNurse.id } : n));
      showToast('Nurse updated successfully', 'success');
    } else {
      const newNurse: Nurse = {
        ...formData,
        id: Date.now(),
        status: 'Active',
      };
      setNurses([...nurses, newNurse]);
      showToast('Nurse added successfully', 'success');
    }
    setShowNurseModal(false);
    setFormData({});
  };

  const handleAssignUnit = (nurse: Nurse) => {
    const units = ['ICU', 'Emergency', 'Pediatrics', 'Surgery', 'Cardiology', 'General'];
    const currentIndex = units.indexOf(nurse.unit);
    const nextUnit = units[(currentIndex + 1) % units.length];
    setNurses(nurses.map(n => n.id === nurse.id ? { ...n, unit: nextUnit } : n));
    showToast(`${nurse.name} reassigned to ${nextUnit}`, 'success');
  };

  const handleReviewCredential = (credential: Credential) => {
    setReviewingCredential(credential);
    setShowCredentialModal(true);
  };

  const handleApproveCredential = (credential: Credential) => {
    setPendingCredentials(pendingCredentials.map(c => 
      c.id === credential.id ? { ...c, status: 'Approved' } : c
    ));
    
    // If it's a physician credential, update their status
    const physician = physicians.find(p => p.name === credential.name);
    if (physician) {
      setPhysicians(physicians.map(p => 
        p.id === physician.id ? { ...p, status: 'Active' } : p
      ));
    }
    
    showToast(`Credential approved for ${credential.name}`, 'success');
    setShowCredentialModal(false);
  };

  const handleRejectCredential = (credential: Credential, reason: string) => {
    setPendingCredentials(pendingCredentials.map(c => 
      c.id === credential.id ? { ...c, status: 'Rejected' } : c
    ));
    showToast(`Credential rejected for ${credential.name}. Reason: ${reason}`, 'warning');
    setShowCredentialModal(false);
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Clinical Staff Management</h1>
        <p className="text-gray-600 mt-2">Physician credentialing workflow, nursing staff allocation, specialty privilege management</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('physicians')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'physicians'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Physicians ({physicians.length})
          </button>
          <button
            onClick={() => setSelectedTab('nurses')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'nurses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Nursing Staff ({nurses.length})
          </button>
          <button
            onClick={() => setSelectedTab('credentials')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'credentials'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Credentials ({pendingCredentials.filter(c => c.status !== 'Approved' && c.status !== 'Rejected').length})
          </button>
        </nav>
      </div>

      {/* Physicians Tab */}
      {selectedTab === 'physicians' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Physician Credentialing</h2>
            <Button onClick={handleAddPhysician}>Add Physician</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credential Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Privileges</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {physicians.map((physician) => (
                  <tr key={physician.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{physician.name}</div>
                      {physician.licenseNumber && (
                        <div className="text-xs text-gray-500">License: {physician.licenseNumber}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{physician.specialty}</div>
                      {physician.boardCertification && (
                        <div className="text-xs text-gray-500">{physician.boardCertification}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        physician.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {physician.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{physician.credentialExpiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{physician.privileges}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleEditPhysician(physician)} className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button onClick={() => handleRenewCredential(physician)} className="text-green-600 hover:text-green-900">Renew</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Nurses Tab */}
      {selectedTab === 'nurses' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Nursing Staff Allocation</h2>
            <Button onClick={handleAddNurse}>Add Nurse</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certifications</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {nurses.map((nurse) => (
                  <tr key={nurse.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{nurse.name}</div>
                      {nurse.licenseNumber && (
                        <div className="text-xs text-gray-500">License: {nurse.licenseNumber}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{nurse.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {nurse.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nurse.certification}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{nurse.expiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleEditNurse(nurse)} className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button onClick={() => handleAssignUnit(nurse)} className="text-green-600 hover:text-green-900">Reassign</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Credentials Tab */}
      {selectedTab === 'credentials' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Pending Credentialing</h2>
            <Button onClick={() => {
              const count = pendingCredentials.filter(c => c.status === 'Under Review' || c.status === 'Pending Verification').length;
              showToast(`Processing ${count} pending credentials...`, 'info');
            }}>Process All</Button>
          </div>
          <div className="space-y-4">
            {pendingCredentials.filter(c => c.status !== 'Approved' && c.status !== 'Rejected').map((cred) => (
              <div key={cred.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cred.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{cred.type}</p>
                    <p className="text-xs text-gray-500 mt-1">Submitted: {cred.submitted}</p>
                    {cred.documents && cred.documents.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Documents: {cred.documents.join(', ')}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      cred.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      cred.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cred.status}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => handleReviewCredential(cred)}>Review</Button>
                    <Button size="sm" onClick={() => handleApproveCredential(cred)}>Approve</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Add/Edit Physician Modal */}
      <Modal
        isOpen={showPhysicianModal}
        onClose={() => {
          setShowPhysicianModal(false);
          setFormData({});
        }}
        title={editingPhysician ? 'Edit Physician' : 'Add New Physician'}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowPhysicianModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={handleSavePhysician}>Save</Button>
          </div>
        }
      >
        <form onSubmit={handleSavePhysician} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Dr. John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty *</label>
            <select
              required
              value={formData.specialty || ''}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Specialty</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Emergency Medicine">Emergency Medicine</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Surgery">Surgery</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Radiology">Radiology</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">License Number *</label>
            <input
              type="text"
              required
              value={formData.licenseNumber || ''}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="MD-12345"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Board Certification</label>
            <input
              type="text"
              value={formData.boardCertification || ''}
              onChange={(e) => setFormData({ ...formData, boardCertification: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="ABIM, ABEM, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credential Expiry Date *</label>
            <input
              type="date"
              required
              value={formData.credentialExpiry || ''}
              onChange={(e) => setFormData({ ...formData, credentialExpiry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Privileges *</label>
            <select
              required
              value={formData.privileges || ''}
              onChange={(e) => setFormData({ ...formData, privileges: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Privileges</option>
              <option value="Full">Full Privileges</option>
              <option value="Limited">Limited Privileges</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Add/Edit Nurse Modal */}
      <Modal
        isOpen={showNurseModal}
        onClose={() => {
          setShowNurseModal(false);
          setFormData({});
        }}
        title={editingNurse ? 'Edit Nurse' : 'Add New Nurse'}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowNurseModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={handleSaveNurse}>Save</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveNurse} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Nurse Jane Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Assignment *</label>
            <select
              required
              value={formData.unit || ''}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Unit</option>
              <option value="ICU">ICU</option>
              <option value="Emergency">Emergency</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Surgery">Surgery</option>
              <option value="Cardiology">Cardiology</option>
              <option value="General">General</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">License Number *</label>
            <input
              type="text"
              required
              value={formData.licenseNumber || ''}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="RN-5678"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
            <input
              type="text"
              value={formData.certification || ''}
              onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="ACLS, BLS, PALS"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certification Expiry *</label>
            <input
              type="date"
              required
              value={formData.expiry || ''}
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </form>
      </Modal>

      {/* Review Credential Modal */}
      <Modal
        isOpen={showCredentialModal}
        onClose={() => {
          setShowCredentialModal(false);
          setReviewingCredential(null);
        }}
        title="Review Credential"
        size="lg"
        footer={
          reviewingCredential && (
            <div className="flex justify-between">
              <Button
                variant="danger"
                onClick={() => {
                  const reason = prompt('Reason for rejection:');
                  if (reason) {
                    handleRejectCredential(reviewingCredential, reason);
                  }
                }}
              >
                Reject
              </Button>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => {
                  setShowCredentialModal(false);
                  setReviewingCredential(null);
                }}>Cancel</Button>
                <Button onClick={() => handleApproveCredential(reviewingCredential!)}>Approve</Button>
              </div>
            </div>
          )
        }
      >
        {reviewingCredential && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">Applicant</h4>
              <p className="text-gray-600">{reviewingCredential.name}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Credential Type</h4>
              <p className="text-gray-600">{reviewingCredential.type}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Submitted Date</h4>
              <p className="text-gray-600">{reviewingCredential.submitted}</p>
            </div>
            {reviewingCredential.documents && reviewingCredential.documents.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Documents</h4>
                <ul className="list-disc list-inside space-y-1">
                  {reviewingCredential.documents.map((doc, idx) => (
                    <li key={idx} className="text-gray-600">
                      <a href="#" className="text-blue-600 hover:underline">{doc}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Verification Checklist:</strong>
              </p>
              <ul className="mt-2 space-y-1 text-sm text-blue-700">
                <li>✓ License is current and valid</li>
                <li>✓ No disciplinary actions</li>
                <li>✓ Board certification verified</li>
                <li>✓ Background check completed</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
