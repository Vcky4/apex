import React, { useState } from 'react';
import { Card, Button, DashboardGrid, StatCard } from '@apex-providers/ui-components';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

// Toast Notification
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 z-50">
      {message}
    </div>
  );
};

export default function AccountsAndBilling() {
  const [activeTab, setActiveTab] = useState<'folios' | 'corporate' | 'commissions'>('folios');
  const [selectedFolio, setSelectedFolio] = useState<any>(null);
  const [isFolioModalOpen, setIsFolioModalOpen] = useState(false);
  
  // Invoice States
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock Data
  const folios = [
    { id: '1001', guest: 'John Wick', room: '801', balance: 1250.00, status: 'Open', checkIn: 'Oct 10', checkOut: 'Oct 12' },
    { id: '1002', guest: 'Sarah Connor', room: '304', balance: 450.00, status: 'Open', checkIn: 'Oct 11', checkOut: 'Oct 14' },
    { id: '1003', guest: 'James Bond', room: '501', balance: 0.00, status: 'Settled', checkIn: 'Oct 08', checkOut: 'Oct 11' },
    { id: '1004', guest: 'Ellen Ripley', room: '402', balance: 85.50, status: 'Pending', checkIn: 'Oct 11', checkOut: 'Oct 12' },
  ];

  const corporateAccounts = [
    { id: 1, company: 'Continental Services', contact: 'Winston', outstanding: 15400.00, terms: 'Net 30', status: 'Current', lastInvoice: 'Oct 01' },
    { id: 2, company: 'Cyberdyne Systems', contact: 'Miles Dyson', outstanding: 2850.00, terms: 'Net 15', status: 'Overdue', lastInvoice: 'Sep 15' },
    { id: 3, company: 'Wayne Enterprises', contact: 'Lucius Fox', outstanding: 500.00, terms: 'Net 30', status: 'Current', lastInvoice: 'Oct 05' },
  ];

  const commissions = [
    { id: 1, agent: 'Expedia', period: 'Sep 2025', amount: 4500.00, status: 'Paid' },
    { id: 2, agent: 'Booking.com', period: 'Sep 2025', amount: 3200.00, status: 'Processing' },
    { id: 3, agent: 'Amex Travel', period: 'Sep 2025', amount: 850.00, status: 'Pending' },
  ];

  const folioCharges = [
    { id: 1, date: 'Oct 10', description: 'Room Charge', amount: 350.00 },
    { id: 2, date: 'Oct 10', description: 'Room Service - Dinner', amount: 85.00 },
    { id: 3, date: 'Oct 11', description: 'Room Charge', amount: 350.00 },
    { id: 4, date: 'Oct 11', description: 'Spa Treatment', amount: 180.00 },
    { id: 5, date: 'Oct 11', description: 'Mini Bar', amount: 25.00 },
  ];

  const handleViewFolio = (folio: any) => {
    setSelectedFolio(folio);
    setIsFolioModalOpen(true);
  };

  const handleProcessPayment = () => {
    setToastMessage(`Payment processed successfully for Folio #${selectedFolio.id}`);
    setIsFolioModalOpen(false);
  };

  const handleInvoice = (id: number) => {
    const account = corporateAccounts.find(a => a.id === id);
    setInvoiceData(account);
    setIsInvoiceModalOpen(true);
  };

  const sendInvoice = () => {
    setToastMessage(`Invoice sent to ${invoiceData.contact} at ${invoiceData.company}`);
    setIsInvoiceModalOpen(false);
  };

  const handleEndOfDay = () => {
    if (confirm("Are you sure you want to run the End-of-Day Audit? This will post room charges and close the business day.")) {
      setToastMessage("End-of-Day Audit completed. Room charges posted.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'Settled': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 relative">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Accounts & Billing</h1>
          <p className="text-gray-600 mt-1">Folio management and financial reconciliation</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleEndOfDay}>End-of-Day Audit</Button>
          <Button onClick={() => setActiveTab('corporate')}>Create Invoice</Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'folios', label: 'Guest Folios' },
            { id: 'corporate', label: 'Corporate Billing' },
            { id: 'commissions', label: 'Agent Commissions' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'folios' && (
          <div className="space-y-6">
            <DashboardGrid columns={4}>
              <StatCard title="Open Balances" value="$12,450" icon={<span>💳</span>} color="blue" />
              <StatCard title="Pending Check-out" value="8" icon={<span>👋</span>} color="orange" />
              <StatCard title="Settled Today" value="$8,200" icon={<span>✅</span>} color="green" />
              <StatCard title="Disputed" value="2" icon={<span>⚠️</span>} color="red" />
            </DashboardGrid>

            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Active Guest Folios</h3>
                <input type="text" placeholder="Search guest or room..." className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Folio ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In / Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {folios.map((folio) => (
                      <tr key={folio.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{folio.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{folio.guest}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{folio.room}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{folio.checkIn} - {folio.checkOut}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${folio.balance.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(folio.status)}`}>
                            {folio.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleViewFolio(folio)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'corporate' && (
          <div className="space-y-6">
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Corporate Accounts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Terms</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {corporateAccounts.map((account) => (
                      <tr key={account.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.company}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.contact}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.terms}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${account.outstanding.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(account.status)}`}>
                            {account.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleInvoice(account.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Send Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'commissions' && (
          <div className="space-y-6">
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">Agent Commission Processing</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent / OTA</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {commissions.map((comm) => (
                      <tr key={comm.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{comm.agent}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comm.period}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${comm.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(comm.status)}`}>
                            {comm.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-green-600 hover:text-green-900">Approve</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Folio Detail Modal */}
      <Modal
        isOpen={isFolioModalOpen}
        onClose={() => setIsFolioModalOpen(false)}
        title={selectedFolio ? `Folio #${selectedFolio.id} - ${selectedFolio.guest}` : 'Folio Details'}
      >
        <div className="space-y-6">
          {selectedFolio && (
            <>
              <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Room</p>
                  <p className="font-bold text-gray-900">{selectedFolio.room}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Check-In</p>
                  <p className="font-bold text-gray-900">{selectedFolio.checkIn}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Status</p>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedFolio.status)}`}>
                    {selectedFolio.status}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Charges & Credits</h4>
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {folioCharges.map((charge) => (
                      <tr key={charge.id}>
                        <td className="px-4 py-2 text-sm text-gray-600">{charge.date}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{charge.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">${charge.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-bold">
                      <td className="px-4 py-2 text-sm" colSpan={2}>Total Balance</td>
                      <td className="px-4 py-2 text-sm text-right">${selectedFolio.balance.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button variant="outline">Add Charge</Button>
                <Button onClick={handleProcessPayment}>Process Payment</Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Invoice Creation Modal */}
      <Modal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        title="Create Invoice"
      >
        <div className="space-y-6">
          {invoiceData && (
            <>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Bill To:</span>
                  <span className="font-bold text-gray-900">{invoiceData.company}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Attention:</span>
                  <span className="text-sm text-gray-900">{invoiceData.contact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Amount Due:</span>
                  <span className="font-bold text-green-600">${invoiceData.outstanding.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" defaultValue={new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-24" placeholder="Optional notes for the invoice..."></textarea>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button onClick={sendInvoice}>Send Invoice</Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
