import { useState } from 'react';
import { Card, Button, StatCard, DashboardGrid } from '@apex-providers/ui-components';

interface AccountsPayable {
  id: string;
  vendor: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  daysUntilDue: number;
  status: 'Pending' | 'Approved' | 'Paid' | 'Overdue';
  category: string;
}

interface AccountsReceivable {
  id: string;
  payer: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  status: 'Pending' | 'Partial' | 'Paid' | 'Overdue';
  category: string;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  lastReconciled: string;
  reconciliationStatus: 'Reconciled' | 'Pending' | 'Discrepancy';
}

interface FinancialStatement {
  id: string;
  statementType: string;
  period: string;
  generatedDate: string;
  status: 'Draft' | 'Final' | 'Approved';
}

export default function AccountsManagement() {
  const [accountsPayable, setAccountsPayable] = useState<AccountsPayable[]>([
    {
      id: '1',
      vendor: 'ABC Supplies Co.',
      invoiceNumber: 'INV-2024-001',
      amount: 12500,
      dueDate: '2024-02-15',
      daysUntilDue: 12,
      status: 'Approved',
      category: 'Supplies'
    },
    {
      id: '2',
      vendor: 'Tech Solutions Inc.',
      invoiceNumber: 'INV-2024-002',
      amount: 8500,
      dueDate: '2024-01-28',
      daysUntilDue: -5,
      status: 'Overdue',
      category: 'IT Services'
    },
    {
      id: '3',
      vendor: 'Maintenance Pro',
      invoiceNumber: 'INV-2024-003',
      amount: 3200,
      dueDate: '2024-02-20',
      daysUntilDue: 17,
      status: 'Pending',
      category: 'Maintenance'
    }
  ]);

  const [accountsReceivable, setAccountsReceivable] = useState<AccountsReceivable[]>([
    {
      id: '1',
      payer: 'John Doe (Parent)',
      invoiceNumber: 'STU-2024-001',
      amount: 3500,
      dueDate: '2024-01-15',
      daysOverdue: 18,
      status: 'Overdue',
      category: 'Tuition'
    },
    {
      id: '2',
      payer: 'Jane Smith (Parent)',
      invoiceNumber: 'STU-2024-002',
      amount: 2800,
      dueDate: '2024-02-01',
      daysOverdue: 2,
      status: 'Partial',
      category: 'Tuition'
    },
    {
      id: '3',
      payer: 'Grant Foundation',
      invoiceNumber: 'GRT-2024-001',
      amount: 50000,
      dueDate: '2024-02-28',
      daysOverdue: 0,
      status: 'Pending',
      category: 'Grant'
    }
  ]);

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      bankName: 'First National Bank',
      accountNumber: '****1234',
      accountType: 'Operating',
      balance: 245000,
      lastReconciled: '2024-01-31',
      reconciliationStatus: 'Reconciled'
    },
    {
      id: '2',
      bankName: 'Community Savings',
      accountNumber: '****5678',
      accountType: 'Savings',
      balance: 180000,
      lastReconciled: '2024-01-31',
      reconciliationStatus: 'Reconciled'
    },
    {
      id: '3',
      bankName: 'First National Bank',
      accountNumber: '****9012',
      accountType: 'Payroll',
      balance: 45000,
      lastReconciled: '2024-01-15',
      reconciliationStatus: 'Pending'
    }
  ]);

  const [financialStatements, setFinancialStatements] = useState<FinancialStatement[]>([
    {
      id: '1',
      statementType: 'Balance Sheet',
      period: 'Q4 2023',
      generatedDate: '2024-01-15',
      status: 'Approved'
    },
    {
      id: '2',
      statementType: 'Income Statement',
      period: 'Q4 2023',
      generatedDate: '2024-01-15',
      status: 'Approved'
    },
    {
      id: '3',
      statementType: 'Cash Flow Statement',
      period: 'Q4 2023',
      generatedDate: '2024-01-15',
      status: 'Final'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Partial': return 'bg-orange-100 text-orange-800';
      case 'Reconciled': return 'bg-green-100 text-green-800';
      case 'Discrepancy': return 'bg-red-100 text-red-800';
      case 'Final': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPayable = accountsPayable.reduce((sum, ap) => sum + ap.amount, 0);
  const totalReceivable = accountsReceivable.reduce((sum, ar) => sum + ar.amount, 0);
  const totalBankBalance = bankAccounts.reduce((sum, ba) => sum + ba.balance, 0);
  const overduePayable = accountsPayable.filter(ap => ap.status === 'Overdue').reduce((sum, ap) => sum + ap.amount, 0);
  const overdueReceivable = accountsReceivable.filter(ar => ar.status === 'Overdue').reduce((sum, ar) => sum + ar.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-gray">Accounts Management</h1>
          <p className="text-gray-600 mt-2">Accounts payable, receivable, and bank reconciliation</p>
        </div>
        <Button>New Transaction</Button>
      </div>

      {/* Overview Stats */}
      <DashboardGrid columns={4}>
        <StatCard
          title="Total Accounts Payable"
          value={`$${(totalPayable / 1000).toFixed(0)}K`}
          color="orange"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          title="Total Accounts Receivable"
          value={`$${(totalReceivable / 1000).toFixed(0)}K`}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Total Bank Balance"
          value={`$${(totalBankBalance / 1000).toFixed(0)}K`}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          }
        />
        <StatCard
          title="Overdue Amounts"
          value={`$${((overduePayable + overdueReceivable) / 1000).toFixed(0)}K`}
          color="red"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </DashboardGrid>

      {/* Accounts Payable Processing */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Accounts Payable Processing</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">Process Payment</Button>
            <Button size="sm" variant="secondary">Add Invoice</Button>
          </div>
        </div>

        {accountsPayable.filter(ap => ap.status === 'Overdue').length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-800">
                  {accountsPayable.filter(ap => ap.status === 'Overdue').length} overdue invoice(s) requiring immediate attention
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Until Due</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accountsPayable.map((ap) => (
                <tr key={ap.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{ap.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ap.invoiceNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${ap.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ap.dueDate}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                    ap.daysUntilDue < 0 ? 'text-red-600' : ap.daysUntilDue <= 7 ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {ap.daysUntilDue < 0 ? `${Math.abs(ap.daysUntilDue)} days overdue` : `${ap.daysUntilDue} days`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ap.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ap.status)}`}>
                      {ap.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {ap.status === 'Approved' && (
                        <button className="text-green-600 hover:text-green-900">Pay</button>
                      )}
                      {ap.status === 'Pending' && (
                        <button className="text-purple-600 hover:text-purple-900">Approve</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Accounts Receivable Management */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Accounts Receivable Management</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">Send Reminders</Button>
            <Button size="sm" variant="secondary">Record Payment</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Overdue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accountsReceivable.map((ar) => (
                <tr key={ar.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{ar.payer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ar.invoiceNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${ar.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ar.dueDate}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                    ar.daysOverdue > 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {ar.daysOverdue > 0 ? `${ar.daysOverdue} days` : 'Current'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ar.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ar.status)}`}>
                      {ar.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {ar.status !== 'Paid' && (
                        <button className="text-green-600 hover:text-green-900">Collect</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bank Reconciliation Automation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Bank Accounts</h2>
            <Button size="sm" variant="secondary">Add Account</Button>
          </div>

          <div className="space-y-4">
            {bankAccounts.map((account) => (
              <div key={account.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{account.bankName}</div>
                    <div className="text-sm text-gray-600">{account.accountNumber} • {account.accountType}</div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(account.reconciliationStatus)}`}>
                    {account.reconciliationStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Balance</div>
                    <div className="text-xl font-bold text-blue-600">${account.balance.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Last Reconciled</div>
                    <div className="text-sm font-medium text-gray-700">{account.lastReconciled}</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" fullWidth>Reconcile</Button>
                  <Button size="sm" variant="outline" fullWidth>View Transactions</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Reconciliation Summary</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">This Month</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">$125,450</div>
              <div className="text-sm text-gray-600">Total transactions reconciled</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Pending Reconciliation</div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">$8,250</div>
              <div className="text-sm text-gray-600">Requires attention</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 mb-2">Discrepancies</div>
              <div className="text-2xl font-bold text-red-600 mb-1">$0</div>
              <div className="text-sm text-gray-600">All accounts balanced</div>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" fullWidth>Run Auto-Reconciliation</Button>
          </div>
        </Card>
      </div>

      {/* Financial Reporting & Statements */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Financial Reporting & Statements</h2>
          <Button size="sm" variant="secondary">Generate Report</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statement Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialStatements.map((statement) => (
                <tr key={statement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{statement.statementType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{statement.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{statement.generatedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(statement.status)}`}>
                      {statement.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Download</button>
                      {statement.status === 'Draft' && (
                        <button className="text-purple-600 hover:text-purple-900">Edit</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Balance Sheet</div>
            <div className="text-sm text-gray-600 mb-3">Assets, liabilities, and equity</div>
            <Button size="sm" variant="outline" fullWidth>Generate</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Income Statement</div>
            <div className="text-sm text-gray-600 mb-3">Revenue and expenses</div>
            <Button size="sm" variant="outline" fullWidth>Generate</Button>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-medium text-gray-900 mb-2">Cash Flow Statement</div>
            <div className="text-sm text-gray-600 mb-3">Operating, investing, financing</div>
            <Button size="sm" variant="outline" fullWidth>Generate</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
