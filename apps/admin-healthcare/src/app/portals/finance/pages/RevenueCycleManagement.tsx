import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface Claim {
  id: number;
  patient: string;
  claimId: string;
  amount: string;
  submitted: string;
  status: 'Paid' | 'Pending' | 'Denied' | 'Under Review';
  payer: string;
  serviceDate?: string;
  diagnosisCode?: string;
}

interface Denial {
  id: number;
  claimId: string;
  reason: string;
  amount: string;
  date: string;
  status: 'Appeal Filed' | 'Under Review' | 'Resolved' | 'Rejected';
  appealDeadline?: string;
}

export default function RevenueCycleManagement() {
  const { toasts, showToast, removeToast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'claims' | 'denials' | 'payments' | 'eligibility'>('claims');

  const [claims, setClaims] = useState<Claim[]>([
    { id: 1, patient: 'John Doe', claimId: 'CLM-2025-001', amount: '$2,450', submitted: '2025-01-15', status: 'Paid', payer: 'Medicare', serviceDate: '2025-01-10', diagnosisCode: 'I10' },
    { id: 2, patient: 'Jane Smith', claimId: 'CLM-2025-002', amount: '$1,850', submitted: '2025-01-16', status: 'Pending', payer: 'Medicaid', serviceDate: '2025-01-11', diagnosisCode: 'E11.9' },
    { id: 3, patient: 'Bob Johnson', claimId: 'CLM-2025-003', amount: '$3,200', submitted: '2025-01-14', status: 'Denied', payer: 'Commercial', serviceDate: '2025-01-09', diagnosisCode: 'M79.3' },
  ]);

  const [denials, setDenials] = useState<Denial[]>([
    { id: 1, claimId: 'CLM-2025-003', reason: 'Missing documentation', amount: '$3,200', date: '2025-01-17', status: 'Appeal Filed', appealDeadline: '2025-02-17' },
    { id: 2, claimId: 'CLM-2025-015', reason: 'Prior authorization required', amount: '$1,500', date: '2025-01-18', status: 'Under Review', appealDeadline: '2025-02-18' },
  ]);

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [selectedDenial, setSelectedDenial] = useState<Denial | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSubmitClaim = () => {
    setFormData({ submitted: new Date().toISOString().split('T')[0] });
    setShowClaimModal(true);
  };

  const handleSaveClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const { patient, amount, payer, serviceDate, diagnosisCode } = formData;
    
    if (!patient || !amount || !payer || !serviceDate) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newClaim: Claim = {
      id: Date.now(),
      patient,
      claimId: `CLM-2025-${String(Date.now()).slice(-3)}`,
      amount: `$${parseFloat(amount).toLocaleString()}`,
      submitted: formData.submitted || new Date().toISOString().split('T')[0],
      status: 'Pending',
      payer,
      serviceDate,
      diagnosisCode,
    };

    setClaims([...claims, newClaim]);
    showToast(`Claim ${newClaim.claimId} submitted successfully for ${patient}`, 'success');
    setShowClaimModal(false);
    setFormData({});
  };

  const handleFileAppeal = (denial: Denial) => {
    setSelectedDenial(denial);
    setFormData({ reason: denial.reason, amount: denial.amount });
    setShowAppealModal(true);
  };

  const handleProcessAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDenial) return;

    const { appealReason, supportingDocs } = formData;
    if (!appealReason) {
      showToast('Please provide appeal reason', 'error');
      return;
    }

    setDenials(denials.map(d => 
      d.id === selectedDenial.id 
        ? { ...d, status: 'Appeal Filed', reason: `${d.reason} - Appeal: ${appealReason}` }
        : d
    ));

    showToast(`Appeal filed for ${selectedDenial.claimId}. Appeal deadline: ${selectedDenial.appealDeadline}`, 'success');
    setShowAppealModal(false);
    setSelectedDenial(null);
    setFormData({});
  };

  const handleVerifyEligibility = () => {
    setFormData({});
    setShowEligibilityModal(true);
  };

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    const { patientName, memberId, dateOfService } = formData;
    
    if (!patientName || !memberId || !dateOfService) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Simulate eligibility check
    showToast(`Checking eligibility for ${patientName}...`, 'info');
    setTimeout(() => {
      const isEligible = Math.random() > 0.1; // 90% eligible
      if (isEligible) {
        showToast(`✓ Eligibility verified for ${patientName}. Coverage active through 2025-12-31`, 'success');
      } else {
        showToast(`✕ Eligibility check failed for ${patientName}. Coverage may be inactive or expired.`, 'error');
      }
      setShowEligibilityModal(false);
      setFormData({});
    }, 1500);
  };

  const handleViewClaim = (claim: Claim) => {
    showToast(`Viewing claim ${claim.claimId} details for ${claim.patient}`, 'info');
  };

  const handlePostPayment = () => {
    const pendingAmount = claims.filter(c => c.status === 'Pending').length;
    showToast(`Posting ${pendingAmount} pending payments...`, 'info');
    setTimeout(() => {
      setClaims(claims.map(c => c.status === 'Pending' ? { ...c, status: 'Paid' } : c));
      showToast(`Successfully posted ${pendingAmount} payments`, 'success');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Revenue Cycle Management</h1>
        <p className="text-gray-600 mt-2">Patient registration, claims processing, denial management, payment posting</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('claims')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'claims' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Claims Processing ({claims.length})
          </button>
          <button
            onClick={() => setSelectedTab('denials')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'denials' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Denial Management ({denials.filter(d => d.status !== 'Resolved').length})
          </button>
          <button
            onClick={() => setSelectedTab('payments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'payments' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Payment Posting
          </button>
          <button
            onClick={() => setSelectedTab('eligibility')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'eligibility' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Eligibility Verification
          </button>
        </nav>
      </div>

      {/* Claims Tab */}
      {selectedTab === 'claims' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Claims Processing & Submission</h2>
            <Button onClick={handleSubmitClaim}>Submit Claim</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claim ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {claims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{claim.claimId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{claim.patient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">{claim.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{claim.payer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{claim.submitted}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        claim.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        claim.status === 'Denied' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleViewClaim(claim)} className="text-blue-600 hover:text-blue-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Denials Tab */}
      {selectedTab === 'denials' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Denial Management & Appeals</h2>
            <Button onClick={() => {
              const unresolved = denials.filter(d => d.status !== 'Resolved');
              showToast(`Managing ${unresolved.length} unresolved denials`, 'info');
            }}>File Appeal</Button>
          </div>
          <div className="space-y-4">
            {denials.filter(d => d.status !== 'Resolved').map((denial) => (
              <div key={denial.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{denial.claimId}</h3>
                    <p className="text-sm text-gray-600 mt-1">{denial.reason}</p>
                    <p className="text-xs text-gray-500 mt-1">Amount: {denial.amount} | Date: {denial.date}</p>
                    {denial.appealDeadline && (
                      <p className="text-xs text-orange-600 mt-1">Appeal deadline: {denial.appealDeadline}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      denial.status === 'Appeal Filed' ? 'bg-blue-100 text-blue-800' :
                      denial.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {denial.status}
                    </span>
                    {denial.status !== 'Appeal Filed' && (
                      <Button size="sm" variant="outline" onClick={() => handleFileAppeal(denial)}>Appeal</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Payments Tab */}
      {selectedTab === 'payments' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Payment Posting & Reconciliation</h2>
            <Button onClick={handlePostPayment}>Post Pending Payments</Button>
          </div>
          <DashboardGrid columns={3}>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">$2.4M</div>
              <p className="text-sm text-gray-600 mt-1">Posted This Month</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">${(claims.filter(c => c.status === 'Pending').length * 1850).toLocaleString()}</div>
              <p className="text-sm text-gray-600 mt-1">Pending Posting ({claims.filter(c => c.status === 'Pending').length} claims)</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">98.5%</div>
              <p className="text-sm text-gray-600 mt-1">Reconciliation Rate</p>
            </div>
          </DashboardGrid>
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Recent Payments</h3>
            <div className="space-y-2">
              {claims.filter(c => c.status === 'Paid').slice(0, 5).map(claim => (
                <div key={claim.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">{claim.claimId}</span>
                    <span className="text-sm text-gray-600 ml-2">{claim.patient}</span>
                  </div>
                  <span className="font-semibold text-green-600">{claim.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Eligibility Tab */}
      {selectedTab === 'eligibility' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Patient Eligibility Verification</h2>
            <Button onClick={handleVerifyEligibility}>Verify Eligibility</Button>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Real-time Eligibility Check</h3>
                  <p className="text-sm text-gray-600 mt-1">Verify patient insurance coverage before service</p>
                </div>
                <Button onClick={handleVerifyEligibility}>Check Eligibility</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">94%</div>
                <p className="text-sm text-gray-600 mt-1">Verified</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">4%</div>
                <p className="text-sm text-gray-600 mt-1">Pending</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">2%</div>
                <p className="text-sm text-gray-600 mt-1">Ineligible</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Submit Claim Modal */}
      <Modal
        isOpen={showClaimModal}
        onClose={() => {
          setShowClaimModal(false);
          setFormData({});
        }}
        title="Submit New Claim"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowClaimModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Submit Claim</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveClaim} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
            <input
              type="text"
              required
              value={formData.patient || ''}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="John Doe"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Date *</label>
              <input
                type="date"
                required
                value={formData.serviceDate || ''}
                onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.amount || ''}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payer *</label>
            <select
              required
              value={formData.payer || ''}
              onChange={(e) => setFormData({ ...formData, payer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Payer</option>
              <option value="Medicare">Medicare</option>
              <option value="Medicaid">Medicaid</option>
              <option value="Commercial">Commercial Insurance</option>
              <option value="Self-Pay">Self-Pay</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis Code</label>
            <input
              type="text"
              value={formData.diagnosisCode || ''}
              onChange={(e) => setFormData({ ...formData, diagnosisCode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="I10, E11.9, etc."
            />
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Claim will be submitted to the payer for processing. You will receive a confirmation once submitted.
            </p>
          </div>
        </form>
      </Modal>

      {/* File Appeal Modal */}
      <Modal
        isOpen={showAppealModal}
        onClose={() => {
          setShowAppealModal(false);
          setSelectedDenial(null);
          setFormData({});
        }}
        title={`File Appeal for ${selectedDenial?.claimId}`}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowAppealModal(false);
              setSelectedDenial(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>File Appeal</Button>
          </div>
        }
      >
        {selectedDenial && (
          <form onSubmit={handleProcessAppeal} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Claim ID</label>
              <input
                type="text"
                value={selectedDenial.claimId}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Denial Reason</label>
              <input
                type="text"
                value={selectedDenial.reason}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Appeal Reason *</label>
              <textarea
                required
                value={formData.appealReason || ''}
                onChange={(e) => setFormData({ ...formData, appealReason: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                rows={4}
                placeholder="Explain why this denial should be overturned..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
              <input
                type="file"
                multiple
                onChange={(e) => setFormData({ ...formData, supportingDocs: e.target.files?.length || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            {selectedDenial.appealDeadline && (
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Appeal Deadline:</strong> {selectedDenial.appealDeadline}
                </p>
              </div>
            )}
          </form>
        )}
      </Modal>

      {/* Eligibility Verification Modal */}
      <Modal
        isOpen={showEligibilityModal}
        onClose={() => {
          setShowEligibilityModal(false);
          setFormData({});
        }}
        title="Verify Patient Eligibility"
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowEligibilityModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Check Eligibility</Button>
          </div>
        }
      >
        <form onSubmit={handleCheckEligibility} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
            <input
              type="text"
              required
              value={formData.patientName || ''}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Member ID *</label>
            <input
              type="text"
              required
              value={formData.memberId || ''}
              onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="123456789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Service *</label>
            <input
              type="date"
              required
              value={formData.dateOfService || ''}
              onChange={(e) => setFormData({ ...formData, dateOfService: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
            <select
              value={formData.provider || ''}
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Provider</option>
              <option value="Medicare">Medicare</option>
              <option value="Medicaid">Medicaid</option>
              <option value="Blue Cross">Blue Cross Blue Shield</option>
              <option value="Aetna">Aetna</option>
              <option value="UnitedHealthcare">UnitedHealthcare</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
