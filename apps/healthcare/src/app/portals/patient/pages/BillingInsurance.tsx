import { Card, Button } from '@apex-providers/ui-components';
import { useState } from 'react';
import { Modal } from '../../../shared/Modal';
import { useToast, ToastContainer } from '../../../shared/Toast';

interface Bill {
  id: number;
  date: string;
  description: string;
  amount: string;
  status: 'Pending' | 'Paid' | 'Overdue';
  dueDate: string;
}

interface InsuranceClaim {
  id: number;
  claimNumber: string;
  serviceDate: string;
  amount: string;
  status: 'Pending' | 'Approved' | 'Denied' | 'Paid';
}

export default function BillingInsurance() {
  const { toasts, showToast, removeToast } = useToast();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [formData, setFormData] = useState<any>({});

  const [bills, setBills] = useState<Bill[]>([
    { id: 1, date: '2025-01-18', description: 'Office Visit - Cardiology', amount: '$150.00', status: 'Pending', dueDate: '2025-02-18' },
    { id: 2, date: '2025-01-15', description: 'Lab Tests', amount: '$85.00', status: 'Paid', dueDate: '2025-02-15' },
    { id: 3, date: '2024-12-20', description: 'Annual Check-up', amount: '$200.00', status: 'Overdue', dueDate: '2025-01-20' },
  ]);

  const [claims, setClaims] = useState<InsuranceClaim[]>([
    { id: 1, claimNumber: 'CLM-2025-001', serviceDate: '2025-01-18', amount: '$150.00', status: 'Approved' },
    { id: 2, claimNumber: 'CLM-2025-002', serviceDate: '2025-01-15', amount: '$85.00', status: 'Paid' },
  ]);

  const handlePayBill = (bill: Bill) => {
    setSelectedBill(bill);
    setFormData({
      paymentMethod: 'Credit Card',
      cardNumber: '',
    });
    setShowPaymentModal(true);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBill) return;

    const { paymentMethod, cardNumber } = formData;
    if (!paymentMethod || (paymentMethod === 'Credit Card' && !cardNumber)) {
      showToast('Please fill in payment details', 'error');
      return;
    }

    setBills(bills.map(b => 
      b.id === selectedBill.id ? { ...b, status: 'Paid' } : b
    ));

    showToast(`Payment of ${selectedBill.amount} processed successfully`, 'success');
    setShowPaymentModal(false);
    setSelectedBill(null);
    setFormData({});
  };

  const totalPending = bills.filter(b => b.status === 'Pending' || b.status === 'Overdue')
    .reduce((sum, b) => sum + parseFloat(b.amount.replace('$', '').replace(',', '')), 0);

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Billing & Insurance</h1>
        <p className="text-gray-600 mt-2">Bill payment portal, insurance claim status, cost estimates, payment history</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-orange-600">${totalPending.toFixed(2)}</div>
            <p className="text-sm text-gray-600 mt-1">Pending Balance</p>
          </div>
        </Card>
        <Card>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-green-600">{bills.filter(b => b.status === 'Paid').length}</div>
            <p className="text-sm text-gray-600 mt-1">Paid Bills</p>
          </div>
        </Card>
        <Card>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-blue-600">{claims.filter(c => c.status === 'Approved' || c.status === 'Paid').length}</div>
            <p className="text-sm text-gray-600 mt-1">Approved Claims</p>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Bills & Statements</h2>
        <div className="space-y-4">
          {bills.map((bill) => (
            <div key={bill.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-900">{bill.description}</div>
                  <div className="text-sm text-gray-600 mt-1">Date: {bill.date} • Due: {bill.dueDate}</div>
                  <div className="text-lg font-bold text-gray-900 mt-2">{bill.amount}</div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    bill.status === 'Paid' ? 'bg-green-100 text-green-800' :
                    bill.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bill.status}
                  </span>
                  {bill.status !== 'Paid' && (
                    <Button size="sm" onClick={() => handlePayBill(bill)}>Pay Now</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Insurance Claims</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claim Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{claim.claimNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{claim.serviceDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{claim.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      claim.status === 'Paid' || claim.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      claim.status === 'Denied' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => showToast(`Viewing claim ${claim.claimNumber} details...`, 'info')} className="text-blue-600 hover:text-blue-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedBill(null);
          setFormData({});
        }}
        title={`Pay Bill: ${selectedBill?.amount}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => {
              setShowPaymentModal(false);
              setSelectedBill(null);
              setFormData({});
            }}>Cancel</Button>
            <Button onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}>Process Payment</Button>
          </div>
        }
      >
        {selectedBill && (
          <form onSubmit={handleProcessPayment} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Bill: {selectedBill.description}</div>
              <div className="text-lg font-bold text-blue-900 mt-1">Amount: {selectedBill.amount}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
              <select
                required
                value={formData.paymentMethod || ''}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Check">Check</option>
              </select>
            </div>
            {formData.paymentMethod === 'Credit Card' || formData.paymentMethod === 'Debit Card' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                <input
                  type="text"
                  required
                  value={formData.cardNumber || ''}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
            ) : null}
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Secure Payment:</strong> Your payment information is encrypted and secure.
              </p>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
