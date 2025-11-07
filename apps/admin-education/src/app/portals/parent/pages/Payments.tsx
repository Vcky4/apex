import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface FeeItem {
  id: string;
  studentName: string;
  studentId: string;
  feeType: 'Tuition' | 'Registration' | 'Library' | 'Lab' | 'Sports' | 'Transportation' | 'Other';
  description: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Paid' | 'Overdue' | 'Partial';
  paidAmount?: number;
  paymentDate?: string;
  invoiceNumber: string;
}

interface Payment {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Bank Transfer' | 'Cash' | 'Check';
  transactionId: string;
  status: 'Completed' | 'Pending' | 'Failed';
  description: string;
  invoiceNumber: string;
}

interface PaymentMethod {
  id: string;
  type: 'Credit Card' | 'Debit Card' | 'Bank Account';
  lastFour: string;
  expiryDate?: string;
  isDefault: boolean;
  bankName?: string;
}

export default function Payments() {
  const [selectedStudent, setSelectedStudent] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'fees' | 'payments' | 'methods'>('fees');
  const [showPaymentModal, setShowPaymentModal] = useState<string | null>(null);
  const [showAddMethodModal, setShowAddMethodModal] = useState(false);

  const feeItems: FeeItem[] = [
    {
      id: '1',
      studentName: 'Alex Johnson',
      studentId: '10245',
      feeType: 'Tuition',
      description: 'Spring 2024 Tuition Fee',
      amount: 2500,
      dueDate: '2024-03-15',
      status: 'Pending',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: '2',
      studentName: 'Alex Johnson',
      studentId: '10245',
      feeType: 'Lab',
      description: 'Science Lab Fee',
      amount: 150,
      dueDate: '2024-03-20',
      status: 'Pending',
      invoiceNumber: 'INV-2024-002'
    },
    {
      id: '3',
      studentName: 'Emma Johnson',
      studentId: '08312',
      feeType: 'Tuition',
      description: 'Spring 2024 Tuition Fee',
      amount: 2500,
      dueDate: '2024-03-15',
      status: 'Paid',
      paidAmount: 2500,
      paymentDate: '2024-03-10',
      invoiceNumber: 'INV-2024-003'
    },
    {
      id: '4',
      studentName: 'Emma Johnson',
      studentId: '08312',
      feeType: 'Registration',
      description: 'Annual Registration Fee',
      amount: 200,
      dueDate: '2024-02-28',
      status: 'Overdue',
      invoiceNumber: 'INV-2024-004'
    },
    {
      id: '5',
      studentName: 'Alex Johnson',
      studentId: '10245',
      feeType: 'Library',
      description: 'Library Membership Fee',
      amount: 50,
      dueDate: '2024-03-25',
      status: 'Pending',
      invoiceNumber: 'INV-2024-005'
    },
    {
      id: '6',
      studentName: 'Alex Johnson',
      studentId: '10245',
      feeType: 'Sports',
      description: 'Sports Activity Fee',
      amount: 100,
      dueDate: '2024-02-15',
      status: 'Partial',
      paidAmount: 50,
      invoiceNumber: 'INV-2024-006'
    }
  ];

  const payments: Payment[] = [
    {
      id: '1',
      studentName: 'Emma Johnson',
      studentId: '08312',
      amount: 2500,
      paymentDate: '2024-03-10',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-2024-001',
      status: 'Completed',
      description: 'Spring 2024 Tuition Fee',
      invoiceNumber: 'INV-2024-003'
    },
    {
      id: '2',
      studentName: 'Alex Johnson',
      studentId: '10245',
      amount: 50,
      paymentDate: '2024-02-10',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TXN-2024-002',
      status: 'Completed',
      description: 'Sports Activity Fee (Partial)',
      invoiceNumber: 'INV-2024-006'
    },
    {
      id: '3',
      studentName: 'Alex Johnson',
      studentId: '10245',
      amount: 100,
      paymentDate: '2024-01-15',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN-2024-003',
      status: 'Completed',
      description: 'Fall 2023 Library Fee',
      invoiceNumber: 'INV-2023-045'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'Credit Card',
      lastFour: '4242',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'Debit Card',
      lastFour: '5678',
      expiryDate: '08/26',
      isDefault: false
    },
    {
      id: '3',
      type: 'Bank Account',
      lastFour: '9012',
      isDefault: false,
      bankName: 'First National Bank'
    }
  ];

  const filteredFees = feeItems.filter(fee => {
    if (selectedStudent !== 'All' && fee.studentName !== selectedStudent) return false;
    if (selectedStatus !== 'All' && fee.status !== selectedStatus) return false;
    return true;
  });

  const filteredPayments = payments.filter(payment => {
    if (selectedStudent !== 'All' && payment.studentName !== selectedStudent) return false;
    if (selectedStatus !== 'All' && payment.status !== selectedStatus) return false;
    return true;
  });

  const pendingFees = feeItems.filter(f => f.status === 'Pending' || f.status === 'Overdue');
  const totalPending = pendingFees.reduce((sum, f) => sum + (f.amount - (f.paidAmount || 0)), 0);
  const totalPaid = payments.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.amount, 0);
  const overdueFees = feeItems.filter(f => f.status === 'Overdue').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Partial': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFeeTypeColor = (type: string) => {
    switch (type) {
      case 'Tuition': return 'bg-blue-100 text-blue-800';
      case 'Registration': return 'bg-purple-100 text-purple-800';
      case 'Lab': return 'bg-green-100 text-green-800';
      case 'Library': return 'bg-yellow-100 text-yellow-800';
      case 'Sports': return 'bg-orange-100 text-orange-800';
      case 'Transportation': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const students = Array.from(new Set([...feeItems, ...payments].map(item => item.studentName)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Payments & Fees</h1>
        <p className="text-gray-600 mt-2">Manage fee payments and view payment history</p>
      </div>

      <DashboardGrid columns={4}>
        <StatCard
          title="Pending Amount"
          value={`$${totalPending.toFixed(2)}`}
          color="orange"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Total Paid"
          value={`$${totalPaid.toFixed(2)}`}
          color="green"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Overdue Fees"
          value={overdueFees.toString()}
          color="red"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        />
        <StatCard
          title="Payment Methods"
          value={paymentMethods.length.toString()}
          color="blue"
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
        />
      </DashboardGrid>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('fees')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'fees'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Fees & Invoices ({pendingFees.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'payments'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Payment History
        </button>
        <button
          onClick={() => setActiveTab('methods')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'methods'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Payment Methods
        </button>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Student</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All</option>
                {students.map(student => (
                  <option key={student} value={student}>{student}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Paid</option>
                <option>Overdue</option>
                <option>Partial</option>
                <option>Completed</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Fees Tab */}
      {activeTab === 'fees' && (
        <div className="space-y-4">
          {filteredFees.map((fee) => (
            <Card key={fee.id} className={fee.status === 'Overdue' ? 'border-l-4 border-red-500' : ''}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-charcoal-gray">{fee.description}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFeeTypeColor(fee.feeType)}`}>
                        {fee.feeType}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fee.status)}`}>
                        {fee.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">{fee.studentName}</span> • Invoice: {fee.invoiceNumber}
                    </div>
                    <div className="text-sm text-gray-600">
                      Due Date: {new Date(fee.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-charcoal-gray">
                      ${fee.amount.toFixed(2)}
                    </div>
                    {fee.status === 'Partial' && fee.paidAmount && (
                      <div className="text-sm text-gray-600 mt-1">
                        Paid: ${fee.paidAmount.toFixed(2)}
                      </div>
                    )}
                    {fee.status === 'Paid' && fee.paymentDate && (
                      <div className="text-sm text-green-600 mt-1">
                        Paid on {new Date(fee.paymentDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {fee.status === 'Partial' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Payment Progress</span>
                      <span className="font-medium text-gray-700">
                        {fee.paidAmount || 0} / {fee.amount}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${((fee.paidAmount || 0) / fee.amount) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {(fee.status === 'Pending' || fee.status === 'Overdue' || fee.status === 'Partial') && (
                    <>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => setShowPaymentModal(fee.id)}
                      >
                        Pay Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          alert(`Invoice Number: ${fee.invoiceNumber}\nAmount: $${fee.amount.toFixed(2)}\nDue Date: ${new Date(fee.dueDate).toLocaleDateString()}`);
                        }}
                      >
                        View Invoice
                      </Button>
                    </>
                  )}
                  {fee.status === 'Paid' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        alert(`Receipt for ${fee.invoiceNumber}\nPaid: $${fee.amount.toFixed(2)}\nDate: ${fee.paymentDate ? new Date(fee.paymentDate).toLocaleDateString() : 'N/A'}`);
                      }}
                    >
                      View Receipt
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-charcoal-gray mb-4">Payment History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-gray">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Student</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Method</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Transaction ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-charcoal-gray">{payment.studentName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{payment.description}</td>
                      <td className="px-4 py-3 text-sm font-medium text-charcoal-gray">${payment.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{payment.paymentMethod}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">{payment.transactionId}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredPayments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No payment history found
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'methods' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-charcoal-gray">{method.type}</h3>
                    {method.bankName && (
                      <p className="text-sm text-gray-600">{method.bankName}</p>
                    )}
                  </div>
                  {method.isDefault && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Default
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Card Number</div>
                  <div className="text-lg font-mono font-semibold text-charcoal-gray">
                    •••• •••• •••• {method.lastFour}
                  </div>
                  {method.expiryDate && (
                    <div className="text-sm text-gray-600 mt-2">
                      Expires: {method.expiryDate}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {!method.isDefault && (
                    <Button variant="outline" size="sm" className="flex-1">
                      Set as Default
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1">
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          <Card 
            className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => setShowAddMethodModal(true)}
          >
            <div className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
              <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Add Payment Method</h3>
              <p className="text-sm text-gray-500 text-center">Add a new credit card or bank account</p>
            </div>
          </Card>
        </div>
      )}

      {(activeTab === 'fees' && filteredFees.length === 0) && (
        <Card>
          <div className="p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No fees found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        </Card>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">Make Payment</h3>
            {(() => {
              const fee = feeItems.find(f => f.id === showPaymentModal);
              return fee ? (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Fee: {fee.description}</p>
                    <p className="text-sm text-gray-600 mb-2">Student: {fee.studentName}</p>
                    <p className="text-lg font-bold text-charcoal-gray">
                      Amount: ${fee.status === 'Partial' ? (fee.amount - (fee.paidAmount || 0)).toFixed(2) : fee.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      {paymentMethods.map(method => (
                        <option key={method.id}>
                          {method.type} ending in {method.lastFour} {method.isDefault ? '(Default)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setShowPaymentModal(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        alert('Payment processed successfully!');
                        setShowPaymentModal(null);
                      }}
                    >
                      Process Payment
                    </Button>
                  </div>
                </>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddMethodModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-charcoal-gray mb-4">Add Payment Method</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Bank Account</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setShowAddMethodModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    alert('Payment method added successfully!');
                    setShowAddMethodModal(false);
                  }}
                >
                  Add Method
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
