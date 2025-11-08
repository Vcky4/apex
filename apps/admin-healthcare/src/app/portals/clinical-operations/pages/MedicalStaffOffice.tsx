import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';

export default function MedicalStaffOffice() {
  const committees = [
    { name: 'Medical Executive Committee', nextMeeting: '2025-02-15', status: 'Scheduled' },
    { name: 'Credentialing Committee', nextMeeting: '2025-02-10', status: 'Scheduled' },
    { name: 'Quality Improvement Committee', nextMeeting: '2025-02-20', status: 'Scheduled' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Medical Staff Office</h1>
        <p className="text-gray-600 mt-2">Physician privilege management, committee meeting coordination, peer review process</p>
      </div>

      <DashboardGrid columns={3}>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Active Physicians</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">142</div>
          <p className="text-sm text-gray-600">With active privileges</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Pending Privileges</h3>
          <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
          <p className="text-sm text-gray-600">Awaiting review</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-3">Committees</h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
          <p className="text-sm text-gray-600">Active committees</p>
        </Card>
      </DashboardGrid>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Committee Meeting Coordination</h2>
          <Button onClick={() => alert('Schedule meeting')}>Schedule Meeting</Button>
        </div>
        <div className="space-y-3">
          {committees.map((committee, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{committee.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Next Meeting: {committee.nextMeeting}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {committee.status}
                  </span>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

