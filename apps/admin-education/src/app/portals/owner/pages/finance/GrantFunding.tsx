import { Card } from '@apex-providers/ui-components';

export default function GrantFunding() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Grant & Funding Management</h1>
        <p className="text-gray-600 mt-2">Grant application tracking, allocation, and compliance reporting</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Grant Application Tracking</h2>
          <p className="text-gray-600">Track grant applications and their status</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Fund Allocation & Utilization</h2>
          <p className="text-gray-600">Allocate and track grant fund utilization</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Compliance Reporting for Grants</h2>
          <p className="text-gray-600">Generate compliance reports for grant requirements</p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Donor Management & Reporting</h2>
          <p className="text-gray-600">Manage donors and generate reports</p>
        </Card>
      </div>
    </div>
  );
}
