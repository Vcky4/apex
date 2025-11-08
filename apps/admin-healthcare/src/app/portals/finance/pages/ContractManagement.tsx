import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface PayerContract {
  id: number;
  payer: string;
  type: string;
  rate: string;
  expiry: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  contractValue?: string;
}

interface ExpiringContract {
  id: number;
  contract: string;
  expiry: string;
  daysRemaining: number;
  action: string;
  renewalTerms?: string;
}

export default function ContractManagement() {
  const { toasts, showToast, removeToast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'payers' | 'providers' | 'services' | 'renewals'>('payers');

  const [payerContracts, setPayerContracts] = useState<PayerContract[]>([
    { id: 1, payer: 'Medicare', type: 'Government', rate: 'DRG-based', expiry: '2025-12-31', status: 'Active', contractValue: '$12.4M' },
    { id: 2, payer: 'Medicaid', type: 'Government', rate: 'Fee Schedule', expiry: '2025-11-30', status: 'Active', contractValue: '$8.2M' },
    { id: 3, payer: 'Blue Cross Blue Shield', type: 'Commercial', rate: 'Negotiated', expiry: '2025-10-15', status: 'Expiring Soon', contractValue: '$8.9M' },
  ]);

  const [expiringContracts, setExpiringContracts] = useState<ExpiringContract[]>([
    { id: 1, contract: 'Blue Cross Blue Shield', expiry: '2025-10-15', daysRemaining: 268, action: 'Renewal Required', renewalTerms: 'Rate increase: 3.5%' },
    { id: 2, contract: 'Aetna Health', expiry: '2025-09-30', daysRemaining: 253, action: 'Rate Review', renewalTerms: 'Negotiation pending' },
  ]);

  const [showContractModal, setShowContractModal] = useState(false);
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<PayerContract | ExpiringContract | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleAddContract = () => {
    setSelectedContract(null);
    setFormData({});
    setShowContractModal(true);
  };

  const handleSaveContract = (e: React.FormEvent) => {
    e.preventDefault();
    const { payer, type, rate, expiry, contractValue } = formData;
    
    if (!payer || !type || !rate || !expiry) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const newContract: PayerContract = {
      id: Date.now(),
      payer,
      type,
      rate,
      expiry,
      status: 'Active',
      contractValue: contractValue || 'N/A',
    };

    setPayerContracts([...payerContracts, newContract]);
    showToast(`Contract added for ${payer}. Contract will be active upon finalization.`, 'success');
    setShowContractModal(false);
    setFormData({});
  };

  const handleRenewContract = (contract: ExpiringContract) => {
    setSelectedContract(contract);
    setFormData({
      currentExpiry: contract.expiry,
      newExpiry: '',
      renewalTerms: contract.renewalTerms || '',
    });
    setShowRenewalModal(true);
  };

  const handleProcessRenewal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContract) return;

    const newExpiry = formData.newExpiry || new Date(new Date(selectedContract.expiry).setFullYear(new Date(selectedContract.expiry).getFullYear() + 1)).toISOString().split('T')[0];
    
    if ('payer' in selectedContract) {
      setPayerContracts(payerContracts.map(c => 
        c.id === selectedContract.id 
          ? { ...c, expiry: newExpiry, status: 'Active' }
          : c
      ));
    } else {
      setExpiringContracts(expiringContracts.filter(c => c.id !== selectedContract.id));
      // Add to active contracts
      const newContract: PayerContract = {
        id: Date.now(),
        payer: selectedContract.contract,
        type: 'Commercial',
        rate: 'Negotiated',
        expiry: newExpiry,
        status: 'Active',
      };
      setPayerContracts([...payerContracts, newContract]);
    }

    showToast(`Contract renewed for ${'payer' in selectedContract ? selectedContract.payer : selectedContract.contract}. New expiry: ${newExpiry}`, 'success');
    setShowRenewalModal(false);
    setSelectedContract(null);
    setFormData({});
  };

  const handleReviewContract = (contract: PayerContract) => {
    showToast(`Opening contract details for ${contract.payer}...`, 'info');
    setTimeout(() => {
      showToast(`Contract Review: ${contract.payer} - Rate: ${contract.rate}, Value: ${contract.contractValue}, Expiry: ${contract.expiry}`, 'info');
    }, 500);
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Healthcare Contract Management</h1>
        <p className="text-gray-600 mt-2">Payer contract administration, provider agreement management, contract compliance monitoring</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('payers')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'payers' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Payer Contracts ({payerContracts.length})
          </button>
          <button
            onClick={() => setSelectedTab('providers')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'providers' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Provider Agreements
          </button>
          <button
            onClick={() => setSelectedTab('services')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'services' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Service Contracts
          </button>
          <button
            onClick={() => setSelectedTab('renewals')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'renewals' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
            }`}
          >
            Upcoming Renewals ({expiringContracts.length})
          </button>
        </nav>
      </div>

      {/* Payer Contracts Tab */}
      {selectedTab === 'payers' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Payer Contract Administration</h2>
            <Button onClick={handleAddContract}>Add Contract</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate Structure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contract Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payerContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{contract.payer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contract.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contract.rate}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">{contract.contractValue || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contract.expiry}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        contract.status === 'Active' ? 'bg-green-100 text-green-800' :
                        contract.status === 'Expiring Soon' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => handleReviewContract(contract)} className="text-blue-600 hover:text-blue-900 mr-3">Review</button>
                      <button onClick={() => {
                        const renewalContract: ExpiringContract = {
                          id: contract.id,
                          contract: contract.payer,
                          expiry: contract.expiry,
                          daysRemaining: Math.ceil((new Date(contract.expiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
                          action: 'Renewal Required',
                        };
                        handleRenewContract(renewalContract);
                      }} className="text-green-600 hover:text-green-900">Renew</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Renewals Tab */}
      {selectedTab === 'renewals' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Contract Renewals & Amendments</h2>
            <Button onClick={() => {
              showToast(`Processing ${expiringContracts.length} contract renewals...`, 'info');
            }}>Process Renewals</Button>
          </div>
          <div className="space-y-4">
            {expiringContracts.map((contract) => (
              <div key={contract.id} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{contract.contract}</h3>
                    <p className="text-sm text-gray-600 mt-1">Expires: {contract.expiry}</p>
                    <p className="text-xs text-gray-500 mt-1">{contract.daysRemaining} days remaining</p>
                    {contract.renewalTerms && (
                      <p className="text-xs text-orange-700 mt-1 font-medium">{contract.renewalTerms}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                      {contract.action}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => {
                      showToast(`Reviewing contract terms for ${contract.contract}...`, 'info');
                    }}>Review</Button>
                    <Button size="sm" onClick={() => handleRenewContract(contract)}>Renew</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Providers Tab */}
      {selectedTab === 'providers' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Provider Agreement Management</h2>
            <Button onClick={() => {
              showToast('Opening provider agreement form...', 'info');
            }}>Add Provider Agreement</Button>
          </div>
          <div className="p-8 text-center text-gray-500">
            <p className="mb-4">Manage agreements with referring physicians and specialists</p>
            <Button onClick={() => {
              showToast('Provider agreement management feature coming soon', 'info');
            }}>View Provider Agreements</Button>
          </div>
        </Card>
      )}

      {/* Services Tab */}
      {selectedTab === 'services' && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Service Contract Tracking</h2>
            <Button onClick={() => {
              showToast('Opening service contract form...', 'info');
            }}>Add Service Contract</Button>
          </div>
          <div className="p-8 text-center text-gray-500">
            <p className="mb-4">Track contracts for medical equipment, supplies, and services</p>
            <Button onClick={() => {
              showToast('Service contract tracking feature coming soon', 'info');
            }}>View Service Contracts</Button>
          </div>
        </Card>
      )}

      {/* Add Contract Modal */}
      <Modal
        isOpen={showContractModal}
        onClose={() => {
          setShowContractModal(false);
          setFormData({});
        }}
        title="Add New Payer Contract"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowContractModal(false);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Save Contract</Button>
          </div>
        }
      >
        <form onSubmit={handleSaveContract} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payer Name *</label>
            <input
              type="text"
              required
              value={formData.payer || ''}
              onChange={(e) => setFormData({ ...formData, payer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Medicare, Medicaid, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type *</label>
            <select
              required
              value={formData.type || ''}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Type</option>
              <option value="Government">Government</option>
              <option value="Commercial">Commercial</option>
              <option value="Self-Pay">Self-Pay</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rate Structure *</label>
            <select
              required
              value={formData.rate || ''}
              onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Rate Structure</option>
              <option value="DRG-based">DRG-based</option>
              <option value="Fee Schedule">Fee Schedule</option>
              <option value="Negotiated">Negotiated</option>
              <option value="Per Diem">Per Diem</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
              <input
                type="date"
                required
                value={formData.expiry || ''}
                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contract Value</label>
              <input
                type="text"
                value={formData.contractValue || ''}
                onChange={(e) => setFormData({ ...formData, contractValue: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="$0.00"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Renewal Modal */}
      <Modal
        isOpen={showRenewalModal}
        onClose={() => {
          setShowRenewalModal(false);
          setSelectedContract(null);
          setFormData({});
        }}
        title={`Renew Contract: ${selectedContract && 'contract' in selectedContract ? selectedContract.contract : 'Unknown'}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowRenewalModal(false);
              setSelectedContract(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Process Renewal</Button>
          </div>
        }
      >
        {selectedContract && (
          <form onSubmit={handleProcessRenewal} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contract</label>
              <input
                type="text"
                value={'contract' in selectedContract ? selectedContract.contract : 'payer' in selectedContract ? selectedContract.payer : ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Expiry</label>
              <input
                type="text"
                value={formData.currentExpiry || selectedContract.expiry}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                min={selectedContract.expiry}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Renewal Terms</label>
              <textarea
                value={formData.renewalTerms || ''}
                onChange={(e) => setFormData({ ...formData, renewalTerms: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                rows={3}
                placeholder="Enter renewal terms, rate changes, etc."
              />
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Contract renewal will extend the agreement for the specified period. Legal review recommended before finalization.
              </p>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
