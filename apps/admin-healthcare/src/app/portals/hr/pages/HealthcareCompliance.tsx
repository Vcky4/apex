import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface License {
  id: number;
  name: string;
  license: string;
  expiry: string;
  daysRemaining: number;
  status: 'Expiring Soon' | 'Active' | 'Expired';
  licenseNumber?: string;
  verified?: boolean;
}

interface Certification {
  id: number;
  name: string;
  cert: string;
  expiry: string;
  daysRemaining: number;
  status: 'Expiring Soon' | 'Active' | 'Expired';
  certificateNumber?: string;
}

interface Training {
  course: string;
  completed: number;
  total: number;
  percentage: number;
  dueDate?: string;
  required?: boolean;
}

export default function HealthcareCompliance() {
  const { toasts, showToast, removeToast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'licenses' | 'certifications' | 'training' | 'audits'>('licenses');

  const [expiringLicenses, setExpiringLicenses] = useState<License[]>([
    { id: 1, name: 'Dr. Sarah Johnson', license: 'Medical License', expiry: '2025-02-15', daysRemaining: 26, status: 'Expiring Soon', licenseNumber: 'MD-12345', verified: true },
    { id: 2, name: 'Dr. Michael Chen', license: 'DEA Registration', expiry: '2025-02-28', daysRemaining: 39, status: 'Expiring Soon', licenseNumber: 'DEA-67890', verified: true },
    { id: 3, name: 'Nurse Patricia Brown', license: 'RN License', expiry: '2025-03-10', daysRemaining: 50, status: 'Active', licenseNumber: 'RN-5678', verified: true },
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    { id: 1, name: 'Dr. Emily Rodriguez', cert: 'ACLS', expiry: '2025-01-30', daysRemaining: 10, status: 'Expiring Soon', certificateNumber: 'ACLS-2023-001' },
    { id: 2, name: 'Nurse Robert Taylor', cert: 'BLS', expiry: '2025-02-05', daysRemaining: 16, status: 'Expiring Soon', certificateNumber: 'BLS-2023-002' },
    { id: 3, name: 'Dr. James Wilson', cert: 'PALS', expiry: '2025-12-31', daysRemaining: 346, status: 'Active', certificateNumber: 'PALS-2024-003' },
  ]);

  const [trainingCompliance, setTrainingCompliance] = useState<Training[]>([
    { course: 'HIPAA Privacy Training', completed: 428, total: 470, percentage: 91, dueDate: '2025-03-31', required: true },
    { course: 'Infection Control', completed: 445, total: 470, percentage: 95, dueDate: '2025-04-15', required: true },
    { course: 'Patient Safety', completed: 412, total: 470, percentage: 88, dueDate: '2025-02-28', required: true },
    { course: 'Emergency Preparedness', completed: 398, total: 470, percentage: 85, dueDate: '2025-05-01', required: true },
  ]);

  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [renewingItem, setRenewingItem] = useState<License | Certification | null>(null);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleVerifyLicense = (license: License) => {
    setExpiringLicenses(expiringLicenses.map(l => 
      l.id === license.id ? { ...l, verified: true, status: 'Active' } : l
    ));
    showToast(`License verified for ${license.name}. Status updated to Active.`, 'success');
  };

  const handleVerifyAll = () => {
    const unverified = expiringLicenses.filter(l => !l.verified);
    if (unverified.length === 0) {
      showToast('All licenses are already verified', 'info');
      return;
    }
    
    showToast(`Verifying ${unverified.length} licenses...`, 'info');
    setTimeout(() => {
      setExpiringLicenses(expiringLicenses.map(l => ({ ...l, verified: true, status: 'Active' })));
      showToast(`Successfully verified ${unverified.length} licenses`, 'success');
    }, 2000);
  };

  const handleRenewLicense = (license: License) => {
    setRenewingItem(license);
    setFormData({ 
      currentExpiry: license.expiry,
      newExpiry: '',
      renewalFee: license.license === 'Medical License' ? '$500' : '$200',
    });
    setShowRenewalModal(true);
  };

  const handleRenewCertification = (cert: Certification) => {
    setRenewingItem(cert);
    setFormData({ 
      currentExpiry: cert.expiry,
      newExpiry: '',
      renewalFee: '$150',
    });
    setShowRenewalModal(true);
  };

  const handleProcessRenewal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renewingItem) return;

    const newExpiry = formData.newExpiry || new Date(new Date(renewingItem.expiry).setFullYear(new Date(renewingItem.expiry).getFullYear() + 1)).toISOString().split('T')[0];
    
    if ('license' in renewingItem) {
      setExpiringLicenses(expiringLicenses.map(l => 
        l.id === renewingItem.id 
          ? { ...l, expiry: newExpiry, status: 'Active', daysRemaining: Math.ceil((new Date(newExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) }
          : l
      ));
      showToast(`License renewal processed for ${renewingItem.name}. New expiry: ${newExpiry}`, 'success');
    } else {
      setCertifications(certifications.map(c => 
        c.id === renewingItem.id 
          ? { ...c, expiry: newExpiry, status: 'Active', daysRemaining: Math.ceil((new Date(newExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) }
          : c
      ));
      showToast(`Certification renewal processed for ${renewingItem.name}. New expiry: ${newExpiry}`, 'success');
    }
    
    setShowRenewalModal(false);
    setRenewingItem(null);
    setFormData({});
  };

  const handleAssignTraining = () => {
    setSelectedTraining(null);
    setFormData({});
    setShowTrainingModal(true);
  };

  const handleAssignTrainingToStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const staffCount = parseInt(formData.staffCount || '42');
    const course = formData.course;
    
    const training = trainingCompliance.find(t => t.course === course);
    if (training) {
      setTrainingCompliance(trainingCompliance.map(t => 
        t.course === course 
          ? { ...t, completed: Math.min(t.completed + staffCount, t.total), percentage: Math.round(((t.completed + staffCount) / t.total) * 100) }
          : t
      ));
      showToast(`Assigned ${course} to ${staffCount} staff members`, 'success');
    }
    setShowTrainingModal(false);
    setFormData({});
  };

  const handleViewTrainingDetails = (training: Training) => {
    const incomplete = training.total - training.completed;
    showToast(`${training.course}: ${training.completed} completed, ${incomplete} pending. Due: ${training.dueDate}`, 'info');
  };

  const handlePrepareAudit = () => {
    showToast('Generating audit readiness report...', 'info');
    setTimeout(() => {
      showToast('Audit readiness report generated. All systems ready for inspection.', 'success');
    }, 2000);
  };

  const expiringCount = expiringLicenses.filter(l => l.status === 'Expiring Soon').length + certifications.filter(c => c.status === 'Expiring Soon').length;

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Healthcare Compliance</h1>
        <p className="text-gray-600 mt-2">Medical license verification, certification tracking, mandatory training compliance</p>
      </div>

      {/* Compliance Overview */}
      <DashboardGrid columns={4}>
        <StatCard
          title="License Compliance"
          value="98%"
          color="green"
          trend={{ value: 1.2, isPositive: true }}
          icon={<span className="text-2xl">📜</span>}
        />
        <StatCard
          title="Certifications Active"
          value="94%"
          color="blue"
          trend={{ value: 0.5, isPositive: true }}
          icon={<span className="text-2xl">✅</span>}
        />
        <StatCard
          title="Training Compliance"
          value="89%"
          color="purple"
          trend={{ value: 2.3, isPositive: true }}
          icon={<span className="text-2xl">📚</span>}
        />
        <StatCard
          title="Expiring Soon"
          value={expiringCount}
          color="orange"
          trend={{ value: -3, isPositive: true }}
          icon={<span className="text-2xl">⚠️</span>}
        />
      </DashboardGrid>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('licenses')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'licenses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Medical Licenses ({expiringLicenses.filter(l => l.status === 'Expiring Soon').length} expiring)
          </button>
          <button
            onClick={() => setSelectedTab('certifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'certifications'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Certifications ({certifications.filter(c => c.status === 'Expiring Soon').length} expiring)
          </button>
          <button
            onClick={() => setSelectedTab('training')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'training'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mandatory Training
          </button>
          <button
            onClick={() => setSelectedTab('audits')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'audits'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Audit Preparation
          </button>
        </nav>
      </div>

      {/* Licenses Tab */}
      {selectedTab === 'licenses' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Medical License Verification</h2>
            <Button onClick={handleVerifyAll}>Verify All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Remaining</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expiringLicenses.map((license) => (
                  <tr key={license.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{license.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{license.license}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{license.licenseNumber || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{license.expiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${license.daysRemaining < 30 ? 'text-orange-600' : 'text-gray-900'}`}>
                        {license.daysRemaining} days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        license.status === 'Expiring Soon' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {license.status}
                      </span>
                      {license.verified && (
                        <span className="ml-2 text-green-600" title="Verified">✓</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {!license.verified && (
                        <button onClick={() => handleVerifyLicense(license)} className="text-blue-600 hover:text-blue-900 mr-3">Verify</button>
                      )}
                      <button onClick={() => handleRenewLicense(license)} className="text-green-600 hover:text-green-900">Renew</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Certifications Tab */}
      {selectedTab === 'certifications' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Certification Tracking (ACLS, BLS, PALS)</h2>
            <Button onClick={() => {
              const expiring = certifications.filter(c => c.status === 'Expiring Soon');
              showToast(`Tracking ${expiring.length} expiring certifications`, 'info');
            }}>Track All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Remaining</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {certifications.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cert.cert}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.certificateNumber || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.expiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${cert.daysRemaining < 30 ? 'text-orange-600' : 'text-gray-900'}`}>
                        {cert.daysRemaining} days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cert.status === 'Expiring Soon' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => showToast(`Viewing certification details for ${cert.name}`, 'info')} className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button onClick={() => handleRenewCertification(cert)} className="text-green-600 hover:text-green-900">Renew</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Training Tab */}
      {selectedTab === 'training' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Mandatory Training Compliance</h2>
            <Button onClick={handleAssignTraining}>Assign Training</Button>
          </div>
          <div className="space-y-4">
            {trainingCompliance.map((training) => (
              <div key={training.course} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{training.course}</h3>
                    {training.dueDate && (
                      <p className="text-xs text-gray-500 mt-1">Due: {training.dueDate}</p>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${
                    training.percentage >= 90 ? 'text-green-600' :
                    training.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {training.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full ${
                      training.percentage >= 90 ? 'bg-green-600' :
                      training.percentage >= 75 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${training.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{training.completed} of {training.total} staff completed ({training.total - training.completed} pending)</span>
                  <Button size="sm" variant="outline" onClick={() => handleViewTrainingDetails(training)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Audits Tab */}
      {selectedTab === 'audits' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Audit Preparation & Documentation</h2>
            <Button onClick={handlePrepareAudit}>Prepare Audit</Button>
          </div>
          <DashboardGrid columns={2}>
            <Card>
              <h3 className="font-semibold mb-3">Upcoming Audits</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium">Joint Commission Survey</div>
                  <div className="text-sm text-gray-600">Scheduled: March 15, 2025</div>
                  <div className="text-xs text-gray-500 mt-1">45 days remaining</div>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => showToast('Opening Joint Commission audit checklist...', 'info')}>
                    View Checklist
                  </Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium">State Licensing Review</div>
                  <div className="text-sm text-gray-600">Scheduled: April 1, 2025</div>
                  <div className="text-xs text-gray-500 mt-1">62 days remaining</div>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => showToast('Opening State Licensing review checklist...', 'info')}>
                    View Checklist
                  </Button>
                </div>
              </div>
            </Card>
            <Card>
              <h3 className="font-semibold mb-3">Audit Readiness</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Documentation Complete</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="flex justify-between mt-4">
                  <span>Staff Training</span>
                  <span className="font-semibold">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <div className="flex justify-between mt-4">
                  <span>Policy Compliance</span>
                  <span className="font-semibold">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <Button size="sm" className="mt-4 w-full" onClick={() => showToast('Generating comprehensive audit readiness report...', 'info')}>
                  Generate Readiness Report
                </Button>
              </div>
            </Card>
          </DashboardGrid>
        </Card>
      )}

      {/* Renewal Modal */}
      <Modal
        isOpen={showRenewalModal}
        onClose={() => {
          setShowRenewalModal(false);
          setRenewingItem(null);
          setFormData({});
        }}
        title={`Renew ${renewingItem && 'license' in renewingItem ? renewingItem.license : renewingItem && 'cert' in renewingItem ? renewingItem.cert : 'Item'}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowRenewalModal(false);
              setRenewingItem(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={handleProcessRenewal}>Process Renewal</Button>
          </div>
        }
      >
        {renewingItem && (
          <form onSubmit={handleProcessRenewal} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member</label>
              <input
                type="text"
                value={renewingItem.name}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Expiry</label>
              <input
                type="text"
                value={formData.currentExpiry || renewingItem.expiry}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Expiry Date *</label>
              <input
                type="date"
                required
                value={formData.newExpiry || ''}
                onChange={(e) => setFormData({ ...formData, newExpiry: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                min={renewingItem.expiry}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Renewal Fee</label>
              <input
                type="text"
                value={formData.renewalFee || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Renewal will extend the {renewingItem && 'license' in renewingItem ? 'license' : 'certification'} for one year from the current expiry date or the selected date, whichever is later.
              </p>
            </div>
          </form>
        )}
      </Modal>

      {/* Assign Training Modal */}
      <Modal
        isOpen={showTrainingModal}
        onClose={() => {
          setShowTrainingModal(false);
          setFormData({});
        }}
        title="Assign Mandatory Training"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowTrainingModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={handleAssignTrainingToStaff}>Assign</Button>
          </div>
        }
      >
        <form onSubmit={handleAssignTrainingToStaff} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Training Course *</label>
            <select
              required
              value={formData.course || ''}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Course</option>
              {trainingCompliance.map(training => (
                <option key={training.course} value={training.course}>
                  {training.course} ({training.percentage}% complete)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Staff *</label>
            <input
              type="number"
              required
              min="1"
              value={formData.staffCount || ''}
              onChange={(e) => setFormData({ ...formData, staffCount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter number of staff"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={formData.dueDate || ''}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Reminder:</strong> Staff will receive email notifications about the assigned training. Completion will be tracked automatically.
            </p>
          </div>
        </form>
      </Modal>
    </div>
  );
}
