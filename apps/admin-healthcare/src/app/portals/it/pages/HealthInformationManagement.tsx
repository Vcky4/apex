import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';

export default function HealthInformationManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Health Information Management</h1>
        <p className="text-gray-600 mt-2">Medical records management, release of information, coding & documentation quality</p>
      </div>

      <DashboardGrid columns={3}>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Medical Records</h3>
          <div className="text-2xl font-bold text-blue-600 mb-2">45,678</div>
          <p className="text-sm text-gray-600 mb-4">Total records</p>
          <Button onClick={() => alert('Manage records')}>Manage Records</Button>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Release of Information</h3>
          <div className="text-2xl font-bold text-green-600 mb-2">234</div>
          <p className="text-sm text-gray-600 mb-4">Pending requests</p>
          <Button onClick={() => alert('Process requests')}>Process Requests</Button>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Coding Quality</h3>
          <div className="text-2xl font-bold text-purple-600 mb-2">96%</div>
          <p className="text-sm text-gray-600 mb-4">Accuracy rate</p>
          <Button onClick={() => alert('View coding')}>View Coding</Button>
        </Card>
      </DashboardGrid>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Record Completion Status</h2>
        <div className="space-y-3">
          {['Inpatient Records: 98%', 'Outpatient Records: 95%', 'Emergency Records: 92%'].map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <span>{item.split(':')[0]}</span>
              <div className="flex items-center space-x-3">
                <div className="w-48 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: item.split(':')[1].trim() }}></div>
                </div>
                <span className="font-semibold">{item.split(':')[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

