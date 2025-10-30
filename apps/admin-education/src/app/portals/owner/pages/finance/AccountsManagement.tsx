import { Card } from '@apex-providers/ui-components';

export default function AccountsManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Accounts Management</h1>
        <p className="text-gray-600 mt-2">Accounts payable, receivable, and bank reconciliation</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Accounts Payable Processing</h2>
          <p className="text-gray-600">Process and manage accounts payable</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Accounts Receivable Management</h2>
          <p className="text-gray-600">Manage receivables and collections</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Bank Reconciliation Automation</h2>
          <p className="text-gray-600">Automate bank reconciliation processes</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Financial Reporting & Statements</h2>
          <p className="text-gray-600">Generate financial reports and statements</p>
        </Card>
      </div>
    </div>
  );
}
