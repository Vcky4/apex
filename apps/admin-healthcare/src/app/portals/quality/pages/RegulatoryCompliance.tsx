import { Card, Button, DashboardGrid } from '@apex-providers/ui-components';

export default function RegulatoryCompliance() {
  const audits = [
    { name: 'Joint Commission Survey', date: '2025-03-15', status: 'Scheduled', readiness: 92 },
    { name: 'State Licensing Review', date: '2025-04-01', status: 'Scheduled', readiness: 88 },
    { name: 'CMS Conditions of Participation', date: '2025-05-10', status: 'Scheduled', readiness: 95 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Regulatory Compliance</h1>
        <p className="text-gray-600 mt-2">HIPAA privacy & security, Joint Commission readiness, CMS conditions, state licensing</p>
      </div>

      <DashboardGrid columns={4}>
        <Card className="text-center p-4">
          <div className="text-3xl font-bold text-green-600">94%</div>
          <p className="text-sm text-gray-600 mt-1">HIPAA Compliance</p>
        </Card>
        <Card className="text-center p-4">
          <div className="text-3xl font-bold text-blue-600">92%</div>
          <p className="text-sm text-gray-600 mt-1">JC Readiness</p>
        </Card>
        <Card className="text-center p-4">
          <div className="text-3xl font-bold text-purple-600">96%</div>
          <p className="text-sm text-gray-600 mt-1">CMS Compliance</p>
        </Card>
        <Card className="text-center p-4">
          <div className="text-3xl font-bold text-orange-600">98%</div>
          <p className="text-sm text-gray-600 mt-1">State Licensing</p>
        </Card>
      </DashboardGrid>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Audits & Reviews</h2>
          <Button onClick={() => alert('Prepare audit')}>Prepare Audit</Button>
        </div>
        <div className="space-y-4">
          {audits.map((audit, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{audit.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Scheduled: {audit.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Readiness</div>
                    <div className="text-2xl font-bold text-green-600">{audit.readiness}%</div>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {audit.status}
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

